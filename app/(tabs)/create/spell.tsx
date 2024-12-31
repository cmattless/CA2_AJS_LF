import React, { useState } from "react";
import { View, Button, Image, Text } from "react-native";
import StepForm from "@/components/Forms/StepForm";
import { useRouter } from "expo-router";
import useRequests from "@/hooks/useRequests";
import { useSession } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import { IErrorType } from "@/types/hooks";

const Faction = () => {
    const router = useRouter();
    const { session, user } = useSession();
    const { loading, error, sendRequest } = useRequests();
    const showToast = useToast();

    const stepsConfig = [
        {
            type: "text",
            name: "name",
            label: "Spell Name",
            placeholder: "Enter spell name",
            required: true,
        },
        {
            type: "dropdown",
            name: "type",
            label: "Spell Type",
            required: true,
            options: [
                { name: "Fire", value: "Fire" },
                { name: "Ice", value: "Ice" },
                { name: "Water", value: "Water" },
                { name: "Earth", value: "Earth" },
                { name: "Air", value: "Air" },
                { name: "Arcane", value: "Arcane" },
            ],
        }
    ];

    const handleFormComplete = async (formData: Record<string, any>) => {
        await sendRequest({
            endpoint: "/spells",
            method: "POST",
            data: formData,
            headers: { authorization: `Bearer ${session}` },
        }).then((res : IErrorType) => {
            if (res.error) {
                return showToast(res.error, "destructive", 3000);
            }
        });
        showToast("Character created successfully", "success", 3000);
        router.push("/main");
    };

    return (
        <View className="flex-1 bg-[#333333]">
            <View className="flex-1 justify-center items-center">
                <Image
                    className="brightness-50"
                    style={{ flex: 1, width: "100%", height: "100%" }}
                    source={require("@/assets/images/create_faction_full.png")}
                    resizeMode="cover"
                />
                <Image
                    className="self-center"
                    source={require("@/assets/images/LF_Trans.png")}
                    style={{ width: 80, height: 122 }}
                />
                <Text className="text-white text-xl font-bold mb-4">
                    Create a Spell
                </Text>
            </View>
            <View className="flex-1 items-center">
                <StepForm steps={stepsConfig} onComplete={handleFormComplete} />
            </View>
        </View>
    );
};

export default Faction;