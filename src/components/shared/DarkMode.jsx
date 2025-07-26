import { Moon, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";

const DarkMode = () => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;
    return (
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div>
      {/* Dark Mode Toggle Button */}
      <button
        aria-label="Toggle Dark Mode"
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-full dark:hover:bg-gray-200 hover:bg-gray-700 transition"
      >
        {darkMode ? (
          <Sun className="w-5 h-5 text-yellow-500 " />
        ) : (
          <Moon className="w-5 h-5 text-gray-300" />
        )}
      </button>
    </div>
  );
};

export default DarkMode;
