import React from "react";
import { View, Button, Image, Text } from "react-native";
import StepForm from "@/components/Forms/StepForm";
import { useRouter } from "expo-router";
import useRequests from "@/hooks/useRequests";
import { useSession } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import { IUserType } from "@/types/contexts/usercontext";
import { AxiosResponse, ResponseType } from "axios";

interface IWorldType {
    _id: string;
    name: string;
    description: string;
    owner: string;
    events: string[];
    year: number;
    collaborators: string[];
    magicSystem: string; 
    createdAt: string;
    updatedAt: string;
    __v: number;
}

const Story = () => {
    const router = useRouter();
    const { session, user } = useSession();
    const { sendRequest } = useRequests();
    const showToast = useToast();

    const [worlds, setWorlds] = React.useState<IWorldType[]>([]);

    const getUserWorlds = async () => {
        console.log('session',session);
        console.log('user',user);
        if (!user) return
        console.log('user',user);
        const res: AxiosResponse = await sendRequest({ endpoint: `/worlds/owner/${user?._id}`, method: "GET", headers: { authorization: `Bearer ${session}` } });
        let worlds: IWorldType[] = res.data.map((world: IWorldType) => {
            return world.name
        });
        setWorlds(worlds);
    };

    const handleFormComplete = async (formData) => {
        console.log(formData);
    }


    React.useEffect( () => {
        getUserWorlds();
    }, []);


    const stepsConfig = [
        {type: "dropdown", name: "world", label: "World", placeholder: "Select a world", required: true, options: worlds},
    ];

    return (
        <View className="flex-1 bg-[#333333]">
            <View className="flex-1 justify-center items-center">
                <Image
                    style={{ width: "100%", height: "55%", }}
                    source={require("@/assets/images/create_world_full.png")}
                    resizeMode="cover"
                />
                <Image
                    className="self-center"
                    source={require("@/assets/images/LF_Trans.png")}
                    style={{ width: 80, height: 122 }}
                />
                <Text className="text-white text-xl font-bold mb-4">
                    Generate a Story from a World
                </Text>
            </View>
            <View className="flex-1 items-center">
                <StepForm steps={stepsConfig} onComplete={handleFormComplete} />
            </View>
        </View>
    );
};

export default Story;
