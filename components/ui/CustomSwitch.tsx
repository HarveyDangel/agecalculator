import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  Animated,
  LayoutChangeEvent,
} from "react-native";

type Option<T> = {
  label: string;
  value: T;
};

type CustomSwitchProps<T> = {
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
  style?: any;
};

export default function CustomSwitch<T extends string | number>({
  value,
  options,
  onChange,
  style,
}: CustomSwitchProps<T>) {
  const translateX = useRef(new Animated.Value(0)).current;
  const [width, setWidth] = useState(0);

  const activeIndex = options.findIndex((o) => o.value === value);
  const buttonWidth = width / options.length;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: activeIndex * buttonWidth,
      useNativeDriver: true,
      friction: 8,
      tension: 80,
    }).start();
  }, [activeIndex, buttonWidth]);

  const onLayout = (e: LayoutChangeEvent) => {
    setWidth(e.nativeEvent.layout.width);
  };

  return (
    <View style={[styles.container, style]} onLayout={onLayout}>
      {/* Sliding Indicator */}
      <Animated.View
        style={[
          styles.slider,
          {
            width: buttonWidth,
            transform: [{ translateX }],
          },
        ]}
      />

      {options.map((option) => {
        const active = option.value === value;

        return (
          <Pressable
            key={String(option.value)}
            style={styles.button}
            onPress={() => onChange(option.value)}
          >
            <Text style={[styles.text, active && styles.activeText]}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#c5c5c5",
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
    width: "100%",
    maxWidth: 400,
  },
  slider: {
    position: "absolute",
    height: "100%",
    backgroundColor: "#4f46e5",
    borderRadius: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    zIndex: 1,
  },
  text: {
    color: "#464646",
    fontWeight: "500",
  },
  activeText: {
    color: "#fff",
  },
});