import React from "react";
import { View, Image, Text } from "react-native";
import StepForm from "@/components/Forms/StepForm";
import { useRouter } from "expo-router";
import { useSession } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import useRequests from "@/hooks/useRequests";
import { IFactionType } from "@/types/models";
import { Step } from "@/types/components/Forms";

const Character = () => {
	const router = useRouter();
	const { session, user } = useSession();
	const { sendRequest } = useRequests();
	const showToast = useToast();

	const [factions, setFactions] = React.useState<IFactionType[]>([]);

	React.useEffect(() => {
		sendRequest<IFactionType[]>({ endpoint: "/factions", method: "GET", headers: { authorization: `Bearer ${session}` }, }).then((data) => {
			data.map((faction) => {
				setFactions((prev) => [
					...prev,
					faction
				]);
			});
		});
	}, [user]);

	const stepsConfig: Step[] = [
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
		{
			type: "dropdown",
			name: "faction",
			label: "Character Faction",
			required: true,
			options: factions.map((faction) => ({
				name: faction.name,
				value: faction._id,
			})),
		}
	];

	const handleFormComplete = async (formData: {
		name: string;
		description: string;
		profession: string;
		faction?: string;
	}) => {
		await sendRequest({
			endpoint: "/characters",
			method: "POST",
			data: formData,
			headers: { authorization: `Bearer ${session}` },
		});
		showToast("Character created successfully", "success", 3000);

		router.push("/main");
	};

	return (
		<View className="flex-1 bg-[#333333]">
			<View className="flex-1 justify-center items-center">
				<Image
					style={{ flex: 1, width: "100%", height: "100%" }}
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
