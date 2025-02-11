import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { token } = (await request.json()) as { token: string };
  const cookieStore = await cookies();

  cookieStore.set("nextjs-token", token, {
    httpOnly: true,
    maxAge: 60 * 60,
  });

  return new Response("success set token cookie", {
    status: 200,
  });
}

export async function DELETE(request: Request) {
  const cookieStore = await cookies();

  cookieStore.set("nextjs-token", "", {
    httpOnly: true,
    maxAge: 0,
  });
  
  return new Response("success set token cookie", {
    status: 200,
  });
}
