import type { SocksClientOptions } from 'socks';

export type LookupServer = {
  host: string;
  port?: number;
  prefix?: string;
  suffix?: string;
  encoding?: string;
};

export type LookupOptions = {
  follow: number;
  server: LookupServer;
  timeout?: number;
  socksClientOptions?: SocksClientOptions;
};
