import { useThemeColor } from "@/hooks/useThemeColors";
import { Pressable, StyleSheet, Text } from "react-native";


export type PrimaryButtonProps = {
   onPress: () => void;
   title: string;
   lightColor?: string;
   darkColor?: string;
   style?: any;
}

export function PrimaryButton({ onPress, title, lightColor, darkColor, style, ...otherProps }: PrimaryButtonProps) {
   const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'primary');
   return (
      <Pressable style={[ styles.button, { backgroundColor }, style ]} {...otherProps} onPress={onPress}>
         <Text style= {styles.text}>{title}</Text>
      </Pressable>
   );
}

const styles = StyleSheet.create({
   text: {
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
      color: '#fff',
   },
   button: {
      paddingVertical: 14,
      borderRadius: 12,
      marginTop: 12,
   }
})
