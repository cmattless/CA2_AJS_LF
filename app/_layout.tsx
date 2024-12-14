import "@/global.css";

import { DarkTheme, Theme, ThemeProvider } from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { NAV_THEME } from "@/lib/constants";
import { PortalHost } from "@rn-primitives/portal";
import { SessionProvider } from "@/contexts/AuthContext";
import { ToastProvider } from "@/contexts/ToastContext";

const DARK_THEME: Theme = {
	...DarkTheme,
	colors: NAV_THEME.dark,
};

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	return (
		<SessionProvider>
			<ThemeProvider value={DARK_THEME}>
				<ToastProvider>
					<Stack></Stack>
					<PortalHost />
				</ToastProvider>
			</ThemeProvider>
		</SessionProvider>
	);
}
