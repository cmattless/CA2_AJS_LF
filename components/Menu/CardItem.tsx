import {
	ImageSourcePropType,
	Pressable,
	View,
	Text,
	Image,
} from "react-native";

interface CardItemProps {
	source: ImageSourcePropType;
	title: string;
	onPress?: () => void;
}

export const CardItem: React.FC<CardItemProps> = ({
	source,
	title,
	onPress,
}) => {
	return (
		<Pressable onPress={onPress} className="mb-4">
			<View className="rounded-md overflow-hidden">
				<Image className="w-full h-32" source={source} resizeMode="stretch" />
				<View className="absolute inset-0 bg-black/40 justify-center items-center">
					<Text className="text-white text-lg font-semibold">{title}</Text>
				</View>
			</View>
		</Pressable>
	);
};
