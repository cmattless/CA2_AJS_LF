import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useSession } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import axios from "@/config/api.ts";

const Login = () => {
	const { signIn } = useSession();
	const [form, setForm] = React.useState({
		email: "",
		password: "",
	});
	const [error, setError] = React.useState("");

	const handleFormInputs = (e: any) => {
		setForm({ ...form, [e.target.id]: e.target.value });
	};

	const handleAction = () => {
		axios
			.post("/users/login", form)
			.then((res) => {
				console.log(res.data);
				signIn(res.data.token);
			})
			.catch((err) => {
				setError(err.response.data.error);
			});
	};
	return (
		<View className="flex-1 bg-[#333333]">
			<View className="flex-1  items-center px-4">
				<Image
					className="w-full h-1/3 "
					source={require("@/assets/images/Login.png")}
					resizeMode="cover"
				/>
				<Image
					className=""
					source={require("@/assets/images/LF_Trans.png")}
					style={{ width: 80, height: 122 }}
				/>
				<Text className="text-white text-xl font-bold mb-4">
					Login to Get Started
				</Text>

				<View className="w-full max-w-sm">
					<Text className="text-destructive">{error}</Text>
					<View className="mb-4">
						<Text className="text-white mb-1">Email</Text>
						<Input
							className="bg-white rounded px-3 py-2"
							onChange={handleFormInputs}
							defaultValue={form.email}
							id="email"
							placeholder="Enter your email address"
							placeholderTextColor="#666"
						/>
					</View>
					<View className="mb-4">
						<Text className="text-white mb-1">Password</Text>
						<Input
							className="bg-white rounded px-3 py-2"
							onChange={handleFormInputs}
							defaultValue={form.password}
							id="password"
							placeholder="Enter your password"
							placeholderTextColor="#666"
							secureTextEntry
						/>
					</View>

					<Pressable
						onPress={handleAction}
						className="bg-[#F05E23] rounded p-3 items-center"
					>
						<Text className="text-white font-semibold">Login</Text>
					</Pressable>
				</View>
			</View>
		</View>
	);
};

export default Login;
