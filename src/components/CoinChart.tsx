import { useCallback, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { API_ROUTE } from "../config/app-routes";
import apiService from "../config/api";
import { CURRENCY, timeframeButtons } from "../constant/constant";
import Loader from "./Loader";
import { formatCurrency } from "../lib/utils";
import type { ChartPoint, CoinChartProps, MarketChartResponse } from "../types";

const CoinChart = ({ coinName, coinId }: CoinChartProps) => {
  const [timeframe, setTimeframe] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<ChartPoint[]>([]);

  const getHistoricalData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiService.get<MarketChartResponse>(
        `${API_ROUTE.COIN_DETAILS}/${coinId}/market_chart?vs_currency=${CURRENCY}&days=${timeframe}`
      );

      if (response.status === 200 && response.data?.prices) {
        const formattedData: ChartPoint[] = response.data.prices.map(
          ([timestamp, price]) => {
            const dateObj = new Date(timestamp);
            return {
              date: dateObj.toISOString().split("T")[0],
              price,
              timestamp,
            };
          }
        );
        setChartData(formattedData);
      } else {
        setChartData([]);
      }
    } catch (error) {
      console.error("Failed to fetch historical data", error);
      setChartData([]);
    } finally {
      setLoading(false);
    }
  }, [coinId, timeframe]);

  useEffect(() => {
    getHistoricalData();
  }, [coinId, timeframe, getHistoricalData]);

  const formatXAxisLabel = (tickItem: string) => {
    const date = new Date(tickItem);
    if (timeframe === 1) {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const formatTooltipLabel = (label: string) => {
    const date = new Date(label);
    if (timeframe === 1) {
      return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const currentPrice = chartData[chartData.length - 1]?.price || 0;
  const previousPrice = chartData[0]?.price || 0;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = previousPrice
    ? (priceChange / previousPrice) * 100
    : 0;
  const isPositive = priceChange >= 0;

  const isSmallChange = Math.abs(priceChangePercent) < 1;

  if (loading) {
    return <Loader />;
  }

  return (
    <Card
      className={`p-6 backdrop-blur-sm border-border/50 ${
        isSmallChange ? "bg-card/30" : "bg-card/50"
      }`}
    >
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {coinName} Price Chart
            </h3>
            <div className="flex items-center space-x-4 mt-2">
              <span className="text-2xl font-bold text-foreground">
                {formatCurrency(currentPrice, CURRENCY)}
              </span>
              <span
                className={`text-sm font-medium ${
                  isPositive ? "text-success" : "text-destructive"
                }`}
              >
                {isPositive ? "+" : ""}
                {formatCurrency(priceChange, CURRENCY)} ({isPositive ? "+" : ""}
                {priceChangePercent.toFixed(2)}%)
              </span>
            </div>
          </div>

          <div className="flex bg-muted rounded-lg p-1">
            {timeframeButtons.map((btn) => (
              <Button
                key={btn.key}
                variant={timeframe === btn.value ? "default" : "ghost"}
                size="sm"
                className={`flex-1 text-xs font-medium mx-1 ${
                  timeframe === btn.value
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setTimeframe(btn.value)}
              >
                {btn.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#232528"
                opacity={0.3}
              />
              <XAxis
                dataKey="timestamp"
                tickFormatter={(ts) =>
                  formatXAxisLabel(new Date(ts).toISOString())
                }
                stroke="#9ea9b8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#9ea9b8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => formatCurrency(value, CURRENCY)}
                domain={[
                  (dataMin: number) => dataMin * 0.995,
                  (dataMax: number) => dataMax * 1.005,
                ]}
              />
              <Tooltip
                labelFormatter={(ts) =>
                  formatTooltipLabel(new Date(ts).toISOString())
                }
                formatter={(value: number) => [
                  formatCurrency(value, CURRENCY),
                  "Price",
                ]}
                contentStyle={{
                  backgroundColor: "#121314",
                  border: "1px solid #232528",
                  borderRadius: "8px",
                  color: "#fafdff",
                }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke={isPositive ? "#099268" : "#e03131"}
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 4,
                  fill: isPositive ? "#099268" : "#e03131",
                  strokeWidth: 0,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};

export default CoinChart;
