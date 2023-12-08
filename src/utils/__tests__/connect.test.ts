// utils
import { connect } from '../connect'
// testing
import { describe, it } from 'node:test'
import assert from 'node:assert'
// vendors
import { EventEmitter } from 'node:stream'
import net, { NetConnectOpts } from 'node:net'

describe('utils / connect', () => {
  it('should throw an error when the socket times out', async (t) => {
    const mockConnect = t.mock.method(net, 'connect')

    mockConnect.mock.mockImplementation(() => {
      const emitter = new EventEmitter()
      setTimeout(() => emitter.emit('timeout'), 300)
      return emitter
    })

    const res = await connect({ host: '1.1.1.1', port: 80 }).catch(
      () => '__timeout__'
    )

    assert(res === '__timeout__')
  })

  it('should throw an error when the socket errors', async (t) => {
    const mockConnect = t.mock.method(net, 'connect')

    mockConnect.mock.mockImplementation(() => {
      const socket = new net.Socket()
      setTimeout(() => socket.emit('error', new Error()), 300)
      return socket
    })

    const res = await connect({ host: '1.1.1.1', port: 80 }).catch(
      () => '__error__'
    )

    assert(res === '__error__')
  })

  it('should resolve when the socket connects', async (t) => {
    const mockConnect = t.mock.method(net, 'connect')
    const socket = new net.Socket()

    mockConnect.mock.mockImplementation(
      (_opts: NetConnectOpts, cb: () => void) => {
        setTimeout(() => {
          cb()
        }, 100)
        return socket
      }
    )

    const res = await connect({ host: '1.1.1.1', port: 80 })

    assert(res === socket)
  })
})
