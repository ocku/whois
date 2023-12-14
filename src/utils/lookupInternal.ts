// types
import type { LookupOptions } from '../types/whois.types';
// utils
import { connect } from './connect';
import { query } from './query';
// constants
import { DEFAULT_SRV_PORT } from '../constants/defaults';
// libs
import { SocksClient } from 'socks';

/** perform a single lookup and return its response */
export const lookupInternal = async (
  domain: string,
  options: Pick<LookupOptions, 'timeout' | 'server' | 'socksClientOptions'>
): Promise<string> => {
  const { timeout, server, socksClientOptions } = options;

  const destination = {
    host: server.host,
    port: server.port ?? DEFAULT_SRV_PORT
  };

  const socket = socksClientOptions
    ? (
        await SocksClient.createConnection({
          timeout,
          ...socksClientOptions,
          destination
        })
      ).socket
    : await connect({ timeout, ...destination });

  return query(socket, domain, server);
};
