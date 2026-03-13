import { View, ViewProps, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColors";

export type ThemedViewProps = ViewProps & {
	lightColor?: string;
	darkColor?: string;
};

export function ThemedView({
	lightColor,
	darkColor,
	style,
	...otherProps
}: ThemedViewProps) {
	const backgroundColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		"background"
	);

	return (
		<View style={[ styles.container, { backgroundColor }, style]}
			{...otherProps}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
});
