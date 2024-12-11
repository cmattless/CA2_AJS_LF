import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@/components/ui/text";
import Animated, { FadeIn } from "react-native-reanimated";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { IDropdown } from "@/types/components/dropdown";

const Dropdown: React.FC<IDropdown> = ({ title }) => {
	return (
		<View>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline">{title}</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-64 bg-[#333333]  native:w-72">
					<DropdownMenuLabel className="text-destructive-foreground">
						
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem className="bg-destructive">
						<Text className="text-destructive-foreground">Log out</Text>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</View>
	);
};

const styles = StyleSheet.create({});

export default Dropdown;
