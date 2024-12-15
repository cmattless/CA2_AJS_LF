import { IUserType } from "@/types/models/";
export interface IAuthContext {
  signIn: (token: string) => void;
  signOut: () => void;
  isValidJwt: (session: { jwt: string }) => boolean;
  user?: IUserType | null;
  setUser: any;
  session?: string | null;
  isLoading: boolean;
}