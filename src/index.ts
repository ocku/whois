// types
import type { LookupOptions } from './types/whois.types';
// utils
import { lookupInternal } from './utils/lookupInternal';
import { chooseServer } from './utils/chooseServer';
import { isValidRef } from './utils/isValidRef';
// constants
import { SPECIAL_HOSTS } from './constants/servers';
import { REFERRAL_PATTERN } from './constants/regex';
import { MAX_FOLLOW } from './constants/defaults';

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
  let server = options.server ?? chooseServer(domain);

  const follow = options.follow ?? MAX_FOLLOW;

  for (let i = 0, res = ''; i < follow; i++) {
    res = await lookupInternal(domain, { server, ...options });

    const referral = res.match(REFERRAL_PATTERN)?.at(3);

    if (!referral || referral === server.host || !isValidRef(referral)) {
      return res;
    }

    server = { host: referral };

    if (referral in SPECIAL_HOSTS) {
      server = {
        ...server,
        ...SPECIAL_HOSTS[referral]
      };
    }
  }

  throw new Error('lookup: follow limit exceeded');
};
