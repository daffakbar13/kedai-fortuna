import { Categories } from '@fortuna/services/category/types'
import { Histories } from '@fortuna/services/history/types'
import { Products } from '@fortuna/services/product/types'
import { UseQueryOptions } from 'react-query'

export type QueryKeyStates = {
  productList: UseQueryOptions<Products[]> & { queryKey: string[] }
  categoryList: UseQueryOptions<Categories[]> & { queryKey: string[] }
  historyList: UseQueryOptions<Histories[]> & { queryKey: string[] }
}
