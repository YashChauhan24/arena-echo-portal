
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Token {
  symbol: string;
  name: string;
  age: string;
  change: number;
  price: number;
  address: string;
  marketCap: string;
}

const TokenList = () => {
  const recentTokens: Token[] = [
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

  return (
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
  );
};

export default TokenList;
