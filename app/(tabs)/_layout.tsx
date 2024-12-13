import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: "#F05E23",

				tabBarInactiveTintColor: "#B0B0B0",
				tabBarStyle: {
					backgroundColor: "#333333",
				},
			}}
		>
			<Tabs.Screen
				name="main"
				options={{
					title: "Home",
					tabBarIcon: ({ color }) => (
						<FontAwesome size={28} name="home" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="generate/story"
				options={{
					title: "Generate",
					tabBarIcon: ({ color }) => (
						<FontAwesome size={28} name="cogs" color={color} />
					),
				}}
			/>
			<Tabs.Screen name="create/world" options={{ href: null }} />
			<Tabs.Screen name="create/character" options={{ href: null }} />
		</Tabs>
	);
}
