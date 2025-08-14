import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { useState, useEffect, useCallback } from "react";
import CoinChart from "../../components/CoinChart";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";
import { API_ROUTE, FE_ROUTE } from "../../config/app-routes";
import apiService from "../../config/api";
import { formatCryptoPrice, formatMarketCap } from "../../lib/utils";
import { CURRENCY } from "../../constant/constant";
import type { CoinData } from "../../types";

const CoinDetail = () => {
  const { coinId } = useParams<{ coinId: string }>();
  const navigate = useNavigate();
  const [coin, setCoin] = useState<CoinData | null>(null);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [loading, setLoading] = useState(true);

  const getCoinDetails = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiService.get<{
        id: string;
        name: string;
        symbol: string;
        image?: { large?: string; thumb?: string };
        market_data?: {
          current_price?: { [key: string]: any };
          price_change_percentage_24h?: number;
          market_cap?: { [key: string]: any };
          total_volume?: { [key: string]: any };
          circulating_supply?: number;
          total_supply?: number | null;
          max_supply?: number | null;
          high_24h?: { [key: string]: any };
          low_24h?: { [key: string]: any };
        };
      }>(`${API_ROUTE.COIN_DETAILS}/${coinId}`);

      if (Object.keys(response.data).length > 0 && response.status === 200) {
        const data = response.data;

        const parsedCoin: CoinData = {
          id: data.id,
          name: data.name,
          symbol: data.symbol.toUpperCase(),
          image: data.image?.large || data.image?.thumb || "",
          current_price: data.market_data?.current_price?.[CURRENCY] ?? 0,
          price_change_percentage_24h:
            data.market_data?.price_change_percentage_24h ?? 0,
          market_cap: data.market_data?.market_cap?.[CURRENCY] ?? 0,
          total_volume: data.market_data?.total_volume?.[CURRENCY] ?? 0,
          circulating_supply: data.market_data?.circulating_supply ?? 0,
          total_supply: data.market_data?.total_supply ?? null,
          max_supply: data.market_data?.max_supply ?? null,
          high_24h: data.market_data?.high_24h?.[CURRENCY] ?? 0,
          low_24h: data.market_data?.low_24h?.[CURRENCY] ?? 0,
        };

        setCoin(parsedCoin);
      }
    } catch (error) {
      console.error("Failed to fetch top coins", error);
    } finally {
      setLoading(false);
    }
  }, [coinId]);

  useEffect(() => {
    getCoinDetails();
  }, [coinId, getCoinDetails]);

  const handleWatchlistToggle = () => {
    setIsInWatchlist(!isInWatchlist);
  };

  const isPositive = (coin?.price_change_percentage_24h ?? 0) > 0;

  if (loading && !coin) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container px-4 py-6 space-y-6 max-w-[1440px] mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(FE_ROUTE.HOME)}
              className="hover:bg-muted"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <div className="flex items-center space-x-3">
              <img
                src={coin?.image}
                alt={coin?.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {coin?.name}
                </h1>
                <p className="text-muted-foreground uppercase text-sm">
                  {coin?.symbol}
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
                {formatCryptoPrice(coin?.current_price as number)}
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
                  {coin?.price_change_percentage_24h.toFixed(2)}%
                </span>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">24h High</p>
              <p className="text-xl font-semibold text-foreground">
                {formatCryptoPrice(coin?.high_24h ?? 0)}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">24h Low</p>
              <p className="text-xl font-semibold text-foreground">
                {formatCryptoPrice(coin?.low_24h ?? 0)}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">24h Volume</p>
              <p className="text-xl font-semibold text-foreground">
                {formatMarketCap(coin?.total_volume ?? 0)}
              </p>
            </div>
          </div>
        </Card>

        <CoinChart coinName={coin?.name ?? ""} coinId={coinId ?? ""} />

        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Market Statistics
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Market Cap</p>
              <p className="text-xl font-semibold text-foreground">
                {formatMarketCap(coin?.market_cap ?? 0)}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Circulating Supply
              </p>
              <p className="text-xl font-semibold text-foreground">
                {coin?.circulating_supply.toLocaleString()} {coin?.symbol}
              </p>
            </div>

            {coin?.max_supply && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Max Supply</p>
                <p className="text-xl font-semibold text-foreground">
                  {coin?.max_supply.toLocaleString()} {coin?.symbol}
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
