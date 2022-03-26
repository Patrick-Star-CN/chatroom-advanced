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

io.on('connection', (socket) => {
  let nameThis = '';
  console.log('user connected');

  socket.on('disconnect', (socket) => {
    userAll.delete(name, socket);
    console.log(`${name} disconnected`);
    io.sockets.emit('online', [...userAll.keys()]);
  });

  socket.on('login', (name) => {
    if (!name) {
      io.sockets.emit('online', 'EMPTY_NAME_ERROR');
      // fn('EMPTY_NAME_ERROR');
    } else if (userAll.get(name) !== undefined) {
      io.sockets.emit('online', 'SAME_NAME_ERROR');
      // fn('SAME_NAME_ERROR');
    } else {
      console.log(name + ' has logined.');
      nameThis = name;
      userAll.set(name, socket);
      io.sockets.emit('online', [...userAll.keys()]);
      // io.sockets.emit('online', 'SUCCESS');
      // fn('success');
    }
  });

  socket.on('sendMessage', (content) => {
    console.log('receive a message', name, content);
    const message = {
      time: Date.now(),
      from: nameThis,
      content,
    };
    socket.broadcast.to(roomid).emit('receiveMessage', message);
  });
});

httpServer.listen(3000);
