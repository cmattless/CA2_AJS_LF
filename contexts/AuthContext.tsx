import { createContext, useContext, PropsWithChildren } from "react";
import { useStorageState } from "@/hooks/useStorageState.ts";
import { IAuthContext } from "@/types/contexts/auth/authcontext";

const AuthContext = createContext<IAuthContext | null>(null);
export function useSession() {
	const value = useContext(AuthContext);

	if (process.env.NODE_ENV !== "production") {
		if (!value) {
			throw new Error("useSession must be wrapped in a <SessionProvider>");
		}
	}

	return value as IAuthContext;
}

export function SessionProvider(props: PropsWithChildren) {
	const [[isLoading, session], setSession] = useStorageState("session");

	return (
		<AuthContext.Provider
			value={{
				signIn: (token: string) => {
					setSession(token);
				},
				signOut: () => {
					setSession(null);
				},
				session,
				isLoading,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
}
