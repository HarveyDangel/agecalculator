import DateTimePicker, {
	DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
	Platform,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";

import { ThemedCard } from "@/components/ui/ThemedCard";
import { ThemedText } from "@/components/ui/ThemedText";

export default function Index() {
	const [date, setDate] = useState<Date>(new Date());
	const [showPicker, setShowPicker] = useState(false);
	const [age, setAge] = useState<{
		years: number;
		months: number;
		days: number;
	} | null>(null);

	const calculateAge = () => {
		const today = new Date();

		let years = today.getFullYear() - date.getFullYear();
		let months = today.getMonth() - date.getMonth();
		let days = today.getDate() - date.getDate();

		if (days < 0) {
			months--;
			days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
		}

		if (months < 0) {
			years--;
			months += 12;
		}

		setAge({ years, months, days });
	};

	const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
		setShowPicker(false);
		if (selectedDate) setDate(selectedDate);
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<ThemedCard>
				<ThemedText
					style={styles.title}
				>
					Age Calculator
				</ThemedText>

				<ThemedText style={styles.dateText}>{date.toLocaleDateString()}</ThemedText>

				{/* Date Button */}
				<Pressable
					style={styles.secondaryButton}
					onPress={() => {
						if (Platform.OS !== "web") {
							setShowPicker(true);
						}
					}}
				>
					<Text style={styles.secondaryButtonText}>Select Birthdate</Text>
				</Pressable>

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
				<Pressable style={styles.primaryButton} onPress={calculateAge}>
					<Text style={styles.primaryButtonText}>Calculate Age</Text>
				</Pressable>

				{/* Result */}
				{age && (
					<View style={styles.resultBox}>
						<ThemedText style={styles.resultTitle}>Your Age</ThemedText>
						<ThemedText style={styles.resultText}>{age.years} Years</ThemedText>
						<ThemedText style={styles.resultText}>
							{age.months} Months
						</ThemedText>
						<ThemedText style={styles.resultText}>{age.days} Days</ThemedText>
					</View>
				)}
			</ThemedCard>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	// titleContainer: {
	//   flexDirection: 'row',
	//   gap: 8,
	// },
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
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
});
