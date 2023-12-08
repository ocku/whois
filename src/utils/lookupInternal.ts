// types
import type { LookupOptions } from '../types/whois.types'
// utils
import { connect } from './connect'
import { query } from './query'
// constants
import { DEFAULT_SRV_PORT } from '../constants/defaults'
// vendors
import { SocksClient } from 'socks'

export const lookupInternal = async (
  domain: string,
  options: Pick<
    LookupOptions,
    'timeout' | 'server' | 'encoding' | 'socksClientOptions'
  >
): Promise<string> => {
  const { timeout, server, encoding, socksClientOptions } = options

  const destination = {
    host: server.host,
    port: server.port ?? DEFAULT_SRV_PORT
  }

  const socket = socksClientOptions
    ? (
        await SocksClient.createConnection({
          timeout,
          ...socksClientOptions,
          destination
        })
      ).socket
    : await connect({ timeout, ...destination })

  return query(socket, domain, server, encoding)
}
