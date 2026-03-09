import { useThemeColor } from "@/hooks/use-theme-color";
import React, { ReactNode } from "react";
import { View, ViewProps, StyleSheet } from "react-native";

export type ThemedCardProps = ViewProps & {
	children: ReactNode;
	// style?: object;
	lightColor?: string;
	darkColor?: string;
};

export function ThemedCard({
	children,
	style,
	lightColor,
	darkColor,
	...otherProps
}: ThemedCardProps) {
	const backgroundColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		"card"
	);

	return (
		<View style={[{ backgroundColor }, style, styles.card]} {...otherProps}>
			{children}
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		width: "100%",
		maxWidth: 400,
		borderRadius: 20,
		padding: 25,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowRadius: 10,
		elevation: 5,
	},
});
