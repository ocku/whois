# @ocku/whois ![npm](https://img.shields.io/npm/v/%40ocku%2Fwhois)

A low overhead asynchronous whois client for Node.js.

![npm](https://img.shields.io/npm/dw/%40ocku%2Fwhois)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/%40ocku%2Fwhois)

## Usage

This library provides a simple interface consisting of a single asynchronous function. It can be used like this:

> [!IMPORTANT]  
> The `lookup` function always returns a string.

```js
// format: lookup(domain, options?)
import { lookup } from '@ocku/whois'
// or
const { lookup } = require('@ocku/whois')
```

```js
// Query an ipv4 address
console.log(await lookup('1.1.1.1')) // ...

// Query an ipv6 address
console.log(await lookup('2606:4700:4700::1001')) // ...

// Query a domain
console.log(await lookup('lost.st')) // ...

// Query a domain with punycode
console.log(await lookup('lost.xn--tckwe')) // ...

// Query a tld
console.log(await lookup('de')) // ...
```

### Configuration

Additionally, the behavior of the function can be customized with the optional `options` parameter, which has the following structure:

```ts
type LookupOptions = {
  follow?: number // the maximum number of servers to follow.

  // type LookupServer
  server?: {
    // an optional server to use instead of choosing one automatically.
    host: string // the host to connect to (add the port below, not here!)
    port?: number // [default: 43] - this can be omitted most times.

    // when a whois message is sent, the (prefix, domain, and suffix) are joined by spaces.
    // this means that there's no need for trailing or leading spaces on {prefix} or {suffix}.
    prefix?: string // [default: ''] - a string to send before the domain (eg: '-T dn,ace' or 'n').
    suffix?: string // [default: ''] - a string to send after the domain (uncommon, but here just in case).
  }
  timeout?: number // a timeout in milliseconds.
  encoding?: BufferEncoding // [default: 'utf-8'] - the encoding for the socket to use.

  // allows you to make the request through a SOCKS proxy.
  // when present, socksClientOptions is directly passed to SocksClient.createConnection(1).
  // see https://www.npmjs.com/package/socks#quick-start-example
  socksClientOptions?: SocksClientOptions
}
```

It can be used like this:

```js
const options = { timeout: 10000 }
const res = await lookup('lost.st', options)
console.log(res) // ...
```

## Punycode

Punycode domain lookups are supported, but to keep overhead low, special Unicode characters are not automatically transcoded to LDH.

For clarity:

```js
const { toASCII } = require('punycode/')
// this is good
await lookup('nic.xn--tckwe') // works
await lookup(toASCII('nic.コム')) // works
// this is bad
await lookup('nic.コム') // goes through IANA, returns "No match"
```

## Requirements

This library requires node 20.10.0 (LTS) to work.

## Reference

- this project was inspired by [rfc1036/whois](https://github.com/rfc1036/whois) and [FurqanSoftware/node-whois](https://github.com/FurqanSoftware/node-whois).
- it also uses the referral pattern from https://github.com/FurqanSoftware/node-whois/blob/master/index.coffee#L95
