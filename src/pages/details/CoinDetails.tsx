import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { useState, useEffect } from "react";
import CoinChart from "../../components/CoinChart";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const CoinDetail = () => {
  const { coinId } = useParams();
  const navigate = useNavigate();
  const [coin, setCoin] = useState<any>(null);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    const mockCoin = {
      id: coinId,
      name:
        coinId === "bitcoin"
          ? "Bitcoin"
          : coinId === "ethereum"
          ? "Ethereum"
          : "Bitcoin",
      symbol:
        coinId === "bitcoin" ? "BTC" : coinId === "ethereum" ? "ETH" : "BTC",
      image:
        coinId === "bitcoin"
          ? "https://assets.coingecko.com/coins/images/1/large/bitcoin.png"
          : coinId === "ethereum"
          ? "https://assets.coingecko.com/coins/images/279/large/ethereum.png"
          : "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
      current_price:
        coinId === "bitcoin" ? 45000 : coinId === "ethereum" ? 3200 : 45000,
      price_change_percentage_24h:
        coinId === "bitcoin" ? 2.5 : coinId === "ethereum" ? -1.2 : 2.5,
      market_cap:
        coinId === "bitcoin"
          ? 870000000000
          : coinId === "ethereum"
          ? 390000000000
          : 870000000000,
      total_volume:
        coinId === "bitcoin"
          ? 25000000000
          : coinId === "ethereum"
          ? 15000000000
          : 25000000000,
      circulating_supply:
        coinId === "bitcoin"
          ? 19500000
          : coinId === "ethereum"
          ? 120000000
          : 19500000,
      total_supply:
        coinId === "bitcoin"
          ? 21000000
          : coinId === "ethereum"
          ? null
          : 21000000,
      max_supply:
        coinId === "bitcoin"
          ? 21000000
          : coinId === "ethereum"
          ? null
          : 21000000,
      high_24h:
        coinId === "bitcoin" ? 46200 : coinId === "ethereum" ? 3350 : 46200,
      low_24h:
        coinId === "bitcoin" ? 44800 : coinId === "ethereum" ? 3150 : 44800,
    };
    setCoin(mockCoin);
  }, [coinId]);

  const handleWatchlistToggle = () => {
    setIsInWatchlist(!isInWatchlist);
  };

  if (!coin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container px-4 py-6 space-y-6 max-w-[1440px] mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="hover:bg-muted"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <div className="flex items-center space-x-3">
              <img
                src={coin.image}
                alt={coin.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {coin.name}
                </h1>
                <p className="text-muted-foreground uppercase text-sm">
                  {coin.symbol}
                </p>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={handleWatchlistToggle}
            className="flex items-center space-x-2"
          >
            <Star
              className={`h-4 w-4 ${
                isInWatchlist ? "fill-accent text-accent" : ""
              }`}
            />
            <span>
              {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </span>
          </Button>
        </div>

        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Current Price
              </p>
              <p className="text-3xl font-bold text-foreground">
                {formatPrice(coin.current_price)}
              </p>
              <div
                className={`flex items-center space-x-1 mt-1 ${
                  isPositive ? "text-success" : "text-destructive"
                }`}
              >
                {isPositive ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span className="font-medium">
                  {isPositive ? "+" : ""}
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </span>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">24h High</p>
              <p className="text-xl font-semibold text-foreground">
                {formatPrice(coin.high_24h)}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">24h Low</p>
              <p className="text-xl font-semibold text-foreground">
                {formatPrice(coin.low_24h)}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">24h Volume</p>
              <p className="text-xl font-semibold text-foreground">
                {formatMarketCap(coin.total_volume)}
              </p>
            </div>
          </div>
        </Card>

        <CoinChart coinName={coin.name} />

        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Market Statistics
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Market Cap</p>
              <p className="text-xl font-semibold text-foreground">
                {formatMarketCap(coin.market_cap)}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Circulating Supply
              </p>
              <p className="text-xl font-semibold text-foreground">
                {coin.circulating_supply.toLocaleString()} {coin.symbol}
              </p>
            </div>

            {coin.max_supply && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Max Supply</p>
                <p className="text-xl font-semibold text-foreground">
                  {coin.max_supply.toLocaleString()} {coin.symbol}
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default CoinDetail;
