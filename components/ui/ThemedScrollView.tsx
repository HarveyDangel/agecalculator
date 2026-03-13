import { useThemeColor } from "@/hooks/useThemeColors";
import { ScrollView, ScrollViewProps, StyleSheet } from "react-native";

export type ThemedScrollViewProps = ScrollViewProps & {
   lightColor?: string;
   darkColor?: string;
};

export function ThemedScrollView({
   lightColor,
   darkColor,
   style,
   ...otherProps
}: ThemedScrollViewProps) {
   const backgroundColor = useThemeColor(
      { light: lightColor, dark: darkColor },
      'background'
   );

   return (
      <ScrollView contentContainerStyle={[ styles.container, { backgroundColor }, style]}
         {...otherProps}
      />
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
   },
});
