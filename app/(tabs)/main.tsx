import React from "react";
import { StyleSheet, View, Image, Pressable, ScrollView } from "react-native";
import { CardItem } from "@/components/Menu/CardItem";
import { Redirect } from "expo-router";
import { useSession } from "@/contexts/AuthContext";
import Dropdown from "@/components/Dropdown/Dropdown";
import { useRouter, Link } from "expo-router";

const Main = () => {
	const router = useRouter();

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
				<Pressable className="h-10 w-10 rounded-full bg-white/20 justify-center items-center">
					<Dropdown
						title={
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="size-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
								/>
							</svg>
						}
					/>
				</Pressable>
			</View>

			<ScrollView
				className="px-4"
				contentContainerStyle={{ paddingBottom: 40 }}
			>
				<CardItem
					onPress={() => router.push("/generate/story")}
					source={require("@/assets/images/generate_story.png")}
					title="Generate Story"
				/>

				<CardItem
					source={require("@/assets/images/create_world_banner.png")}
					title="Create World"
					onPress={() => router.push("/create/world")}
				/>

				<CardItem
					source={require("@/assets/images/create_character.png")}
					title="Create Character"
					onPress={() => router.push("/create/character")}
				/>
				<CardItem
					source={require("@/assets/images/create_faction.png")}
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
					onPress={() => {}}
				/>
			</ScrollView>
		</View>
	);
};

export default Main;
