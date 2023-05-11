import { useQuery } from 'react-query'
import { queryClient } from '@fortuna/providers/ReactQueryProvider'
import useQueryKeyStore from '@fortuna/utils/stores/queryKey'
import { QueryKeyStates } from '@fortuna/utils/stores/queryKey/types/states'

type KeyofQKey = keyof QueryKeyStates
type QFn<K extends KeyofQKey> = Exclude<QueryKeyStates[K]['queryFn'], undefined>
type QFnResult<K extends KeyofQKey> = Awaited<ReturnType<QFn<K>>>

export default function useFortunaQuery<K extends KeyofQKey>(key: K) {
  const q = useQueryKeyStore()
  return useQuery<QFnResult<K>>(q[key].queryKey)
}

useFortunaQuery.getData = <K extends KeyofQKey>(key: K) => {
  const q = useQueryKeyStore.getState()
  return queryClient.getQueryData<QFnResult<K>>(q[key].queryKey)
}
