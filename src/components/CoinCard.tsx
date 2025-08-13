import { useState } from "react";
import { TrendingUp, TrendingDown, Bookmark } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

interface CoinCardProps {
  coin: {
    id: string;
    name: string;
    symbol: string;
    image: string;
    current_price: number;
    price_change_percentage_24h: number;
    market_cap: number;
    total_volume: number;
  };
  isInWatchlist?: boolean;
  onWatchlistToggle?: (coinId: string) => void;
  onClick?: (coinId: string) => void;
}

const CoinCard = ({
  coin,
  isInWatchlist = false,
  onWatchlistToggle,
  onClick,
}: CoinCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const isPositive = coin.price_change_percentage_24h > 0;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(price);
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`;
    if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`;
    if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`;
    return `$${marketCap.toLocaleString()}`;
  };

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onWatchlistToggle?.(coin.id);
  };

  const handleCardClick = () => {
    onClick?.(coin.id);
  };

  return (
    <Card
      className="relative p-4 transition-all duration-300 hover:shadow-card hover:scale-[1.02] cursor-pointer bg-card/50  border-border/50 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div
        className={`absolute top-3 right-3 transition-opacity duration-200 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 bg-gradient-primary hover:bg-gradient-primary"
          onClick={handleWatchlistClick}
        >
          {isInWatchlist ? (
            <Bookmark className="h-4 w-4 fill-primary-foreground text-primary-foreground" />
          ) : (
            <Bookmark className="h-4 w-4 text-muted-foreground hover:text-primary-foreground" />
          )}
        </Button>
      </div>

      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={coin.image}
            alt={coin.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {coin.name}
            </h3>
            <p className="text-sm text-muted-foreground uppercase">
              {coin.symbol}
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="font-bold text-lg text-foreground">
            {formatPrice(coin.current_price)}
          </p>
          <div
            className={`flex items-center space-x-1 text-sm ${
              isPositive ? "text-success" : "text-destructive"
            }`}
          >
            {isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span>
              {isPositive ? "+" : ""}
              {coin.price_change_percentage_24h.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-muted-foreground">Market Cap</p>
          <p className="font-medium text-foreground">
            {formatMarketCap(coin.market_cap)}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground">Volume (24h)</p>
          <p className="font-medium text-foreground">
            {formatMarketCap(coin.total_volume)}
          </p>
        </div>
      </div>

      <div
        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-primary rounded-b-lg transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />
    </Card>
  );
};

export default CoinCard;
