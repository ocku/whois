// utils
import { lookupInternal } from '../lookupInternal'
import * as queryUtil from '../query'
import * as connectUtil from '../connect'
// constants
import { DEFAULT_SRV_PORT } from '../../constants/defaults'
// mocks
import { domainMock } from '../../__mocks__/domain.mock'
import { serverMock } from '../../__mocks__/server.mock'
import { socksClientOptionsMock } from '../../__mocks__/socks.mock'
// testing
import { describe, it } from 'node:test'
import assert from 'node:assert'
// vendors
import { SocksClient } from 'socks'
import net from 'node:net'

describe('utils / lookupInternal', () => {
  it('should attempt to create a socks connection if socksClientOptions are passed', async (t) => {
    const mockCreateConnection = t.mock.method(
      SocksClient,
      'createConnection',
      () => ({
        socket: new net.Socket()
      })
    )

    t.mock.method(queryUtil, 'query', () => '')

    await lookupInternal(domainMock, {
      server: serverMock,
      socksClientOptions: socksClientOptionsMock
    })

    assert(mockCreateConnection.mock.calls.length > 0)
  })

  it('should attempt to create a regular connection if socksClientOptions are missing', async (t) => {
    const mockConnect = t.mock.method(
      connectUtil,
      'connect',
      () => new net.Socket()
    )

    t.mock.method(queryUtil, 'query', () => '')

    await lookupInternal(domainMock, {
      server: serverMock
    })

    assert(mockConnect.mock.calls.length > 0)
  })

  it('should use the default port when a server port is not provided', async (t) => {
    const mockConnect = t.mock.method(
      connectUtil,
      'connect',
      () => new net.Socket()
    )

    t.mock.method(queryUtil, 'query', () => '')

    await lookupInternal(domainMock, {
      server: {
        host: serverMock.host
      }
    })

    assert(
      mockConnect.mock.calls.at(0)?.arguments.at(0)?.port === DEFAULT_SRV_PORT
    )
  })
})
