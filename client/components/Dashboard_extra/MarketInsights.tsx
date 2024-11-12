import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import
    {
        TrendingUp,
        TrendingDown,
        Activity,
        Users,
        Target,
        AlertTriangle
    } from 'lucide-react';
import { useDashboard } from './DashboardProvider';

const MarketInsights: React.FC = () =>
{
    const { marketData, metrics } = useDashboard();

    const insights = [
        {
            title: 'Market Position',
            value: `${marketData.pricePosition === 'above' ? '+' : '-'}${Math.abs(
                ((metrics.currentPrice - marketData.competitorAvgPrice) / marketData.competitorAvgPrice) * 100
            ).toFixed(1)}%`,
            description: `Compared to market average (€${marketData.competitorAvgPrice.toFixed(3)}/L)`,
            trend: marketData.pricePosition === 'below' ? 'positive' : 'negative',
            icon: <Target className="h-5 w-5" />
        },
        {
            title: 'Market Share',
            value: `${marketData.marketShare}%`,
            description: `Among ${marketData.nearbyCompetitors} nearby competitors`,
            trend: marketData.marketShare > 25 ? 'positive' : 'neutral',
            icon: <Users className="h-5 w-5" />
        },
        {
            title: 'Price Volatility',
            value: 'Moderate',
            description: '3 price changes in last 24h',
            trend: 'neutral',
            icon: <Activity className="h-5 w-5" />
        }
    ];

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-semibold">Market Insights</CardTitle>
                    <Badge variant="outline">Last updated: 5m ago</Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {insights.map((insight, index) => (
                        <div
                            key={index}
                            className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <div className={`p-2 rounded-full ${insight.trend === 'positive' ? 'bg-green-100 text-green-600' :
                                    insight.trend === 'negative' ? 'bg-red-100 text-red-600' :
                                        'bg-gray-100 text-gray-600'
                                }`}>
                                {insight.icon}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-medium">{insight.title}</h3>
                                    <div className="flex items-center">
                                        <span className={`font-bold ${insight.trend === 'positive' ? 'text-green-600' :
                                                insight.trend === 'negative' ? 'text-red-600' :
                                                    'text-gray-600'
                                            }`}>
                                            {insight.value}
                                        </span>
                                        {insight.trend === 'positive' ? (
                                            <TrendingUp className="h-4 w-4 ml-1 text-green-600" />
                                        ) : insight.trend === 'negative' ? (
                                            <TrendingDown className="h-4 w-4 ml-1 text-red-600" />
                                        ) : null}
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">{insight.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default MarketInsights;
