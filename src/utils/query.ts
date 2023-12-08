// types
import type { LookupServer } from '../types/whois.types'
// vendors
import net from 'node:net'

/** perform a query and delegate event handlers */
export const query = async (
  socket: net.Socket,
  domain: string,
  server: LookupServer,
  encoding?: BufferEncoding
): Promise<string> =>
  new Promise((resolve, reject) => {
    let buf = Buffer.from('', encoding)

    const message = [server.prefix ?? '', domain, server.suffix ?? '']
      .join(' ')
      .trim()

    socket.write(`${message}\r\n`)
    socket.on('data', (data: Buffer) => (buf = Buffer.concat([buf, data])))
    socket.once('close', () => resolve(buf.toString(encoding)))
    socket.once('timeout', () => reject(new Error('query: timeout exceeded')))
    socket.once('error', reject)
  })
