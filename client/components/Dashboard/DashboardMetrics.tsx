import React from 'react'
import { Card, CardContent } from '../ui/card';

interface StationMetrics
{
    grossMargin: number;
    targetMargin: number;
    currentPrice: number;
    inventoryLevel: number;
    projectedDemand: number;
    revenue: number;
}

const DashboardMetrics = ({ metrics }: { metrics: StationMetrics }) =>
{
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col space-y-2">
                        <span className="text-sm text-gray-500">Gross Margin</span>
                        <div className="flex items-end justify-between">
                            <span className="text-2xl font-bold">{metrics.grossMargin}%</span>
                            <span className="text-sm text-green-500">+2.4%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1">
                            <div
                                className="bg-blue-500 h-1 rounded-full"
                                style={{ width: `${(metrics.grossMargin / metrics.targetMargin) * 100}%` }}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Similar cards for other metrics */}
        </div>
    );
};
export default DashboardMetrics