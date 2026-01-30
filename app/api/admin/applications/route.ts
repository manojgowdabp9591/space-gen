export const runtime = "nodejs";

import { connectDB } from "@/app/lib/mongodb";
import Application from "@/app/models/Application";
import { cookies } from "next/headers";
import { verifyAdminToken } from "@/app/lib/auth";

export async function GET() {
  // 🔐 Auth check
  const token = (await cookies()).get("token")?.value;
  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    verifyAdminToken(token);
  } catch {
    return new Response("Unauthorized", { status: 401 });
  }

  await connectDB();

  const applications = await Application.find()
    .sort({ createdAt: -1 })
    .lean();

  return Response.json(applications);
}
