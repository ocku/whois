// libs
import net from 'node:net';

const cleanup = (socket: net.Socket) => {
  socket.removeAllListeners();
  socket.destroy();
};

export const guardSocket = (
  socket: net.Socket,
  reject: (reason: Error) => void
) => {
  socket.once('timeout', () => {
    cleanup(socket);
    reject(new Error('connect: timeout exceeded'));
  });

  socket.once('error', (error) => {
    cleanup(socket);
    reject(error);
  });
};
