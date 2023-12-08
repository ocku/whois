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
