import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CircleDollarSign,
  Droplet,
  BarChart3,
  Clock,
  Target
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from '@/components/ui/badge';

interface MetricCardProps {
  title: string;
  value: number | string;
  change?: number;
  target?: number;
  icon: React.ReactNode;
  format?: string;
  alert?: boolean;
}

const MetricCard = ({ title, value, change, target, icon, format, alert }: MetricCardProps) => {
  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-500';
    if (change < 0) return 'text-red-500';
    return 'text-gray-500';
  };

  const getProgressColor = (value: number, target: number) => {
    const percentage = (value / target) * 100;
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className={`relative ${alert ? 'border-yellow-400' : ''}`}>
      <CardContent className="pt-6">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 flex items-center space-x-2">
              {icon}
              <span>{title}</span>
            </span>
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
                <span>Progress</span>
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
        </div>
      </CardContent>
    </Card>
  );
};



interface DashboardMetricsProps {
  metrics: StationMetrics;
  className?: string;
}

const DashboardMetrics = ({ metrics, className = '' }: DashboardMetricsProps) => {
  const cards = [
    {
      title: 'Gross Margin',
      value: metrics.grossMargin,
      change: 2.4,
      target: metrics.targetMargin,
      icon: <Target className="h-4 w-4" />,
      format: 'percentage',
      alert: metrics.grossMargin < metrics.targetMargin * 0.9
    },
    {
      title: 'Current Price',
      value: metrics.currentPrice,
      change: 1.2,
      icon: <CircleDollarSign className="h-4 w-4" />,
      format: 'currency'
    },
    {
      title: 'Inventory Level',
      value: metrics.inventoryLevel,
      target: 100,
      icon: <Droplet className="h-4 w-4" />,
      format: 'percentage',
      alert: metrics.inventoryLevel < 30
    },
    {
      title: 'Daily Revenue',
      value: metrics.revenue,
      change: 3.5,
      icon: <BarChart3 className="h-4 w-4" />,
      format: 'currency'
    },
    {
      title: 'Volume Sold (L)',
      value: metrics.volumeSold,
      change: -1.2,
      icon: <Clock className="h-4 w-4" />,
      format: 'number'
    },
    {
      title: 'Customer Count',
      value: metrics.customerCount,
      change: 2.8,
      icon: <BarChart3 className="h-4 w-4" />,
      format: 'number'
    }
  ];

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 ${className}`}>
      {cards.map((card, index) => (
        <MetricCard
          key={index}
          title={card.title}
          value={card.value}
          change={card.change}
          target={card.target}
          icon={card.icon}
          format={card.format}
          alert={card.alert}
        />
      ))}
    </div>
  );
};

export default DashboardMetrics;