// module
import { lookup } from '../index'
// utils
import * as lookupInternalUtil from '../utils/lookupInternal'
import * as chooseServerUtil from '../utils/chooseServer'
// constants
import servers from '../constants/servers'
// testing
import { describe, it } from 'node:test'
import assert from 'node:assert'

describe('whois', () => {
  it('should attempt to choose a server if none are provided', async (t) => {
    t.mock.method(lookupInternalUtil, 'lookupInternal', () => '')
    const mockChooseServer = t.mock.method(chooseServerUtil, 'chooseServer')
    await lookup('1.1.1.1')
    assert(mockChooseServer.mock.calls.length > 0)
  })

  it('should fail if the follow limit is exceeded', async (t) => {
    t.mock.method(
      lookupInternalUtil,
      'lookupInternal',
      () => 'refer: whois.nic.google'
    )

    const res = await lookup('nice.day').catch(() => '__error__')
    assert(res === '__error__')
  })

  it('should attempt to find the followed server in {servers}', async (t) => {
    const mockLookupInternal = t.mock.method(
      lookupInternalUtil,
      'lookupInternal',
      () => 'refer: whois.nic.de',
      { times: 2 }
    )

    await lookup('ja.de')

    assert(
      mockLookupInternal.mock.calls.at(1)?.arguments[1]?.server ===
        servers['DE']
    )
  })
})
