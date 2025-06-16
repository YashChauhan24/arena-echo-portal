import { Button } from "@/components/ui/button";
import { Moon, Sun, Wallet } from "lucide-react";

interface HeaderProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

const Header = ({ isDarkMode, onThemeToggle }: HeaderProps) => {
  return (
    <header className="flex flex-col items-center gap-4 p-3 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:flex-row md:justify-between">
      <div className="order-2 md:order-1">
        <Button
          variant="outline"
          size="sm"
          onClick={onThemeToggle}
          className="rounded-full text-xs px-3 py-1.5 h-8"
        >
          {isDarkMode ? (
            <Sun className="h-3 w-3 mr-1" />
          ) : (
            <Moon className="h-3 w-3 mr-1" />
          )}
          {isDarkMode ? "light mode" : "dark mode"}
        </Button>
      </div>

      <div className="text-center order-1 md:order-2">
        <h1 className="text-lg font-normal tracking-wider sartoshi-brand">
          powered by tek
        </h1>
      </div>

      <div className="order-3">
        <Button
          variant="outline"
          size="sm"
          className="rounded-full text-xs px-3 py-1.5 h-8"
        >
          <Wallet className="h-3 w-3 mr-1" />
          connect wallet
        </Button>
      </div>
    </header>
  );
};

export default Header;
