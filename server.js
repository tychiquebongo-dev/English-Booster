const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = 3000;
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp'
};

// ==========================================
// MATCHMAKING & PRESENCE STATE
// ==========================================
const connectedClients = new Map(); // socket -> clientData
const matchmakingQueue = []; // array of { socket, user }
const activeRooms = new Map(); // roomId -> Set of sockets

const VIRTUAL_ONLINE_PARTNERS = [
  { id: 'sofia_es', name: 'Sofia Martínez', country: 'Spain', flag: '🇪🇸', level: 'B1', interests: ['Travel', 'Music', 'Movies'], avatar: 'assets/avatars/sofia.jpg', isOnline: true },
  { id: 'kenji_jp', name: 'Kenji Sato', country: 'Japan', flag: '🇯🇵', level: 'B2', interests: ['Tech', 'Coding', 'Anime'], avatar: 'assets/avatars/kenji.jpg', isOnline: true },
  { id: 'amara_ng', name: 'Amara Okafor', country: 'Nigeria', flag: '🇳🇬', level: 'C1', interests: ['Business', 'Startups', 'Literature'], avatar: 'assets/avatars/amara.jpg', isOnline: true },
  { id: 'lucas_de', name: 'Lucas Weber', country: 'Germany', flag: '🇩🇪', level: 'B2', interests: ['Science', 'Football', 'Music'], avatar: 'assets/avatars/lucas.jpg', isOnline: true },
  { id: 'tychique_bongo', name: 'Tychique Bongo', country: "Côte d'Ivoire", flag: '🇨🇮', level: 'C2', interests: ['Tech', 'Startups', 'Motivation'], avatar: 'assets/images/tychique-bongo.jpg', isOnline: true }
];

function calculateCompatibility(u1, u2) {
  let score = 20; // base score

  // Level compatibility
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const l1 = levels.indexOf(u1.level || 'B1');
  const l2 = levels.indexOf(u2.level || 'B1');
  const diff = Math.abs(l1 - l2);
  if (diff === 0) score += 40;
  else if (diff === 1) score += 30;
  else if (diff === 2) score += 15;
  else score += 5;

  // Interests overlap
  const int1 = Array.isArray(u1.interests) ? u1.interests : ['Travel'];
  const int2 = Array.isArray(u2.interests) ? u2.interests : ['Travel'];
  const common = int1.filter(i => int2.includes(i));
  score += Math.min(35, common.length * 12);

  return {
    score: Math.min(99, Math.max(72, score)),
    commonInterests: common
  };
}

// ==========================================
// PURE NODE.JS WEBSOCKET FRAME IMPLEMENTATION
// ==========================================
function encodeWsFrame(data) {
  const jsonStr = typeof data === 'string' ? data : JSON.stringify(data);
  const payload = Buffer.from(jsonStr, 'utf-8');
  const length = payload.length;

  let header;
  if (length <= 125) {
    header = Buffer.alloc(2);
    header[0] = 0x81; // FIN + text opcode (1)
    header[1] = length;
  } else if (length <= 65535) {
    header = Buffer.alloc(4);
    header[0] = 0x81;
    header[1] = 126;
    header.writeUInt16BE(length, 2);
  } else {
    header = Buffer.alloc(10);
    header[0] = 0x81;
    header[1] = 127;
    header.writeBigUInt64BE(BigInt(length), 2);
  }

  return Buffer.concat([header, payload]);
}

function sendWs(socket, data) {
  if (!socket.destroyed && socket.writable) {
    try {
      socket.write(encodeWsFrame(data));
    } catch (e) {}
  }
}

function broadcastPresence() {
  const onlineList = [];
  connectedClients.forEach(client => {
    if (client.user) onlineList.push(client.user);
  });

  // Combine with virtual partners for rich network feel
  const allPartners = [...onlineList, ...VIRTUAL_ONLINE_PARTNERS.filter(vp => !onlineList.some(o => o.id === vp.id))];

  const payload = {
    type: 'presence_update',
    onlineCount: allPartners.length + 130, // simulated active global community
    onlineUsers: allPartners.slice(0, 15)
  };

  connectedClients.forEach((client, socket) => {
    sendWs(socket, payload);
  });
}

