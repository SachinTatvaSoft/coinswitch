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
import { FE_ROUTE, API_ROUTE } from "../../config/app-routes";
import apiService from "../../config/api";
import { CURRENCY } from "../../constant/constant";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import type { Coin } from "../../types";
import { toggleWatchlist } from "../../slices/watchlistSlice";
import { useDispatch } from "react-redux";

const Watchlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const watchlist = useSelector((state: RootState) => state.watchlist.ids);

  const [coins, setCoins] = useState<Coin[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "change">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [loading, setLoading] = useState(false);

  const fetchWatchlistCoins = async () => {
    setLoading(true);

    if (watchlist.length === 0) {
      setCoins([]);
      setLoading(false);
      return;
    }

    try {
      const idsParam = watchlist.join(",");
      const response = await apiService.get<Coin[]>(
        `${API_ROUTE.TOP_COINS}?vs_currency=${CURRENCY}&ids=${idsParam}&order=gecko_desc&sparkline=false&price_change_percentage=24h`
      );

      if (response.status === 200 && response.data) {
        setCoins(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch watchlist coins", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWatchlistCoins();
  }, [watchlist]);

  const handleWatchlistToggle = (coinId: string) => {
    dispatch(toggleWatchlist(coinId));
  };

  const handleCoinClick = (coinId: string) => {
    navigate(`${FE_ROUTE.COIN_DETAILS}/${coinId}`);
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const watchlistCoins = coins
    .filter((coin) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        coin.name.toLowerCase().includes(query) ||
        coin.symbol.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      let aValue: string | number = "";
      let bValue: string | number = "";

      switch (sortBy) {
        case "change":
          aValue = a.price_change_percentage_24h ?? 0;
          bValue = b.price_change_percentage_24h ?? 0;
          break;
        default:
          aValue = a.name ?? "";
          bValue = b.name ?? "";
      }

      if (typeof aValue === "string") {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue as string)
          : (bValue as string).localeCompare(aValue);
      }

      return sortOrder === "asc"
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });

  if (loading) return <Loader />;

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
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                My Watchlist ({watchlistCoins.length})
              </h1>
              <p className="text-muted-foreground">
                Track your favorite cryptocurrencies in one place
              </p>
            </div>
          </div>
        </div>

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
                onClick={() => navigate(FE_ROUTE.DASHBOARD)}
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
