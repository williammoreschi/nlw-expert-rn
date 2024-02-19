import { TextInput, TextInputProps } from "react-native"
import colors from "tailwindcss/colors"


type InputProps = TextInputProps & {

}

export function Input({...rest}:InputProps){
  return (
    <TextInput 
    {...rest} 
    multiline={true}  
    textAlignVertical="top" 
    placeholderTextColor={colors.slate[400]}
    className="h-32 rounded-md p-3 text-sm font-body text-white bg-slate-800"
    />
  )
}