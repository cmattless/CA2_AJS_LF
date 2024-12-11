import * as React from "react";
import { useSession } from "@/contexts/AuthContext";
import { Redirect } from "expo-router";

import { View } from "react-native";
import Welcome from "@/components/Welcome";

export default function Screen() {
	const { session } = useSession();

	if (session) {
		return <Redirect href="/main" />;
	}

	return (
		<View className="flex-1 justify-center items-center gap-5 p-6 bg-secondary/20">
			<Welcome />
		</View>
	);
}
