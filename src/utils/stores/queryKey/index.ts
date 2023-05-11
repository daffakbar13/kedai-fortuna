import { create } from 'zustand'
import { getProduct } from '@fortuna/services/product'
import { QueryKeyActions } from './types/actions'
import { QueryKeyStates } from './types/states'

const useQueryKeyStore = create<QueryKeyActions & QueryKeyStates>()(() => ({
  productList: {
    queryKey: ['Product List'],
    queryFn: () => getProduct(),
    enabled: false,
  },
}))

export default useQueryKeyStore
