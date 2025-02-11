import { UserInfo } from "firebase/auth";

interface LoggedinUser
  extends Pick<UserInfo, "displayName" | "email" | "photoURL"> {}

export const parseJWT = (userToken: string) => {
  const base64Payload = userToken.split(".")[1];
  const payloadToken = Buffer.from(base64Payload ?? "", "base64");
  const payloadTokenString = payloadToken.toString();

  return JSON.parse(payloadTokenString ?? "{}") as UserInfo;
};
