import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Limit file size (e.g., 4MB) to stay well under Vercel's 4.5MB limit
const MAX_FILE_SIZE = 4 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File exceeds 4MB limit" }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const data = Buffer.from(buffer);

    const media = await prisma.media.create({
      data: {
        filename: file.name,
        mimeType: file.type,
        data,
      },
    });

    const url = `/api/media/${media.id}`;

    return NextResponse.json({ url, id: media.id });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
