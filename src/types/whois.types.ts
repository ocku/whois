import { SocksClientOptions } from 'socks'

export type LookupServer = {
  host: string
  port?: number
  prefix?: string
  suffix?: string
}

export type LookupOptions = {
  follow: number
  server: LookupServer
  timeout?: number
  encoding?: BufferEncoding
  socksClientOptions?: SocksClientOptions
}
