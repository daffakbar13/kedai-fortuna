import { Products } from '../product/types'

export interface Histories {
  readonly date: string
  readonly products: Array<Omit<Products, 'stock'> & { quantity: number }>
}
