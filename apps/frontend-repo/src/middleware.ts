import { NextRequest, NextResponse } from "next/server";
import { authRouteRegex, session_key } from "./config/app";
import { UserInfo } from "firebase/auth";

interface UserInfoWExp extends UserInfo {
  exp: number;
}
const parseJWT = (userToken: string) => {
  const base64Payload = userToken.split(".")[1];
  const payloadToken = Buffer.from(base64Payload ?? "", "base64");
  const payloadTokenString = payloadToken.toString();

  return JSON.parse(
    payloadTokenString ? payloadTokenString : "{}"
  ) as UserInfoWExp;
};

const baseURL = process.env.NEXT_PUBLIC_FE_URL;

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get(session_key)?.value;
  const getUserInfo = parseJWT(currentUser ?? "");
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const isProtectedRoutes = !authRouteRegex.test(request.nextUrl.pathname);

  if (
    isProtectedRoutes &&
    (!currentUser || currentTimestamp > getUserInfo.exp)
  ) {
    request.cookies.delete(session_key);
    const response = NextResponse.redirect(baseURL + "/auth/login");
    return response;
  }

  if (!isProtectedRoutes && currentUser) {
    return NextResponse.redirect(baseURL + "/");
  }
}

export const config = {
  // /((?!.*\\.).*)
  matcher: ["/((?!_next/static|_next/image|api/*|favicon.ico|.*\\.).*)"],
};
