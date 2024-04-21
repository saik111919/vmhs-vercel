const WebSocket = require('ws');

// Initialize WebSocket server
const wss = new WebSocket.Server({ noServer: true });

// WebSocket server logic
wss.on('connection', function connection(ws) {
  console.log('WebSocket client connected');

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.on('close', function close() {
    console.log('WebSocket client disconnected');
  });
});

// Function to broadcast message to WebSocket clients
function broadcastMessage(message) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

module.exports = {
  wss,
  broadcastMessage
};
