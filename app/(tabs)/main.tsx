import React from "react";
import { StyleSheet, View, Image, Pressable, ScrollView } from "react-native";
import { CardItem } from "@/components/Menu/CardItem";
import { Redirect } from "expo-router";
import { useSession } from "@/contexts/AuthContext";
import Dropdown from "@/components/Dropdown/Dropdown";
import { useRouter, Link } from "expo-router";
import { Skeleton } from "@/components/ui/skeleton";

const Main = () => {
	const router = useRouter();
	const { user } = useSession();

	// React.useEffect(() => {
	// 	if (!session) {
	// 		router.push("/")
	// 	}
	// }, [session]);

	return (
		<View className="flex-1 bg-[#333333]">
			<View className="flex-row justify-between items-center">
				<Image
					style={{ width: 80, height: 122 }}
					source={require("@/assets/images/LF_Trans.png")}
					resizeMode="contain"
				/>
				
			<Dropdown title={user?.username || <Skeleton className={'w-20 h-4'}/> } />
			</View>

			<ScrollView
				className="px-4"
				contentContainerStyle={{ paddingBottom: 40 }}
			>
				<CardItem
					onPress={() => router.push("/generate/story")}
					source={require("@/assets/images/generate_story_banner.png")}
					title="Generate Story"
				/>

				<CardItem
					source={require("@/assets/images/create_world_banner.png")}
					title="Create World"
					onPress={() => router.push("/create/world")}
				/>

				<CardItem
					source={require("@/assets/images/create_character_banner.png")}
					title="Create Character"
					onPress={() => router.push("/create/character")}
				/>
				<CardItem
					source={require("@/assets/images/create_faction_banner.png")}
					title="Create Faction"
					onPress={() => router.push("/create/faction")}
				/>

				<CardItem
					source={require("@/assets/images/browse_worlds.png")}
					title="Browse Worlds"
					onPress={() => router.push("/browse/worlds")}
				/>

				<CardItem
					source={require("@/assets/images/edit_story_resources.png")}
					title="Edit Story Resources"
					onPress={() => { router.push("/browse/resources") }}
				/>
			</ScrollView>
		</View>
	);
};

export default Main;
