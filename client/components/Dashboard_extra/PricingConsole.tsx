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
    RotateCcw,
    Lock,
    Unlock,
    Share2,
    BarChart2
  } from 'lucide-react';
import
  {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from '@/components/ui/tooltip';
import
  {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useDashboard } from './DashboardProvider';

interface PriceImpact
{
  margin: number;
  volume: number;
  revenue: number;
  marketShare: number;
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
  const { marketData, metrics } = useDashboard();
  const [price, setPrice] = useState(currentPrice);
  const [priceHistory, setPriceHistory] = useState<Array<{ price: number; timestamp: Date; type: string }>>([
    { price: currentPrice, timestamp: new Date(), type: 'manual' }
  ]);
  const [showHistory, setShowHistory] = useState(false);
  const [impact, setImpact] = useState<PriceImpact>({
    margin: 0,
    volume: 0,
    revenue: 0,
    marketShare: 0
  });
  const [priceLocked, setPriceLocked] = useState(false);
  const [adjustmentMode, setAdjustmentMode] = useState<'manual' | 'smart'>('manual');

  useEffect(() =>
  {
    const calculateImpact = () =>
    {
      const priceDiff = price - currentPrice;
      const volumeImpact = -priceDiff * 5000; // Enhanced elasticity model
      const baseVolume = metrics.volumeSold;
      const newVolume = baseVolume + volumeImpact;
      const oldRevenue = currentPrice * baseVolume;
      const newRevenue = price * newVolume;
      const revenueImpact = newRevenue - oldRevenue;
      const marketShareImpact = (price > marketData.competitorAvgPrice) ? -2.5 : 1.5;

      return {
        margin: priceDiff * newVolume,
        volume: (volumeImpact / baseVolume) * 100,
        revenue: revenueImpact,
        marketShare: marketShareImpact
      };
    };

    setImpact(calculateImpact());
  }, [price, currentPrice, metrics.volumeSold, marketData.competitorAvgPrice]);

  const handlePriceChange = (value: number[]) =>
  {
    if (!priceLocked)
    {
      setPrice(value[0]);
      onPriceChange?.(value[0]);
    }
  };

  const handlePriceConfirm = () =>
  {
    setPriceHistory([
      { price, timestamp: new Date(), type: adjustmentMode },
      ...priceHistory.slice(0, 9)
    ]);
    onPriceConfirm?.(price);
  };

  const getSmartPriceSuggestion = () =>
  {
    // Smart price calculation based on multiple factors
    const competitorAvg = marketData.competitorAvgPrice;
    const targetMargin = metrics.targetMargin / 100;
    const suggestedPrice = Math.min(
      Math.max(
        competitorAvg * (1 + targetMargin),
        minPrice
      ),
      maxPrice
    );
    return suggestedPrice;
  };

  const handleSmartAdjustment = () =>
  {
    const suggestedPrice = getSmartPriceSuggestion();
    setPrice(suggestedPrice);
    setAdjustmentMode('smart');
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
            <CardTitle className="flex items-center space-x-2">
              <span>Price Adjustment</span>
              {priceLocked && (
                <Badge variant="outline" className="ml-2">Locked</Badge>
              )}
            </CardTitle>
            <p className="text-sm text-gray-500">
              {adjustmentMode === 'smart' ? 'AI-Optimized Pricing' : 'Manual Price Control'}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPriceLocked(!priceLocked)}
            >
              {priceLocked ? (
                <Lock className="h-4 w-4" />
              ) : (
                <Unlock className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowHistory(!showHistory)}
            >
              <History className="h-4 w-4 mr-2" />
              {showHistory ? 'Hide History' : 'Show History'}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Select
              value={adjustmentMode}
              onValueChange={(value: 'manual' | 'smart') => setAdjustmentMode(value)}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manual">Manual Adjustment</SelectItem>
                <SelectItem value="smart">Smart AI Pricing</SelectItem>
              </SelectContent>
            </Select>
            {adjustmentMode === 'smart' && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleSmartAdjustment}
              >
                <BarChart2 className="h-4 w-4 mr-2" />
                Get AI Suggestion
              </Button>
            )}
          </div>

          <div className="flex justify-between items-end">
            <span className="text-sm font-medium">Current Price</span>
            <div className="text-right">
              <span className="text-2xl font-bold">
                €{price.toFixed(3)}
              </span>
              <span className="text-sm text-gray-500 ml-1">/L</span>
              {price !== marketData.competitorAvgPrice && (
                <Badge
                  variant="outline"
                  className={`ml-2 ${price > marketData.competitorAvgPrice
                      ? 'bg-red-50 text-red-700'
                      : 'bg-green-50 text-green-700'
                    }`}
                >
                  {price > marketData.competitorAvgPrice ? 'Above' : 'Below'} Market
                </Badge>
              )}
            </div>
          </div>

          <Slider
            value={[price]}
            onValueChange={handlePriceChange}
            max={maxPrice}
            min={minPrice}
            step={0.001}
            className="w-full"
            disabled={priceLocked}
          />

          <div className="flex justify-between text-sm text-gray-500">
            <span>Min: €{minPrice.toFixed(3)}</span>
            <span>Market Avg: €{marketData.competitorAvgPrice.toFixed(3)}</span>
            <span>Max: €{maxPrice.toFixed(3)}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

          <div className="p-4 rounded-lg bg-orange-50 transition-all hover:bg-orange-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-orange-700">Market Share</span>
              {impact.marketShare > 0 ? (
                <TrendingUp className="h-4 w-4 text-orange-700" />
              ) : (
                <TrendingDown className="h-4 w-4 text-orange-700" />
              )}
            </div>
            <span className="text-xl font-bold text-orange-900">
              {impact.marketShare > 0 ? '+' : ''}{impact.marketShare.toFixed(1)}%
            </span>
          </div>
        </div>

        {showHistory && (
          <div className="space-y-2 animate-in slide-in-from-top">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Recent Price Changes</h4>
              <Button variant="ghost" size="sm" className="h-8">
                <Share2 className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {priceHistory.map((record, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">
                      €{record.price.toFixed(3)}
                    </span>
                    <Badge variant="outline">
                      {record.type}
                    </Badge>
                  </div>
                  <span className="text-sm text-gray-500">
                    {formatTimeDiff(record.timestamp)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex space-x-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="flex-1 transition-all"
                  onClick={handlePriceConfirm}
                  disabled={price === currentPrice || priceLocked}
                >
                  Confirm Change
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{priceLocked ? 'Unlock price to make changes' : 'Apply new price'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button
            variant="outline"
            onClick={() => setPrice(currentPrice)}
            disabled={price === currentPrice || priceLocked}
            className="transition-all"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        {Math.abs(impact.margin) > 1000 && (
          <Alert variant="destructive" className="animate-in slide-in-from-bottom">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Large margin impact detected. Please review carefully before confirming.
            </AlertDescription>
          </Alert>
        )}

        {price > marketData.competitorAvgPrice * 1.1 && (
          <Alert className="animate-in slide-in-from-bottom">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Price is significantly above market average. This might affect market share.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default PricingConsole;