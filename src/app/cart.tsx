import { Text, View, ScrollView, Alert } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { Feather } from "@expo/vector-icons"

import { useCartStore } from "@/stores/cart-store";

import { Header } from "@/components/header";
import { Product } from "@/components/product";
import { formatCurrency } from "@/utils/functions/format-currency";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { LinkButton } from "@/components/link-button";
import { ProductProps } from "@/utils/data/products";

export default function Cart() {
  const cartStore = useCartStore()

  const total = formatCurrency(cartStore.products.reduce((total, product) => total + product.price * product.quantity, 0));



  return (
    <View className="flex-1 pt-8">
      <Header title="Seu Carrinho" />
      {cartStore.products.length > 0 ? (
        <>
          <KeyboardAwareScrollView>
            <View className="flex-1 p-5">
              <ScrollView>
                <View className="border-b border-slate-700 pb-5">
                  {
                    cartStore.products.map((product) => (
                      <Product data={product} key={product.id}  />
                    ))
                  }
                </View>
                <View className="flex-row gap-2 items-center mt-5 mb-4" >
                  <Text className="text-xl font-subtitle text-white">Total</Text>
                  <Text className="text-xl font-heading text-lime-400">{total}</Text>
                </View>
                <Input placeholder="Informe o endereço de entrega com rua, número, bairro e complemento" />
              </ScrollView>
            </View>
          </KeyboardAwareScrollView>
          <View className="p-5 gap-5">
            <Button>
              <Button.Text>Enviar Pedido</Button.Text>
              <Button.Icon><Feather name="arrow-right-circle" size={20} /></Button.Icon>
            </Button>

            <LinkButton title="Voltar ao cardápio" href="/" />
          </View>
        </>
      ) : (
        <View className="p-5 gap-5">
          <Text className="font-body text-center  text-slate-400">Seu carrinho está vazio.</Text>
          <LinkButton title="Voltar ao cardápio" href="/" />
        </View>
      )}

    </View>
  )
}