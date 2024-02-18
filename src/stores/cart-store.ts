import { create } from "zustand"
import * as cartInMemory from "@/stores/helpers/cart-in-memory"
import { ProductProps } from "@/utils/data/products"

export type ProductCartProps = ProductProps & {
  quantity: number
}

type StateProps = {
  products: ProductCartProps[]
  add: (product: ProductProps) => void
}

export const useCartStore = create<StateProps>((set) => ({
  products: [],
  add: (product: ProductProps) => set((state) => ({
    products: cartInMemory.add(state.products, product)
  }))
}))