// types
import type { LookupServer } from '../types/whois.types';
// utils
import { guardSocket } from './guardSocket';
// libs
import net from 'node:net';

/** perform a query and delegate event handlers */
export const query = async (
  socket: net.Socket,
  domain: string,
  server: LookupServer
): Promise<string> =>
  new Promise((resolve, reject) => {
    const prefix = server.prefix ?? '';
    const suffix = server.suffix ?? '';
    const message = [prefix, domain, suffix].join(' ').trim();
    const decoder = new TextDecoder(server.encoding);
    let output = new Uint8Array();

    guardSocket(socket, reject);
    socket.write(`${message}\r\n`);

    socket.on(
      'data',
      (data) => (output = Buffer.concat([output, Buffer.from(data)]))
    );

    socket.once('end', () => {
      socket.removeAllListeners();
      resolve(decoder.decode(output));
    });
  });
