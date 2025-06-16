import { useState } from "react";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import TokenList from "@/components/TokenList";
import TradingInterface from "@/components/TradingInterface";

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div
      className={cn(
        "min-h-screen transition-colors duration-300",
        isDarkMode ? "dark bg-black" : "bg-white"
      )}
    >
      <Header isDarkMode={isDarkMode} onThemeToggle={toggleTheme} />

      <div className="flex flex-col lg:flex-row gap-4 p-4 max-w-5xl mx-auto">
        <TokenList />
        <TradingInterface />
      </div>
    </div>
  );
};

export default Index;
