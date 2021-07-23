import { io } from 'socket.io-client';
const REACT_APP_SOCKET_ENDPOINT = 'http://localhost:3000';

let socket;

export const initiateSocketConnection = () => {
  socket = io.connect(REACT_APP_SOCKET_ENDPOINT, {
    auth: {
      token: 'Bear auth',
    },
  });
  console.log('Connecting socket');
};

export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if (socket) socket.disconnect();
};

export const subscribeToList = (cb) => {
  if (!socket) return true;
  socket.on('chatMessage', (item) => {
    console.log('Websocket item received!');
    return cb(null, item);
  });
};

export const sendItem = (item) => {
  if (socket) socket.emit('chatMessage', item);
};
