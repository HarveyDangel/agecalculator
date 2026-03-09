import { StyleSheet, Button, type ButtonProps } from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";

export type ThemedButtonProps = ButtonProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "primary" | "secondary";
};

export function ThemedButton({
  title,
  color,
  lightColor,
  darkColor,
  type = "default",
  ...props
}: ThemedButtonProps) {
  const themedColor = useThemeColor( {light:lightColor, dark:darkColor}, 'background');

  return (
    <Button
      title={title}
      color={themedColor}
      {...props}
    />
  );
}