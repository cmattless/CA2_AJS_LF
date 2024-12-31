import React, { useState } from "react";
import { View, Switch, StyleSheet} from "react-native";
import { Picker } from '@react-native-picker/picker';
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { StepFormProps } from "@/types/components/Forms";

const StepForm: React.FC<StepFormProps> = ({ steps, onComplete }) => {
	const [currentStep, setCurrentStep] = useState(0);
	const [formData, setFormData] = useState<Record<string, any>>({});
	const [error, setError] = useState<string | null>(null);

	const currentStepConfig = steps[currentStep];

	const handleNext = () => {
		if (currentStepConfig.required && !formData[currentStepConfig.name]) {
			setError("This field is required");
			return;
		}
		setError(null);

		if (currentStep < steps.length - 1) {
			setCurrentStep(currentStep + 1);
		} else {
			onComplete(formData);
		}
	};

	const handleBack = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	const handleChange = (value: any) => {
		setFormData((prev) => ({
			...prev,
			[currentStepConfig.name]: value,
		}));
	};

	const renderInput = () => {
		switch (currentStepConfig.type) {
			case "text":
				return (
					<>
						<Input
							style={styles.input}
							placeholder={currentStepConfig.placeholder || "Enter text"}
							value={formData[currentStepConfig.name] || ""}
							onChangeText={handleChange}
						/>
						<Text className="text-destructive">{error}</Text>
					</>
				);
			case "textarea":
				return (
					<>
						<Textarea
							style={[styles.input, { height: 100 }]}
							placeholder={currentStepConfig.placeholder || "Enter details"}
							multiline
							value={formData[currentStepConfig.name] || ""}
							onChangeText={handleChange}
						/>
						<Text className="text-destructive">{error}</Text>
					</>
				);
			case "toggle":
				return (
					<>
						<View style={styles.switchContainer}>
							<Switch
								value={!!formData[currentStepConfig.name]}
								onValueChange={(value) => handleChange(value)}
							/>
							<Text>{formData[currentStepConfig.name] ? "On" : "Off"}</Text>
						</View>
						<Text className="text-destructive">{error}</Text>
					</>
				);
			case "dropdown":
				return (
					<>
						<Picker
							selectedValue={formData[currentStepConfig.name] || "default"}
							style={styles.input}
							onValueChange={(itemValue: string) => handleChange(itemValue)}
						>
							<Picker.Item
								label={currentStepConfig.placeholder || "Select an option"}
								value="default"
							/>
							{currentStepConfig.options?.map((option) => (
								<Picker.Item
									key={option._id}
									label={option.name}
									value={option._id}
								/>
							))}
						</Picker>
						<Text className="text-destructive">{error}</Text>
					</>
				);
			default:
				return <Text>Unsupported input type</Text>;
		}
	};

	return (
		<View style={styles.container}>
			<View className="w-[100%]">
				<Text className="text-destructive-foreground uppercase font-bold text-xs">
					{currentStepConfig.label}
				</Text>
			</View>
		
			{renderInput()}
			<View
				style={{
					flexDirection: "row",
					gap: 4,
					justifyContent: "space-between",
					width: "100%",
				}}
			>
				{steps.length > 1 && currentStep > 0 && (
					<Button
						className="w-1/3 border border-slate-500"
						variant={"ghost"}
						size={"lg"}
						onPress={handleBack}
						disabled={currentStep === 0}
					>
						<Text className="text-center font-bold text-white">Back</Text>
					</Button>
				)}

				<Button
					disabled={currentStepConfig.loading}
					className="flex-1"
					variant={"default"}
					size={"lg"}
					onPress={handleNext}
				>
					<Text  className="text-center font-bold text-white">
						{currentStep === steps.length - 1 ? "Finish" : "Next"}
					</Text>
				</Button>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	title: {
		
		fontSize: 18,
		marginBottom: 20,
	},
	input: {
		width: "100%",
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		padding: 10,
		marginBottom: 20,
	},
	switchContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
	},
});

export default StepForm;
