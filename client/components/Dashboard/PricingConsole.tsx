"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Alert, AlertDescription } from '@/components/ui/alert';
import
{
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  History,
  ArrowRight,
  RotateCcw
} from 'lucide-react';

interface PriceImpact
{
  margin: number;
  volume: number;
  revenue: number;
}

interface PricingConsoleProps
{
  currentPrice: number;
  minPrice?: number;
  maxPrice?: number;
  onPriceChange?: (price: number) => void;
  onPriceConfirm?: (price: number) => void;
}

const PricingConsole: React.FC<PricingConsoleProps> = ({
  currentPrice,
  minPrice = 1.5,
  maxPrice = 2.5,
  onPriceChange,
  onPriceConfirm
}) =>
{
  const [price, setPrice] = useState(currentPrice);
  const [priceHistory, setPriceHistory] = useState<Array<{ price: number; timestamp: Date }>>([
    { price: currentPrice, timestamp: new Date() }
  ]);
  const [showHistory, setShowHistory] = useState(false);
  const [impact, setImpact] = useState<PriceImpact>({
    margin: 0,
    volume: 0,
    revenue: 0
  });

  useEffect(() =>
  {
    const calculateImpact = () =>
    {
      const priceDiff = price - currentPrice;
      const volumeImpact = -priceDiff * 5000; // Simplified elasticity model
      const newVolume = 100000 + volumeImpact; // Base volume of 100000
      const oldRevenue = currentPrice * 100000;
      const newRevenue = price * newVolume;
      const revenueImpact = newRevenue - oldRevenue;

      return {
        margin: priceDiff * newVolume,
        volume: (volumeImpact / 100000) * 100,
        revenue: revenueImpact
      };
    };

    setImpact(calculateImpact());
  }, [price, currentPrice]);

  const handlePriceChange = (value: number[]) =>
  {
    setPrice(value[0]);
    onPriceChange?.(value[0]);
  };

  const handlePriceConfirm = () =>
  {
    setPriceHistory([
      { price, timestamp: new Date() },
      ...priceHistory.slice(0, 9)
    ]);
    onPriceConfirm?.(price);
  };

  const formatTimeDiff = (date: Date) =>
  {
    const diff = new Date().getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) return `${hours}h ago`;
    return `${minutes}m ago`;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle>Price Adjustment</CardTitle>
            <p className="text-sm text-gray-500">
              Optimize pricing based on market conditions
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowHistory(!showHistory)}
            className="transition-all"
          >
            <History className="h-4 w-4 mr-2" />
            {showHistory ? 'Hide History' : 'Show History'}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <span className="text-sm font-medium">Current Price</span>
            <div className="text-right">
              <span className="text-2xl font-bold">
                €{price.toFixed(3)}
              </span>
              <span className="text-sm text-gray-500 ml-1">/L</span>
            </div>
          </div>

          <Slider
            value={[price]}
            onValueChange={handlePriceChange}
            max={maxPrice}
            min={minPrice}
            step={0.001}
            className="w-full"
          />

          <div className="flex justify-between text-sm text-gray-500">
            <span>Min: €{minPrice.toFixed(3)}</span>
            <span>Max: €{maxPrice.toFixed(3)}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-blue-50 transition-all hover:bg-blue-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-blue-700">Margin Impact</span>
              {impact.margin > 0 ? (
                <TrendingUp className="h-4 w-4 text-blue-700" />
              ) : (
                <TrendingDown className="h-4 w-4 text-blue-700" />
              )}
            </div>
            <span className="text-xl font-bold text-blue-900">
              {impact.margin > 0 ? '+' : ''}€{impact.margin.toFixed(2)}
            </span>
          </div>

          <div className="p-4 rounded-lg bg-green-50 transition-all hover:bg-green-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-green-700">Volume Impact</span>
              {impact.volume > 0 ? (
                <TrendingUp className="h-4 w-4 text-green-700" />
              ) : (
                <TrendingDown className="h-4 w-4 text-green-700" />
              )}
            </div>
            <span className="text-xl font-bold text-green-900">
              {impact.volume > 0 ? '+' : ''}{impact.volume.toFixed(1)}%
            </span>
          </div>

          <div className="p-4 rounded-lg bg-purple-50 transition-all hover:bg-purple-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-purple-700">Revenue Impact</span>
              {impact.revenue > 0 ? (
                <TrendingUp className="h-4 w-4 text-purple-700" />
              ) : (
                <TrendingDown className="h-4 w-4 text-purple-700" />
              )}
            </div>
            <span className="text-xl font-bold text-purple-900">
              {impact.revenue > 0 ? '+' : ''}€{impact.revenue.toFixed(2)}
            </span>
          </div>
        </div>

        {showHistory && (
          <div className="space-y-2 animate-in slide-in-from-top">
            <h4 className="font-medium">Recent Price Changes</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {priceHistory.map((record, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                >
                  <span className="text-sm">
                    €{record.price.toFixed(3)}
                  </span>
                  <span className="text-sm text-gray-500">
                    {formatTimeDiff(record.timestamp)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex space-x-3">
          <Button
            className="flex-1 transition-all"
            onClick={handlePriceConfirm}
            disabled={price === currentPrice}
          >
            Confirm Change
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => setPrice(currentPrice)}
            disabled={price === currentPrice}
            className="transition-all"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        {Math.abs(impact.margin) > 1000 && (
          <Alert variant="destructive" className="animate-in slide-in-from-bottom">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Large margin impact detected. Please review carefully.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default PricingConsole;
