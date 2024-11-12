"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import
  {
    TrendingUp,
    TrendingDown,
    AlertTriangle,
    CircleDollarSign,
    Droplet,
    BarChart3,
    Clock,
    Target,
    Share2,
    Calendar,
    RefreshCcw,
    ArrowRight,
    ChevronDown
  } from 'lucide-react';
import
  {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip";
import
  {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import
  {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import
  {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { useDashboard } from './DashboardProvider';

interface MetricCardProps
{
  title: string;
  value: number | string;
  change?: number;
  target?: number;
  icon: React.ReactNode;
  format?: string;
  alert?: boolean;
  trend?: 'up' | 'down' | 'neutral' | string;
  historicalData?: Array<{ date: string; value: number }>;
  analysis?: string;
  benchmark?: {
    value: number;
    label: string;
  };
}

const MetricCard = ({
  title,
  value,
  change,
  target,
  icon,
  format,
  alert,
  trend,
  historicalData,
  analysis,
  benchmark
}: MetricCardProps) =>
{
  const [showDetails, setShowDetails] = useState(false);

  const getChangeColor = (change: number) =>
  {
    if (change > 0) return 'text-green-500';
    if (change < 0) return 'text-red-500';
    return 'text-gray-500';
  };

  const getProgressColor = (value: number, target: number) =>
  {
    const percentage = (value / target) * 100;
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className={`relative ${alert ? 'border-yellow-400' : ''} hover:shadow-md transition-all`}>
      <CardContent className="pt-6">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 flex items-center space-x-2">
              {icon}
              <span>{title}</span>
            </span>
            <div className="flex items-center space-x-2">
              {alert && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <AlertTriangle className="h-4 w-4 text-yellow-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Below target threshold</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setShowDetails(true)}
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-end justify-between">
            <span className="text-2xl font-bold">
              {format === 'currency' && '€'}
              {typeof value === 'number' ? value.toLocaleString() : value}
              {format === 'percentage' && '%'}
            </span>
            {change !== undefined && (
              <div className={`flex items-center ${getChangeColor(change)}`}>
                {change > 0 ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                <span className="text-sm">{Math.abs(change)}%</span>
              </div>
            )}
          </div>

          {target && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Progress to Target</span>
                <span>{((value as number / target) * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1">
                <div
                  className={`h-1 rounded-full ${getProgressColor(value as number, target)}`}
                  style={{ width: `${Math.min(((value as number) / target) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}

          {benchmark && (
            <div className="mt-2 text-xs text-gray-500 flex items-center justify-between">
              <span>{benchmark.label}:</span>
              <span className="font-medium">
                {format === 'currency' && '€'}
                {benchmark.value.toLocaleString()}
                {format === 'percentage' && '%'}
              </span>
            </div>
          )}
        </div>
      </CardContent>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              {icon}
              <span>{title} Details</span>
            </DialogTitle>
            <DialogDescription>
              Detailed analysis and historical performance
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {historicalData && (
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <RechartsTooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#2563eb"
                      name={title}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            <div className="space-y-2">
              <h4 className="font-medium">Analysis</h4>
              <p className="text-sm text-gray-600">{analysis}</p>
            </div>

            {benchmark && (
              <div className="space-y-2">
                <h4 className="font-medium">Benchmark Comparison</h4>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm">{benchmark.label}</span>
                  <span className="font-medium">
                    {format === 'currency' && '€'}
                    {benchmark.value.toLocaleString()}
                    {format === 'percentage' && '%'}
                  </span>
                </div>
              </div>
            )}

            {target && (
              <div className="space-y-2">
                <h4 className="font-medium">Target Progress</h4>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Current Progress</span>
                    <span>{((value as number / target) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getProgressColor(value as number, target)}`}
                      style={{ width: `${Math.min(((value as number) / target) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

const DashboardMetrics = () =>
{
  const { metrics, marketData } = useDashboard();
  const [timeframe, setTimeframe] = useState('today');

  // Mock historical data - replace with real data in production
  const generateHistoricalData = (baseValue: number) =>
  {
    const dates = Array.from({ length: 30 }, (_, i) =>
    {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return date.toISOString().split('T')[0];
    });

    return dates.map(date => ({
      date,
      value: baseValue + (Math.random() - 0.5) * baseValue * 0.2
    }));
  };

  const cards = [
    {
      title: 'Gross Margin',
      value: metrics.grossMargin,
      change: 2.4,
      target: metrics.targetMargin,
      icon: <Target className="h-4 w-4" />,
      format: 'percentage',
      alert: metrics.grossMargin < metrics.targetMargin * 0.9,
      trend: 'up' as 'up',
      historicalData: generateHistoricalData(metrics.grossMargin),
      analysis: 'Margin has shown consistent growth over the past month, primarily driven by optimized pricing strategies and reduced operating costs.',
      benchmark: {
        value: marketData.competitorAvgPrice * 0.15,
        label: 'Industry Average'
      }
    },
    {
      title: 'Current Price',
      value: metrics.currentPrice,
      change: 1.2,
      icon: <CircleDollarSign className="h-4 w-4" />,
      format: 'currency',
      trend: 'up',
      historicalData: generateHistoricalData(metrics.currentPrice),
      analysis: 'Price movements have remained competitive while maintaining profitability targets.',
      benchmark: {
        value: marketData.competitorAvgPrice,
        label: 'Market Average'
      }
    },
    // Continue with other metrics...
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">Last 7 Days</SelectItem>
              <SelectItem value="month">Last 30 Days</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            <RefreshCcw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Custom Range
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {cards.map((card, index) => (
          <MetricCard
            key={index}
            {...card}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardMetrics;
