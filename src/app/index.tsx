import { useState } from "react";
import { View, FlatList } from "react-native";

import { CATEGORIES } from "@/utils/data/products"
import { Header } from "@/components/header";
import { CategoryButton } from "@/components/category-button";

export default function Home(){
  const [category,setCategory] = useState(CATEGORIES[0])

  function handleCategorySelect(selectedCategory: string){
    setCategory(selectedCategory)
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

  </View>    
  )
}