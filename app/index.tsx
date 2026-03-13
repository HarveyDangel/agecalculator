import DateTimePicker, {
	DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import {
	Platform,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";

import { calculateAge } from "@/utils/calculateAge";

import { ThemedScrollView } from "@/components/ui/ThemedScrollView";
import { ThemedCard } from "@/components/ui/ThemedCard";
import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";

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
		<ThemedScrollView>
			<ThemedCard>
				<ThemedText style={styles.title}>Age Calculator</ThemedText>

				<ThemedText style={styles.dateText}>{date.toDateString()}</ThemedText>

				{/* Date Button */}
				<Pressable
					style={styles.primaryButton}
					onPress={() => {
						if (Platform.OS !== "web") {
							setShowPicker(true);
						}
					}}
				>
					<Text style={styles.primaryButtonText}>Select Birthdate</Text>
				</Pressable>

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

				{/* Web Picker */}
				{Platform.OS === "web" && (
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
							marginTop: 10,
							padding: 8,
							fontSize: 16,
							borderRadius: 6,
						}}
					/>
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
				<Pressable style={styles.primaryButton} onPress={handleCalculateAge}>
					<Text style={styles.primaryButtonText}>Calculate Age</Text>
				</Pressable>

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
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	card: {
		width: "100%",
		// backgroundColor: "#fff",
		maxWidth: 400,
		borderRadius: 20,
		padding: 25,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowRadius: 10,
		elevation: 5,
	},
	title: {
		fontSize: 26,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 20,
	},
	dateText: {
		textAlign: "center",
		fontSize: 16,
		marginBottom: 15,
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
		fontWeight: "bold",
		fontSize: 18,
		marginBottom: 8,
	},
	resultText: {
		fontSize: 16,
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
