
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Moon, Sun, Wallet, Search, TrendingUp, TrendingDown, AlertTriangle, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedTab, setSelectedTab] = useState("buy");
  const [searchTerm, setSearchTerm] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedPercentage, setSelectedPercentage] = useState<number | null>(null);

  const recentTokens = [
    { 
      symbol: "APE", 
      name: "ApeCoin", 
      age: "2h ago", 
      change: 5.2, 
      price: 1.45, 
      address: "0x4d224452801aced8b2f0aebe155379bb5d594381",
      marketCap: "$1.2B"
    },
    { 
      symbol: "TEST", 
      name: "Test Token", 
      age: "3h ago", 
      change: -2.1, 
      price: 0.85, 
      address: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
      marketCap: "$850M"
    },
    { 
      symbol: "CATCHU", 
      name: "Catchu", 
      age: "5h ago", 
      change: 12.5, 
      price: 2.34, 
      address: "0xa0b86a33e6eb1b8c1b2a8e2e8a7a5e7a2a8a2a8a",
      marketCap: "$234M"
    },
    { 
      symbol: "PEPE", 
      name: "Pepe", 
      age: "1d ago", 
      change: 8.9, 
      price: 0.001234, 
      address: "0x6982508145454ce325ddbe47a25d4ec3d2311933",
      marketCap: "$1.5B"
    },
    { 
      symbol: "DOGE", 
      name: "Dogecoin", 
      age: "2d ago", 
      change: -1.5, 
      price: 0.087, 
      address: "0xba2ae424d960c26247dd6c32edc70b295c744c43",
      marketCap: "$12.3B"
    },
    { 
      symbol: "MATIC", 
      name: "Polygon", 
      age: "3d ago", 
      change: 4.2, 
      price: 0.95, 
      address: "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0",
      marketCap: "$9.1B"
    },
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
    <div className={cn("min-h-screen transition-colors duration-300", isDarkMode ? "dark bg-black" : "bg-white")}>
      {/* Header */}
      <header className="flex items-center justify-between p-3 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleTheme}
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

      <div className="flex flex-col lg:flex-row gap-4 p-4 max-w-7xl mx-auto">
        {/* Left Sidebar - Recently Added Tokens */}
        <Card className="w-full lg:w-80 h-fit bg-card border border-border">
          <CardHeader className="pb-2 px-4 pt-4">
            <h2 className="text-base font-medium mb-2">recently added</h2>
            <div className="flex text-xs text-muted-foreground space-x-4">
              <span className="w-12">symbol</span>
              <span className="flex-1">name</span>
              <span className="w-12">age</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-1 px-4 pb-4">
            {recentTokens.map((token, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 rounded-md border hover:bg-accent/30 cursor-pointer transition-colors text-xs"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-[10px] font-bold">
                    {token.symbol.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-xs">{token.symbol}</div>
                    <div className="text-[10px] text-muted-foreground truncate">{token.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-muted-foreground">{token.age}</div>
                  <div className={cn("flex items-center text-[10px]", token.change > 0 ? "text-green-500" : "text-red-500")}>
                    {token.change > 0 ? <TrendingUp className="h-2 w-2 mr-1" /> : <TrendingDown className="h-2 w-2 mr-1" />}
                    {Math.abs(token.change)}%
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Right Side - Trading Interface */}
        <div className="flex-1">
          <Card className="bg-card border border-border">
            <CardHeader className="pb-3 px-4 pt-4">
              <h2 className="text-base font-medium">paste ca or search by name/symbol</h2>
            </CardHeader>
            <CardContent className="space-y-4 px-4 pb-4">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="0xe3abb7c5e3daa5a24fe7baabaaa155352e3b2d"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-10 text-sm font-mono"
                />
              </div>

              {/* Buy/Sell Toggle */}
              <div className="flex rounded-lg bg-muted p-1">
                <Button
                  variant={selectedTab === "buy" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedTab("buy")}
                  className="flex-1 rounded-md text-sm h-8"
                >
                  buy
                </Button>
                <Button
                  variant={selectedTab === "sell" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedTab("sell")}
                  className="flex-1 rounded-md text-sm h-8"
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
                    className="h-10 pr-10 text-sm"
                    placeholder="0"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                  </div>
                </div>
              </div>

              {/* Percentage Buttons */}
              <div className="flex space-x-1">
                {percentageButtons.map((percentage) => (
                  <Button
                    key={percentage}
                    variant={selectedPercentage === percentage ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePercentageClick(percentage)}
                    className="flex-1 text-xs h-8"
                  >
                    {percentage}%
                  </Button>
                ))}
              </div>

              {/* You Receive */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>you receive</span>
                  <span className="font-medium">0.00</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">slippage settings</span>
                  <div className="flex items-center space-x-2">
                    <Select defaultValue="auto">
                      <SelectTrigger className="w-20 h-7 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Auto</SelectItem>
                        <SelectItem value="1">1%</SelectItem>
                        <SelectItem value="3">3%</SelectItem>
                        <SelectItem value="5">5%</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      <Settings className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Button 
                size="lg" 
                className="w-full h-10 text-sm font-medium"
                disabled={!searchTerm && !amount}
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
