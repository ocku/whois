// types
import type { LookupServer } from '../types/whois.types';
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

    let output = new Uint8Array();
    const decoder = new TextDecoder(server.encoding);

    socket.write(`${message}\r\n`);
    socket.once('close', () => resolve(decoder.decode(output)));
    socket.on(
      'data',
      (data) => (output = Buffer.concat([output, Buffer.from(data)]))
    );
    socket.once('timeout', () => {
      // prevent ECONNRESET while reading after timeout
      socket.destroy();
      reject(new Error('query: timeout exceeded'));
    });
    socket.once('error', reject);
  });
