import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface AccordionItemProps {
    title: string;
    children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children }) => {
    const [expanded, setExpanded] = React.useState(false);

    return (
        <View className="mt-4 border-t bg-[#333333] pt-2">
            <TouchableOpacity
                onPress={() => setExpanded(!expanded)}
                className="flex-row justify-between items-center bg-[#333333] rounded-lg p-4"
            >
                <Text className="text-lg font-bold text-[#fefee3]">{title}</Text>
                <Text className="text-lg font-bold text-white">{expanded ? "-" : "+"}</Text>
            </TouchableOpacity>
            {expanded && <View className="mt-2 bg-[#333333] rounded-lg p-4">{children}</View>}
        </View>
    );
};

export default AccordionItem;