const Koa = require('koa');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = new Koa();
const httpServer = createServer(app.callback());
const io = new Server(httpServer, { cors: true });
const userAll = new Map();
const roomAll = new Map();

io.use((socket, next) => {
  const { name } = socket.handshake.query;
  if (name !== undefined) console.log(name);
  next();
});

io.on('connection', function (socket) {
  console.log('user connected');
  socket.on('disconnect', function (socket) {
    console.log(socket);
  });

  socket.on('login', (name) => {
    console.log(name + ' has logined.');
    io.sockets.emit('online', 'good');
  });

  socket.on('sendMessage', (content) => {
    console.log(' send  a message :' + content);
  });
});

httpServer.listen(3000);
