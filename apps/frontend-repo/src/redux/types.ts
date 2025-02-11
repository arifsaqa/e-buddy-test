import { UserInfo } from "firebase/auth";

export interface AuthState {
  token: string | null;
  isLoggedin: boolean;
  user: UserInfo | null;
}
