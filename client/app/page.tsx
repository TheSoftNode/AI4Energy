"use client"

import React, { Suspense, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Download, Filter, RefreshCw } from 'lucide-react';
import AnalyticsDashboard from '@/components/Dashboard_extra/AnalyticsDashboard';
import SettingsMenu from '@/components/Dashboard/SettingsMenu';
import { DashboardProvider, useDashboard } from '@/components/Dashboard_extra/DashboardProvider';
import Navigation from '@/components/Dashboard_extra/Navigation';
import DashboardMetrics from '@/components/Dashboard_extra/DashboardMetrics';
import PricingConsole from '@/components/Dashboard_extra/PricingConsole';
import AutomatedRules from '@/components/Dashboard_extra/AutomatedRules';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import CompetitorMap from '@/components/CompetitorMap/CompetitorMap';

const DashboardContent = () =>
{
    const { view, competitors, clientStation } = useDashboard();

    console.log('DashboardContent clientStation:', clientStation);
    console.log('DashboardContent competitors:', competitors);


    const renderContent = () =>
    {
        switch (view)
        {
            case 'overview':
                return <OverviewDashboard />;
            case 'pricing':
                return <PricingDashboard />;
            case 'analytics':
                return <AnalyticsDashboard />;
            case 'settings':
                return <SettingsMenu />;
            case 'competition':
                return (
                    <CompetitorMap
                        competitors={competitors}
                        clientStation={clientStation}
                        radius={10}
                    />
                );
            default:
                return <OverviewDashboard />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation currentView={view} />
            <main className="container mx-auto px-4 pt-20 pb-8">
                {renderContent()}
            </main>
        </div>
    );
};

const DashboardLayout = () =>
{
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DashboardProvider>
                <DashboardContent />
            </DashboardProvider>
        </Suspense>
    );
};

const OverviewDashboard = () =>
{
    const [timeframe, setTimeframe] = useState('today');
    const { competitors, clientStation } = useDashboard();


    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-3 items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Dashboard Overview</h1>
                    <p className="text-sm text-gray-500">
                        Real-time pricing and market insights
                    </p>
                </div>
                <div className="flex flex-wrap gap-3 items-center space-x-3">
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
                        <Calendar className="h-4 w-4 mr-2" />
                        Custom Range
                    </Button>
                    <Button variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Refresh
                    </Button>
                    <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                    </Button>
                    <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                    </Button>
                </div>
            </div>

            <DashboardMetrics />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <CompetitorMap
                        competitors={competitors}
                        clientStation={clientStation}
                        radius={10}
                    />
                </div>
                <div className="space-y-6">
                    <PricingConsole
                        currentPrice={1.859}
                        minPrice={1.5}
                        maxPrice={2.5}
                    />
                    <AutomatedRules />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Demand Forecast</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={[
                                { time: '00:00', current: 100, projected: 95 },
                                { time: '04:00', current: 80, projected: 75 },
                                { time: '08:00', current: 120, projected: 115 },
                                { time: '12:00', current: 150, projected: 140 },
                                { time: '16:00', current: 180, projected: 170 },
                                { time: '20:00', current: 130, projected: 125 },
                            ]}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="time" />
                                <YAxis />

                                <Line type="monotone" dataKey="current" stroke="#2563eb" />
                                <Line type="monotone" dataKey="projected" stroke="#16a34a" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>


                <div className="space-y-6">
                    <SettingsMenu />
                </div>
            </div>
        </div>
    );
};

const PricingDashboard = () =>
{
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Pricing Console</h1>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <PricingConsole
                        currentPrice={1.859}
                        minPrice={1.5}
                        maxPrice={2.5}
                        onPriceChange={(price) => console.log('Price changed:', price)}
                        onPriceConfirm={(price) => console.log('Price confirmed:', price)}
                    />
                </div>
                <div className="space-y-6">
                    <AutomatedRules />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;