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
		"background"
	);

	return (
		<ScrollView
         style= {{ width: "100%" }}
			contentContainerStyle={[styles.container, { backgroundColor }, style]}
			{...otherProps}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
		flexGrow: 1,
	},
});
