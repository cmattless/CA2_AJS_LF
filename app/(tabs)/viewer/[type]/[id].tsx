import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, ActivityIndicator, TouchableOpacity, Pressable } from "react-native";
import useRequests from "@/hooks/useRequests";
import { useToast } from "@/contexts/ToastContext";
import { useSession } from "@/contexts/AuthContext";
import { useLocalSearchParams } from "expo-router";
import { Button } from "@/components/ui/button";
import SkeletonLoader from "@/components/SkeletonLoader";
import AccordionItem from "@/components/Menu/AccordionItem";
import { useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Skeleton } from "@/components/ui/skeleton";


const ResourceViewer = () => {
    const router = useRouter();
    const { id, type } = useLocalSearchParams();
    const [resource, setResource] = useState<{ [key: string]: any } | null>(null);
    const [owner, setOwner] = useState(null);
    const [world, setWorld] = useState(null);
    const [magicSystem, setMagicSystem] = useState(null);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const { session, user } = useSession();
    const { sendRequest } = useRequests();
    const showToast = useToast();

    const omittedKeys = ["_id", "__v", "createdAt", "updatedAt", "events"];
    const handleDelete = async () => { 
        try {
            const res = await sendRequest({
                endpoint: `/${type}/${id}`,
                method: "DELETE",
                headers: { authorization: `Bearer ${session}` },
            });
            if (res.error) {
                showToast(res.error, "destructive", 3000);
                return;
            }
            showToast("Resource deleted successfully", "success", 3000);
            router.back();
        } catch (error) {
            showToast("An error occurred while deleting the resource", "destructive", 3000);
        }
     }

    useEffect(() => {
        const fetchResource = async () => {
            try {
                const res = await sendRequest({
                    endpoint: `/${type}/${id}`,
                    method: "GET",
                    headers: { authorization: `Bearer ${session}` },
                }) as { error?: string, owner?: string, events?: any[], [key: string]: any };
                if (res.error) {
                    showToast(res.error, "destructive", 3000);
                    setLoading(false);
                    return;
                }
                setResource(res);

                if (res.owner) {
                    const ownerRes = await sendRequest({
                        endpoint: `/users/${res.owner}`,
                        method: "GET",
                        headers: { authorization: `Bearer ${session}` },
                    });
                    if (!ownerRes.error) {
                        setOwner(ownerRes.username);
                    }
                }

                if (res.world) {
                    const worldRes = await sendRequest({
                        endpoint: `/worlds/${res.world}`,
                        method: "GET",
                        headers: { authorization: `Bearer ${session}` },
                    });
                    if (!worldRes.error) {
                        setWorld(worldRes);
                    }
                }

                if (res.magicSystem) {
                    const magicSystemRes = await sendRequest({
                        endpoint: `/magic-systems/${res.magicSystem}`,
                        method: "GET",
                        headers: { authorization: `Bearer ${session}` },
                    });
                    if (!magicSystemRes.error) {
                        setMagicSystem(magicSystemRes);
                    }
                }

                if (res.events) {
                    const eventsRes = await sendRequest({
                        endpoint: `/events/world/${id}`,
                        method: "GET",
                        headers: { authorization: `Bearer ${session}` },
                    });
                    if (!eventsRes.error) {
                        setEvents(eventsRes);
                    }
                }
                setLoading(false);
            } catch (error) {
                showToast("An error occurred while fetching the resource", "destructive", 3000);
                setLoading(false);
            }
        };

        if (id && type) {
            fetchResource();
        } else {
            showToast("Invalid parameters", "destructive", 3000);
            setLoading(false);
        }
    }, [id, type, sendRequest, session, showToast]);

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        );
    }

    if (!resource) {
        return (
            <SkeletonLoader />
        );
    }

    return (
        <View className="flex-1 bg-[#333333]">
            <View className="flex-row justify-between text-center items-center p-1">
                <Image
                    style={{ width: 80, height: 122 }}
                    source={require("@/assets/images/LF_Trans.png")}
                    resizeMode="contain"
                />


                <Text className="text-2xl font-bold text-white px-4">
                    {resource.name || type}
                </Text>

            </View>
            <ScrollView className="p-4">

                {Object.entries(resource).map(([key, value]) => {
                    if (omittedKeys.includes(key)) return null;

                    ;
                    if (key === "magicSystem" && magicSystem) value = magicSystem.name;

                    if (key === "owner" && owner) value = owner;


                    if (key === "world") {

                        if (world) {
                            value = world.name;
                        } else {
                            return (
                                <View key={key} className="mb-3 p-3 bg-[#333333] rounded-lg">
                                    <Text className="text-sm font-bold text-[#fefee3]">{key}:</Text>
                                    <Skeleton className={'h-3 w-1/3'} />

                                </View>
                            )
                        }
                    }


                    return (
                        <View key={key} className="mb-3 p-3 bg-[#333333] rounded-lg">
                            <Text className="text-sm font-bold text-[#fefee3]">{key}:</Text>
                            <Text className="text-sm text-white">
                                {typeof value === "object"
                                    ? JSON.stringify(value, null, 2)
                                    : String(value)}
                            </Text>

                        </View>
                    );
                })}
                {resource.owner === user?._id && (
                    <View className="flex-row justify-between gap-3 p-3">
                        <Button
                            title="Edit"
                            className="flex-1"
                            variant={'default'}
                            onPress={() => {
                                router.push(`viewer/${type}/edit/${id}`);
                            }}
                        >
                            <FontAwesome size={28} name="edit" color={'#fefee3'} />
                        </Button>
                        <Button className="flex-1" title="Delete" variant={'destructive'} onPress={handleDelete}>
                            <FontAwesome size={28} name="trash" color={'#ffffff'} />
                        </Button>
                    </View>)}

                {events.length > 0 && (
                    <AccordionItem title="Events">
                        {events.map((event) => (
                            <Pressable onPress={
                                () => router.push(`/viewer/events/${event._id}`)
                            } key={event._id} className="mb-3 p-3 bg-[#666666] rounded-lg">
                                <Text className="text-lg font-bold text-white">{event.event}</Text>
                                <Text className="text-sm text-gray-300">Year: {event.year}</Text>
                                <Text className="text-sm text-gray-300">Description: {event.description}</Text>
                            </Pressable>
                        ))}
                    </AccordionItem>
                )}


            </ScrollView>
        </View>
    );
};

export default ResourceViewer;
