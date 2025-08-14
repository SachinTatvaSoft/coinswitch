import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import { BarChart3, Bitcoin, TrendingUp } from "lucide-react";
import CoinCard from "../../components/CoinCard";
import WatchlistSection from "../../components/WatchlistSection";
import apiService from "../../config/api";
import { API_ROUTE, FE_ROUTE } from "../../config/app-routes";
import { CURRENCY } from "../../constant/constant";
import Loader from "../../components/Loader";
import { formatMarketCap } from "../../lib/utils";
import type { Coin, GlobalStats } from "../../types";

export default function Dashboard() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [coins, setCoins] = useState<Coin[]>([]);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [globalStats, setGlobalStats] = useState<GlobalStats>({});

  useEffect(() => {
    getTopCoins();
    getGlobalStats();
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

  const watchlistCoins = coins.filter((coin) => watchlist.includes(coin.id));

  const getTopCoins = async () => {
    setLoading(true);
    try {
      const response = await apiService.get<Coin[]>(
        `${API_ROUTE.TOP_COINS}?vs_currency=${CURRENCY}&order=gecko_desc&per_page=12&page=1&sparkline=false&price_change_percentage=24h`
      );

      if (response.data.length > 0 && response.status === 200) {
        setCoins(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch top coins", error);
    } finally {
      setLoading(false);
    }
  };

  const getGlobalStats = async () => {
    try {
      const response = await apiService.get<{
        data: {
          total_market_cap: { usd: number };
          total_volume: { usd: number };
          market_cap_percentage: { btc: number };
        };
      }>(API_ROUTE.GLOBAL_DATA);

      if (response.status === 200) {
        const data = response.data.data;
        setGlobalStats({
          totalMarketCap: data.total_market_cap.usd,
          totalVolume: data.total_volume.usd,
          btcDominance: data.market_cap_percentage.btc,
        });
      }
    } catch (error) {
      console.error("Failed to fetch global stats", error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container px-4 py-8 space-y-8 max-w-[1440px] mx-auto">
        <div className="text-center space-y-4 py-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary">
              <TrendingUp className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-2xl md:text-4xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Cryptocurrency Dashboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track real-time prices, manage your watchlist, and analyze market
            trends for top cryptocurrencies.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <div className="relative p-4 rounded-xl bg-gradient-to-b from-border to-border/50 shadow-sm backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                Total Market Cap
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground mt-1">
              {globalStats.totalMarketCap
                ? formatMarketCap(globalStats.totalMarketCap)
                : "--"}
            </p>
          </div>

          <div className="relative p-4 rounded-xl bg-gradient-to-b from-border to-border/50 shadow-sm backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium text-muted-foreground">
                24h Volume
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground mt-1">
              {globalStats.totalVolume
                ? formatMarketCap(globalStats.totalVolume)
                : "--"}
            </p>
          </div>

          <div className="relative p-4 rounded-xl bg-gradient-to-b from-border to-border/50 shadow-sm backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <Bitcoin className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium text-muted-foreground">
                BTC Dominance
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground mt-1">
              {globalStats.btcDominance
                ? `${globalStats.btcDominance.toFixed(1)}%`
                : "--"}
            </p>
          </div>
        </div>

        {watchlist.length > 0 && (
          <WatchlistSection
            watchlistCoins={watchlistCoins}
            onWatchlistToggle={handleWatchlistToggle}
            onCoinClick={handleCoinClick}
          />
        )}

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            Top Cryptocurrencies
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {coins.map((coin) => (
              <CoinCard
                key={coin.id}
                coin={coin}
                isInWatchlist={watchlist.includes(coin.id)}
                onWatchlistToggle={handleWatchlistToggle}
                onClick={handleCoinClick}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
