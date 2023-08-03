import { Window as KeplrWindow } from '@keplr-wallet/types'

declare global {
  interface Window extends KeplrWindow {
    cosmostation: any
    leap: any
    wallet: any
    getOfflineSignerAuto: any
  }
}
