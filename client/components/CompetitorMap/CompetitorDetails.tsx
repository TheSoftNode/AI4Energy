import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Share2, ChevronRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CompetitorAnalysis } from './types';

interface CompetitorDetailsProps {
    competitor: Competitor;
    analysis: CompetitorAnalysis;
    metrics: any;
    getPriceChangeIndicator: (competitor: Competitor) => string;
}

export const CompetitorDetails: React.FC<CompetitorDetailsProps> = ({
    competitor,
    analysis,
    metrics,
    getPriceChangeIndicator
}) => (
    <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg">
        <div className="flex justify-between items-start">
            <div className="space-y-1">
                <div className="flex items-center space-x-2">
                    <h3 className="font-bold">{competitor.name}</h3>
                    <Badge variant="outline">
                        {getPriceChangeIndicator(competitor)}
                    </Badge>
                </div>
                <p className="text-sm text-gray-500">
                    {competitor.distance.toFixed(1)}km away
                </p>
            </div>
            <div className="text-right">
                <p className="font-bold">€{competitor.price.toFixed(3)}/L</p>
                <Badge
                    variant="outline"
                    className={
                        competitor.priceComparison === 'below'
                            ? 'bg-green-50'
                            : competitor.priceComparison === 'above'
                                ? 'bg-red-50'
                                : ''
                    }
                >
                    {competitor.priceComparison === 'below' ? 'Below' : 'Above'} Average
                </Badge>
            </div>
        </div>

        <div className="mt-4 pt-4 border-t">
            <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                    <label className="text-xs text-gray-500">Price Volatility</label>
                    <p className="font-medium">
                        {analysis.priceVolatility.toFixed(3)}
                    </p>
                </div>
                <div className="space-y-1">
                    <label className="text-xs text-gray-500">Avg Response Time</label>
                    <p className="font-medium">
                        {analysis.averageResponse.toFixed(0)} min
                    </p>
                </div>
                <div className="space-y-1">
                    <label className="text-xs text-gray-500">Market Influence</label>
                    <p className="font-medium">
                        {analysis.marketInfluence.toFixed(1)}%
                    </p>
                </div>
            </div>

            <div className="mt-4 h-[100px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analysis.priceHistory.map(h => ({
                        time: h.timestamp.toLocaleTimeString(),
                        price: h.price
                    }))}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis domain={['auto', 'auto']} />
                        <Tooltip />
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
    </div>
);