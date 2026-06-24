# 🎨 Rajvi's Blog

A modern, premium blog platform and interactive playground built with **Next.js 16 (App Router)**, **React 19**, **Prisma ORM**, and **Tailwind CSS v4**. It features a stunning glassmorphism design, full dynamic content management, and a custom interactive **Recharge Station** to play mini-games and explore curated utilities.

---

## ✨ Features

### 📖 Blog & Stories
* **Dynamic Article Categories**: Seamlessly browse and filter blog stories by topic with a responsive masonry/grid layout.
* **Rich Article Rendering**: Premium TipTap-based rich content display with clean typography and custom-tailored theme colors.
* **Author Profiles & Tags**: Dedicated tags and author associations for metadata tracking.

### 🎮 Recharge Station (Fun Break)
* **Interactive Mini-Games**:
  * 🤖 **Tic-Tac-Toe**: Play against a smart AI utilizing the minimax decision algorithm.
  * 🔢 **Number Guessing**: A fun, attempt-tracking visual feedback guessing game.
  * ✊ **RPS Showdown**: Classic Rock, Paper, Scissors showdown with scoreboard.
* **Curated Discoveries Grid**: Discover hand-picked fun tools across the internet.
* **Custom Logo Badge System**: Support for setting custom favicons/logos (e.g., `/wordle-favicon.ico`) with seamless fallback to category emojis.
* **Interactive Micro-Animations**: Card visual headers with gentle float animations, floating sparkles, and mockup dots that light up on hover.
* **Recent Visits Tracking**: Locally persisted history panel that shows recently clicked items with quick-jump links.

### 🛠️ Admin Dashboard
* **Full CRUD Operations**: Create, edit, and delete curated sites for the Fun Break dashboard.
* **Toggle Display Status**: Control visibility live with a single-click active/hidden toggle button.
* **Image Uploads**: Integrated image uploader to set custom thumbnails or logo assets.

---

## 🛠️ Technology Stack

* **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
* **Runtime**: [React 19](https://react.dev/)
* **ORM**: [Prisma v7](https://www.prisma.io/)
* **Database**: PostgreSQL
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & Glassmorphic Custom CSS
* **Icons**: [Lucide React](https://lucide.dev/)
* **Content Engine**: [TipTap Editor](https://tiptap.dev/)

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/Rajviii/rajvis-blog.git
cd rajvis-blog
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/rajvis_blog?schema=public"
```

### 3. Database Setup (Prisma)
Run database migrations and generate the Prisma Client:
```bash
npx prisma db push
```

### 4. Seed the Database
Seed the initial curated sites for the Fun Break dashboard:
```bash
node seed-fun-break.js
```

### 5. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the result!

---

## 🎨 Customizing Logos & Thumbnails

For Fun Break sites, you can upload or link custom logos to replace the default category emojis in the card badge:
1. Put your custom logo/favicon image inside the `public/` directory (e.g., `public/wordle-favicon.ico`).
2. Go to the Admin dashboard at `/admin/fun-break` and edit/add a record.
3. In the **Thumbnail Image URL** field, reference your image from the root path:
   ```
   /wordle-favicon.ico
   ```
4. Save the record. The client card will automatically render the favicon inside a floating circle badge with custom micro-animations!
