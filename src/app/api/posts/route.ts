import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const tag = searchParams.get("tag");

    const posts = await prisma.post.findMany({
      where: {
        published: true,
        ...(category ? { category: { slug: category } } : {}),
        ...(tag ? { tags: { some: { slug: tag } } } : {}),
      },
      include: {
        author: true,
        category: true,
        tags: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, slug, content, authorId, categoryId, excerpt, featuredImage } = body;

    // Fallback to first user if no authorId provided
    let finalAuthorId = authorId;
    if (!finalAuthorId) {
      const user = await prisma.user.findFirst();
      if (user) {
        finalAuthorId = user.id;
      } else {
        return NextResponse.json({ error: "No author found" }, { status: 400 });
      }
    }

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        featuredImage,
        authorId: finalAuthorId,
        categoryId,
        published: true, // Auto-publish for now
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
