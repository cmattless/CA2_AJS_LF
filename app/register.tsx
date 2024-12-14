import React from "react";
import { View, Text, Image, TextInput, Pressable } from "react-native";

const Register = () => {
	return (
		<View className="flex-1 bg-[#333333]">
			<View className="flex-1  items-center px-4">
				<Image
					className="w-full h-1/3 "
					source={require("@/assets/images/Register.png")}
					resizeMode="cover"
				/>
				<Image
					className=""
					source={require("@/assets/images/LF_Trans.png")}
					style={{ width: 80, height: 122 }}
				/>
				<Text className="text-white text-xl font-bold mb-4">
					Register to Get Started
				</Text>

				<View className="w-full max-w-sm">
					<View className="mb-4">
						<Text className="text-white mb-1">Email</Text>
						<TextInput
							className="bg-white rounded px-3 py-2"
							placeholder="Enter your email address"
							placeholderTextColor="#666"
						/>
					</View>
					<View className="mb-4">
						<Text className="text-white mb-1">Password</Text>
						<TextInput
							className="bg-white rounded px-3 py-2"
							placeholder="Enter your password"
							placeholderTextColor="#666"
							secureTextEntry
						/>
					</View>
					<View className="mb-6">
						<Text className="text-white mb-1">Confirm Password</Text>
						<TextInput
							className="bg-white rounded px-3 py-2"
							placeholder="Enter your password confirmation"
							placeholderTextColor="#666"
							secureTextEntry
						/>
					</View>

					<Pressable className="bg-[#F05E23] rounded p-3 items-center">
						<Text className="text-white font-semibold">Register</Text>
					</Pressable>
				</View>
			</View>
		</View>
	);
};

export default Register;
