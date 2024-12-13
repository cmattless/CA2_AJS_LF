import React, { useState } from "react";
import { View, Button, Image, Text } from "react-native";
import StepForm from "@/components/Forms/StepForm";
import { useRouter } from "expo-router";
import useRequests from "@/hooks/useRequests";
import { useSession } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";

const World = () => {
	const router = useRouter();
	const { session } = useSession();
	const { loading, error, sendRequest } = useRequests();
	const showToast = useToast();

	const stepsConfig = [
		{
			type: "text",
			name: "name",
			label: "World Name",
			placeholder: "Enter world name",
			required: true,
		},
		{
			type: "textarea",
			name: "description",
			label: "World Description",
			placeholder: "Describe your world",
			required: true,
		},
		{
			type: "text",
			name: "year",
			label: "World Year",
			placeholder: "Enter world year",
			required: true,
		},
	];

	const handleFormComplete = async (formData) => {
		formData["year"] = parseInt(formData["year"]);
		console.log(`Bearer ${session}`);
		await sendRequest({
			endpoint: "/worlds",
			method: "POST",
			data: formData,
			headers: { authorization: `Bearer ${session}` },
		});
		showToast("World created successfully", "success", 3000);
		router.push("/main");
	};

	return (
		<View className="flex-1 bg-[#333333]">
			<View className="flex-1 justify-center items-center">
				<Image
					style={{ width: "100%", height: "55%" }}
					source={require("@/assets/images/create_world_full.png")}
					resizeMode="cover"
				/>
				<Image
					className="self-center"
					source={require("@/assets/images/LF_Trans.png")}
					style={{ width: 80, height: 122 }}
				/>
				<Text className="text-white text-xl font-bold mb-4">
					Create a World
				</Text>
			</View>
			<View className="flex-1 items-center">
				<StepForm steps={stepsConfig} onComplete={handleFormComplete} />
			</View>
		</View>
	);
};

export default World;
