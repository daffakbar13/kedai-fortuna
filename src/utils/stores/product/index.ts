import { create } from 'zustand'
import { ProductStates } from './types/states'
import { ProductActions } from './types/actions'

const useProductStore = create<ProductActions & ProductStates>()(() => ({}))

export default useProductStore
