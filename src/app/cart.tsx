import { Text, View, ScrollView, Alert, Linking } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { Feather } from "@expo/vector-icons"
import { useNavigation } from "expo-router"

import { useCartStore } from "@/stores/cart-store";

import { Header } from "@/components/header";
import { Product } from "@/components/product";
import { formatCurrency } from "@/utils/functions/format-currency";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { LinkButton } from "@/components/link-button";
import { ProductProps } from "@/utils/data/products";
import { useState } from "react";

const PHONE_NUMBER = "" // colocar o número do telefone que vai receber o pedido

export default function Cart() {
  const cartStore = useCartStore()
  const [address,setAddress] = useState("")
  const navigation = useNavigation()

  const total = formatCurrency(cartStore.products.reduce((total, product) => total + product.price * product.quantity, 0));

  function handleProductRemove(product: ProductProps) {
    Alert.alert("Remover", `Deseja remove ${product.title} do carrinho`, [
      {
        text: "Cancelar"
      },
      {
        text: "Remover",
        onPress: () => cartStore.remove(product.id)
      }
    ]);
  }

  function handleOrder(){
    if(address.trim().length === 0){
      return Alert.alert("Pedido", "Informe os dados da entrega")
    }

    if(PHONE_NUMBER === ""){
      return Alert.alert("Pedido", "Pedido não pode ser enviado. A variável PHONE_NUMBER não foi preenchida.")
    }

    const products = cartStore.products.map(product => {
      return `\n ${product.quantity} ${product.title}`
    }).join("");

    const message = `
    🍔NOVO PEDIDO 
    \n Entregar em: ${address} 
    ${products}
    \n Valor Total: ${total}
    `

    Linking.openURL(`https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`)
    cartStore.clear()
    navigation.goBack() 
  }

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
                      <Product data={product} key={product.id} onPress={() => handleProductRemove(product)} />
                    ))
                  }
                </View>
                <View className="flex-row gap-2 items-center mt-5 mb-4" >
                  <Text className="text-xl font-subtitle text-white">Total</Text>
                  <Text className="text-xl font-heading text-lime-400">{total}</Text>
                </View>
                <Input 
                placeholder="Informe o endereço de entrega com rua, número, bairro e complemento"
                blurOnSubmit={true}
                onSubmitEditing={handleOrder}
                onChangeText={(text)=>setAddress(text)}
                returnKeyType="next"
                />
              </ScrollView>
            </View>
          </KeyboardAwareScrollView>
          <View className="p-5 gap-5">
            <Button onPress={handleOrder}>
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