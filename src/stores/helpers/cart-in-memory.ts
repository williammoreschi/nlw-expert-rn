import { ProductCartProps } from "../cart-store";
import { ProductProps } from "@/utils/data/products";

export function add(products: ProductCartProps[], newProduct: ProductProps){
  const existingProduct = products.find(product => product.id === newProduct.id)

  if(existingProduct) {
    return products.map(product => {
      if(product.id === existingProduct.id){
        return {...product, quantity: product.quantity +1}
      }
      return product
    })
  }

  return [...products,  { ... newProduct, quantity: 1}]
}

export function remove(products: ProductCartProps[], productId: string){
  
  const updateProduct = products.map(product => {
    if(product.id === productId){
      return {...product, quantity: product.quantity > 1 ? product.quantity - 1: 0}
    }
    return product
  })

  return updateProduct.filter(product => product.quantity > 0)
}