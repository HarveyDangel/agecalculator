import { Stack } from "expo-router";

import DateTimePicker, {
	DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

import { calculateAge } from "@/utils/calculateAge";

import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { ThemedCard } from "@/components/ui/ThemedCard";
import { ThemedScrollView } from "@/components/ui/ThemedScrollView";
import { ThemedText } from "@/components/ui/ThemedText";

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
		<>
			<Stack.Screen options={{ title: "Age Calculator" }} />
			<ThemedScrollView>
				{/* <ThemedText style={styles.title}>Age Calculator</ThemedText> */}

				<ThemedCard>
					<ThemedText style={styles.dateText}>{date.toDateString()}</ThemedText>

					{/* Date Button */}
					{Platform.OS !== "web" && (
						<PrimaryButton
							onPress={() => {
								if (Platform.OS !== "web") {
									setShowPicker(true);
								}
							}}
							title="Select Birthdate"
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

					<View style={styles.modeSwitch}>
						<Pressable
							style={[
								styles.modeButton,
								mode === "years" && styles.modeButtonActive,
							]}
							onPress={() => setMode("years")}
						>
							<Text style={styles.primaryButtonText}>By Years</Text>
						</Pressable>

						<Pressable
							style={[
								styles.modeButton,
								mode === "months" && styles.modeButtonActive,
							]}
							onPress={() => setMode("months")}
						>
							<Text style={styles.primaryButtonText}>By Months</Text>
						</Pressable>
					</View>

					{/* Calculate Button */}
					<PrimaryButton onPress={handleCalculateAge} title="Calculate Age" />

					{/* Result */}
					{age !== null && (
						<View style={styles.resultBox}>
							<ThemedText style={styles.resultTitle}>Your Age</ThemedText>

							<ThemedText style={styles.resultText}>
								{age} {mode === "years" ? "Years Old" : "Months Old"}
							</ThemedText>
						</View>
					)}
				</ThemedCard>
			</ThemedScrollView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		fontSize: 26,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 20,
	},
	dateText: {
		textAlign: "center",
		fontSize: 30,
		fontWeight: "500",
		marginTop: 20,
		marginBottom: 50,
		// color: "#555",
	},
	primaryButton: {
		backgroundColor: "#4f46e5",
		paddingVertical: 14,
		borderRadius: 12,
		marginTop: 15,
	},
	primaryButtonText: {
		color: "#fff",
		textAlign: "center",
		fontWeight: "600",
		fontSize: 16,
	},
	secondaryButton: {
		backgroundColor: "#e5e7eb",
		paddingVertical: 12,
		borderRadius: 12,
	},
	secondaryButtonText: {
		textAlign: "center",
		fontWeight: "500",
		fontSize: 15,
	},
	resultBox: {
		marginTop: 25,
		// backgroundColor: "#eef2ff",
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
	modeSwitch: {
		flexDirection: "row",
		marginTop: 20,
		marginBottom: 10,
		backgroundColor: "#757575",
		borderRadius: 10,
	},

	modeButton: {
		flex: 1,
		paddingVertical: 10,
		alignItems: "center",
		borderRadius: 10,
	},

	modeButtonActive: {
		backgroundColor: "#4f46e5",
	},

	modeText: {
		fontWeight: "600",
	},
});
