import React from "react";
import { useRouter } from "expo-router";
import { View, Image, ScrollView } from "react-native";

import { ICharacterType, IFactionType, ISpellType } from "@/types/models";
import useRequests from "@/hooks/useRequests";
import { useToast } from "@/contexts/ToastContext";
import { useSession } from "@/contexts/AuthContext";

import { StandardCard } from "@/components/Menu/StandardCard";
import AccordionItem from "@/components/Menu/AccordionItem";
import { useIsFocused } from "@react-navigation/native";

const Resources = () => {
    const router = useRouter();
    const isFocused = useIsFocused();
    const showToast = useToast();
    const { session, user } = useSession();
    const { sendRequest } = useRequests();
    const [userCharacters, setUserCharacters] = React.useState<ICharacterType[]>([]);
    const [userFactions, setUserFactions] = React.useState<IFactionType[]>([]);
    const [userSpells, setUserSpells] = React.useState<ISpellType[]>([]);


    React.useEffect(() => {
        console.log("Resources mounted");
        sendRequest<ICharacterType[]>({
            endpoint: `/characters/owner/${user?._id}`,
            method: "GET",
            headers: { authorization: `Bearer ${session}` },
        }).then((res) => {
            if (Array.isArray(res)) {
                setUserCharacters(res);
            } else {
                showToast("Failed to fetch characters", "destructive", 3000);
            }
        });

        sendRequest<IFactionType[]>({
            endpoint: `/factions/`,
            method: "GET",
            headers: { authorization: `Bearer ${session}` },
        }).then((res) => {
            if (Array.isArray(res)) {
                setUserFactions(res);
            } else {
                showToast("Failed to fetch factions", "destructive", 3000);
            }
        });

        sendRequest<ISpellType[]>({
            endpoint: `/spells/`,
            method: "GET",
            headers: { authorization: `Bearer ${session}` },
        }).then((res) => {
            if (Array.isArray(res)) {
                setUserSpells(res);
            } else {
                showToast("Failed to fetch spells", "destructive", 3000);
            }});
    }, [router, isFocused]);

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
                    {userCharacters.length > 0 && (
                        <StandardCard
                            title="Create a new character"
                            text="Create a character"
                            className="bg-[#F05E23]"
                            onPress={() => router.push("/create/character")}
                        />
                    )}
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
                    {userFactions.length > 0 && (
                        <StandardCard
                            title="Create a new faction"
                            text="Create a Faction"
                            className="bg-[#F05E23]"
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
                <AccordionItem title="Spells" >
                    {userSpells.length == 0 && (
                        <StandardCard
                            title="No Spells found"
                            text="Create a spell to get started"
                            onPress={() => router.push("/create/spell")}
                        />
                    )}
                    {userSpells.length > 0 && (
                        <StandardCard
                            title="Create a new spell"
                            text="Create a spell"
                            className="bg-[#F05E23]"
                            onPress={() => router.push("/create/spell")}

                        />
                    )}
                    {userSpells?.map((spell) => (
                        <StandardCard
                            key={spell._id}
                            title={spell.name}
                            text={spell.type}
                            onPress={() => router.push(`/viewer/spells/${spell._id}`)}
                        />
                    ))}
                </AccordionItem>



            </ScrollView>
        </View>
    );
};

export default Resources;
