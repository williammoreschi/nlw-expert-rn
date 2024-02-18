import { ReactNode } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type ButtonProps = TouchableOpacityProps & {
  children: ReactNode
}
type ButtonTextProps = {
  children: ReactNode
}
type ButtonIconProps = {
  children: ReactNode
}

function Button({ children, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity className="h-12 rounded-md items-center justify-center flex-row bg-lime-400" {...rest} activeOpacity={0.7}>
      {children}
    </TouchableOpacity>
  )
}


function ButtonText({ children }: ButtonTextProps) {
  return <Text className="font-heading text-base mx-2 text-black">{children}</Text>
}

function ButtonIcon({ children }: ButtonIconProps) {
  return children
}

Button.Text = ButtonText
Button.Icon = ButtonIcon

export { Button }