import { Products } from '@fortuna/services/product/types'
import { UseQueryOptions } from 'react-query'

export type QueryKeyStates = {
  productList: UseQueryOptions<Products[]> & { queryKey: string[] }
}
