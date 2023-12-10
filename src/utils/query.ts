// types
import type { LookupServer } from '../types/whois.types'
// vendors
import net from 'node:net'

/** perform a query and delegate event handlers */
export const query = async (
  socket: net.Socket,
  domain: string,
  server: LookupServer
): Promise<string> =>
  new Promise((resolve, reject) => {
    const prefix = server.prefix ?? ''
    const suffix = server.suffix ?? ''
    const message = [prefix, domain, suffix].join(' ').trim()

    let buffer = ''
    socket.write(`${message}\r\n`)
    socket.once('close', () => resolve(buffer))
    socket.on('data', (data: string) => (buffer += data))
    socket.once('timeout', () => {
      // Avoid ECONNRESET while reading after timeout
      socket.destroy()
      reject(new Error('query: timeout exceeded'))
    })
    socket.once('error', reject)
  })
