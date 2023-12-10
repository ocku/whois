// vendors
import net from 'node:net'

/** connect to a remote host asynchronously. */
export const connect = (options: net.TcpNetConnectOpts): Promise<net.Socket> =>
  new Promise((resolve, reject) => {
    const socket = net.connect(options, () => {
      socket.removeAllListeners()
      resolve(socket)
    })

    socket.once('timeout', () => {
      // Avoid ECONNRESET while reading after timeout
      socket.destroy()
      reject(new Error('connect: timeout exceeded'))
    })

    socket.once('error', reject)
  })
