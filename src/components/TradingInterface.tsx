
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, AlertTriangle, Settings } from "lucide-react";

const TradingInterface = () => {
  const [selectedTab, setSelectedTab] = useState("buy");
  const [searchTerm, setSearchTerm] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedQuickAmount, setSelectedQuickAmount] = useState<number | null>(null);

  // Different quick buttons for buy vs sell
  const buyQuickAmounts = [0.5, 1, 2, 5, 10];
  const sellPercentages = [10, 25, 50, 75, 100];

  const handleQuickAmountClick = (value: number) => {
    setSelectedQuickAmount(value);
    if (selectedTab === "buy") {
      setAmount(value.toString());
    } else {
      // For sell, we might want to calculate based on percentage of holdings
      // For now, just set the amount input to show the percentage selection
      setAmount(`${value}%`);
    }
  };

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
    setSelectedQuickAmount(null);
    setAmount("");
  };

  return (
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
              onClick={() => handleTabChange("buy")}
              className="flex-1 rounded-md text-sm h-8"
            >
              buy
            </Button>
            <Button
              variant={selectedTab === "sell" ? "default" : "ghost"}
              size="sm"
              onClick={() => handleTabChange("sell")}
              className="flex-1 rounded-md text-sm h-8"
            >
              sell
            </Button>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>amount</span>
              <span className="text-muted-foreground">
                {selectedTab === "buy" ? "0 avax" : "0 token"}
              </span>
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

          {/* Quick Amount/Percentage Buttons */}
          <div className="flex space-x-1">
            {selectedTab === "buy" ? (
              // Buy mode: show quick amounts
              buyQuickAmounts.map((amount) => (
                <Button
                  key={amount}
                  variant={selectedQuickAmount === amount ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleQuickAmountClick(amount)}
                  className="flex-1 text-xs h-8"
                >
                  {amount}
                </Button>
              ))
            ) : (
              // Sell mode: show percentages
              sellPercentages.map((percentage) => (
                <Button
                  key={percentage}
                  variant={selectedQuickAmount === percentage ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleQuickAmountClick(percentage)}
                  className="flex-1 text-xs h-8"
                >
                  {percentage}%
                </Button>
              ))
            )}
          </div>

          {/* You Receive */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>you receive</span>
              <span className="font-medium">10.00</span>
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
  );
};

export default TradingInterface;
