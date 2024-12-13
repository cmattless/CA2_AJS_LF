import { IUserType } from "../usercontext";
export interface IAuthContext {
  signIn: (token: string) => void;
  signOut: () => void;
  user?: IUserType | null;
  setUser: any;
  session?: string | null;
  isLoading: boolean;
}