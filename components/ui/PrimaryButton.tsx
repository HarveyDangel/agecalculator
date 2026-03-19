import { useThemeColor } from "@/hooks/useThemeColors";
import React, { useRef } from "react";
import { Pressable, Animated, StyleSheet, Text } from "react-native";

export type PrimaryButtonProps = {
  onPress: () => void;
  title: string;
  lightColor?: string;
  darkColor?: string;
  style?: any;
};

export function PrimaryButton({
  onPress,
  title,
  lightColor,
  darkColor,
  style,
  ...otherProps
}: PrimaryButtonProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "primary"
  );

  // Animated scale value
  const scale = useRef(new Animated.Value(1)).current;

  // Press in: shrink
  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
      friction: 3,
      tension: 40,
    }).start();
  };

  // Press out: bounce back
  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      friction: 3,
      tension: 40,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      {...otherProps}
    >
      <Animated.View style={[styles.button, { backgroundColor, transform: [{ scale }] }, style]}>
        <Text style={styles.text}>{title}</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    color: "#fff",
  },
  button: {
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 12,
  },
});