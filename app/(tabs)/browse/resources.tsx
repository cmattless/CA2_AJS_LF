import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { View, Image, ScrollView } from "react-native";

import { ICharacterType, IFactionType } from "@/types/models";
import useRequests from "@/hooks/useRequests";
import { useToast } from "@/contexts/ToastContext";
import { useSession } from "@/contexts/AuthContext";

import { StandardCard } from "@/components/Menu/StandardCard";
import AccordionItem from "@/components/Menu/AccordionItem";

const Resources = () => {
    const router = useRouter();
    const showToast = useToast();
    const { session, user } = useSession();
    const { sendRequest } = useRequests();
    const [userCharacters, setUserCharacters] = React.useState<ICharacterType[]>([]);
    const [userFactions, setUserFactions] = React.useState<IFactionType[]>([]);


    React.useEffect(() => {
        console.log("Resources mounted");
        sendRequest({
            endpoint: `/characters/owner/${user?._id}`,
            method: "GET",
            headers: { authorization: `Bearer ${session}` },
        }).then((res: unknown) => {
            const data = res as ICharacterType[];
            if (Array.isArray(data)) {
                setUserCharacters(data);
            } else {
                showToast("Failed to fetch characters", "destructive", 3000);
            }
        });

        sendRequest({
            endpoint: `/factions/`,
            method: "GET",
            headers: { authorization: `Bearer ${session}` },
        }).then((res: unknown) => {
            const data = res as IFactionType[];
            if (Array.isArray(data)) {
                setUserFactions(data);
            } else {
                showToast("Failed to fetch factions", "destructive", 3000);
            }
        });
    }, [router]);

    return (
        <View className="flex-1 bg-[#333333]">
            <View className="flex-row justify-between items-center p-4">
                <Image
                    style={{ width: 80, height: 122 }}
                    source={require("@/assets/images/LF_Trans.png")}
                    resizeMode="contain"
                />
            </View>

            <ScrollView
                className="px-4"
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                <AccordionItem title="Characters">
                    {userCharacters.length == 0 && (
                        <StandardCard
                            title="No characters found"
                            text="Create a character to get started"
                            onPress={() => router.push("/create/character")}
                        />
                    )}
                    {userCharacters?.map((character) => (
                        <StandardCard
                            key={character._id}
                            title={character.name}
                            text={character.description}
                            onPress={() => router.push(`/viewer/characters/${character._id}`)}
                        />
                    ))}
                </AccordionItem>

                <AccordionItem title="Factions" >
                    {userFactions.length == 0 && (
                        <StandardCard
                            title="No factions found"
                            text="Create a faction to get started"
                            onPress={() => router.push("/create/faction")}
                        />
                    )}
                    {userFactions?.map((faction) => (
                        <StandardCard
                            key={faction._id}
                            title={faction.name}
                            text={faction.description}
                            onPress={() => router.push(`/viewer/factions/${faction._id}`)}
                        />
                    ))}
                </AccordionItem>



            </ScrollView>
        </View>
    );
};

export default Resources;
