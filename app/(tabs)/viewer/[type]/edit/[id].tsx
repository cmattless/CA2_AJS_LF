import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    ActivityIndicator,
    TextInput,
    Image,
    Modal,
    StyleSheet,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useToast } from "@/contexts/ToastContext";
import { useSession } from "@/contexts/AuthContext";
import useRequests from "@/hooks/useRequests";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import StepForm from "@/components/Forms/StepForm";

const IGNORED_KEYS = ["__v", "_id", "createdAt", "updatedAt", "collaborators", "magicSystem"];

type TResourceResponse = {
    error?: string;
    owner?: string;
    events?: Array<{ event: string; _id: string }>;
    _id?: string;
    name?: string;
    [key: string]: any;
};

type TEventResponse = {
    event: string;
    _id: string;
};

const ResourceEditor: React.FC = () => {
    const router = useRouter();
    const { id, type } = useLocalSearchParams<{ id: string; type: string }>();
    const { session } = useSession();
    const { sendRequest } = useRequests();
    const showToast = useToast();

    const [resource, setResource] = useState<Record<string, any> | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [formValues, setFormValues] = useState<Record<string, any>>({});
    const [ownerName, setOwnerName] = useState<string | null>(null);
    const [eventOptions, setEventOptions] = useState<{ event: string; _id: string }[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        const fetchResource = async () => {
            try {
                const res: TResourceResponse = await sendRequest({
                    endpoint: `/${type}/${id}`,
                    method: "GET",
                    headers: { authorization: `Bearer ${session}` },
                });

                if (res.error) {
                    showToast(res.error, "destructive", 3000);
                    setLoading(false);
                    return;
                }

                setResource(res);
                setFormValues(res);

                if (res.owner) {
                    const ownerRes: { username?: string; error?: string } = await sendRequest({
                        endpoint: `/users/${res.owner}`,
                        method: "GET",
                        headers: { authorization: `Bearer ${session}` },
                    });

                    if (!ownerRes.error) {
                        setOwnerName(ownerRes.username || "Unknown Owner");
                    }
                }

                if (res.events) {
                    const eventsRes: TEventResponse[] = await sendRequest({
                        endpoint: `/events/world/${res._id}`,
                        method: "GET",
                        headers: { authorization: `Bearer ${session}` },
                    });

                    if (!eventsRes.error) {
                        setEventOptions(
                            eventsRes.map((event: TEventResponse) => ({ event: event.event, _id: event._id }))
                        );
                    }
                }

                setLoading(false);
            } catch (error) {
                showToast("An error occurred while fetching the resource", "destructive", 3000);
                setLoading(false);
            }
        };

        if (type && id) {
            fetchResource();
        } else {
            showToast("Invalid parameters", "destructive", 3000);
            setLoading(false);
        }
    }, [type, id, sendRequest, session, showToast]);

    const handleInputChange = (key: string, value: any) => {
        setFormValues((prev) => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {
        try {
            const res = await sendRequest({
                endpoint: `/${type}/${id}`,
                method: "PUT",
                data: formValues,
                headers: { authorization: `Bearer ${session}` },
            });

            if (res.error) {
                showToast(res.error, "destructive", 3000);
                return;
            }

            showToast("Resource updated successfully!", "success", 3000);
            router.push(`/viewer/${type}/${id}`);
        } catch (error) {
            showToast("An error occurred while saving the resource", "destructive", 3000);
        }
    };

    const handleAddEvent = async (newEvent: Record<string, any>) => {
        try {
            const res: TResourceResponse = await sendRequest({
                endpoint: `/events`,
                method: "POST",
                data: newEvent,
                headers: { authorization: `Bearer ${session}` },
            });

            if (res.error) {
                showToast(res.error, "destructive", 3000);
                return;
            }

            showToast("Event added successfully!", "success", 3000);
            if (res._id) {
                setEventOptions((prev) => [...prev, { event: newEvent.event, _id: res._id }]);
            } else {
                showToast("Failed to add event: Missing event ID", "destructive", 3000);
            }
            setIsModalVisible(false);
        } catch (error) {
            showToast("An error occurred while adding the event", "destructive", 3000);
        }
    };

    const handleRemoveEvent = (eventId: string) => {
        setEventOptions((prev) => prev.filter((event) => event._id !== eventId));
        setFormValues((prev) => ({
            ...prev,
            events: prev.events?.filter((id: string) => id !== eventId),
        }));
    };

    if (loading) {
        return (
            <View style={styles.centeredContainer}>
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        );
    }

    if (!resource) {
        return (
            <Text style={styles.notFoundText}>Resource not found.</Text>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    style={styles.logo}
                    source={require("@/assets/images/LF_Trans.png")}
                    resizeMode="contain"
                />
                <Text style={styles.headerText}>{resource.name}</Text>
            </View>

            <ScrollView style={styles.contentContainer}>
                {Object.entries(resource).map(([key, value]) => {
                    if (IGNORED_KEYS.includes(key)) return null;

                    if (key === "owner") {
                        return (
                            <View key={key} style={styles.card}>
                                <Text style={styles.cardTitle}>Owner</Text>
                                <Text style={styles.cardContent}>{ownerName || "Loading..."}</Text>
                            </View>
                        );
                    }

                    if (key === "events") {
                        return (
                            <View key={key} style={styles.card}>
                                <Text style={styles.cardTitle}>Events</Text>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="secondary">
                                            <Text>Select an Event</Text>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent style={styles.dropdownContent}>
                                        <ScrollView>
                                            {eventOptions.map((event, index) => (
                                                <DropdownMenuItem
                                                    key={index}
                                                    onSelect={() => handleInputChange(key, event._id)}
                                                >
                                                    {event.event}
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        onPress={() => handleRemoveEvent(event._id)}
                                                    >
                                                        <Text>Remove</Text>
                                                    </Button>
                                                </DropdownMenuItem>
                                            ))}
                                        </ScrollView>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <Button
                                    variant="ghost"
                                    style={styles.addButton}
                                    onPress={() => setIsModalVisible(true)}
                                >
                                    <Text>+ Add New Event</Text>
                                </Button>
                            </View>
                        );
                    }

                    return (
                        <View key={key} style={styles.card}>
                            <Text style={styles.cardTitle}>{key}</Text>
                            <TextInput
                                value={formValues[key] || ""}
                                onChangeText={(val) => handleInputChange(key, val)}
                                style={styles.input}
                            />
                        </View>
                    );
                })}

                <Button style={styles.saveButton} onPress={handleSave}>
                    Save Changes
                </Button>
            </ScrollView>

            <Modal visible={isModalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <StepForm
                        steps={[
                            {
                                type: "text",
                                name: "name",
                                label: "Character Name",
                                placeholder: "Enter character name",
                                required: true,
                            },
                            {
                                type: "textarea",
                                name: "description",
                                label: "Character Description",
                                placeholder: "Describe your character",
                                required: true,
                            },
                            {
                                type: "text",
                                name: "profession",
                                label: "Character Profession",
                                placeholder: "Enter character profession",
                                required: true,
                            },
                        ]}
                        onComplete={(newEvent) => handleAddEvent(newEvent)}
                    />
                    <Button variant="destructive" onPress={() => setIsModalVisible(false)}>
                        Cancel
                    </Button>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#333333",
    },
    centeredContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#333333",
    },
    notFoundText: {
        flex: 1,
        textAlign: "center",
        color: "white",
        backgroundColor: "#333333",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
    },
    logo: {
        width: 80,
        height: 122,
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        paddingHorizontal: 16,
    },
    contentContainer: {
        padding: 16,
    },
    card: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: "#444444",
        borderRadius: 8,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
        marginBottom: 8,
    },
    cardContent: {
        fontSize: 16,
        color: "#ddd",
    },
    input: {
        backgroundColor: "white",
        color: "black",
        borderRadius: 8,
        padding: 8,
    },
    saveButton: {
        marginTop: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#333333",
        padding: 20,
    },
    dropdownContent: {
        maxHeight: 200,
        overflow: "scroll",
    },
    addButton: {
        marginTop: 8,
        borderColor: "#fefee3",
        borderWidth: 1,
    },
});

export default ResourceEditor;
