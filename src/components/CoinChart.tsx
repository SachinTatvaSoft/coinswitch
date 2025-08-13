import { useState } from "react";
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

interface CoinChartProps {
  coinName: string;
}

const CoinChart = ({ coinName }: CoinChartProps) => {
  const [timeframe, setTimeframe] = useState<"1d" | "7d" | "30d">("7d");

  const generateMockData = (days: number) => {
    const data = [];
    const basePrice = 50000;

    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (days - i));

      data.push({
        date: date.toISOString().split("T")[0],
        price: basePrice + (Math.random() - 0.5) * 10000,
        timestamp: date.getTime(),
      });
    }
    return data;
  };

  const chartData = generateMockData(
    timeframe === "1d" ? 24 : timeframe === "7d" ? 7 : 30
  );

  const timeframeButtons = [
    { key: "1d" as const, label: "1D" },
    { key: "7d" as const, label: "7D" },
    { key: "30d" as const, label: "30D" },
  ];

  const formatXAxisLabel = (tickItem: string) => {
    const date = new Date(tickItem);
    if (timeframe === "1d") {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const formatTooltipLabel = (label: string) => {
    const date = new Date(label);
    if (timeframe === "1d") {
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
  const priceChangePercent = (priceChange / previousPrice) * 100;
  const isPositive = priceChange >= 0;

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {coinName} Price Chart
            </h3>
            <div className="flex items-center space-x-4 mt-2">
              <span className="text-2xl font-bold text-foreground">
                $
                {currentPrice.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              <span
                className={`text-sm font-medium ${
                  isPositive ? "text-success" : "text-destructive"
                }`}
              >
                {isPositive ? "+" : ""}$
                {priceChange.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                ({isPositive ? "+" : ""}
                {priceChangePercent.toFixed(2)}%)
              </span>
            </div>
          </div>

          <div className="flex bg-muted rounded-lg p-1">
            {timeframeButtons.map((btn) => (
              <Button
                key={btn.key}
                variant={timeframe === btn.key ? "default" : "ghost"}
                size="sm"
                className={`text-xs font-medium ${
                  timeframe === btn.key
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setTimeframe(btn.key)}
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
                stroke="hsl(var(--border))"
                opacity={0.3}
              />
              <XAxis
                dataKey="date"
                tickFormatter={formatXAxisLabel}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value: any) => `$${value.toLocaleString()}`}
              />
              <Tooltip
                labelFormatter={formatTooltipLabel}
                formatter={(value: number) => [
                  `$${value.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`,
                  "Price",
                ]}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))",
                }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke={
                  isPositive ? "hsl(var(--success))" : "hsl(var(--destructive))"
                }
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 4,
                  fill: isPositive
                    ? "hsl(var(--success))"
                    : "hsl(var(--destructive))",
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
