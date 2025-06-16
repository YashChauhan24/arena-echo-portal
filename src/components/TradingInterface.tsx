import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Search, AlertTriangle, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TradingInterface = () => {
  const [selectedTab, setSelectedTab] = useState("buy");
  const [searchTerm, setSearchTerm] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedQuickAmount, setSelectedQuickAmount] = useState<number | null>(
    null
  );
  const [slippage, setSlippage] = useState("0.5");
  const [customSlippage, setCustomSlippage] = useState("");
  const [isCustomSlippage, setIsCustomSlippage] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Different quick buttons for buy vs sell
  const buyQuickAmounts = [0.5, 1, 2, 5, 10];
  const sellPercentages = [10, 25, 50, 75, 100];

  const handleQuickAmountClick = (value: number) => {
    setSelectedQuickAmount(value);
    if (selectedTab === "buy") {
      setAmount(value.toString());
    } else {
      setAmount(`${value}%`);
    }
  };

  const handleSlippageChange = (value: string) => {
    setSlippage(value);
    setIsCustomSlippage(false);
    setCustomSlippage("");
    setDropdownOpen(false);
  };

  const handleCustomSlippageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setCustomSlippage(value);
      setIsCustomSlippage(true);
      setSlippage("");
    }
  };

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
    setSelectedQuickAmount(null);
    setAmount("");
  };

  const getDisplaySlippage = () => {
    if (isCustomSlippage && customSlippage) {
      return `${customSlippage}%`;
    }
    return `${slippage}%`;
  };

  return (
    <div className="flex-1">
      <Card className="bg-card border border-border">
        <CardHeader className="pb-3 px-4 pt-4">
          <h2 className="text-base font-medium">
            paste ca or search by name/symbol
          </h2>
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
            {selectedTab === "buy"
              ? // Buy mode: show quick amounts
                buyQuickAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant={
                      selectedQuickAmount === amount ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => handleQuickAmountClick(amount)}
                    className="flex-1 text-xs h-8"
                  >
                    {amount}
                  </Button>
                ))
              : // Sell mode: show percentages
                sellPercentages.map((percentage) => (
                  <Button
                    key={percentage}
                    variant={
                      selectedQuickAmount === percentage ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => handleQuickAmountClick(percentage)}
                    className="flex-1 text-xs h-8"
                  >
                    {percentage}%
                  </Button>
                ))}
          </div>

          {/* You Receive and Slippage Settings */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>you receive</span>
              <span className="font-medium">10.00</span>
            </div>

            {/* Slippage Settings Dropdown */}
            <div className="flex items-center justify-between">
              <span className="text-sm">slippage settings</span>
              <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs px-3"
                  >
                    {getDisplaySlippage()}
                    <ChevronDown className="ml-1 h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px] p-2">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-1 mb-2">
                    <Button
                      variant={slippage === "0.1" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSlippageChange("0.1")}
                      className="text-xs h-8"
                    >
                      0.1%
                    </Button>
                    <Button
                      variant={slippage === "0.5" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSlippageChange("0.5")}
                      className="text-xs h-8"
                    >
                      0.5%
                    </Button>
                    <Button
                      variant={slippage === "1" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSlippageChange("1")}
                      className="text-xs h-8"
                    >
                      1%
                    </Button>
                    <div className="relative">
                      <Input
                        value={isCustomSlippage ? customSlippage : ""}
                        onChange={handleCustomSlippageChange}
                        placeholder="0.5"
                        className="h-8 text-xs pr-5 text-center"
                      />
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs">
                        %
                      </span>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
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
