import { fortunaService } from '..'
import { Histories } from './types'

export const getHistory = () => fortunaService().get<null, Histories[]>('history/list')
