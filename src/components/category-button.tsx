import { Text, Pressable, PressableProps } from "react-native"
import {clsx} from "clsx"

type CategoryButtonProps =  PressableProps &{
  title: string
  isSelected?: boolean
}
export function CategoryButton ({title, isSelected = false, ...rest}: CategoryButtonProps) {
  return (
    <Pressable 
      {...rest}  
      className={clsx("bg-slate-800 px-4 justify-center rounded-md h-10 border-2 border-transparent", isSelected && "border-lime-200")} 
      >
      <Text className="text-slate-100 font-subtitle text-sm">{title}</Text>
    </Pressable>
  )
}