import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { Input } from "@/components/ui/input";
import { useRouter } from "expo-router";
import useRequests from "@/hooks/useRequests";
import { useSession } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";


const Register = () => {
	const router = useRouter();
	const { sendRequest, loading } = useRequests();
	const { signIn } = useSession();
	const showToast = useToast();

	const [form, setForm] = React.useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [error, setError] = React.useState("");

	const handleFormInputs = (e: any) => {
		setForm({ ...form, [e.target.id]: e.target.value });
	};

	const handleAction = async () => {
		if (form.password !== form["confirmPassword"]) {
			return setError("Passwords do not match");
		}

		await sendRequest({ endpoint: '/users/', method: "POST", data: form }).then(() => showToast("Registration successful", "success", 3000)).then(() => { 
			router.push("/login");
		}).catch((err) => { setError(err.response?.data?.error || "Registration failed"); });

	};

	return (
		<View className="flex-1 bg-[#333333]">
			<View className="flex-1  items-center px-4">
				<Image
					className="w-full h-1/3"
					source={require("@/assets/images/Login.png")}
					resizeMode="cover"
				/>
				<Image
					source={require("@/assets/images/LF_Trans.png")}
					style={{ width: 80, height: 122 }}
				/>
				<Text className="text-white text-xl font-bold mb-4">
					Register to Get Started
				</Text>
				<View className="w-full max-w-sm">
					<Text className="text-destructive">{error}</Text>
					<View className="mb-4">
						<Text className="text-white mb-1">Username</Text>
						<Input
							className="bg-white rounded px-3 py-2"
							onChange={handleFormInputs}
							defaultValue={form.username}
							id="username"
							placeholder="Enter your username"
							placeholderTextColor="#666"
						/>
						</View>
					</View>
					<View className="w-full max-w-sm">
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
						<View className="mb-6">
							<Text className="text-white mb-1">Confirm Password</Text>
							<Input
								className="bg-white rounded px-3 py-2"
								onChange={handleFormInputs}
								defaultValue={form.confirmPassword}
								id="confirmPassword"
								placeholder="Enter your password confirmation"
								placeholderTextColor="#666"
								secureTextEntry
							/>
							<Pressable
								disabled={loading}
								onPress={handleAction}
								className="bg-[#F05E23] rounded p-3 items-center my-4"
							>
								<Text className="text-white font-semibold">Register</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</View>
			);

};


			export default Register;
