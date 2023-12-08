// types
import { SocksClientOptions } from 'socks'

export const socksClientOptionsMock = {
  command: 'connect',
  destination: {
    host: '1.1.1.1',
    port: 43
  },
  proxy: {
    host: '1.1.1.1',
    port: 8000,
    type: 5
  }
} as SocksClientOptions
