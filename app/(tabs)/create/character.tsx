import React, { useState } from "react";
import { View, Button, Image, Text } from "react-native";
import StepForm from "@/components/Forms/StepForm";
import { useRouter } from "expo-router";
import { useSession } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import useRequests from "@/hooks/useRequests";

const Character = () => {
	const router = useRouter();
	const { session, user } = useSession();
	const { loading, error, sendRequest } = useRequests();
	const showToast = useToast();

	const [factions, setFactions] = React.useState([]);

	React.useEffect(() => {
		sendRequest({ endpoint: "/factions", method: "POST" }).then((res) => {
			res.map((faction) => {
				setFactions((prev) => [
					...prev,
					{ name: faction.name, value: faction._id },
				]);
			});
		});
	}, [user]);

	const stepsConfig = [
		{
			type: "text",
			name: "name",
			label: "Character Name",
			placeholder: "Enter character name",
			required: true,
		},
		{
			type: "textarea",
			name: "description",
			label: "Character Description",
			placeholder: "Describe your character",
			required: true,
		},
		{
			type: "text",
			name: "profession",
			label: "Character Profession",
			placeholder: "Enter character profession",
			required: true,
		},
		...(factions.length > 0
			? [
					{
						type: "dropdown",
						name: "faction",
						label: "Character Faction",
						required: true,
						options: factions,
					},
			  ]
			: []),
	];

	const handleFormComplete = async (formData) => {
		await sendRequest({
			endpoint: "/characters",
			method: "POST",
			data: formData,
			headers: { authorization: `Bearer ${session}` },
		});
		showToast("Character created successfully","success", 3000);

		router.push("/main");
	};

	return (
		<View className="flex-1 bg-[#333333]">
			<View className="flex-1 justify-center items-center">
				<Image
					style={{ width: "100%", height: "55%" }}
					source={require("@/assets/images/create_character_full.png")}
					resizeMode="cover"
				/>
				<Image
					className="self-center"
					source={require("@/assets/images/LF_Trans.png")}
					style={{ width: 80, height: 122 }}
				/>
				<Text className="text-white text-xl font-bold mb-4">
					Create a Character
				</Text>
			</View>
			<View className="flex-1 items-center">
				<StepForm steps={stepsConfig} onComplete={handleFormComplete} />
			</View>
		</View>
	);
};

export default Character;
