"use client";

import * as React from "react";
import Link from "next/link";
import {
  Search, Heart, Sparkles, ExternalLink, RotateCcw,
  Gamepad2, Bookmark, Check, History, ArrowRight, HelpCircle
} from "lucide-react";

// Website TypeScript Interface
export interface Website {
  id: string; // CUID String ID
  title: string;
  image: string; // Fallback to CSS gradient mesh
  description: string;
  discoveredBy: string;
  url: string;
  category: string;
}

// Category Tabs Configuration
const CATEGORIES = [
  { id: "all", label: "All", emoji: "✨" },
  { id: "creativity", label: "Creativity", emoji: "🎨" },
  { id: "music", label: "Music", emoji: "🎵" },
  { id: "learning", label: "Learning", emoji: "🧠" },
  { id: "fun", label: "Fun", emoji: "😂" },
  { id: "explore", label: "Explore", emoji: "🌎" },
  { id: "games", label: "Games", emoji: "🎮" },
  { id: "random", label: "Random", emoji: "⚡" },
  { id: "bookmarks", label: "Bookmarks", emoji: "❤️" }
];

export default function FunBreakClient({ initialWebsites = [] }: { initialWebsites?: Website[] }) {
  // Filters & Tabs State
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("all");

  // LocalStorage State (Bookmarks & Recents)
  const [bookmarks, setBookmarks] = React.useState<string[]>([]);
  const [recentVisited, setRecentVisited] = React.useState<string[]>([]);
  const [mounted, setMounted] = React.useState(false);

  // Tic-Tac-Toe Game State
  const [tttBoard, setTttBoard] = React.useState<(string | null)[]>(Array(9).fill(null));
  const [tttScores, setTttScores] = React.useState({ player: 0, ai: 0, draws: 0 });
  const [tttStatus, setTttStatus] = React.useState<string>("Your turn! Play X.");
  const [isAiThinking, setIsAiThinking] = React.useState(false);

  // Number Guessing Game State
  const [guessTarget, setGuessTarget] = React.useState<number>(1);
  const [guessInput, setGuessInput] = React.useState<string>("");
  const [guessFeedback, setGuessFeedback] = React.useState<string>("Enter a guess to begin! 🔢");
  const [guessAttempts, setGuessAttempts] = React.useState<number>(0);
  const [guessSuccess, setGuessSuccess] = React.useState<boolean>(false);

  // Rock Paper Scissors Game State
  const [rpsChoices, setRpsChoices] = React.useState<{ player: string | null; computer: string | null }>({ player: null, computer: null });
  const [rpsResult, setRpsResult] = React.useState<string>("Choose Rock, Paper, or Scissors!");
  const [rpsScores, setRpsScores] = React.useState({ player: 0, computer: 0 });

  // Initialize client-side data
  React.useEffect(() => {
    setMounted(true);
    // Load Bookmarks
    const savedBookmarks = localStorage.getItem("funbreak_bookmarks");
    if (savedBookmarks) {
      try {
        setBookmarks(JSON.parse(savedBookmarks));
      } catch (e) {
        console.error(e);
      }
    }
    // Load Recents
    const savedRecents = localStorage.getItem("funbreak_recent");
    if (savedRecents) {
      try {
        setRecentVisited(JSON.parse(savedRecents));
      } catch (e) {
        console.error(e);
      }
    }
    // Set Guess Target
    setGuessTarget(Math.floor(Math.random() * 100) + 1);
  }, []);

  // Sync Bookmarks to LocalStorage
  const toggleBookmark = (id: string) => {
    const updated = bookmarks.includes(id)
      ? bookmarks.filter((bId) => bId !== id)
      : [...bookmarks, id];
    setBookmarks(updated);
    localStorage.setItem("funbreak_bookmarks", JSON.stringify(updated));
  };

  // Sync Visited to LocalStorage
  const recordVisit = (id: string) => {
    const filtered = recentVisited.filter((vId) => vId !== id);
    const updated = [id, ...filtered].slice(0, 5); // Max 5 items
    setRecentVisited(updated);
    localStorage.setItem("funbreak_recent", JSON.stringify(updated));
  };

  // Clear Recent Visited
  const clearRecents = () => {
    setRecentVisited([]);
    localStorage.removeItem("funbreak_recent");
  };

  // Custom Mesh Gradients based on Category (subtle gradients to match UI theme)
  const getGradientForCategory = (category: string) => {
    switch (category.toLowerCase()) {
      case "creativity":
        return "from-violet-500/10 via-pink-500/5 to-transparent dark:from-violet-500/15 dark:via-pink-500/5";
      case "music":
        return "from-emerald-500/10 via-sky-600/5 to-transparent dark:from-emerald-500/15 dark:via-sky-600/5";
      case "learning":
        return "from-blue-500/10 via-cyan-500/5 to-transparent dark:from-blue-500/15 dark:via-cyan-500/5";
      case "fun":
        return "from-red-500/10 via-amber-600/5 to-transparent dark:from-red-500/15 dark:via-amber-600/5";
      case "explore":
        return "from-teal-500/10 via-emerald-600/5 to-transparent dark:from-teal-500/15 dark:via-emerald-600/5";
      case "random":
        return "from-slate-500/10 via-zinc-500/5 to-transparent dark:from-slate-500/15 dark:via-zinc-500/5";
      default:
        return "from-indigo-500/10 via-purple-600/5 to-transparent dark:from-indigo-500/15 dark:via-purple-600/5";
    }
  };

  // Custom Emojis based on Category
  const getIconForCategory = (category: string) => {
    switch (category.toLowerCase()) {
      case "creativity":
        return "🎨";
      case "music":
        return "🎵";
      case "learning":
        return "🧠";
      case "fun":
        return "😂";
      case "explore":
        return "🌎";
      case "random":
        return "⚡";
      default:
        return "✨";
    }
  };

  // Get categories logic (websites can belong to multiple categories)
  const getCategoriesForSite = (site: Website): string[] => {
    const primary = site.category;
    // Map secondary categories for the seeded sites
    const lowerTitle = site.title.toLowerCase();
    if (lowerTitle.includes("radio garden")) return ["Music", "Creativity"];
    if (lowerTitle.includes("little alchemy")) return ["Creativity", "Fun"];
    if (lowerTitle.includes("neal.fun")) return ["Learning", "Fun"];
    if (lowerTitle.includes("window swap")) return ["Explore", "Learning"];
    if (lowerTitle.includes("pointer pointer")) return ["Fun", "Random"];
    if (lowerTitle.includes("zoomquilt")) return ["Fun", "Creativity"];
    if (lowerTitle.includes("the useless web")) return ["Random", "Fun"];
    if (lowerTitle.includes("patatap")) return ["Random", "Music"];
    return [primary];
  };

  // Filter Logic
  const filteredWebsites = initialWebsites.filter((site) => {
    // Search filter
    const matchesSearch = site.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // Category filter
    if (activeTab === "all") return true;
    if (activeTab === "bookmarks") return bookmarks.includes(site.id);
    if (activeTab === "games") return false;

    const siteCategories = getCategoriesForSite(site).map(c => c.toLowerCase());
    return siteCategories.includes(activeTab.toLowerCase());
  });

  // Tic-Tac-Toe Smart AI Logic
  const checkTttWinner = (board: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    if (board.every(cell => cell !== null)) {
      return "draw";
    }
    return null;
  };

  const tttMinimax = (board: (string | null)[], depth: number, isMaximizing: boolean): number => {
    const result = checkTttWinner(board);
    if (result === "O") return 10 - depth; // AI wins
    if (result === "X") return depth - 10; // Human wins
    if (result === "draw") return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = "O";
          let score = tttMinimax(board, depth + 1, false);
          board[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = "X";
          let score = tttMinimax(board, depth + 1, true);
          board[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const getTttBestMove = (board: (string | null)[]): number => {
    let bestScore = -Infinity;
    let move = -1;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = "O";
        let score = tttMinimax(board, 0, false);
        board[i] = null;
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
  };

  const handleTttClick = (index: number) => {
    if (isAiThinking || tttBoard[index] !== null || checkTttWinner(tttBoard) !== null) return;

    // Human move
    const newBoard = [...tttBoard];
    newBoard[index] = "X";
    setTttBoard(newBoard);

    const winner = checkTttWinner(newBoard);
    if (winner) {
      handleTttEnd(winner, newBoard);
      return;
    }

    setTttStatus("AI is calculating...");
    setIsAiThinking(true);

    // AI move
    setTimeout(() => {
      const bestMove = getTttBestMove(newBoard);
      if (bestMove !== -1) {
        newBoard[bestMove] = "O";
        setTttBoard(newBoard);

        const aiWinner = checkTttWinner(newBoard);
        if (aiWinner) {
          handleTttEnd(aiWinner, newBoard);
        } else {
          setTttStatus("Your turn! Play X.");
        }
      }
      setIsAiThinking(false);
    }, 450);
  };

  const handleTttEnd = (winner: string, board: (string | null)[]) => {
    if (winner === "X") {
      setTttScores(prev => ({ ...prev, player: prev.player + 1 }));
      setTttStatus("You won! 🎉 Brilliant job.");
    } else if (winner === "O") {
      setTttScores(prev => ({ ...prev, ai: prev.ai + 1 }));
      setTttStatus("AI won! 🤖 Next time for sure.");
    } else {
      setTttScores(prev => ({ ...prev, draws: prev.draws + 1 }));
      setTttStatus("It's a draw! 🤝 Close match.");
    }
  };

  const resetTtt = () => {
    setTttBoard(Array(9).fill(null));
    setTttStatus("Your turn! Play X.");
    setIsAiThinking(false);
  };

  // Guessing Game Logic
  const handleGuessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const guess = parseInt(guessInput);
    if (isNaN(guess) || guess < 1 || guess > 100) {
      setGuessFeedback("Please enter a valid number between 1 and 100! ⚠️");
      return;
    }

    const currentAttempts = guessAttempts + 1;
    setGuessAttempts(currentAttempts);

    if (guess === guessTarget) {
      setGuessFeedback(`Correct! You got it in ${currentAttempts} attempts. 🎉`);
      setGuessSuccess(true);
    } else if (guess < guessTarget) {
      setGuessFeedback("Too low! Try a higher number. 📈");
    } else {
      setGuessFeedback("Too high! Try a lower number. 📉");
    }
    setGuessInput("");
  };

  const resetGuessGame = () => {
    setGuessTarget(Math.floor(Math.random() * 100) + 1);
    setGuessInput("");
    setGuessAttempts(0);
    setGuessFeedback("Enter a guess to begin! 🔢");
    setGuessSuccess(false);
  };

  // Rock Paper Scissors Logic
  const handleRpsPlay = (playerChoice: string) => {
    const choices = ["Rock", "Paper", "Scissors"];
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    setRpsChoices({ player: playerChoice, computer: computerChoice });

    if (playerChoice === computerChoice) {
      setRpsResult(`It's a draw! Both chose ${playerChoice} 🤝`);
    } else if (
      (playerChoice === "Rock" && computerChoice === "Scissors") ||
      (playerChoice === "Paper" && computerChoice === "Rock") ||
      (playerChoice === "Scissors" && computerChoice === "Paper")
    ) {
      setRpsResult(`You win! ${playerChoice} beats ${computerChoice} 🎉`);
      setRpsScores(prev => ({ ...prev, player: prev.player + 1 }));
    } else {
      setRpsResult(`Computer wins! ${computerChoice} beats ${playerChoice} 🤖`);
      setRpsScores(prev => ({ ...prev, computer: prev.computer + 1 }));
    }
  };

  const resetRps = () => {
    setRpsChoices({ player: null, computer: null });
    setRpsResult("Choose Rock, Paper, or Scissors!");
    setRpsScores({ player: 0, computer: 0 });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-body selection:bg-primary/30">

      {/* Decorative Blur Background Blob */}
      <div className="absolute top-0 inset-x-0 h-[450px] bg-gradient-to-b from-primary/5 dark:from-primary/10 via-transparent to-transparent pointer-events-none z-0" />

      {/* Main Container */}
      <main className="flex-grow container mx-auto px-4 py-16 relative z-10 max-w-6xl">

        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            RECHARGE STATION
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold font-heading tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 via-zinc-900 to-black dark:from-white dark:via-zinc-200 dark:to-zinc-400">
            Take a Fun Break
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg md:text-xl font-light">
            Curated websites, fun tools, and mini-games discovered across the internet.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto pt-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools, games, or websites..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-background/50 border border-border focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none text-sm placeholder:text-muted-foreground backdrop-blur-md transition-all shadow-md dark:shadow-lg text-foreground"
              />
            </div>
          </div>
        </div>

        {/* Tab & Grid Area */}
        <div className="space-y-12">

          {/* Navigation Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 border-b border-border pb-6">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                  activeTab === cat.id
                    ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "bg-background/50 border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground/50 hover:bg-background"
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Recently Visited Panel */}
          {mounted && recentVisited.length > 0 && (
            <div className="p-6 rounded-3xl bg-muted/30 border border-border backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-primary" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Recently Visited</h3>
                </div>
                <button onClick={clearRecents} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Clear History
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentVisited.map((id) => {
                  const site = initialWebsites.find((s) => s.id === id);
                  if (!site) return null;
                  return (
                    <a
                      key={site.id}
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => recordVisit(site.id)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border text-xs text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground transition-all hover:scale-102"
                    >
                      {site.image ? (
                        <img src={site.image} alt="" className="w-3.5 h-3.5 object-contain rounded-xs" />
                      ) : (
                        <span>{getIconForCategory(site.category)}</span>
                      )}
                      <span>{site.title}</span>
                      <ExternalLink className="w-3 h-3 text-muted-foreground" />
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {/* Cards Grid */}
          {activeTab === "games" ? (
            /* Custom View when Games Tab is selected */
            <div className="text-center py-16 bg-muted/20 border border-border rounded-3xl backdrop-blur-sm max-w-xl mx-auto space-y-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                <Gamepad2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-foreground">Interactive Quick Games</h3>
              <p className="text-muted-foreground max-w-sm mx-auto text-sm">
                We've built 3 retro games directly inside this dashboard! Click the button below to scroll down and start playing.
              </p>
              <button
                onClick={() => {
                  document.getElementById("quick-games")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/95 transition-all shadow-lg hover:scale-102 text-sm"
              >
                Go to Games <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : filteredWebsites.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWebsites.map((site) => {
                const isBookmarked = bookmarks.includes(site.id);
                return (
                  <article
                    key={site.id}
                    className="group relative flex flex-col glass rounded-2xl overflow-hidden hover:border-primary/20 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Visual Card Image (Subtle Glass Gradient Mockup) */}
                    <div className={`relative h-28 w-full bg-gradient-to-br ${getGradientForCategory(site.category)} bg-zinc-950/20 dark:bg-zinc-950/40 flex items-center justify-center p-6 text-white overflow-hidden border-b border-border/50`}>
                      {/* Browser Mockup Top bar - interactive light-up dots */}
                      <div className="absolute top-3 left-3 flex space-x-1.5 z-10">
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-400/30 dark:bg-zinc-600/40 group-hover:bg-red-500/70 transition-all duration-300" />
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-400/30 dark:bg-zinc-600/40 group-hover:bg-amber-500/70 transition-all duration-300" />
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-400/30 dark:bg-zinc-600/40 group-hover:bg-emerald-500/70 transition-all duration-300" />
                      </div>

                      {/* Interactive Sparkles that fade in and float on hover */}
                      <Sparkles className="absolute top-4 left-10 w-3.5 h-3.5 text-primary/40 opacity-0 group-hover:opacity-80 group-hover:scale-110 group-hover:-translate-y-1 group-hover:rotate-12 transition-all duration-700 ease-out pointer-events-none" />
                      <Sparkles className="absolute bottom-4 right-10 w-3 h-3 text-secondary/40 opacity-0 group-hover:opacity-80 group-hover:scale-110 group-hover:translate-y-1 group-hover:-rotate-12 transition-all duration-500 ease-out pointer-events-none" />

                      {/* Floating Circle Badge for Category Emoji or Custom Logo */}
                      <div className="w-12 h-12 rounded-full bg-background/60 dark:bg-zinc-900/60 border border-border/80 flex items-center justify-center shadow-sm group-hover:border-primary/30 group-hover:shadow-md transition-all duration-500 animate-float z-10 overflow-hidden">
                        {site.image ? (
                          <img
                            src={site.image}
                            alt={`${site.title} logo`}
                            className="w-7 h-7 object-contain select-none transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                          />
                        ) : (
                          <span className="text-2xl filter drop-shadow-sm select-none transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                            {getIconForCategory(site.category)}
                          </span>
                        )}
                      </div>

                      {/* Subtle Grid background texture overlay */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
                    </div>

                    {/* Bookmark Toggle Badge */}
                    <button
                      onClick={() => toggleBookmark(site.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-background/70 dark:bg-background/40 backdrop-blur-md border border-border hover:bg-background text-foreground transition-colors shadow-xs z-20"
                      aria-label={isBookmarked ? "Remove from bookmarks" : "Bookmark website"}
                    >
                      <Heart className={`w-4 h-4 ${isBookmarked ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
                    </button>

                    {/* Content details */}
                    <div className="p-6 flex flex-col flex-grow space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                          {site.category}
                        </span>
                        <span className="text-[10px] text-muted-foreground italic">
                          Discovered
                        </span>
                      </div>

                      <h3 className="text-lg font-bold font-heading text-foreground group-hover:text-primary transition-colors">
                        {site.title}
                      </h3>

                      <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed flex-grow">
                        {site.description}
                      </p>

                      <div className="text-[10px] text-muted-foreground bg-muted/40 p-2.5 rounded-lg border border-border">
                        <span className="font-semibold text-muted-foreground">Discover:</span> {site.discoveredBy}
                      </div>

                      <a
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => recordVisit(site.id)}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold bg-muted hover:bg-primary hover:text-primary-foreground border border-border hover:border-primary rounded-xl transition-all text-foreground"
                      >
                        Visit Website <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-20 bg-muted/10 border border-border rounded-2xl max-w-md mx-auto space-y-4">
              <div className="w-12 h-12 rounded-full bg-muted border border-border flex items-center justify-center mx-auto text-muted-foreground">
                <Bookmark className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground">No tools found</h3>
              <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                No items match your search. Make sure to check spelling or toggle a different tab.
              </p>
            </div>
          )}

        </div>

        {/* Quick Games Section */}
        <section id="quick-games" className="mt-32 pt-20 border-t border-border space-y-12">

          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
              🎮 NO STRESS ZONE
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-foreground">
              Quick Games
            </h2>
            <p className="text-muted-foreground max-w-sm mx-auto text-sm">
              Keep your brain sharp. Play simple retro games in your browser.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Game A: Tic-Tac-Toe */}
            <div className="p-6 rounded-3xl glass flex flex-col space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-lg text-foreground">Tic-Tac-Toe</h3>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded border border-border">Smart AI</span>
              </div>

              {/* Gameboard */}
              <div className="grid grid-cols-3 gap-2 aspect-square max-w-[240px] mx-auto w-full">
                {tttBoard.map((cell, idx) => (
                  <button
                    key={idx}
                    disabled={isAiThinking || cell !== null || checkTttWinner(tttBoard) !== null}
                    onClick={() => handleTttClick(idx)}
                    className="aspect-square rounded-xl bg-muted hover:bg-muted/80 text-2xl font-black flex items-center justify-center transition-colors border border-border text-foreground disabled:opacity-80 disabled:cursor-not-allowed"
                  >
                    <span className={cell === "X" ? "text-primary animate-scale-up" : "text-amber-500 animate-scale-up"}>
                      {cell}
                    </span>
                  </button>
                ))}
              </div>

              {/* Status display */}
              <div className="text-center py-2 text-xs font-medium text-foreground bg-muted/60 rounded-xl border border-border">
                {tttStatus}
              </div>

              {/* Score panel */}
              <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-muted-foreground">
                <div className="bg-muted/40 p-2 rounded-lg border border-border">
                  <div className="text-muted-foreground">YOU (X)</div>
                  <div className="text-sm font-bold text-foreground mt-0.5">{tttScores.player}</div>
                </div>
                <div className="bg-muted/40 p-2 rounded-lg border border-border">
                  <div className="text-muted-foreground">AI (O)</div>
                  <div className="text-sm font-bold text-foreground mt-0.5">{tttScores.ai}</div>
                </div>
                <div className="bg-muted/40 p-2 rounded-lg border border-border">
                  <div className="text-muted-foreground">DRAWS</div>
                  <div className="text-sm font-bold text-foreground mt-0.5">{tttScores.draws}</div>
                </div>
              </div>

              {/* Restart Button */}
              <button
                onClick={resetTtt}
                className="w-full py-2.5 flex items-center justify-center gap-2 rounded-xl bg-muted hover:bg-muted/80 border border-border hover:border-muted-foreground/30 transition-colors text-xs font-bold text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Restart Board
              </button>
            </div>

            {/* Game B: Number Guessing */}
            <div className="p-6 rounded-3xl glass flex flex-col space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-lg text-foreground">Number Guessing</h3>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded border border-border">1 - 100</span>
              </div>

              <div className="space-y-4 flex-grow flex flex-col justify-center">
                <div className="text-center p-4 rounded-2xl bg-muted border border-border min-h-[90px] flex items-center justify-center">
                  <p className="text-sm font-medium text-foreground leading-relaxed">
                    {guessFeedback}
                  </p>
                </div>

                {/* Guess input form */}
                <form onSubmit={handleGuessSubmit} className="flex gap-2">
                  <input
                    type="number"
                    disabled={guessSuccess}
                    value={guessInput}
                    onChange={(e) => setGuessInput(e.target.value)}
                    placeholder="Enter 1-100"
                    className="flex-grow px-3 py-2.5 rounded-xl bg-background border border-border focus:border-primary outline-none text-sm text-center disabled:opacity-50 text-foreground"
                  />
                  <button
                    type="submit"
                    disabled={guessSuccess}
                    className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors text-xs disabled:opacity-50"
                  >
                    Guess
                  </button>
                </form>
              </div>

              {/* Stats panel */}
              <div className="bg-muted/40 p-3 rounded-xl border border-border text-center">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Attempts:</span>
                <span className="text-sm font-bold text-foreground ml-2">{guessAttempts}</span>
              </div>

              {/* Play Again Button */}
              <button
                onClick={resetGuessGame}
                className="w-full py-2.5 flex items-center justify-center gap-2 rounded-xl bg-muted hover:bg-muted/80 border border-border hover:border-muted-foreground/30 transition-colors text-xs font-bold text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Play Again
              </button>
            </div>

            {/* Game C: Rock Paper Scissors */}
            <div className="p-6 rounded-3xl glass flex flex-col space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-lg text-foreground">RPS Showdown</h3>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded border border-border">Classic</span>
              </div>

              <div className="space-y-4 flex-grow flex flex-col justify-center">
                {/* Result Message */}
                <div className="text-center p-3 rounded-2xl bg-muted border border-border min-h-[64px] flex items-center justify-center text-xs font-semibold text-foreground">
                  {rpsResult}
                </div>

                {/* Selection Visuals */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-muted/40 p-3 rounded-xl border border-border flex flex-col items-center">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">You chose</span>
                    <span className="text-2xl mt-1 select-none">
                      {rpsChoices.player === "Rock" && "✊"}
                      {rpsChoices.player === "Paper" && "✋"}
                      {rpsChoices.player === "Scissors" && "✌️"}
                      {!rpsChoices.player && "❓"}
                    </span>
                  </div>
                  <div className="bg-muted/40 p-3 rounded-xl border border-border flex flex-col items-center">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Computer chose</span>
                    <span className="text-2xl mt-1 select-none">
                      {rpsChoices.computer === "Rock" && "✊"}
                      {rpsChoices.computer === "Paper" && "✋"}
                      {rpsChoices.computer === "Scissors" && "✌️"}
                      {!rpsChoices.computer && "❓"}
                    </span>
                  </div>
                </div>

                {/* Hand button selections */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleRpsPlay("Rock")}
                    className="py-2.5 rounded-xl bg-muted hover:bg-muted/80 border border-border text-center transition-all hover:scale-105 active:scale-95 text-foreground text-xs font-bold"
                  >
                    ✊ Rock
                  </button>
                  <button
                    onClick={() => handleRpsPlay("Paper")}
                    className="py-2.5 rounded-xl bg-muted hover:bg-muted/80 border border-border text-center transition-all hover:scale-105 active:scale-95 text-foreground text-xs font-bold"
                  >
                    ✋ Paper
                  </button>
                  <button
                    onClick={() => handleRpsPlay("Scissors")}
                    className="py-2.5 rounded-xl bg-muted hover:bg-muted/80 border border-border text-center transition-all hover:scale-105 active:scale-95 text-foreground text-xs font-bold"
                  >
                    ✌️ Scissors
                  </button>
                </div>
              </div>

              {/* Scoreboard stats */}
              <div className="grid grid-cols-2 gap-2 text-center text-[10px] text-muted-foreground">
                <div className="bg-muted/40 p-2.5 rounded-lg border border-border">
                  <span className="text-muted-foreground">PLAYER SCORE</span>
                  <span className="text-sm font-bold text-foreground block mt-0.5">{rpsScores.player}</span>
                </div>
                <div className="bg-muted/40 p-2.5 rounded-lg border border-border">
                  <span className="text-muted-foreground">COMP SCORE</span>
                  <span className="text-sm font-bold text-foreground block mt-0.5">{rpsScores.computer}</span>
                </div>
              </div>

              {/* Reset button */}
              <button
                onClick={resetRps}
                className="w-full py-2.5 flex items-center justify-center gap-2 rounded-xl bg-muted hover:bg-muted/80 border border-border hover:border-muted-foreground/30 transition-colors text-xs font-bold text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset Score
              </button>
            </div>

          </div>

        </section>

      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-background text-center relative z-10 text-xs text-muted-foreground">
        <p className="font-light italic tracking-wide">"Curated with curiosity."</p>
      </footer>

    </div>
  );
}
