import {
	ImageSourcePropType,
	Pressable,
	View,
	Image,
	Text,
} from "react-native";

interface RowCardItemProps {
	source: ImageSourcePropType;
	buttonText: string;
	onPress?: () => void;
}

export const RowCardItem: React.FC<RowCardItemProps> = ({
	source,
	buttonText,
	onPress,
}) => {
	return (
		<Pressable onPress={onPress} className="mb-4">
			<View className="rounded-md overflow-hidden flex-row items-center">
				<Image className="h-20 w-2/3" source={source} resizeMode="cover" />
				<View className="flex-1 bg-white/90 justify-center items-center h-20">
					<Text className="text-black font-semibold">{buttonText}</Text>
				</View>
			</View>
		</Pressable>
	);
};
