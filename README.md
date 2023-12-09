# @ocku/whois

A tiny whois client for Node.js inspired by [rfc1036/whois](https://github.com/rfc1036/whois) and [FurqanSoftware/node-whois](https://github.com/FurqanSoftware/node-whois).

## Usage

This library provides a simple interface consisting of a single asynchronous function. It can be used like this:

> [!IMPORTANT]  
> The `lookup` function always returns a string.

```js
// format: lookup(domain, options)
import { lookup } from '@ocku/whois'

// Query an ipv4 address
console.log(await lookup('1.1.1.1')) // ...

// Query an ipv6 address
console.log(await lookup('2606:4700:4700::1001')) // ...

// Query a domain
console.log(await lookup('lost.st')) // ...

// Query a tld
console.log(await lookup('de')) // ...
```

### Configuration

Additionally, the behavior of the function can be customized with the optional `options` parameter, which has the following structure:

```ts
type _ = {
  follow?: number // The maximum number of servers to follow
  server?: LookupServer // An optional server to use instead of choosing one automatically
  timeout?: number // A timeout in milliseconds
  encoding?: BufferEncoding // The encoding the response will be stringified to
  socksClientOptions?: SocksClientOptions // Allows you to make the request through a SOCKS proxy. see https://www.npmjs.com/package/socks
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
