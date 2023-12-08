// constants
import servers from '../constants/servers'
// vendors
import net from 'node:net'

export const chooseServer = (domain: string) => {
  if (!domain.length) {
    throw new Error('chooseServer: invalid domain')
  }

  const domainParts = domain.split('.')
  const tld = domainParts.at(-1)?.toUpperCase() || ''

  switch (true) {
    case tld in servers:
      return servers[tld]

    case net.isIP(domain) != 0:
      return servers['_ARIN']

    default:
      return servers['_IANA']
  }
}
