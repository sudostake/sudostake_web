import { ChainInfo } from '@keplr-wallet/types'
import { useQuery } from '@tanstack/react-query'

const chainInfoQueryKey = '@chain-info'

export const useChainInfo = () => {
  const { data, isLoading } = useQuery<ChainInfo>({
    queryKey: [chainInfoQueryKey], queryFn: async () => {
      const response = await fetch(process.env.NEXT_PUBLIC_CHAIN_INFO_URL as string)
      return await response.json()
    }, onError(e) {
      console.error('Error loading chain info:', e)
    },
  })
  
  return [data, isLoading] as const
}



