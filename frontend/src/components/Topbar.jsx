import {
  Moon,
  Sun,
} from "lucide-react";

import { useTheme } from "../context/ThemeContext";

export default function Topbar() {

  const {
    theme,
    toggleTheme
  } = useTheme();

  return (

    <header
      className="
  flex items-center justify-between
  border-b border-slate-200
  bg-white/70
  px-8 py-5
  backdrop-blur-xl

  dark:border-white/10
  dark:bg-white/5

  transition-colors duration-300
"
    >

      <div>

        <h1 className="text-2xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="mt-1 text-slate-400">
          Track your applications smarter.
        </p>

      </div>

      <button
        onClick={toggleTheme}

        className="
          rounded-2xl
          border border-white/10
          bg-white/5
          p-3
          transition-all duration-300

          hover:scale-105
          hover:bg-white/10
        "
      >

        {theme === "dark"
          ? <Sun />
          : <Moon />
        }

      </button>

    </header>
  );
}
