import {
	Pressable,
	View,
	Text,
	Image,
} from "react-native";

interface IStandardCardProps {
	title: string;
	onPress?: () => void;
}

export const StandardCard: React.FC<IStandardCardProps> = ({
	title,
	onPress,
}) => {
	return (
		<Pressable onPress={onPress} className="mb-4">
			<View className="rounded-md overflow-hidden">
				<View className="absolute inset-0 bg-black/40 justify-center items-center">
					<Text className="text-white text-lg font-semibold">{title}</Text>
				</View>
			</View>
		</Pressable>
	);
};
