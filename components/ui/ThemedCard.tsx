import { View, StyleSheet, type ViewProps } from "react-native";
import { useThemeColor } from "../../hooks/useThemeColors";

export type ThemedCardProps = ViewProps & {
   lightColor?: string;
   darkColor?: string;
}

export function ThemedCard({ lightColor, darkColor, style, ...otherProps }: ThemedCardProps) {
   const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "card");

   return (
      <View style={[ styles.card, { backgroundColor }, style]} {...otherProps}/>
   );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 20,
    width: "100%",
    maxWidth: 400,
    elevation: 5,
  },
});