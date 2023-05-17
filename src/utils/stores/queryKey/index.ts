import { create } from 'zustand'
import { getProduct } from '@fortuna/services/product'
import { getCategory } from '@fortuna/services/category'
import { getHistory } from '@fortuna/services/history'
import { QueryKeyActions } from './types/actions'
import { QueryKeyStates } from './types/states'

const useQueryKeyStore = create<QueryKeyActions & QueryKeyStates>()(() => ({
  productList: {
    queryKey: ['Product List'],
    queryFn: () => getProduct(),
    enabled: false,
  },
  categoryList: {
    queryKey: ['Category List'],
    queryFn: () => getCategory(),
    enabled: false,
  },
  historyList: {
    queryKey: ['History List'],
    queryFn: () => getHistory(),
    enabled: false,
  },
}))

export default useQueryKeyStore
