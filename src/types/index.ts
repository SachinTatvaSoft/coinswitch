import type { JSX } from "react";

export interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  image: string;
  price_change_percentage_24h?: number;
}

export interface GlobalStats {
  totalMarketCap?: number;
  totalVolume?: number;
  btcDominance?: number;
}

export interface CoinCardProps {
  coin: Coin;
  isInWatchlist?: boolean;
  onWatchlistToggle?: (coinId: string) => void;
  onClick?: (coinId: string) => void;
}

export interface CoinChartProps {
  coinId: string;
  coinName: string;
}

export interface MarketChartResponse {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

export interface ChartPoint {
  date: string;
  price: number;
  timestamp: number;
}

export interface WatchlistSectionProps {
  watchlistCoins: Coin[];
  onWatchlistToggle: (coinId: string) => void;
  onCoinClick: (coinId: string) => void;
}

export interface CoinData {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  high_24h: number;
  low_24h: number;
}

export interface Props {
  children: JSX.Element;
}

export interface AuthState {
  isAuthenticated: boolean;
}

export interface CoinSearchResult {
  id: string;
  name: string;
  api_symbol: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
}

export interface WatchlistState {
  ids: string[];
}
