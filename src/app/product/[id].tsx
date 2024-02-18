import { Image, Text, View } from "react-native"
import { useLocalSearchParams } from "expo-router"
import { Feather } from "@expo/vector-icons"
import { Button } from "@/components/button"
import { LinkButton } from "@/components/link-button"
import { PRODUCTS } from "@/utils/data/products"
import { formatCurrency } from "@/utils/functions/format-currency"

export default function Product(){
  const { id } = useLocalSearchParams()

  const product = PRODUCTS.filter((item) => item.id === id)[0]

  return (
    <View className="flex-1">
      <Image source={product.cover} className="w-full h-52" resizeMode="cover" />
      <View className="p-5 mt-8 flex-1">
      <Text className="text-2xl font-heading my-2 text-lime-400">{formatCurrency(product.price)}</Text>
      <Text className="font-body text-base leading-6 mb-6 text-slate-400">{product.description}</Text>
      {
        product.ingredients.map((ingredient) => (
          <Text key={ingredient} className="font-body text-base leading-8 text-slate-300"> {"\u2022"} {ingredient}</Text>
        ))
      }
      </View>

      <View className="p-5 pb-8 gap-5">
        <Button>
          <Button.Icon><Feather name="plus-circle" size={20} /></Button.Icon>
          <Button.Text>Adicionar ao pedidos</Button.Text>
        </Button>
        <LinkButton title="Voltar ao cardápio" href="/" />
      </View>
    </View>
  )
} 