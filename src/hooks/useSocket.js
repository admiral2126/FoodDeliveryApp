import { io } from 'socket.io-client';

export const useSocket = () => {

  const protocol = 'wss';
  const env = 'rem';
  // const host = 'api.morris-armstrong-ii-dev.ru';
  // const host = 'api.3dmadcat.com';
  // const host = 'api-dev-morris-armstrong-ii.in.ngrok.io';
  // const host = '192.168.100.5:20123';
  const host = 'api.wxwdelivery.com';

  const sock = io.connect(`${protocol}://${host}`, {
    path: `/socket/${env}/io/`,
    extraHeaders: { env }, // optional
    reconnection: true,
    reconnectionAttempts: Infinity,
    autoConnect: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    randomizationFactor: 0.5,
    timeout: 20000,
  });

  const connect = token => {
    sock.on('connect', () => {
      sock.emit('authenticate-client', { token });
    });
  };

  const authClient = () =>
    sock.on('authenticate-client', event => console.log('socket ---->', event));

  const getCourierPosition = () =>
    sock.on('live-position-of-courier-updated', event => event);

  const setCourierPosition = value => {
    sock.emit('live-position-of-courier-updated', value);
  };

  return {
    sock,
    connect,
    authClient,
    getCourierPosition,
    setCourierPosition,
  };
};
