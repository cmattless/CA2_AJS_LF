import * as React from "react";
import { useSession } from "@/contexts/AuthContext";

import { View } from "react-native";
import { Text } from "@/components/ui/text";
import Welcome from "@/components/Welcome";

export default function Screen() {
	const { session } = useSession();

	React.useEffect(() => {
		if (session) {
			//redirect user to mainmenu
			
	}, []);
	return (
		<View className="flex-1 justify-center items-center gap-5 p-6 bg-secondary/20">
			{session ? (
				<View>
					<Text className="text-center text-2xl font-bold">Welcome back!</Text>
				</View>
			) : (
				<Welcome />
			)}
		</View>
	);
}
