import { useState } from "react";
import { TrendingUp, TrendingDown, Bookmark } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { formatCurrency, formatMarketCap } from "../lib/utils";
import type { CoinCardProps } from "../types";
import { CURRENCY } from "../constant/constant";

const CoinCard = ({
  coin,
  isInWatchlist = false,
  onWatchlistToggle,
  onClick,
}: CoinCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const isPositive =
    coin.price_change_percentage_24h && coin.price_change_percentage_24h > 0;

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onWatchlistToggle?.(coin.id);
  };

  const handleCardClick = () => {
    onClick?.(coin.id);
  };

  return (
    <Card
      className="relative p-4 rounded-xl bg-gradient-to-b from-border to-background/80 shadow-sm 
             transition-all duration-500 ease-in-out 
             hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1 hover:scale-[1.01] 
             backdrop-blur-sm group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div
        className={`cursor-pointer absolute bottom-3 right-3 transform transition-all duration-500 ease-in-out`}
      >
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 rounded-full bg-gradient-primary hover:scale-110 hover:shadow-lg transition-all duration-500 ease-in-out"
          onClick={handleWatchlistClick}
        >
          {isInWatchlist ? (
            <Bookmark className="h-4 w-4 fill-primary-foreground text-primary-foreground" />
          ) : (
            <Bookmark className="h-4 w-4 text-muted-foreground group-hover:text-primary-foreground" />
          )}
        </Button>
      </div>

      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={coin.image}
            alt={coin.name}
            className="w-10 h-10 rounded-full transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
          <div>
            <h3 className="font-semibold text-foreground text-base sm:text-lg group-hover:text-primary transition-colors duration-500 ease-in-out">
              {coin.name}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground uppercase">
              {coin.symbol}
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="font-bold text-lg sm:text-xl text-foreground">
            {formatCurrency(coin.current_price, CURRENCY)}
          </p>
          <div
            className={`flex items-center space-x-1 text-sm sm:text-base ${
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
              {coin.price_change_percentage_24h &&
                coin.price_change_percentage_24h.toFixed(2)}
              %
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-xs sm:text-sm">
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
        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-primary rounded-b-lg w-[97%] mx-auto transform transition-all duration-500 ease-in-out ${
          isHovered ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
        }`}
      />
    </Card>
  );
};

export default CoinCard;
