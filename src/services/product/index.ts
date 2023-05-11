import { fortunaService } from '..'
import { Products } from './types'

export const getProduct = () => fortunaService().get<null, Products[]>('product')
