import { prisma } from "@/lib/prisma";
import FunBreakClient from "./FunBreakClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Fun Break - Relax & Recharge",
  description: "Take a quick break and explore curated websites, mini tools, and small games. Curated with curiosity.",
};

export default async function FunBreakPage() {
  // Fetch only websites that have displayOnWeb set to true
  const websites = await prisma.funBreakSite.findMany({
    where: { displayOnWeb: true },
    orderBy: { createdAt: "asc" },
  });

  // Format database models to match the Client interface
  const formattedWebsites = websites.map((site) => ({
    id: site.id, // String CUID
    title: site.title,
    image: site.image || "",
    description: site.description,
    discoveredBy: site.discoveredBy,
    url: site.url,
    category: site.category,
  }));

  return <FunBreakClient initialWebsites={formattedWebsites} />;
}
