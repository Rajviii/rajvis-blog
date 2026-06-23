import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const sites = await prisma.funBreakSite.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(sites);
  } catch (error) {
    console.error("Error fetching fun break sites:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, url, description, discoveredBy, category, image, displayOnWeb } = body;

    if (!title || !url || !description || !discoveredBy || !category) {
      return NextResponse.json(
        { error: "Missing required fields: title, url, description, discoveredBy, and category are required" },
        { status: 400 }
      );
    }

    const newSite = await prisma.funBreakSite.create({
      data: {
        title,
        url,
        description,
        discoveredBy,
        category,
        image: image || "",
        displayOnWeb: displayOnWeb ?? false,
      },
    });

    return NextResponse.json(newSite);
  } catch (error) {
    console.error("Error creating fun break site:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
