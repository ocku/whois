// types
import type { LookupOptions } from './types/whois.types'
// utils
import { lookupInternal } from './utils/lookupInternal'
import { chooseServer } from './utils/chooseServer'
// constants
import { REFERRAL_PATTERN } from './constants/regex'
import { MAX_FOLLOW } from './constants/defaults'
import servers from './constants/servers'
import { isValidRef } from './utils/isValidRef'

/**
 * Perform a whois lookup on {domain}
 * @param domain - a domain or ip address.
 * @param options - options to modify the package's behavior.
 * @returns a raw whois response.
 */
export const lookup = async (
  domain: string,
  options: Partial<LookupOptions> = {}
) => {
  let server = options.server ?? chooseServer(domain)

  const follow = options.follow ?? MAX_FOLLOW

  for (let i = 0, res = ''; i < follow; i++) {
    res = await lookupInternal(domain, { server, ...options })

    const referral = res.match(REFERRAL_PATTERN)?.at(3)

    if (!referral || referral === server.host || !isValidRef(referral)) {
      return res
    }

    const ourServer = Object.values(servers).find(
      (server) => server.host === referral
    )

    if (ourServer) {
      server = ourServer
    } else {
      server.host = referral
    }
  }

  throw new Error('lookup: follow limit exceeded')
}
