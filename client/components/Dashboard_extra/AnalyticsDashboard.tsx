// components/AnalyticsDashboard.tsx

import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, ScatterChart, Scatter, ComposedChart } from 'recharts';
import { Button } from '@/components/ui/button';
import
    {
        Select,
        SelectContent,
        SelectItem,
        SelectTrigger,
        SelectValue,
    } from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import
    {
        TrendingUp,
        TrendingDown,
        Calendar,
        Download,
        Share2,
        Filter,
        RefreshCw,
        ChevronDown,
        AlertTriangle,
        ArrowRight,
        Zap
    } from 'lucide-react';
import
    {
        Dialog,
        DialogContent,
        DialogHeader,
        DialogTitle,
        DialogTrigger,
    } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useDashboard } from './DashboardProvider';

interface AnalyticsMetric
{
    title: string;
    value: number;
    change: number;
    trend: 'up' | 'down' | 'neutral';
    forecast?: number;
    anomaly?: boolean;
}

interface MarketTrend
{
    date: string;
    ourPrice: number;
    avgPrice: number;
    volume: number;
    margin: number;
}

const AnalyticsDashboard = () =>
{
    const { metrics, marketData } = useDashboard();
    const [timeframe, setTimeframe] = useState('7d');
    const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

    // Generate sample data for visualizations
    const generateTrendData = (): MarketTrend[] =>
    {
        const data: MarketTrend[] = [];
        const now = new Date();
        for (let i = 30; i >= 0; i--)
        {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            data.push({
                date: date.toISOString().split('T')[0],
                ourPrice: metrics.currentPrice + (Math.random() - 0.5) * 0.1,
                avgPrice: marketData.competitorAvgPrice + (Math.random() - 0.5) * 0.1,
                volume: metrics.volumeSold * (1 + (Math.random() - 0.5) * 0.2),
                margin: metrics.grossMargin * (1 + (Math.random() - 0.5) * 0.15)
            });
        }
        return data;
    };

    const trendData = generateTrendData();

    const analyticsMetrics: AnalyticsMetric[] = [
        {
            title: 'Revenue Optimization',
            value: 94.5,
            change: 3.2,
            trend: 'up',
            forecast: 96.8,
        },
        {
            title: 'Market Share',
            value: 28.5,
            change: -1.5,
            trend: 'down',
            anomaly: true
        },
        {
            title: 'Price Competitiveness',
            value: 87.3,
            change: 2.1,
            trend: 'up',
            forecast: 89.5
        },
        {
            title: 'Customer Retention',
            value: 92.1,
            change: 0.8,
            trend: 'up'
        }
    ];

    const renderMetricCard = (metric: AnalyticsMetric) => (
        <Card className="hover:shadow-md transition-all cursor-pointer"
            onClick={() => setSelectedMetric(metric.title)}>
            <CardContent className="pt-6">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{metric.title}</span>
                        {metric.anomaly && (
                            <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        )}
                    </div>
                    <div className="flex items-end justify-between">
                        <span className="text-2xl font-bold">{metric.value}%</span>
                        <div className={`flex items-center ${metric.trend === 'up' ? 'text-green-500' :
                                metric.trend === 'down' ? 'text-red-500' :
                                    'text-gray-500'
                            }`}>
                            {metric.trend === 'up' ? (
                                <TrendingUp className="h-4 w-4 mr-1" />
                            ) : (
                                <TrendingDown className="h-4 w-4 mr-1" />
                            )}
                            <span className="text-sm">{Math.abs(metric.change)}%</span>
                        </div>
                    </div>
                    {metric.forecast && (
                        <div className="text-sm text-gray-500">
                            Forecast: {metric.forecast}%
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="space-y-6">
            {/* Analytics Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold">Analytics & Insights</h2>
                    <p className="text-sm text-gray-500">
                        Comprehensive analysis of pricing performance and market dynamics
                    </p>
                </div>
                <div className="flex items-center space-x-3">
                    <Select value={timeframe} onValueChange={setTimeframe}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="24h">Last 24 Hours</SelectItem>
                            <SelectItem value="7d">Last 7 Days</SelectItem>
                            <SelectItem value="30d">Last 30 Days</SelectItem>
                            <SelectItem value="90d">Last Quarter</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        Custom Range
                    </Button>
                    <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                    </Button>
                </div>
            </div>

            {/* KPI Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {analyticsMetrics.map((metric) => renderMetricCard(metric))}
            </div>

            {/* Trend Analysis */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Market Performance Trends</CardTitle>
                        <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="bg-blue-50">
                                AI Analysis
                            </Badge>
                            <Button variant="outline" size="sm">
                                <Filter className="h-4 w-4 mr-2" />
                                Filters
                            </Button>
                            <Button variant="outline" size="sm">
                                <RefreshCw className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="price">
                        <TabsList>
                            <TabsTrigger value="price">Price Trends</TabsTrigger>
                            <TabsTrigger value="volume">Volume Analysis</TabsTrigger>
                            <TabsTrigger value="margin">Margin Performance</TabsTrigger>
                            <TabsTrigger value="correlation">Correlations</TabsTrigger>
                        </TabsList>

                        <TabsContent value="price" className="space-y-4">
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={trendData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Line
                                            type="monotone"
                                            dataKey="ourPrice"
                                            stroke="#2563eb"
                                            name="Our Price"
                                            strokeWidth={2}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="avgPrice"
                                            stroke="#16a34a"
                                            name="Market Average"
                                            strokeWidth={2}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium">Price Position</span>
                                                <Badge variant="outline" className="bg-green-50">
                                                    Optimal
                                                </Badge>
                                            </div>
                                            <div className="text-2xl font-bold">
                                                +2.3%
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                Above market average
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium">Price Volatility</span>
                                                <Badge variant="outline" className="bg-blue-50">
                                                    Low
                                                </Badge>
                                            </div>
                                            <div className="text-2xl font-bold">
                                                0.15
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                Standard deviation
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium">Price Elasticity</span>
                                                <Badge variant="outline" className="bg-yellow-50">
                                                    Moderate
                                                </Badge>
                                            </div>
                                            <div className="text-2xl font-bold">
                                                -1.2
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                Demand sensitivity
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="volume">
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={trendData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Area
                                            type="monotone"
                                            dataKey="volume"
                                            stroke="#2563eb"
                                            fill="#93c5fd"
                                            name="Sales Volume"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </TabsContent>

                        <TabsContent value="margin">
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <ComposedChart data={trendData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis yAxisId="left" />
                                        <YAxis yAxisId="right" orientation="right" />
                                        <Tooltip />
                                        <Bar
                                            yAxisId="left"
                                            dataKey="margin"
                                            fill="#2563eb"
                                            name="Gross Margin"
                                        />
                                        <Line
                                            yAxisId="right"
                                            type="monotone"
                                            dataKey="volume"
                                            stroke="#16a34a"
                                            name="Volume"
                                        />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </div>
                        </TabsContent>

                        <TabsContent value="correlation">
                            {/* Add correlation analysis visualization */}
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            {/* AI Insights */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center space-x-2">
                            <Zap className="h-5 w-5" />
                            <span>AI Insights</span>
                        </CardTitle>
                        <Badge variant="outline" className="bg-purple-50">
                            Updated 5m ago
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            {
                                title: "Price Optimization Opportunity",
                                description: "Current price point shows potential for 3% increase without significant volume impact",
                                impact: "High",
                                confidence: 92,
                                action: "Review Pricing Strategy"
                            },
                            {
                                title: "Competitive Pressure",
                                description: "3 competitors showing consistent price reductions over the past 48 hours",
                                impact: "Medium",
                                confidence: 85,
                                action: "Monitor Competition"
                            },
                            {
                                title: "Demand Pattern Shift",
                                description: "Unusual increase in off-peak demand detected",
                                impact: "Low",
                                confidence: 78,
                                action: "Analyze Pattern"
                            }
                        ].map((insight, index) => (
                            <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                                <div className={`mt-1 h-3 w-3 rounded-full ${insight.impact === 'High' ? 'bg-blue-500' :
                                        insight.impact === 'Medium' ? 'bg-yellow-500' :
                                            'bg-gray-500'
                                    }`} />
                                <div className="flex-1">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h4 className="font-medium">{insight.title}</h4>
                                            <p className="text-sm text-gray-600 mt-1">
                                                {insight.description}
                                            </p>
                                        </div>
                                        <Badge variant="outline" className={
                                            insight.confidence >= 90 ? 'bg-green-50' :
                                                insight.confidence >= 80 ? 'bg-blue-50' :
                                                    'bg-gray-50'
                                        }>
                                            {insight.confidence}% confidence
                                        </Badge>
                                    </div>
                                    <div className="mt-2 flex items-center justify-between">
                                        <Badge variant="outline" className={
                                            insight.impact === 'High' ? 'bg-blue-50' :
                                                insight.impact === 'Medium' ? 'bg-yellow-50' :
                                                    'bg-gray-50'
                                        }>
                                            {insight.impact} Impact
                                        </Badge>
                                        <Button variant="outline" size="sm">
                                            {insight.action}
                                            <ArrowRight className="h-4 w-4 ml-2" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Advanced Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Price Elasticity Analysis */}
                <Card>
                    <CardHeader>
                        <CardTitle>Price Elasticity Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <ScatterChart>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis type="number" dataKey="priceChange" name="Price Change %" />
                                        <YAxis type="number" dataKey="volumeChange" name="Volume Change %" />
                                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                        <Scatter
                                            name="Price-Volume Relationship"
                                            data={Array.from({ length: 50 }, () => ({
                                                priceChange: (Math.random() - 0.5) * 10,
                                                volumeChange: (Math.random() - 0.5) * 15,
                                            }))}
                                            fill="#2563eb"
                                        />
                                    </ScatterChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-1">
                                    <span className="text-sm text-gray-500">Elasticity Coefficient</span>
                                    <p className="font-medium">-1.32</p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-sm text-gray-500">R² Value</span>
                                    <p className="font-medium">0.87</p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-sm text-gray-500">Confidence Level</span>
                                    <p className="font-medium">95%</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Market Share Analysis */}
                <Card>
                    <CardHeader>
                        <CardTitle>Market Share Dynamics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart
                                        data={Array.from({ length: 30 }, (_, i) => ({
                                            date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                                            ourShare: 25 + Math.random() * 5,
                                            competitor1: 20 + Math.random() * 5,
                                            competitor2: 15 + Math.random() * 5,
                                            competitor3: 10 + Math.random() * 5,
                                        }))}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="ourShare" stackId="1" stroke="#2563eb" fill="#93c5fd" />
                                        <Area type="monotone" dataKey="competitor1" stackId="1" stroke="#16a34a" fill="#86efac" />
                                        <Area type="monotone" dataKey="competitor2" stackId="1" stroke="#ca8a04" fill="#fde047" />
                                        <Area type="monotone" dataKey="competitor3" stackId="1" stroke="#dc2626" fill="#fca5a5" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
                                        <span className="text-sm">Our Station</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2" />
                                        <span className="text-sm">Competitor 1</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2" />
                                        <span className="text-sm">Competitor 2</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
                                        <span className="text-sm">Competitor 3</span>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">
                                    <Filter className="h-4 w-4 mr-2" />
                                    Filter
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Forecast Models */}
                <Card>
                    <CardHeader>
                        <CardTitle>Demand Forecast Models</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <Tabs defaultValue="hourly">
                                <TabsList>
                                    <TabsTrigger value="hourly">Hourly</TabsTrigger>
                                    <TabsTrigger value="daily">Daily</TabsTrigger>
                                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                                </TabsList>
                                <div className="h-[300px] mt-4">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart
                                            data={Array.from({ length: 24 }, (_, i) => ({
                                                time: `${i}:00`,
                                                actual: Math.random() * 1000 + 500,
                                                forecast: Math.random() * 1000 + 500,
                                                confidence: [Math.random() * 900 + 400, Math.random() * 1100 + 600],
                                            }))}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="time" />
                                            <YAxis />
                                            <Tooltip />
                                            <Line type="monotone" dataKey="actual" stroke="#2563eb" name="Actual" />
                                            <Line type="monotone" dataKey="forecast" stroke="#16a34a" name="Forecast" strokeDasharray="5 5" />
                                            <Area
                                                dataKey="confidence"
                                                stroke="none"
                                                fill="#93c5fd"
                                                fillOpacity={0.2}
                                                name="Confidence Interval"
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </Tabs>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-1">
                                    <span className="text-sm text-gray-500">Forecast Accuracy</span>
                                    <p className="font-medium">93.5%</p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-sm text-gray-500">MAPE</span>
                                    <p className="font-medium">6.5%</p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-sm text-gray-500">Next Update</span>
                                    <p className="font-medium">15 mins</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Optimization Scenarios */}
                <Card>
                    <CardHeader>
                        <CardTitle>Price Optimization Scenarios</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                {
                                    name: "Maximize Revenue",
                                    priceChange: "+2.5%",
                                    volumeImpact: "-1.2%",
                                    revenueImpact: "+1.3%",
                                    confidence: 92
                                },
                                {
                                    name: "Maintain Market Share",
                                    priceChange: "-1.0%",
                                    volumeImpact: "+1.8%",
                                    revenueImpact: "+0.8%",
                                    confidence: 88
                                },
                                {
                                    name: "Balance Growth",
                                    priceChange: "+1.2%",
                                    volumeImpact: "-0.5%",
                                    revenueImpact: "+0.7%",
                                    confidence: 90
                                }
                            ].map((scenario, index) => (
                                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-medium">{scenario.name}</h4>
                                        <Badge variant="outline" className="bg-blue-50">
                                            {scenario.confidence}% confidence
                                        </Badge>
                                    </div>
                                    <div className="mt-2 grid grid-cols-3 gap-4">
                                        <div className="space-y-1">
                                            <span className="text-sm text-gray-500">Price Change</span>
                                            <p className={`font-medium ${scenario.priceChange.startsWith('+') ? 'text-green-600' : 'text-red-600'
                                                }`}>
                                                {scenario.priceChange}
                                            </p>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-sm text-gray-500">Volume Impact</span>
                                            <p className={`font-medium ${scenario.volumeImpact.startsWith('+') ? 'text-green-600' : 'text-red-600'
                                                }`}>
                                                {scenario.volumeImpact}
                                            </p>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-sm text-gray-500">Revenue Impact</span>
                                            <p className={`font-medium ${scenario.revenueImpact.startsWith('+') ? 'text-green-600' : 'text-red-600'
                                                }`}>
                                                {scenario.revenueImpact}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <Button variant="outline" size="sm" className="w-full">
                                            Apply Scenario
                                            <ArrowRight className="h-4 w-4 ml-2" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;
