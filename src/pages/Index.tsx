
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Moon, Sun, Wallet, Search, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedTab, setSelectedTab] = useState("buy");
  const [searchTerm, setSearchTerm] = useState("");
  const [amount, setAmount] = useState("1");
  const [selectedPercentage, setSelectedPercentage] = useState<number | null>(null);

  const recentTokens = [
    { symbol: "APE", name: "ApeCoin", age: "2h ago", change: 5.2, price: 1.45 },
    { symbol: "TEST", name: "Test Token", age: "3h ago", change: -2.1, price: 0.85 },
    { symbol: "CATCHU", name: "Catchu", age: "5h ago", change: 12.5, price: 2.34 },
    { symbol: "PEPE", name: "Pepe", age: "1d ago", change: 8.9, price: 0.001234 },
    { symbol: "DOGE", name: "Dogecoin", age: "2d ago", change: -1.5, price: 0.087 },
    { symbol: "MATIC", name: "Polygon", age: "3d ago", change: 4.2, price: 0.95 },
  ];

  const percentageButtons = [10, 25, 50, 75, 100];

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handlePercentageClick = (percentage: number) => {
    setSelectedPercentage(percentage);
  };

  return (
    <div className={cn("min-h-screen transition-colors duration-300", isDarkMode ? "dark bg-gray-900" : "bg-gray-50")}>
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleTheme}
          className="rounded-full"
        >
          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          {isDarkMode ? "light mode" : "dark mode"}
        </Button>
        
        <div className="text-center">
          <h1 className="text-xl font-bold tracking-wider">powered by tek</h1>
        </div>
        
        <Button variant="outline" size="sm" className="rounded-full">
          <Wallet className="h-4 w-4 mr-2" />
          connect wallet
        </Button>
      </header>

      <div className="flex flex-col lg:flex-row gap-6 p-6 max-w-7xl mx-auto">
        {/* Left Sidebar - Recently Added Tokens */}
        <Card className="w-full lg:w-80 h-fit">
          <CardHeader className="pb-3">
            <h2 className="text-lg font-semibold">recently added</h2>
            <div className="flex text-sm text-muted-foreground space-x-8">
              <span>symbol</span>
              <span>name</span>
              <span>age</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentTokens.map((token, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 cursor-pointer transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                    {token.symbol.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{token.symbol}</div>
                    <div className="text-sm text-muted-foreground">{token.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">{token.age}</div>
                  <div className={cn("flex items-center text-sm", token.change > 0 ? "text-green-500" : "text-red-500")}>
                    {token.change > 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                    {Math.abs(token.change)}%
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Right Side - Trading Interface */}
        <div className="flex-1">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">paste ca or search by name/symbol</h2>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="0xe3abb7c5e3daa5a24fe7baabaaa155352e3b2d"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-sm"
                />
              </div>

              {/* Buy/Sell Toggle */}
              <div className="flex rounded-lg bg-muted p-1">
                <Button
                  variant={selectedTab === "buy" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedTab("buy")}
                  className="flex-1 rounded-md"
                >
                  buy
                </Button>
                <Button
                  variant={selectedTab === "sell" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedTab("sell")}
                  className="flex-1 rounded-md"
                >
                  sell
                </Button>
              </div>

              {/* Amount Input */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>amount</span>
                  <span className="text-muted-foreground">0 token</span>
                </div>
                <div className="relative">
                  <Input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="h-12 pr-12"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  </div>
                </div>
              </div>

              {/* Percentage Buttons */}
              <div className="flex space-x-2">
                {percentageButtons.map((percentage) => (
                  <Button
                    key={percentage}
                    variant={selectedPercentage === percentage ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePercentageClick(percentage)}
                    className="flex-1"
                  >
                    {percentage}%
                  </Button>
                ))}
              </div>

              {/* You Receive */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>you receive</span>
                  <span className="font-medium">10.00</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm">slippage settings</span>
                  <Select defaultValue="auto">
                    <SelectTrigger className="w-24 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto</SelectItem>
                      <SelectItem value="1">1%</SelectItem>
                      <SelectItem value="3">3%</SelectItem>
                      <SelectItem value="5">5%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Action Button */}
              <Button 
                size="lg" 
                className="w-full h-12 text-base font-medium"
                disabled={!searchTerm || !amount}
              >
                {selectedTab === "buy" ? "buy" : "sell"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
