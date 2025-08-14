import { Star } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import CoinCard from "./CoinCard";
import type { WatchlistSectionProps } from "../types";
import { FE_ROUTE } from "../config/app-routes";
import { useNavigate } from "react-router-dom";

const WatchlistSection = ({
  watchlistCoins,
  onWatchlistToggle,
  onCoinClick,
}: WatchlistSectionProps) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(FE_ROUTE.WATCHLIST);
  };

  if (watchlistCoins.length === 0) {
    return (
      <Card className="p-8 text-center bg-card/50 backdrop-blur-sm border-border/50">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Star className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Your Watchlist is Empty
            </h3>
            <p className="text-muted-foreground mt-1">
              Hover over any coin and click the star icon to add it to your
              watchlist
            </p>
          </div>
        </div>
      </Card>
    );
  }

  const coinsToShow = watchlistCoins.slice(0, 3);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Star className="h-5 w-5 text-accent fill-accent" />
          <h2 className="text-xl font-bold text-foreground">Your Watchlist</h2>
          <span className="text-sm text-muted-foreground">
            ({watchlistCoins.length} coins)
          </span>
        </div>

        {watchlistCoins.length > 3 && (
          <Button variant="outline" size="sm" onClick={handleNavigation}>
            View All
          </Button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {coinsToShow.map((coin) => (
          <CoinCard
            key={coin.id}
            coin={coin}
            isInWatchlist={true}
            onWatchlistToggle={onWatchlistToggle}
            onClick={onCoinClick}
          />
        ))}
      </div>
    </div>
  );
};

export default WatchlistSection;
