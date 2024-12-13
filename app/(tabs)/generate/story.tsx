import React from "react";
import { View, Image, Text } from "react-native";
import StepForm from "@/components/Forms/StepForm";
import { useRouter } from "expo-router";
import useRequests from "@/hooks/useRequests";
import { useSession } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import { IWorldType } from "@/types/models/index";



const Story = () => {
	const router = useRouter();
	const { session, user } = useSession();
	const { sendRequest } = useRequests();
	const showToast = useToast();

	const [worlds, setWorlds] = React.useState<IWorldType[]>([]);

	const getUserWorlds = async () => {
		console.log("session", session);
		console.log("user", user);
		if (!user) return;
		console.log("user", user);
		const res: IWorldType[] = await sendRequest({
			endpoint: `/worlds/owner/${user?._id}`,
			method: "GET",
			headers: { authorization: `Bearer ${session}` },
		});
		let worlds: IWorldType[] = res.map((world: IWorldType) => {
			return { name: world.name, _id: world._id };
		});
		setWorlds(worlds);
	};

	const handleFormComplete = async (formData) => {
		console.log(formData);
		let story = await sendRequest({
			endpoint: `/generate/${formData.world}`,
			data: formData,
			headers: { authorization: `Bearer ${session}` },
		});
		console.log(story);
	};

	React.useEffect(() => {
		getUserWorlds();
	}, [user]);

	const stepsConfig = [
		{
			type: "dropdown",
			name: "world",
			label: "World",
			placeholder: "Select a world",
			required: true,
			options: worlds,
		},
	];

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
					Generate a Story from a World
				</Text>
			</View>

			<View className="flex-1 items-center">
				<StepForm steps={stepsConfig} onComplete={handleFormComplete} />
			</View>
		</View>
	);
};

export default Story;
