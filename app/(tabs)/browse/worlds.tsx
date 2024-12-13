import React from "react";
import { useRouter } from "expo-router";
import { View, Image, ScrollView } from "react-native";

import { IWorldType } from "@/types/models";
import useRequests from "@/hooks/useRequests";
import { useToast } from "@/contexts/ToastContext";
import { useSession } from "@/contexts/AuthContext";

import { StandardCard } from "@/components/Menu/StandardCard";

const Worlds = () => {
	const router = useRouter();
	const showToast = useToast();
	const { session } = useSession();
	const { sendRequest } = useRequests();

	const [allWorlds, setAllWorlds] = React.useState<IWorldType[]>([]);

	React.useEffect(() => {
		sendRequest({
			endpoint: "/worlds",
			method: "GET",
			headers: { authorization: `Bearer ${session}` },
		}).then((res) => {
			if (res.error) {
				return showToast(res.error, "destructive", 3000);
			}
			setAllWorlds(res);
		});
	}, []);

	return (
		<View className="flex-1 bg-[#333333]">
			<View className="flex-row justify-between items-center p-4">
				<Image
					style={{ width: 80, height: 122 }}
					source={require("@/assets/images/LF_Trans.png")}
					resizeMode="contain"
				/>
			</View>

			<ScrollView
				className="px-4"
				contentContainerStyle={{ paddingBottom: 40 }}
			>
				{allWorlds?.map((world) => (
					<StandardCard
						key={world._id}
						title={world.name}
						onPress={() => router.push(`/viewer?_id=${world._id}&type=worlds`)}
					/>
				))}
			</ScrollView>
		</View>
	);
};

export default Worlds;
