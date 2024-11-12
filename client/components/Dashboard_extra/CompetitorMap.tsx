"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import
{
    Map,
    Filter,
    Maximize2,
    ZoomIn,
    ZoomOut,
    Layers,
    Activity,
    Clock,
    Search,
    Share2,
    ChevronRight,
    BarChart2,
    RefreshCw,
    Info
} from 'lucide-react';
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import
{
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { useDashboard } from './DashboardProvider';

interface CompetitorMapProps
{
    competitors: Competitor[];
    centerLat?: number;
    centerLng?: number;
    radius?: number;
}

interface PriceHistory
{
    timestamp: Date;
    price: number;
}

interface CompetitorAnalysis
{
    priceVolatility: number;
    averageResponse: number;
    marketInfluence: number;
    priceHistory: PriceHistory[];
}

const CompetitorMap: React.FC<CompetitorMapProps> = ({
    competitors,
    centerLat = 48.8566,
    centerLng = 2.3522,
    radius = 5
}) =>
{
    const { marketData, metrics } = useDashboard();
    const [searchRadius, setSearchRadius] = useState(radius);
    const [selectedCompetitor, setSelectedCompetitor] = useState<Competitor | null>(null);
    const [showFilters, setShowFilters] = useState(false);
    const [showAnalytics, setShowAnalytics] = useState(false);
    const [priceFilter, setPriceFilter] = useState<'all' | 'below' | 'above'>('all');
    const [mapView, setMapView] = useState<'standard' | 'heatmap' | 'cluster'>('standard');
    const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');
    const [competitorAnalysis, setCompetitorAnalysis] = useState<CompetitorAnalysis | null>(null);

    // Mock price history data generation
    const generatePriceHistory = (basePrice: number) =>
    {
        const history: PriceHistory[] = [];
        const now = new Date();
        for (let i = 0; i < 24; i++)
        {
            const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
            const price = basePrice + (Math.random() - 0.5) * 0.1;
            history.push({ timestamp, price });
        }
        return history.reverse();
    };

    // Calculate competitor analysis when a competitor is selected
    useEffect(() =>
    {
        if (selectedCompetitor)
        {
            const priceHistory = generatePriceHistory(selectedCompetitor.price);
            const analysis: CompetitorAnalysis = {
                priceVolatility: calculateVolatility(priceHistory),
                averageResponse: calculateResponseTime(priceHistory),
                marketInfluence: calculateMarketInfluence(selectedCompetitor),
                priceHistory
            };
            setCompetitorAnalysis(analysis);
        }
    }, [selectedCompetitor]);

    const calculateVolatility = (history: PriceHistory[]) =>
    {
        // Calculate price volatility based on standard deviation
        const prices = history.map(h => h.price);
        const avg = prices.reduce((a, b) => a + b) / prices.length;
        const variance = prices.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / prices.length;
        return Math.sqrt(variance);
    };

    const calculateResponseTime = (history: PriceHistory[]) =>
    {
        // Calculate average time between price changes
        let totalTime = 0;
        let changes = 0;
        for (let i = 1; i < history.length; i++)
        {
            if (history[i].price !== history[i - 1].price)
            {
                totalTime += history[i].timestamp.getTime() - history[i - 1].timestamp.getTime();
                changes++;
            }
        }
        return changes ? totalTime / changes / (60 * 1000) : 0; // Return in minutes
    };

    const calculateMarketInfluence = (competitor: Competitor) =>
    {
        // Calculate market influence based on distance and price difference
        const distanceFactor = 1 - (competitor.distance / searchRadius);
        const priceDiff = Math.abs(competitor.price - metrics.currentPrice);
        return distanceFactor * (1 - priceDiff / metrics.currentPrice) * 100;
    };

    const filteredCompetitors = competitors.filter(competitor =>
    {
        if (priceFilter === 'all') return true;
        return competitor.priceComparison === priceFilter;
    });

    const handleCompetitorClick = (competitor: Competitor) =>
    {
        setSelectedCompetitor(competitor);
    };

    const getPriceChangeIndicator = (competitor: Competitor) =>
    {
        const diff = ((competitor.price - metrics.currentPrice) / metrics.currentPrice) * 100;
        if (Math.abs(diff) < 0.1) return 'Equal';
        return diff > 0 ?
            `${diff.toFixed(1)}% Higher` :
            `${Math.abs(diff).toFixed(1)}% Lower`;
    };

    return (
        <Card className="col-span-2">
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
                <div className="space-y-1">
                    <CardTitle className="text-xl font-bold">Competition Map</CardTitle>
                    <p className="text-sm text-gray-500">
                        {filteredCompetitors.length} competitors within {searchRadius}km
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Select
                        value={mapView}
                        onValueChange={(value: 'standard' | 'heatmap' | 'cluster') => setMapView(value)}
                    >
                        <SelectTrigger className="w-[130px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="heatmap">Heat Map</SelectItem>
                            <SelectItem value="cluster">Clusters</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowAnalytics(!showAnalytics)}
                    >
                        <Activity className="h-4 w-4 mr-2" />
                        Analytics
                    </Button>

                    <Button variant="outline" size="sm">
                        <Maximize2 className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>

            <CardContent>
                {showFilters && (
                    <div className="mb-4 p-4 bg-gray-50 rounded-lg space-y-4">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium">Search Radius (km)</label>
                                <span className="text-sm text-gray-500">{searchRadius}km</span>
                            </div>
                            <Slider
                                value={[searchRadius]}
                                onValueChange={(value) => setSearchRadius(value[0])}
                                max={20}
                                min={1}
                                step={0.5}
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Time Range</label>
                            <div className="flex items-center space-x-2">
                                <Badge
                                    variant="outline"
                                    className={`cursor-pointer ${timeRange === '24h' ? 'bg-blue-50' : ''}`}
                                    onClick={() => setTimeRange('24h')}
                                >
                                    24 Hours
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className={`cursor-pointer ${timeRange === '7d' ? 'bg-blue-50' : ''}`}
                                    onClick={() => setTimeRange('7d')}
                                >
                                    7 Days
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className={`cursor-pointer ${timeRange === '30d' ? 'bg-blue-50' : ''}`}
                                    onClick={() => setTimeRange('30d')}
                                >
                                    30 Days
                                </Badge>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Price Filter</label>
                            <div className="flex items-center space-x-2">
                                <Badge
                                    variant="outline"
                                    className={`cursor-pointer ${priceFilter === 'all' ? 'bg-blue-50' : ''}`}
                                    onClick={() => setPriceFilter('all')}
                                >
                                    All
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className={`cursor-pointer ${priceFilter === 'below' ? 'bg-green-50' : ''}`}
                                    onClick={() => setPriceFilter('below')}
                                >
                                    Below Average
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className={`cursor-pointer ${priceFilter === 'above' ? 'bg-red-50' : ''}`}
                                    onClick={() => setPriceFilter('above')}
                                >
                                    Above Average
                                </Badge>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <Input
                                type="text"
                                placeholder="Search competitors..."
                                className="flex-1"
                            />
                            <Button variant="outline" size="sm">
                                <Search className="h-4 w-4 mr-2" />
                                Search
                            </Button>
                        </div>
                    </div>
                )}

                <div className="relative h-[500px] bg-gray-100 rounded-lg overflow-hidden">
                    <div className="absolute inset-0">
                        {/* Map placeholder - would be replaced with actual mapping library */}
                        <div className="w-full h-full flex items-center justify-center">
                            <Map className="h-12 w-12 text-gray-400" />
                        </div>
                    </div>

                    {/* Map controls */}
                    <div className="absolute top-4 right-4 flex flex-col space-y-2">
                        <Button variant="secondary" size="sm">
                            <ZoomIn className="h-4 w-4" />
                        </Button>
                        <Button variant="secondary" size="sm">
                            <ZoomOut className="h-4 w-4" />
                        </Button>
                        <Button variant="secondary" size="sm">
                            <Layers className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Real-time updates indicator */}
                    <div className="absolute top-4 left-4 bg-white rounded-lg shadow p-2">
                        <div className="flex items-center space-x-2">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-sm">Live Updates</span>
                        </div>
                    </div>

                    {/* Competitor details panel */}
                    {selectedCompetitor && (
                        <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <div className="flex items-center space-x-2">
                                        <h3 className="font-bold">{selectedCompetitor.name}</h3>
                                        <Badge variant="outline">
                                            {getPriceChangeIndicator(selectedCompetitor)}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        {selectedCompetitor.distance.toFixed(1)}km away
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold">€{selectedCompetitor.price.toFixed(3)}/L</p>
                                    <Badge
                                        variant="outline"
                                        className={
                                            selectedCompetitor.priceComparison === 'below'
                                                ? 'bg-green-50'
                                                : selectedCompetitor.priceComparison === 'above'
                                                    ? 'bg-red-50'
                                                    : ''
                                        }
                                    >
                                        {selectedCompetitor.priceComparison === 'below' ? 'Below' : 'Above'} Average
                                    </Badge>
                                </div>
                            </div>

                            {competitorAnalysis && (
                                <div className="mt-4 pt-4 border-t">
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-xs text-gray-500">Price Volatility</label>
                                            <p className="font-medium">
                                                {competitorAnalysis.priceVolatility.toFixed(3)}
                                            </p>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs text-gray-500">Avg Response Time</label>
                                            <p className="font-medium">
                                                {competitorAnalysis.averageResponse.toFixed(0)} min
                                            </p>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs text-gray-500">Market Influence</label>
                                            <p className="font-medium">
                                                {competitorAnalysis.marketInfluence.toFixed(1)}%
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-4 h-[100px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={competitorAnalysis.priceHistory.map(h => ({
                                                time: h.timestamp.toLocaleTimeString(),
                                                price: h.price
                                            }))}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="time" />
                                                <YAxis domain={['auto', 'auto']} />
                                                <RechartsTooltip />
                                                <Line
                                                    type="monotone"
                                                    dataKey="price"
                                                    stroke="#2563eb"
                                                    dot={false}
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>

                                    <div className="mt-4 flex justify-end space-x-2">
                                        <Button variant="outline" size="sm">
                                            <Share2 className="h-4 w-4 mr-2" />
                                            Share
                                        </Button>
                                        <Button size="sm">
                                            <ChevronRight className="h-4 w-4 mr-2" />
                                            View Details
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Analytics Panel */}
                    {showAnalytics && (
                        <div className="absolute left-4 top-16 w-80 bg-white rounded-lg shadow-lg p-4">
                            <div className="space-y-4">
                                <h3 className="font-medium flex items-center justify-between">
                                    Market Analytics
                                    <Button variant="ghost" size="sm" onClick={() => setShowAnalytics(false)}>
                                        <Info className="h-4 w-4" />
                                    </Button>
                                </h3>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-500">Price Distribution</label>
                                        <div className="h-[100px]">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <LineChart data={[
                                                    { price: 1.7, count: 2 },
                                                    { price: 1.75, count: 5 },
                                                    { price: 1.8, count: 8 },
                                                    { price: 1.85, count: 12 },
                                                    { price: 1.9, count: 6 },
                                                    { price: 1.95, count: 3 }
                                                ]}>
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="price" />
                                                    <YAxis />
                                                    <RechartsTooltip />
                                                    <Line type="monotone" dataKey="count" stroke="#2563eb" />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-xs text-gray-500">Average Price</label>
                                            <p className="font-medium">€{marketData.competitorAvgPrice.toFixed(3)}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs text-gray-500">Price Range</label>
                                            <p className="font-medium">€0.20</p>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs text-gray-500">Active Competitors</label>
                                            <p className="font-medium">{filteredCompetitors.length}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs text-gray-500">Market Position</label>
                                            <Badge variant="outline" className="bg-blue-50">
                                                {marketData.pricePosition}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-500">Price Change Frequency</label>
                                        <div className="space-y-1">
                                            {[
                                                { time: 'Last hour', changes: 3 },
                                                { time: 'Last 6 hours', changes: 12 },
                                                { time: 'Last 24 hours', changes: 28 }
                                            ].map((period) => (
                                                <div key={period.time} className="flex items-center justify-between">
                                                    <span className="text-xs">{period.time}</span>
                                                    <div className="flex items-center space-x-2">
                                                        <div className="h-2 bg-blue-200 rounded-full" style={{
                                                            width: `${period.changes * 4}px`
                                                        }} />
                                                        <span className="text-xs font-medium">{period.changes}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" className="w-full">
                                            <BarChart2 className="h-4 w-4 mr-2" />
                                            Detailed Analysis
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[800px]">
                                        <DialogHeader>
                                            <DialogTitle>Market Analysis</DialogTitle>
                                            <DialogDescription>
                                                Comprehensive market trends and competitor analysis
                                            </DialogDescription>
                                        </DialogHeader>

                                        <div className="space-y-6">
                                            {/* Price Trends */}
                                            <div className="space-y-2">
                                                <h4 className="font-medium">Price Trends</h4>
                                                <div className="h-[300px]">
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        <LineChart data={generatePriceHistory(marketData.competitorAvgPrice).map(h => ({
                                                            time: h.timestamp.toLocaleTimeString(),
                                                            avgPrice: h.price,
                                                            ourPrice: h.price * (1 + Math.random() * 0.1 - 0.05)
                                                        }))}>
                                                            <CartesianGrid strokeDasharray="3 3" />
                                                            <XAxis dataKey="time" />
                                                            <YAxis domain={['auto', 'auto']} />
                                                            <RechartsTooltip />
                                                            <Line type="monotone" dataKey="avgPrice" stroke="#2563eb" name="Market Average" />
                                                            <Line type="monotone" dataKey="ourPrice" stroke="#16a34a" name="Our Price" />
                                                        </LineChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </div>

                                            {/* Competitor Analysis */}
                                            <div className="space-y-4">
                                                <h4 className="font-medium">Competitor Behavior Analysis</h4>
                                                <div className="grid grid-cols-2 gap-6">
                                                    {/* Response Times */}
                                                    <div className="space-y-2">
                                                        <h5 className="text-sm font-medium">Average Response Times</h5>
                                                        <div className="space-y-2">
                                                            {competitors.slice(0, 5).map((competitor, index) => (
                                                                <div key={index} className="flex items-center justify-between">
                                                                    <span className="text-sm">{competitor.name}</span>
                                                                    <div className="flex items-center space-x-2">
                                                                        <div className="h-2 bg-blue-200 rounded-full" style={{
                                                                            width: `${Math.random() * 100}px`
                                                                        }} />
                                                                        <span className="text-xs">{Math.floor(Math.random() * 30 + 5)}m</span>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Market Influence */}
                                                    <div className="space-y-2">
                                                        <h5 className="text-sm font-medium">Market Influence Score</h5>
                                                        <div className="space-y-2">
                                                            {competitors.slice(0, 5).map((competitor, index) => (
                                                                <div key={index} className="flex items-center justify-between">
                                                                    <span className="text-sm">{competitor.name}</span>
                                                                    <Badge variant="outline" className={
                                                                        index === 0 ? 'bg-blue-50' :
                                                                            index === 1 ? 'bg-green-50' :
                                                                                'bg-gray-50'
                                                                    }>
                                                                        {(Math.random() * 100).toFixed(1)}%
                                                                    </Badge>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Recommendations */}
                                            <div className="space-y-2">
                                                <h4 className="font-medium">AI Recommendations</h4>
                                                <div className="space-y-2">
                                                    {[
                                                        {
                                                            title: "Price Adjustment",
                                                            description: "Consider increasing price by 0.02€/L based on competitor margins",
                                                            impact: "High",
                                                            type: "positive"
                                                        },
                                                        {
                                                            title: "Market Position",
                                                            description: "Maintain current position to preserve market share",
                                                            impact: "Medium",
                                                            type: "neutral"
                                                        },
                                                        {
                                                            title: "Competitive Response",
                                                            description: "Monitor Station A for potential price changes",
                                                            impact: "Low",
                                                            type: "warning"
                                                        }
                                                    ].map((recommendation, index) => (
                                                        <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                                                            <div className={`mt-1 h-2 w-2 rounded-full ${recommendation.type === 'positive' ? 'bg-green-500' :
                                                                recommendation.type === 'neutral' ? 'bg-blue-500' :
                                                                    'bg-yellow-500'
                                                                }`} />
                                                            <div className="flex-1">
                                                                <div className="flex items-center justify-between">
                                                                    <h6 className="font-medium">{recommendation.title}</h6>
                                                                    <Badge variant="outline" className={
                                                                        recommendation.impact === 'High' ? 'bg-green-50' :
                                                                            recommendation.impact === 'Medium' ? 'bg-blue-50' :
                                                                                'bg-gray-50'
                                                                    }>
                                                                        {recommendation.impact} Impact
                                                                    </Badge>
                                                                </div>
                                                                <p className="text-sm text-gray-600">{recommendation.description}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    )}
                </div>

                {/* Legend */}
                <div className="mt-4 flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-green-500 mr-2" />
                            <span>Below Average</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
                            <span>Above Average</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
                            <span>Equal</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>Last updated: 5 mins ago</span>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <RefreshCw className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CompetitorMap;
