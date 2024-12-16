import { View } from 'react-native';

const SkeletonLoader = (amount: number = 5) => (
    <View className="flex-1 p-4">
        {[...Array(amount)].map((_, index) => (
            <View key={index} className="mb-3 p-3 bg-gray-800 rounded-lg animate-pulse">
                <View className="h-4 bg-gray-700 rounded mb-2"></View>
                <View className="h-3 bg-gray-700 rounded"></View>
            </View>
        ))}
    </View>
);

export default SkeletonLoader;