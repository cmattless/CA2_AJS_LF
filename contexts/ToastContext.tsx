import React, {
	createContext,
	useContext,
	useState,
	useCallback,
	ReactNode,
} from "react";
import { Text, Animated, StyleSheet, View } from "react-native";

type ToastType = "success" | "destructive" | "default";

interface ToastContextType {
	showToast: (message: string, type: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

interface ToastProviderProps {
	children: ReactNode;
}

const getToastBackgroundColor = (type: ToastType): string => {
	switch (type) {
		case "success":
			return "#10B981"; // green-500
		case "destructive":
			return "#EF4444"; // red-500
		case "default":
		default:
			return "#1F2937"; // gray-800
	}
};

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
	const [toast, setToast] = useState<{
		message: string;
		type: ToastType;
	} | null>(null);
	const [opacity] = useState(new Animated.Value(0));

	const showToast = useCallback(
		(message: string, type: ToastType, duration: number = 3000) => {
			setToast({ message, type });
			Animated.timing(opacity, {
				toValue: 1,
				duration: 300,
				useNativeDriver: true,
			}).start(() => {
				setTimeout(() => {
					Animated.timing(opacity, {
						toValue: 0,
						duration: 300,
						useNativeDriver: true,
					}).start(() => setToast(null));
				}, duration);
			});
		},
		[opacity]
	);

	return (
		<ToastContext.Provider value={{ showToast }}>
			{children}
			{toast && (
				<Animated.View
					style={[
						styles.toastContainer,
						{ opacity, backgroundColor: getToastBackgroundColor(toast.type) },
					]}
				>
					<Text style={styles.toastText}>{toast.message}</Text>
				</Animated.View>
			)}
		</ToastContext.Provider>
	);
};

export const useToast = (): ((
	message: string,
	type: ToastType,
	duration?: number
) => void) => {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error("useToast must be used within a ToastProvider");
	}
	return context.showToast;
};

const styles = StyleSheet.create({
	toastContainer: {
		position: "absolute",
		bottom: 48,
		left: 20,
		right: 20,
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 8,
		alignItems: "center",
	},
	toastText: {
		color: "#FFFFFF",
		fontSize: 16,
		textAlign: "center",
	},
});
