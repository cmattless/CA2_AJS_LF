import React, { useEffect } from "react";
import { View, Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { IWorldType } from "@/types/models";
const Worlds = () => {
	const router = useRouter();

    const allWorlds : IWorldType[]= sendRequest({
        endpoint: "/worlds",
        method: "GET",
        headers: { authorization: `Bearer ${session}` },
    }).then((res) => {
        if (res.error) {
            return showToast(res.error, "destructive", 3000);
        }
    });


    

	// React.useEffect(() => {
	// 	if (!session) {
	// 		router.push("/")
	// 	}
	// }, [session]);

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
			</ScrollView>
		</View>
	);
};

export default Worlds;
