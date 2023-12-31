// constants
import { SPECIAL_HOSTS, ARIN_HOST, IANA_HOST } from '../constants/servers';
// types
import type { LookupServer } from '../types/whois.types';
// libs
import servers from '@ocku/whois-servers';
import net from 'node:net';

export const chooseServer = (domain: string): LookupServer => {
  if (!domain.length) {
    throw new Error('chooseServer: invalid domain');
  }

  if (net.isIP(domain) != 0) {
    return {
      host: ARIN_HOST,
      ...SPECIAL_HOSTS[ARIN_HOST]
    };
  }

  const domainChunks = domain.split('.');
  if (domainChunks.length === 1) {
    return {
      host: IANA_HOST,
      ...SPECIAL_HOSTS[IANA_HOST]
    };
  }

  const tld = domainChunks[domainChunks.length - 1];
  if (tld in servers) {
    const host = servers[tld];
    return host in SPECIAL_HOSTS
      ? {
          ...SPECIAL_HOSTS[host],
          host
        }
      : { host };
  }

  return {
    host: IANA_HOST,
    ...SPECIAL_HOSTS[IANA_HOST]
  };
};
