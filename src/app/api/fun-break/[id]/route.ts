import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, url, description, discoveredBy, category, image, displayOnWeb } = body;

    const updatedSite = await prisma.funBreakSite.update({
      where: { id },
      data: {
        title,
        url,
        description,
        discoveredBy,
        category,
        image,
        displayOnWeb,
      },
    });

    return NextResponse.json(updatedSite);
  } catch (error) {
    console.error("Error updating fun break site:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.funBreakSite.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting fun break site:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
