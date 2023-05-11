import { queryClient } from '@fortuna/providers/ReactQueryProvider'
import useQueryKeyStore from '@fortuna/utils/stores/queryKey'
import { QueryKeyStates } from '@fortuna/utils/stores/queryKey/types/states'
import _ from 'lodash'
import React from 'react'

export default function useIsFetching(...queryKeys: (keyof QueryKeyStates)[]) {
  const q = useQueryKeyStore()
  const [fetchingCount, setFetchingCount] = React.useState(0)
  function getIsFetching() {
    const queries = queryKeys.map((e) => queryClient.isFetching(q[e].queryKey))
    return _.sum(queries)
  }

  React.useEffect(() => {
    const interval = setInterval(() => {
      setFetchingCount((f) => {
        const isFetchings = getIsFetching()
        if (f !== isFetchings) {
          return isFetchings
        }
        return f
      })
    })

    return () => clearInterval(interval)
  })

  return fetchingCount > 0
}
