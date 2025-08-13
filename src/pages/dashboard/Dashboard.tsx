import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import { BarChart3, TrendingUp } from "lucide-react";
import CoinCard from "../../components/CoinCard";
import WatchlistSection from "../../components/WatchlistSection";
import apiService from "../../config/api";
import { API_ROUTE } from "../../config/app-routes";

export default function Dashboard() {
  const navigate = useNavigate();

  const [coins, setCoins] = useState<any[]>([]);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

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

    setTimeout(() => {
      setCoins(mockCoins);
      setLoading(false);
    }, 1000);
  }, []);

  const handleWatchlistToggle = (coinId: string) => {
    setWatchlist((prev) =>
      prev.includes(coinId)
        ? prev.filter((id) => id !== coinId)
        : [...prev, coinId]
    );
  };

  const handleCoinClick = (coinId: string) => {
    navigate(`/coin/${coinId}`);
  };

  const watchlistCoins = coins.filter((coin) => watchlist.includes(coin.id));

  const getAllPagesList = async () => {
    setLoading(true);
    try {
      const response = await apiService.get<any>(
        `${API_ROUTE.TOP_COINS}?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
      );
    } catch (error: any) {
      const message =
        error?.response?.data?.error?.message ||
        error?.message ||
        "Failed to create page";
      console.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading market data...</p>
        </div>
      </div>
    );
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
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Cryptocurrency Dashboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track real-time prices, manage your watchlist, and analyze market
            trends for top cryptocurrencies.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                Total Market Cap
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground mt-1">$2.45T</p>
            <p className="text-sm text-success">+2.3% (24h)</p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium text-muted-foreground">
                24h Volume
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground mt-1">$89.2B</p>
            <p className="text-sm text-destructive">-1.2% (24h)</p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-muted-foreground">
                BTC Dominance
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground mt-1">51.2%</p>
            <p className="text-sm text-success">+0.1% (24h)</p>
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
