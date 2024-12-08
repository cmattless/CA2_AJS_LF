import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Link } from "expo-router";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";

const Welcome = () => {
	return (
		<View>
			<Image
				source={require("@/assets/images/LF_Trans.png")}
				style={{ width: 300, height: 200 }}
			/>
			<Link href="/register">
				<Button className="w-full" variant={"default"} size={"lg"}>
					<Text className="text-center font-bold text-white">Register</Text>
				</Button>
			</Link>
			<Link href="/login">
				<Button className="w-full" variant={"link"}>
					<Text className="text-center text-white">
						Already have an account?
					</Text>
				</Button>
			</Link>
		</View>
	);
};

const styles = StyleSheet.create({});

export default Welcome;
