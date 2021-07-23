const PORT_SERVER = 3000;
const PORT_CLIENT = 3001;

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origins: [`http://localhost:${PORT_CLIENT}`],
  },
});

app.get('/', (req, res) => {
  res.send('<h1>Hey Socket io</h1>');
});

io.on('connection', (socket) => {
  let token = socket.handshake.auth.token;
  console.log(token);
  console.log('user connected');

  socket.on('disconnect', () => {
    console.log('user desconnected');
  });

  socket.on('FirstMessage', (msg) => {
    io.emit('Callback', `server: ${msg}`);
  });

  socket.on('chatMessage', (msg) => {
    io.emit('chatMessage', msg);
  });
});

http.listen(PORT_SERVER, () => {
  console.log(`Server listening on port: ${PORT_SERVER}`);
});
