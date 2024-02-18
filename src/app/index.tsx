import { useState, useRef } from "react"
import { View, FlatList, SectionList, Text } from "react-native"
import { Link } from "expo-router"

import { Header } from "@/components/header"
import { CategoryButton } from "@/components/category-button"
import { Product } from "@/components/product"
import { CATEGORIES, MENU, } from "@/utils/data/products"

export default function Home(){
  const [category,setCategory] = useState(CATEGORIES[0])
  const sectionListRef = useRef<SectionList>(null)

  function handleCategorySelect(selectedCategory: string){
    setCategory(selectedCategory)

    const sectionIndex = CATEGORIES.findIndex((category) => category === selectedCategory);

    if(sectionListRef.current){
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex: sectionIndex,
        itemIndex: 0
      })
    }
  }
  return (
  <View className="flex-1 pt-8">
    <Header title="Cardápio" cardQuantityItems={5} />

    <FlatList 
      data={CATEGORIES}
      keyExtractor={(item) => item}   
      renderItem={({ item }) => (
        <CategoryButton 
        title={item} 
        onPress={() => handleCategorySelect(item)} 
        isSelected={category === item}
        />
      )} 
      horizontal
      className="max-h-10 mt-5"
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{gap: 12, paddingHorizontal: 20}}
    />
    <SectionList 
      sections={MENU}
      keyExtractor={(item) => item.id}
      stickySectionHeadersEnabled={false}
      renderItem={({item})=>(
        <Link href={`/product/${item.id}`} asChild >
          <Product  data={item}  />
        </Link>
      )}
      renderSectionHeader={({section: {title}}) => (
        <Text className="text-white text-xl font-heading mt-8 mb-3" >{title}</Text>
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100 }}
      ref={sectionListRef}
      className="flex-1 p-5"
    />
  </View>    
  )
}