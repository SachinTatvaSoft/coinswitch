import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Star, Search, SortAsc, SortDesc, Filter } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CoinCard from "../../components/CoinCard";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import Loader from "../../components/Loader";
import { FE_ROUTE } from "../../config/app-routes";

const Watchlist = () => {
  const navigate = useNavigate();
  const [coins, setCoins] = useState<any[]>([]);
  const [watchlist, setWatchlist] = useState<string[]>([
    "bitcoin",
    "ethereum",
    "cardano",
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "price" | "change">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [loading, setLoading] = useState(true);

  // Mock crypto data - same as Index page
  useEffect(() => {
    const mockCoins = [
      {
        id: "bitcoin",
        name: "Bitcoin",
        symbol: "BTC",
        image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
        current_price: 45234.56,
        price_change_percentage_24h: 2.45,
        market_cap: 883940123456,
        total_volume: 23456789012,
      },
      {
        id: "ethereum",
        name: "Ethereum",
        symbol: "ETH",
        image:
          "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
        current_price: 3156.78,
        price_change_percentage_24h: -1.23,
        market_cap: 379876543210,
        total_volume: 15234567890,
      },
      {
        id: "binancecoin",
        name: "BNB",
        symbol: "BNB",
        image:
          "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png",
        current_price: 314.92,
        price_change_percentage_24h: 0.87,
        market_cap: 48456789123,
        total_volume: 987654321,
      },
      {
        id: "cardano",
        name: "Cardano",
        symbol: "ADA",
        image:
          "https://assets.coingecko.com/coins/images/975/large/cardano.png",
        current_price: 0.485,
        price_change_percentage_24h: 3.21,
        market_cap: 17123456789,
        total_volume: 456789123,
      },
      {
        id: "solana",
        name: "Solana",
        symbol: "SOL",
        image:
          "https://assets.coingecko.com/coins/images/4128/large/solana.png",
        current_price: 98.47,
        price_change_percentage_24h: -2.15,
        market_cap: 44987654321,
        total_volume: 2345678901,
      },
      {
        id: "polkadot",
        name: "Polkadot",
        symbol: "DOT",
        image:
          "https://assets.coingecko.com/coins/images/12171/large/polkadot.png",
        current_price: 7.23,
        price_change_percentage_24h: 1.98,
        market_cap: 9876543210,
        total_volume: 234567890,
      },
    ];

    // Simulate API loading
    setTimeout(() => {
      setCoins(mockCoins);
      setLoading(false);
    }, 800);
  }, []);

  const handleWatchlistToggle = (coinId: string) => {
    setWatchlist((prev) =>
      prev.includes(coinId)
        ? prev.filter((id) => id !== coinId)
        : [...prev, coinId]
    );
  };

  const handleCoinClick = (coinId: string) => {
    navigate(`${FE_ROUTE.COIN_DETAILS}/${coinId}`);
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const watchlistCoins = coins
    .filter((coin) => watchlist.includes(coin.id))
    .filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case "price":
          aValue = a.current_price;
          bValue = b.current_price;
          break;
        case "change":
          aValue = a.price_change_percentage_24h;
          bValue = b.price_change_percentage_24h;
          break;
        default:
          aValue = a.name;
          bValue = b.name;
      }

      if (typeof aValue === "string") {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    });

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container px-4 py-8 space-y-8 max-w-[1440px] mx-auto">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
              <Star className="h-5 w-5 text-primary-foreground fill-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                My Watchlist ({watchlistCoins.length})
              </h1>
              <p className="text-muted-foreground">
                Track your favorite cryptocurrencies in one place
              </p>
            </div>
          </div>
        </div>

        {watchlistCoins.length > 0 && (
          <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search your watchlist..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background/50 border-border/50"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Select
                  value={sortBy}
                  onValueChange={(value) => setSortBy(value as typeof sortBy)}
                >
                  <SelectTrigger className="w-[140px] bg-background/50 border-border/50">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="change">24h Change</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleSortOrder}
                  className="bg-background/50 border-border/50"
                >
                  {sortOrder === "asc" ? (
                    <SortAsc className="h-4 w-4" />
                  ) : (
                    <SortDesc className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </Card>
        )}

        {watchlistCoins.length === 0 ? (
          <Card className="p-12 text-center bg-card/50 backdrop-blur-sm border-border/50">
            <div className="flex flex-col items-center space-y-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted/50">
                <Star className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">
                  Your Watchlist is Empty
                </h3>
                <p className="text-muted-foreground max-w-md">
                  Start building your watchlist by visiting the markets page and
                  clicking the star icon on any cryptocurrency you want to
                  track.
                </p>
              </div>
              <Button
                onClick={() => navigate(FE_ROUTE.HOME)}
                className="gradient-primary text-primary-foreground hover:opacity-90"
              >
                Explore Markets
              </Button>
            </div>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground">
                {searchQuery
                  ? `Search Results (${watchlistCoins.length})`
                  : `All Coins (${watchlistCoins.length})`}
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {watchlistCoins.map((coin) => (
                <CoinCard
                  key={coin.id}
                  coin={coin}
                  isInWatchlist={true}
                  onWatchlistToggle={handleWatchlistToggle}
                  onClick={handleCoinClick}
                />
              ))}
            </div>

            {searchQuery && watchlistCoins.length === 0 && (
              <Card className="p-8 text-center bg-card/50 backdrop-blur-sm border-border/50">
                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground">
                    Your Watchlist is Empty
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground max-w-md">
                    Start building your watchlist by visiting the markets page
                    and clicking the star icon on any cryptocurrency you want to
                    track.
                  </p>
                </div>
              </Card>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Watchlist;
