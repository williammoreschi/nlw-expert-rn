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