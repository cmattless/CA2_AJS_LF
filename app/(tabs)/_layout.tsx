import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function TabLayout() {
	return (
		<Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
			<Tabs.Screen
				name="main"
				options={{
					title: "Main",
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
						<FontAwesome size={28} name="cog" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="create/world"
				options={{
					title: "Create",
					tabBarIcon: ({ color }) => (
						<FontAwesome size={28} name="floppy-o" color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
