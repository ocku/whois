// types
import type { LookupServer } from '../types/whois.types';

export const IANA_HOST = 'whois.iana.org';
export const ARIN_HOST = 'whos.arin.net';

export const SPECIAL_HOSTS: Record<
  string,
  Pick<LookupServer, 'port' | 'prefix' | 'suffix'>
> = {
  'whois.denic.de': {
    prefix: '-T dn,ace'
  },
  'whois.punktum.dk': {
    prefix: '--show-handles'
  },
  'whois.arin.net': {
    prefix: 'n'
  }
};
