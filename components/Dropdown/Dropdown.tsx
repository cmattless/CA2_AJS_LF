import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { useSession } from "@/contexts/AuthContext";
import useRequests from "@/hooks/useRequests";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

import { IDropdown } from "@/types/components/dropdown";
import { IUserType } from "@/types/models";

const Dropdown: React.FC<IDropdown> = ({ title }) => {
	const { session, setUser, user, signOut } = useSession();

	const { loading, error, sendRequest } = useRequests();

	React.useEffect(() => {
		const fetchUser = async () => {
			try {
				const data: IUserType = await sendRequest({
					endpoint: "/users/me",
					headers: {
						authorization: `Bearer ${session}`,
					},
				});
				setUser(data);
			} catch (err) {
				console.error("Error fetching user:", err);
			}
		};

		fetchUser();
	}, [sendRequest, session]);

	return (
		<View>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button className="text-white font-bold" variant="ghost">{title}</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-64 bg-[#333333] native:w-72">
					<DropdownMenuLabel className="text-destructive-foreground">
						{user?.username ? (
							user.username
						) : (
							<Skeleton className={"w-20 h-4"} />
						)}
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem onPress={() => {signOut()}} className="bg-destructive">
						<Text className="text-destructive-foreground">Log out</Text>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</View>
	);
};

const styles = StyleSheet.create({});

export default Dropdown;
