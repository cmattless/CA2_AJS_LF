import {
	createContext,
	useContext,
	PropsWithChildren,
	useState,
	useEffect,
} from "react";
import { IUserContext, IUserType } from "@/types/contexts/usercontext";
import { useAuth } from "@/contexts/authContext"; // Import the useAuth hook

const UserContext = createContext<IUserContext | null>(null);

export function useUser() {
	const value = useContext(UserContext);

	if (process.env.NODE_ENV !== "production") {
		if (!value) {
			throw new Error("useUser must be wrapped in a <UserProvider>");
		}
	}

	return value as IUserContext;
}

export function UserProvider(props: PropsWithChildren) {
	const { session } = useAuth(); // Get session from AuthContext
	const [user, setUser] = useState<IUserType | null>(null);
	const [isLoading, setIsLoading] = useState<Boolean>(true);

	useEffect(() => {
		async function fetchUser() {
			try {
				const response = await fetch("/api/users/me");
				const userData = await response.json();
				setUser(userData);
			} catch (error) {
				console.error("Failed to fetch user:", error);
			} finally {
				setIsLoading(false);
			}
		}

		if (session && !user) {
			// Fetch user only if session exists
			fetchUser();
		} else {
			setIsLoading(false);
		}
	}, [session, user]);

	return (
		<UserContext.Provider
			value={{
				user,
				isLoading,
			}}
		>
			{props.children}
		</UserContext.Provider>
	);
}
