// utils
import { chooseServer } from '../chooseServer';
// constants
import { ARIN_HOST, IANA_HOST, SPECIAL_HOSTS } from '../../constants/servers';
// testing
import { describe, it } from 'node:test';
import assert from 'node:assert';
// libs
import servers from '@ocku/whois-servers';

describe('utils / chooseServer', () => {
  it('should return ARIN if the server is an IPv4 address', () => {
    assert(chooseServer('1.1.1.1').host === ARIN_HOST);
  });

  it('should return ARIN if the server is an IPv4 address', () => {
    assert(chooseServer('::1').host === ARIN_HOST);
  });

  it('should return a host with special params if the host is special', () => {
    assert(
      chooseServer('google.de').prefix ===
        SPECIAL_HOSTS['whois.denic.de'].prefix
    );
  });

  it('should return IANA if the domain has no subdomains', () => {
    assert(chooseServer('local').host === IANA_HOST);
  });

  it('should default to IANA if no servers are found for the domain', () => {
    assert(chooseServer('test.local').host === IANA_HOST);
  });

  it('should return the right server if found', () => {
    assert(chooseServer('test.de').host === servers.de);
  });
});
