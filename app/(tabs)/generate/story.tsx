import React from "react";
import { View, Image, Text } from "react-native";
import StepForm from "@/components/Forms/StepForm";
import { useRouter } from "expo-router";
import useRequests from "@/hooks/useRequests";
import { useSession } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import { IWorldType } from "@/types/models/index";
import { useStory } from "@/contexts/StoryContext";



const Story = () => {
	const router = useRouter();
	const { session, user } = useSession();
	const { setStory } = useStory();
	const { sendRequest } = useRequests();
	const [loading, setLoading] = React.useState(false);

	const [worlds, setWorlds] = React.useState<IWorldType[]>([]);

	const getUserWorlds = async () => {
		if (!user) return;
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

	interface IStoryForm {
		world: string;
	}

	const handleFormComplete = (formData: Record<string, any>) => {
		setLoading(true);
		sendRequest({
			endpoint: `/generate/${formData.world}`,
			data: formData,
			headers: { authorization: `Bearer ${session}` },
		}).then((res) => {
			setStory(res as string);
		}).then(() => {
			router.push("/(tabs)/generate/display");
		});
		setLoading(false);
	};

	React.useEffect(() => {
		getUserWorlds();
	}, [user,]);

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
					className="h-[20px] w-[20px] self-center brightness-50 "
					source={require("@/assets/images/generate_story_full.png")}
					resizeMode="cover"
					style={{ flex: 1, width: "100%", height: "100%" }}

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

			<View className="flex-1 min-w-1/2 items-center">
				<StepForm loading={loading} steps={stepsConfig} onComplete={handleFormComplete} />
			</View>
		</View>
	);
};

export default Story;
