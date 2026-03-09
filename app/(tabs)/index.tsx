import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Platform, Pressable, StyleSheet, Text } from "react-native";

import { ThemedCard } from "@/components/themed-card";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Fonts } from "@/constants/theme";


export default function HomeScreen() {
	const [date, setDate] = useState<Date>(new Date());
	const [show, setShow] = useState(false);
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
		setShow(false);
		if (selectedDate) setDate(selectedDate);
	};

	return (
		<ThemedView style={styles.container}>
			<ThemedCard style={styles.card}>
				<ThemedText
					type="title"
					style={{
						fontFamily: Fonts.rounded,
            paddingBottom:20,
					}}
				>
					Age Calculator
				</ThemedText>

				<ThemedText style={styles.dateText}>{date.toDateString()}</ThemedText>

				{/* Date Button */}
				<Pressable
					style={styles.secondaryButton}
					onPress={() => {
						if (Platform.OS !== "web") {
							setShow(true);
						}
					}}
				>
					<ThemedText style={styles.secondaryButtonText}>
						Select Birthdate
					</ThemedText>
				</Pressable>

				{/* Web Picker */}
				{Platform.OS === "web" && (
					<input
						type="date"
						value={date.toISOString().split("T")[0]}
						onChange={(e) => setDate(new Date(e.target.value))}
						style={{
							marginTop: 10,
							padding: 8,
							fontSize: 16,
							borderRadius: 6,
						}}
					/>
				)}

				{/* Mobile Picker */}
				{Platform.OS !== "web" && show && (
					<DateTimePicker
						value={date}
						mode="date"
						display="default"
						onChange={onChange}
					/>
				)}

				{/* Calculate Button */}
				<Pressable style={styles.primaryButton} onPress={calculateAge}>
					<Text style={styles.primaryButtonText}>Calculate Age</Text>
				</Pressable>

				{/* Result */}
				{age && (
					<ThemedView style={styles.resultBox}>
						<ThemedText style={styles.resultTitle}>Your Age</ThemedText>
						<ThemedText style={styles.resultText}>{age.years} Years</ThemedText>
						<ThemedText style={styles.resultText}>
							{age.months} Months
						</ThemedText>
						<ThemedText style={styles.resultText}>{age.days} Days</ThemedText>
					</ThemedView>
				)}
			</ThemedCard>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	// titleContainer: {
	//   flexDirection: 'row',
	//   gap: 8,
	// },
	container: {
		flex: 1,
		// backgroundColor: "#f2f4f8",
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	card: {
		width: "100%",
		maxWidth: 400,
		// backgroundColor: "#ffffff",
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
		color: "#555",
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
