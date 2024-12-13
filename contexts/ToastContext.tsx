import React, {
	createContext,
	useContext,
	useState,
	useCallback,
	ReactNode,
} from "react";
import { Text, Animated } from "react-native";

// Define ToastType as a string union
type ToastType = "success" | "destructive" | "default";

interface ToastContextType {
	showToast: (message: string, type: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

interface ToastProviderProps {
	children: ReactNode;
}

// Toast Provider component
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

	const getToastClassName = (type: ToastType) => {
		switch (type) {
			case "success":
				return "bg-green-500";
			case "destructive":
				return "bg-red-500";
			case "default":
			default:
				return "bg-gray-800";
		}
	};

	return (
		<ToastContext.Provider value={{ showToast }}>
			{children}
			{toast && (
				<Animated.View
					style={{ opacity }}
					className={`absolute bottom-12  left-5 right-5 px-4 py-2 rounded-lg ${getToastClassName(
						toast.type
					)} bg-black`}
				>
					<Text className="text-white text-base text-center">
						{toast.message}
					</Text>
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
