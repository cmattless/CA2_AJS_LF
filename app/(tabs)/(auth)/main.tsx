import React from "react";
import { StyleSheet, View, Image, Pressable, ScrollView } from "react-native";
import { CardItem } from "@/components/Menu/CardItem";
import { RowCardItem } from "@/components/Menu/RowCardItem";

const Main = () => {
	return (
		<View>
			<View className="flex-1 bg-[#333333]">
				<View className="flex-row justify-between items-center p-4">
				
					<Image
						style={{ width: 80, height: 122 }}
						source={require("@/assets/images/LF_Trans.png")}
						resizeMode="contain"
					/>
					<Pressable className="h-10 w-10 rounded-full bg-white/20 justify-center items-center">
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
					</Pressable>
				</View>

				<ScrollView
					className="px-4"
					contentContainerStyle={{ paddingBottom: 40 }}
				>
					<CardItem
						source={require("@/assets/images/generate_story.png")}
						title="Generate Story"
						onPress={() => {}}
					/>
					<CardItem
						source={require("@/assets/images/create_world.png")}
						title="Create World"
						onPress={() => {}}
					/>
					<CardItem
						source={require("@/assets/images/create_character.png")}
						title="Create Character"
						onPress={() => {}}
					/>
					<CardItem
						source={require("@/assets/images/create_faction.png")}
						title="Create Faction"
						onPress={() => {}}
					/>

					<RowCardItem
						source={require("@/assets/images/browse_worlds.png")}
						buttonText="Browse Worlds"
						onPress={() => {}}
					/>
					<RowCardItem
						source={require("@/assets/images/edit_story_resources.png")}
						buttonText="Edit Story Resources"
						onPress={() => {}}
					/>
				</ScrollView>
			</View>
		</View>
	);
};

export default Main;
