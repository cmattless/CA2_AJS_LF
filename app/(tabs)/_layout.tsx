import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs,  } from "expo-router";
import React from "react";
import { useRouter, useRootNavigationState } from "expo-router";
import { useSession } from "@/contexts/AuthContext";

export default function TabLayout() {
	const { session, isValidJwt } = useSession();
	const router = useRouter();
	const rNS = useRootNavigationState();

	React.useEffect(() => {
		if (!rNS.key) return
		if (!session || !isValidJwt({ jwt: session })) {
			router.replace("/");
		}
		console.log("valid jwt");
	}, [session, isValidJwt, router]);
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
			<Tabs.Screen name="generate/display" options={{ href: null }} />
			<Tabs.Screen name="create/world" options={{ href: null }} />
			<Tabs.Screen name="create/character" options={{ href: null }} />
			<Tabs.Screen name="create/faction" options={{ href: null }} />
			<Tabs.Screen name="browse/worlds" options={{ href: null }} />
			<Tabs.Screen name="browse/resources" options={{ href: null }} />
			<Tabs.Screen name="viewer/[type]/[id]" options={{ href: null }} />
			<Tabs.Screen name="viewer/[type]/edit/[id]" options={{ href: null }} />
			

		</Tabs>
	);
}


