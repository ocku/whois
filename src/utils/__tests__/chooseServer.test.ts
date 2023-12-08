// utils
import { chooseServer } from '../chooseServer'
// constants
import servers from '../../constants/servers'
// testing
import { describe, it } from 'node:test'
import assert from 'node:assert'

describe('utils / chooseServer', () => {
  it('should return ARIN if the server is an IPv4 address', () => {
    assert(chooseServer('1.1.1.1') === servers['_ARIN'])
  })

  it('should return ARIN if the server is an IPv4 address', () => {
    assert(chooseServer('::1') === servers['_ARIN'])
  })

  it('should default to IANA if no servers are found for the domain', () => {
    assert(chooseServer('test.local') === servers['_IANA'])
  })

  it('should return the right server if found', () => {
    assert(chooseServer('test.de') === servers['DE'])
  })
})
