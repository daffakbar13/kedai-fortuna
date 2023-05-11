import { useQueries } from 'react-query'
import useQueryKeyStore from '@fortuna/utils/stores/queryKey'
import React from 'react'

export default function Queries() {
  const q = useQueryKeyStore()
  useQueries([q.productList])

  return <></>
}
