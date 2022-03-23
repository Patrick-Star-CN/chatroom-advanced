const koa = require('koa');
const http = require('http');
const serve = require('koa-static');
const path = require('path');
const socketIO = require('socket.io');

const hostname = '127.0.0.1';
const post = 8080;
const publicPath = path.join(__dirname, 'public');

const app = new koa();
const server = http.createServer(app.callback());
const io = socketIO(server);
const userAll = new Map();
const roomAll = new Map();
//const historyAll = new Map();

// 与客户端初次握手
io.use((socket, next) => {
  const { name } = socket.handshake.query;
  if(!name) {
    return next(new Error('EMPTY_NAME_ERROR'));
  } else if(userAll.get(name) != undefined) {
    return next(new Error('SAME_NAME_ERROR'));
  }
  next();
})

io.on('connection', socket => {
  // 向客户端广播在线列表
  const name = socket.handshake.query.name;
  userAll.set(name, socket);
  console.log(`${name} connected`);
  io.sockets.emit('online', [...userAll.keys()]);

  // 加入房间
  socket.on('joinRoom', (name, roomid, fn) => {
    let msg;
    if(roomAll.get(roomid) != undefined) {
      msg = 'success';
      socket.join(roomid);
      roomAll.get(roomid).push(name);
    } else {
      msg = 'fail';
    }
    fn(msg);
    io.sockets.to(roomid).emit('onlineGroup', [...roomAll.get(roomid).keys()]);
  });

  // 离开房间
  socket.on("leaveRoom", (name, roomid,fn) => {
    let msg;
    if(roomAll.get(roomid) != undefined) {
      msg = 'success';
      socket.leave(roomid);
      roomAll.get(roomid).map((val, i) => {
        if(val == name) {
          roomAll.get(roomid).splice(i, 1);
        }
      });
    } else {
      msg = 'fail';
    }
    fn(msg);
  });

  // 接收到客户端的消息后向其他客户端广播
  socket.on('sendMessage', content => {
    console.log('receive a message', name, content, roomid);
    const message = {
      time: Date.now(),
      sender: name,
      roomid,
      content
    };

    /*if(historyAll.get(roomid) != undefined) {
      var history = historyAll.get(roomid);
      history.push(message);
    } else {
      const history = [];
      history.push(message);
      historyAll.set(roomid, history);
    }*/

    socket.broadcast.to(roomid).emit('receiveMessage', message);
  });

  // 获取历史消息
  /*socket.on('getHistory', (roomid, fn) => {
    fn(history);
  });*/

  // 添加群组
  socket.on('addGroup', (roomid, fn) => {
    let msg;
    if(roomAll.get(roomid) == undefined) {
      msg = 'success';
      roomAll.set(roomid, []);
    } else {
      msg = 'fail';
    }
    fn(msg);
  });

  // 获取群组列表


  // 用户离线时给其他用户广播在线列表
  socket.on('disconnect', socket => {
    userAll.delete(name, socket);
    console.log(`${name} disconnected`);
    io.sockets.emit('online', [...userAll.keys()]);
  });
});

app.use(serve(publicPath));

server.listen(post, hostname, () => {
  console.log(`server running at http://${hostname}:${post}`);
});
