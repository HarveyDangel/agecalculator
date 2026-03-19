import { Stack } from "expo-router";

import DateTimePicker, {
	DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import {
	Platform,
	StyleSheet,
	Text,
	View,
	StatusBar,
	ScrollView,
} from "react-native";

import { calculateAge } from "@/utils/calculateAge";

import { ThemedView } from "@/components/ui/ThemedView";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { ThemedCard } from "@/components/ui/ThemedCard";
import { ThemedScrollView } from "@/components/ui/ThemedScrollView";
import { ThemedText } from "@/components/ui/ThemedText";
import CustomSwitch from "@/components/ui/CustomSwitch";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
	const [date, setDate] = useState<Date>(new Date());
	const [showPicker, setShowPicker] = useState(false);
	const [mode, setMode] = useState<"years" | "months">("years");
	const [age, setAge] = useState<number | null>(null);

	useEffect(() => {
		if (age !== null) {
			setAge(calculateAge(date, mode));
		}
	}, [mode]);

	const handleCalculateAge = () => {
		const calculatedAge = calculateAge(date, mode);
		setAge(calculatedAge);
	};

	const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
		setShowPicker(false);
		if (selectedDate) setDate(selectedDate);
	};

	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.container} edges={["top"]}>
				<ThemedScrollView>
					<View
						style={{
							marginTop: 30,
							marginBottom: 10,
							width: "90%",
							maxWidth: 400,
							alignItems: "center",
						}}
					>
						<CustomSwitch
							value={mode}
							onChange={setMode}
							options={[
								{ label: "By Years", value: "years" },
								{ label: "By Months", value: "months" },
							]}
						/>
					</View>

					<View>
						<ThemedText style={styles.dateText}>{date.toDateString()}</ThemedText>
					</View>

					<ThemedCard style={styles.addCardStyle}>
						{/* Result */}
						{age !== null && (
							<View style={styles.resultBox}>
								<ThemedText style={styles.resultTitle}>Your Age</ThemedText>

								<ThemedText style={styles.resultText}>
									{age} {mode === "years" ? "Years Old" : "Months Old"}
								</ThemedText>
							</View>
						)}
						{/* Date Button */}
						{Platform.OS !== "web" && (
							<PrimaryButton
								onPress={() => {
									if (Platform.OS !== "web") {
										setShowPicker(true);
									}
								}}
								title="Select Birthdate"
								style={{ marginBottom: 20 }}
							></PrimaryButton>
						)}

						{/* Web Picker */}
						{Platform.OS === "web" && (
							<View>
								<ThemedText
									style={{ marginBottom: 6, fontSize: 14, fontWeight: "400" }}
								>
									Select Date of Birth
								</ThemedText>

								<input
									type="date"
									value={date.toISOString().split("T")[0]}
									max={new Date().toISOString().split("T")[0]}
									onChange={(e) => {
										if (!e.target.value) return;
										const selected = new Date(e.target.value + "T00:00:00");
										setDate(selected);
									}}
									style={{
										padding: 8,
										fontSize: 16,
										borderRadius: 6,
										border: "1px solid #ccc",
										marginBottom: 10,
									}}
								/>
							</View>
						)}

						{/* Mobile Picker */}
						{Platform.OS !== "web" && showPicker && (
							<DateTimePicker
								value={date}
								mode="date"
								display="default"
								maximumDate={new Date()}
								onChange={onChange}
							/>
						)}

						{/* Calculate Button */}
						<PrimaryButton onPress={handleCalculateAge} title="Calculate Age" />
					</ThemedCard>
				</ThemedScrollView>
			</SafeAreaView>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		paddingTop: StatusBar.currentHeight || 0,
		width: "100%",
	},
	dateText: {
		textAlign: "center",
		fontSize: 32,
		fontWeight: "300",
		marginTop: 20,
		marginBottom: 50,
	},
	addCardStyle: {
		paddingBottom: 60,
		shadowOffset: { width: 0, height: -1 },
	},
	resultBox: {
		marginVertical: 25,
		padding: 15,
		borderRadius: 15,
		alignItems: "center",
	},
	resultTitle: {
		fontWeight: "500",
		fontSize: 16,
		marginBottom: 8,
	},
	resultText: {
		fontSize: 24,
		fontWeight: "bold",
		marginVertical: 2,
	},
});
