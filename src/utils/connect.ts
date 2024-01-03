// utils
import { guardSocket } from './guardSocket';
// libs
import net from 'node:net';

/** connect to a remote host asynchronously. */
export const connect = (options: net.TcpNetConnectOpts): Promise<net.Socket> =>
  new Promise((resolve, reject) => {
    const socket = net.connect(options, () => {
      socket.removeAllListeners();
      resolve(socket);
    });

    guardSocket(socket, reject);
  });
