// var express = require('express');
// const path = require('path');
// const cors = require('cors');
// const router = require('./Routes/routes');
// const WebSocket = require('ws'); // Import the WebSocket library

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use("/api", router);

// // Initialize WebSocket server
// const wss = new WebSocket.Server({ noServer: true });

// // WebSocket server logic
// wss.on('connection', function connection(ws) {
//   console.log('WebSocket client connected');

//   ws.on('message', function incoming(message) {
//     console.log('received: %s', message);
//   });

//   ws.on('close', function close() {
//     console.log('WebSocket client disconnected');
//   });
// });

// // HTTP server creation
// const PORT = process.env.PORT || 4000;
// const server = app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// // Upgrade HTTP server to handle WebSocket requests
// server.on('upgrade', function upgrade(request, socket, head) {
//   wss.handleUpgrade(request, socket, head, function done(ws) {
//     wss.emit('connection', ws, request);
//   });
// });

// var express = require('express');
// const path = require('path');
// const cors = require('cors');
// const router = require('./Routes/routes');
// const bodyParser = require('body-parser');
// const socketIO = require('socket.io');
// const http = require('http')
// // const { swaggerDocs } = require('./Routes/swagger');
// var app = express();
// let server = http.createServer(app);
// // Web SOcket
// var io = socketIO(server);
 
// // make connection with user from server side
// io.on('connection',
//     (socket) => {
//         console.log('New user connected');
//         //emit message from server to user
//         socket.emit('newMessage',
//             {
//                 from: 'jen@mds',
//                 text: 'hepppp',
//                 createdAt: 123
//             });
 
//         // listen for message from user
//         socket.on('createMessage',
//             (newMessage) => {
//                 console.log('newMessage', newMessage);
//             });
 
//         // when server disconnects from user
//         socket.on('disconnect',
//             () => {
//                 console.log('disconnected from user');
//             });
//     });

// app.use(cors({
//     credentials: true,
//     origin:true
// }));

// app.use(bodyParser.json());
// app.use("/", express.static(path.join(__dirname, "public")));
// app.use('/', router);
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// //   swaggerDocs(app, PORT);
// });
