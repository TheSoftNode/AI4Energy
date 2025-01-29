import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Info, BarChart2 } from 'lucide-react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PriceHistory } from "./types";

interface AnalyticsPanelProps {
    competitors: Competitor[];
    marketData: any;
    filteredCompetitors: Competitor[];
    generatePriceHistory: (basePrice: number) => PriceHistory[];
    onClose: () => void;
}

export const AnalyticsPanel: React.FC<AnalyticsPanelProps> = ({
    competitors,
    marketData,
    filteredCompetitors,
    generatePriceHistory,
    onClose
}) => (
    <div className="absolute left-4 top-16 w-80 bg-white rounded-lg shadow-lg p-4">
        <div className="space-y-4">
            <h3 className="font-medium flex items-center justify-between">
                Market Analytics
                <Button variant="ghost" size="sm" onClick={onClose}>
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
                                <Tooltip />
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
                                            <Tooltip />
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
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    </div>
);

export default AnalyticsPanel;