import { createContext, useContext, PropsWithChildren, useState, useEffect } from "react";
import { useStorageState } from "@/hooks/useStorageState.ts";
import useRequests from "@/hooks/useRequests";
import { IAuthContext } from "@/types/contexts/auth/authcontext";
import { IUserType } from "@/types/models";

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
	const { sendRequest } = useRequests();
	const [user, setUser] = useState<IUserType | undefined>(undefined);


	useEffect(() => {
		if (session) {
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
		}
	}	, [session]);


	function isValidJwt(session: { jwt: string }): boolean {
		try {
			const payload = JSON.parse(atob(session.jwt.split(".")[1]));
			if ( !(payload.exp * 1000 > Date.now())){
				setSession(null);
				localStorage.removeItem("session");
				return false;
			}
			return true;
		} catch (e) {
			return false;
		}
	}

	return (
		<AuthContext.Provider
			value={{
				signIn: (token: string) => {
					setSession(token);
				},
				signOut: () => {},
				isValidJwt,
				session,
				user,
				setUser,
				isLoading,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
}
