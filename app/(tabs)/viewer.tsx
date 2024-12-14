import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	ScrollView,
    Image,
	StyleSheet,
	ActivityIndicator,
} from "react-native";

import useRequests from "@/hooks/useRequests";
import { useToast } from "@/contexts/ToastContext";
import { useSession } from "@/contexts/AuthContext";


const ResourceViewer = ({ route }) => {
	const { _id, type } = route.params; // Extract _id and type from the route params
	const [resource, setResource] = useState(null);
	const [loading, setLoading] = useState(true);

    const { session } = useSession();
    const { sendRequest } = useRequests();
    const showToast = useToast();
	useEffect(() => {
		const fetchResource = async () => {
			try {
				const res = await sendRequest({ 
					endpoint: `/${type}/${_id}`,
					method: "GET",
					headers: { authorization: `Bearer ${session}` },
				});
				if (res.error) {
					return showToast(res.error, "destructive", 3000);
				}
				setResource(res);
			} catch (error) {
				// Handle the error here
			}
		};
	
		fetchResource();
	}, [_id, type, sendRequest, session, showToast]);

	if (loading) {
		return (
			<View style={styles.loader}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);
	}

	if (!resource) {
		return (
			<View style={styles.error}>
				<Text style={styles.errorText}>Resource not found.</Text>
			</View>
		);
	}

	return (
		<View className="flex-1 bg-[#333333]">
			<View className="flex-row justify-between items-center p-4">
				<Image
					style={{ width: 80, height: 122 }}
					source={require("@/assets/images/LF_Trans.png")}
					resizeMode="contain"
				/>
			</View>
			<ScrollView style={styles.container}>
				<Text style={styles.title}>{type.toUpperCase()} Details</Text>
				{Object.entries(resource).map(([key, value]) => (
					<View key={key} style={styles.propertyContainer}>
						<Text style={styles.propertyKey}>{key}:</Text>
						<Text style={styles.propertyValue}>
							{typeof value === "object"
								? JSON.stringify(value, null, 2)
								: String(value)}
						</Text>
					</View>
				))}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: "#f9f9f9",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 16,
	},
	propertyContainer: {
		marginBottom: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#ddd",
		paddingBottom: 8,
	},
	propertyKey: {
		fontSize: 16,
		fontWeight: "600",
	},
	propertyValue: {
		fontSize: 14,
		color: "#333",
	},
	loader: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	error: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	errorText: {
		fontSize: 18,
		color: "red",
	},
});

export default ResourceViewer;
