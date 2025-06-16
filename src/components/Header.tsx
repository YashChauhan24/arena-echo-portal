
import { Button } from "@/components/ui/button";
import { Moon, Sun, Wallet } from "lucide-react";

interface HeaderProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

const Header = ({ isDarkMode, onThemeToggle }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between p-3 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Button
        variant="outline"
        size="sm"
        onClick={onThemeToggle}
        className="rounded-full text-xs px-3 py-1.5 h-8"
      >
        {isDarkMode ? <Sun className="h-3 w-3 mr-1" /> : <Moon className="h-3 w-3 mr-1" />}
        {isDarkMode ? "light mode" : "dark mode"}
      </Button>
      
      <div className="text-center">
        <h1 className="text-lg font-normal tracking-wider sartoshi-brand">powered by tek</h1>
      </div>
      
      <Button variant="outline" size="sm" className="rounded-full text-xs px-3 py-1.5 h-8">
        <Wallet className="h-3 w-3 mr-1" />
        connect wallet
      </Button>
    </header>
  );
};

export default Header;
