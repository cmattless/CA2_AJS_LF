import React from "react";
import { Pressable, View, Text } from "react-native";

interface IStandardCardProps {
	title: string;
	text?: string;
	onPress?: () => void;
}

export const StandardCard: React.FC<IStandardCardProps> = ({
	title,
	text,
	onPress,
}) => {
	return (
		<Pressable
			onPress={onPress}
			className="mb-4 rounded-lg shadow-lg bg-[#555555] active:opacity-90"
			accessibilityRole="button"
			accessibilityLabel={`Card: ${title}`}
		>
			<View className="p-4">
				<Text className="text-lg font-semibold text-white">
					{title}
				</Text>
				{text && (
					<Text className="mt-2 text-sm text-gray-300">
						{text}
					</Text>
				)}
			</View>
		</Pressable>
	);
};
