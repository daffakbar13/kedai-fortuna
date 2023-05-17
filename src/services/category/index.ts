import { fortunaService } from '..'
import { Categories } from './types'

export const getCategory = () => fortunaService().get<null, Categories[]>('category/list')
