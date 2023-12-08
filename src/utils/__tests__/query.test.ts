// utils
import { query } from '../query'
// mocks
import { domainMock } from '../../__mocks__/domain.mock'
import { serverMock } from '../../__mocks__/server.mock'
// testing
import { describe, it } from 'node:test'
import assert from 'node:assert'
// vendors
import net from 'node:net'

describe('utils / query', () => {
  it('should throw an error when the socket times out', async (t) => {
    const socket = new net.Socket()

    t.mock.method(socket, 'write', () =>
      setTimeout(() => {
        socket.emit('timeout')
      }, 100)
    )

    const res = await query(socket as net.Socket, domainMock, serverMock).catch(
      () => '__timeout__'
    )

    assert(res === '__timeout__')
  })

  it('should throw an error when the socket errors', async (t) => {
    const socket = new net.Socket()

    t.mock.method(socket, 'write', () =>
      setTimeout(() => {
        socket.emit('error', new Error())
      }, 100)
    )

    const res = await query(socket as net.Socket, domainMock, serverMock).catch(
      () => '__error__'
    )
    assert(res === '__error__')
  })

  it('should throw an error when the socket times out', async (t) => {
    const socket = new net.Socket()

    t.mock.method(socket, 'write', () =>
      setTimeout(() => {
        socket.emit('timeout')
      }, 100)
    )

    const res = await query(socket as net.Socket, domainMock, serverMock).catch(
      () => '__timeout__'
    )
    assert(res === '__timeout__')
  })

  it('should resolve on close with the complete buffer received', async (t) => {
    const socket = new net.Socket()

    t.mock.method(socket, 'write', () =>
      setTimeout(() => {
        ;['1', '2', '3'].map((s) => socket.emit('data', s))
        socket.emit('close')
      }, 100)
    )

    const res = await query(socket as net.Socket, domainMock, serverMock)

    assert(res === '123')
  })

  it('should send a server-specific query', async (t) => {
    const socket = new net.Socket()

    const mockWrite = t.mock.method(socket, 'write', () =>
      setTimeout(() => {
        socket.emit('close')
      }, 100)
    )

    await query(socket as net.Socket, domainMock, serverMock)

    assert(
      mockWrite.mock.calls.at(0)?.arguments[0] ===
        `${serverMock.prefix} ${domainMock} ${serverMock.suffix}\r\n`
    )
  })
})
