export const runtime = "nodejs";

import { cookies } from "next/headers";
import { signAdminToken } from "../../../lib/auth";

const ADMIN_EMAIL = "admin@spacegen.com";
const ADMIN_PASSWORD = "Spacegen2026!";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // ❌ Invalid credentials
  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return new Response("Unauthorized", { status: 401 });
  }

  // ✅ Create JWT using auth.ts
  const token = signAdminToken({ email });

  // ✅ Set secure HTTP-only cookie
  (await
    cookies()).set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });

  return Response.json({ success: true });
}