// Matchmaking Runner
function processMatchmaking() {
  if (matchmakingQueue.length >= 2) {
    // Sort and match best pair
    let bestPair = null;
    let highestScore = -1;

    for (let i = 0; i < matchmakingQueue.length - 1; i++) {
      for (let j = i + 1; j < matchmakingQueue.length; j++) {
        const u1 = matchmakingQueue[i].user;
        const u2 = matchmakingQueue[j].user;
        const { score, commonInterests } = calculateCompatibility(u1, u2);
        if (score > highestScore) {
          highestScore = score;
          bestPair = { idxA: i, idxB: j, score, commonInterests };
        }
      }
    }

    if (bestPair) {
      const p1 = matchmakingQueue.splice(bestPair.idxB, 1)[0];
      const p2 = matchmakingQueue.splice(bestPair.idxA, 1)[0];

      const roomId = `room_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
      activeRooms.set(roomId, new Set([p1.socket, p2.socket]));

      connectedClients.get(p1.socket).roomId = roomId;
      connectedClients.get(p2.socket).roomId = roomId;

      sendWs(p1.socket, {
        type: 'match_found',
        roomId,
        isCaller: true,
        peer: p2.user,
        matchScore: bestPair.score,
        sharedInterests: bestPair.commonInterests
      });

      sendWs(p2.socket, {
        type: 'match_found',
        roomId,
        isCaller: false,
        peer: p1.user,
        matchScore: bestPair.score,
        sharedInterests: bestPair.commonInterests
      });
    }
  }

  // If a user has been waiting for more than 4 seconds, match with closest available virtual partner
  const now = Date.now();
  for (let i = matchmakingQueue.length - 1; i >= 0; i--) {
    const item = matchmakingQueue[i];
    if (now - item.joinedAt > 4000) {
      matchmakingQueue.splice(i, 1);
      const user = item.user;

      // Pick best matching virtual partner
      let bestPartner = VIRTUAL_ONLINE_PARTNERS[0];
      let bestScore = 0;
      let commonInts = [];

      for (const vp of VIRTUAL_ONLINE_PARTNERS) {
        const { score, commonInterests } = calculateCompatibility(user, vp);
        if (score > bestScore) {
          bestScore = score;
          bestPartner = vp;
          commonInts = commonInterests;
        }
      }

      const roomId = `room_solo_${Date.now()}`;
      activeRooms.set(roomId, new Set([item.socket]));
      connectedClients.get(item.socket).roomId = roomId;

      sendWs(item.socket, {
        type: 'match_found',
        roomId,
        isCaller: true,
        isVirtualPeer: true,
        peer: bestPartner,
        matchScore: bestScore,
        sharedInterests: commonInts
      });
    }
  }
}

setInterval(processMatchmaking, 1000);

// ==========================================
// HTTP SERVER & STATIC FILES
// ==========================================
const server = http.createServer((req, res) => {
  // CORS Headers for API
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    return res.end();
  }

  let reqPath = req.url.split('?')[0];

  // REST API: PRESENCE & MATCHMAKING FALLBACK
  if (reqPath === '/api/presence') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({
      onlineCount: connectedClients.size + VIRTUAL_ONLINE_PARTNERS.length + 140,
      activeRooms: activeRooms.size,
      onlinePartners: VIRTUAL_ONLINE_PARTNERS
    }));
  }

  if (reqPath === '/') reqPath = '/index.html';
  
  const filePath = path.join(__dirname, reqPath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`<h1>404 Not Found: ${reqPath}</h1>`);
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

// ==========================================
// HTTP UPGRADE -> WEBSOCKET PROTOCOL HANDLER
// ==========================================
server.on('upgrade', (req, socket, head) => {
  const reqUrl = req.url.split('?')[0];
  if (reqUrl !== '/ws' && reqUrl !== '/') {
    socket.destroy();
    return;
  }

  const key = req.headers['sec-websocket-key'];
  if (!key) {
    socket.destroy();
    return;
  }

  const GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
  const acceptKey = crypto.createHash('sha1').update(key + GUID).digest('base64');

  const headers = [
    'HTTP/1.1 101 Switching Protocols',
    'Upgrade: websocket',
    'Connection: Upgrade',
    `Sec-WebSocket-Accept: ${acceptKey}`
  ];

  socket.write(headers.join('\r\n') + '\r\n\r\n');

  // Register client
  const clientId = `client_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
  connectedClients.set(socket, { id: clientId, user: null, roomId: null });

  sendWs(socket, { type: 'connected', clientId });
  broadcastPresence();

  let buffer = Buffer.alloc(0);

  socket.on('data', chunk => {
    buffer = Buffer.concat([buffer, chunk]);

    while (buffer.length >= 2) {
      const byte1 = buffer[0];
      const byte2 = buffer[1];
      const opcode = byte1 & 0x0f;
      const isMasked = (byte2 & 0x80) !== 0;
      let payloadLen = byte2 & 0x7f;
      let offset = 2;

      // Handle Ping
      if (opcode === 0x9) {
        socket.write(Buffer.from([0x8a, 0x00])); // Pong
        buffer = buffer.slice(2);
        continue;
      }

      // Handle Close
      if (opcode === 0x8) {
        socket.end();
        return;
      }

      if (payloadLen === 126) {
        if (buffer.length < 4) return;
        payloadLen = buffer.readUInt16BE(2);
        offset = 4;
      } else if (payloadLen === 127) {
        if (buffer.length < 10) return;
        payloadLen = Number(buffer.readBigUInt64BE(2));
        offset = 10;
      }

      const maskLength = isMasked ? 4 : 0;
      const totalFrameLen = offset + maskLength + payloadLen;
      if (buffer.length < totalFrameLen) return;

      const maskKey = isMasked ? buffer.slice(offset, offset + 4) : null;
      offset += maskLength;
      const payload = buffer.slice(offset, offset + payloadLen);

      if (isMasked && maskKey) {
        for (let i = 0; i < payload.length; i++) {
          payload[i] ^= maskKey[i % 4];
        }
      }

      buffer = buffer.slice(totalFrameLen);

      // Parse JSON message
      try {
        const msg = JSON.parse(payload.toString('utf-8'));
        handleClientMessage(socket, msg);
      } catch (err) {}
    }
  });

  socket.on('close', () => {
    cleanupClient(socket);
  });

  socket.on('error', () => {
    cleanupClient(socket);
  });
});

function cleanupClient(socket) {
  const client = connectedClients.get(socket);
  if (client) {
    // Remove from queue
    const qIdx = matchmakingQueue.findIndex(item => item.socket === socket);
    if (qIdx !== -1) matchmakingQueue.splice(qIdx, 1);

    // Leave room
    if (client.roomId && activeRooms.has(client.roomId)) {
      const room = activeRooms.get(client.roomId);
      room.delete(socket);
      room.forEach(peerSocket => {
        sendWs(peerSocket, { type: 'peer_left', peerId: client.id });
      });
      if (room.size === 0) activeRooms.delete(client.roomId);
    }
  }

  connectedClients.delete(socket);
  broadcastPresence();
}

function handleClientMessage(socket, msg) {
  const client = connectedClients.get(socket);
  if (!client) return;

  switch (msg.type) {
    case 'register_user': {
      client.user = msg.user;
      sendWs(socket, { type: 'user_registered', user: msg.user });
      broadcastPresence();
      break;
    }

    case 'join_matchmaking': {
      client.user = msg.user || client.user || {
        id: client.id,
        name: 'Learner',
        level: 'B1',
        interests: ['Travel', 'Music'],
        country: 'Global'
      };

      // Ensure not already in queue
      if (!matchmakingQueue.some(item => item.socket === socket)) {
        matchmakingQueue.push({
          socket,
          user: client.user,
          joinedAt: Date.now()
        });
        sendWs(socket, { type: 'queue_joined', queueSize: matchmakingQueue.length });
      }
      break;
    }

    case 'leave_matchmaking': {
      const idx = matchmakingQueue.findIndex(item => item.socket === socket);
      if (idx !== -1) {
        matchmakingQueue.splice(idx, 1);
        sendWs(socket, { type: 'queue_left' });
      }
      break;
    }

    // WebRTC Signaling: relay offer/answer/candidate to room peer
    case 'signal': {
      const roomId = msg.roomId || client.roomId;
      if (roomId && activeRooms.has(roomId)) {
        const room = activeRooms.get(roomId);
        room.forEach(peerSocket => {
          if (peerSocket !== socket) {
            sendWs(peerSocket, {
              type: 'signal',
              roomId,
              senderId: client.id,
              signal: msg.signal
            });
          }
        });
      }
      break;
    }

    case 'chat_message': {
      const roomId = msg.roomId || client.roomId;
      if (roomId && activeRooms.has(roomId)) {
        const room = activeRooms.get(roomId);
        room.forEach(peerSocket => {
          sendWs(peerSocket, {
            type: 'chat_message',
            sender: msg.sender || client.user?.name || 'Partner',
            text: msg.text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          });
        });
      }
      break;
    }

    case 'end_call': {
      const roomId = msg.roomId || client.roomId;
      if (roomId && activeRooms.has(roomId)) {
        const room = activeRooms.get(roomId);
        room.forEach(peerSocket => {
          sendWs(peerSocket, { type: 'call_ended', summary: msg.summary });
        });
        activeRooms.delete(roomId);
      }
      client.roomId = null;
      break;
    }
  }
}

server.listen(PORT, () => {
  console.log(`English Booster Real-Time Server active at http://localhost:${PORT}`);
  console.log(`WebSocket Signaling active at ws://localhost:${PORT}/ws`);
});
