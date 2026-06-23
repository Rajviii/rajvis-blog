const { PrismaClient } = require('./src/generated/prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
require('dotenv').config({ path: '.env' });

// run this - node seed-fun-break.js

const WEBSITES_DATA = [
  {
    title: "Radio Garden",
    image: "/websites/radio-garden.png",
    description: "Explore live radio stations around the globe on a 3D interactive globe.",
    discoveredBy: "Found while exploring unique audio-visual internet projects.",
    url: "https://radio.garden",
    category: "Music"
  },
  {
    title: "This Person Does Not Exist",
    image: "/websites/tpdne.png",
    description: "Generates realistic human faces using GAN algorithms on every refresh.",
    discoveredBy: "Found in a directory of generative AI visual experiments.",
    url: "https://thispersondoesnotexist.com",
    category: "Creativity"
  },
  {
    title: "Little Alchemy",
    image: "/websites/little-alchemy.png",
    description: "Combine basic elements (air, earth, fire, water) to create dinosaurs, spaceships, and more.",
    discoveredBy: "Discovered during a classic web game archive search.",
    url: "https://littlealchemy.com",
    category: "Creativity"
  },
  {
    title: "Music Map",
    image: "/websites/music-map.png",
    description: "Visual database that maps related bands and musicians based on listening profiles.",
    discoveredBy: "Recommended in an audio design community thread.",
    url: "https://www.music-map.com",
    category: "Music"
  },
  {
    title: "Neal.fun",
    image: "/websites/neal-fun.png",
    description: "A sandbox of highly engaging interactive tools, historical logs, and simulation games.",
    discoveredBy: "Bookmarked from an internet-culture newsletter.",
    url: "https://neal.fun",
    category: "Learning"
  },
  {
    title: "Window Swap",
    image: "/websites/window-swap.png",
    description: "Look through a random window anywhere in the world, uploaded by travelers.",
    discoveredBy: "Found during a search for ambient remote-scenery feeds.",
    url: "https://www.window-swap.com",
    category: "Explore"
  },
  {
    title: "Pointer Pointer",
    image: "/websites/pointer-pointer.png",
    description: "Finds an image of a person pointing exactly where your cursor is resting on the screen.",
    discoveredBy: "A legendary piece of useless web history.",
    url: "https://pointerpointer.com",
    category: "Fun"
  },
  {
    title: "Zoomquilt",
    image: "/websites/zoomquilt.png",
    description: "An infinite, hypnotically zooming surreal artwork that loops forever.",
    discoveredBy: "Found in a compilation of mind-bending fractal art portals.",
    url: "https://zoomquilt.org",
    category: "Fun"
  },
  {
    title: "Earth Nullschool",
    image: "/websites/earth-nullschool.png",
    description: "Real-time 3D wind, ocean currents, temperatures, and global weather maps.",
    discoveredBy: "Discovered while researching global climate sensors.",
    url: "https://earth.nullschool.net",
    category: "Explore"
  },
  {
    title: "The Useless Web",
    image: "/websites/useless-web.png",
    description: "Takes you to a random, funny, and entirely useless website with a single click.",
    discoveredBy: "A classic portal for odd internet history.",
    url: "https://theuselessweb.com",
    category: "Random"
  },
  {
    title: "Patatap",
    image: "/websites/patatap.png",
    description: "Turn your keyboard into an animation and soundboard machine.",
    discoveredBy: "Found in an interactive web-audio library.",
    url: "https://patatap.com",
    category: "Random"
  }
];

async function main() {
  console.log("Seeding Fun Break websites...");
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    // Delete existing FunBreakSite items to avoid duplicates
    await prisma.funBreakSite.deleteMany({});

    // Seed new websites
    for (const site of WEBSITES_DATA) {
      await prisma.funBreakSite.create({
        data: {
          title: site.title,
          image: site.image,
          description: site.description,
          discoveredBy: site.discoveredBy,
          url: site.url,
          category: site.category,
          displayOnWeb: false // Default to false for all seeded sites
        }
      });
      console.log(`- Seeded: ${site.title}`);
    }
    console.log("Seeding complete successfully!");
  } catch (error) {
    console.error("Seeding error:", error);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
