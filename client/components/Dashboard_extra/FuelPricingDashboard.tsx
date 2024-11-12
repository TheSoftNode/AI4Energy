// pages/FuelPricingDashboard.tsx

import React from 'react';
import Navigation from './Navigation';
import DashboardMetrics from './DashboardMetrics';
import AutomatedRules from './AutomatedRules';
import QuickActions from './QuickActions';
import MarketInsights from './MarketInsights';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Filter, Download, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CompetitorMap from './CompetitorMap';
import PricingConsole from './PricingConsole';
import SettingsMenu from '../Dashboard/SettingsMenu';
import { DashboardProvider, useDashboard } from './DashboardProvider';
import DashboardLayout, { DashboardGrid, DashboardSection } from './Layout';
import { DashboardView } from './app-state';

interface DashboardContentProps
{
    currentView: DashboardView;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ currentView }) =>
{
    const {
        metrics,
        competitors,
    } = useDashboard();

    const demandForecast = [
        { time: '00:00', current: 100, projected: 95 },
        { time: '04:00', current: 80, projected: 75 },
        { time: '08:00', current: 120, projected: 115 },
        { time: '12:00', current: 150, projected: 140 },
        { time: '16:00', current: 180, projected: 170 },
        { time: '20:00', current: 130, projected: 125 },
    ];

    // Determine which view to show based on navigation state
    const renderView = () =>
    {
        switch (currentView)
        {
            case 'overview':
                return (
                    <>
                        <DashboardSection
                            title="Dashboard Overview"
                            action={
                                < div className="flex items-center space-x-3" >
                                    <Button variant="outline" size="sm" >
                                        <RefreshCcw className="h-4 w-4 mr-2" />
                                        Refresh
                                    </Button>
                                    < Button variant="outline" size="sm" >
                                        <Download className="h-4 w-4 mr-2" />
                                        Export
                                    </Button>
                                    < Button variant="outline" size="sm" >
                                        <Filter className="h-4 w-4 mr-2" />
                                        Filter View
                                    </Button>
                                </div>
                            }
                        >
                            <DashboardMetrics />
                        </DashboardSection>

                        < DashboardGrid >
                            <div className="lg:col-span-2" >
                                <CompetitorMap
                                    competitors={competitors}
                                    centerLat={48.8566}
                                    centerLng={2.3522}
                                    radius={5}
                                />
                            </div>
                            < div className="space-y-6" >
                                <QuickActions />
                                < MarketInsights />
                            </div>
                        </DashboardGrid>

                        < DashboardGrid >
                            <Card className="lg:col-span-2" >
                                <CardHeader>
                                    <div className="flex items-center justify-between" >
                                        <CardTitle>Demand Forecast </CardTitle>
                                        < Badge variant="outline" > AI Prediction </Badge>
                                    </div>
                                </CardHeader>
                                < CardContent className="h-[300px]" >
                                    <ResponsiveContainer width="100%" height="100%" >
                                        <LineChart data={demandForecast}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="time" />
                                            <YAxis />
                                            < Tooltip />
                                            <Line type="monotone" dataKey="current" stroke="#2563eb" name="Current" />
                                            <Line type="monotone" dataKey="projected" stroke="#16a34a" name="Projected" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                            < div className="space-y-6" >
                                <PricingConsole
                                    currentPrice={metrics.currentPrice}
                                    minPrice={1.5}
                                    maxPrice={2.5}
                                />
                                <AutomatedRules />
                            </div>
                        </DashboardGrid>
                    </>
                );

            case 'pricing':
                return (
                    <DashboardSection title="Pricing Console" >
                        <DashboardGrid>
                            <div className="lg:col-span-2" >
                                <PricingConsole
                                    currentPrice={metrics.currentPrice}
                                    minPrice={1.5}
                                    maxPrice={2.5}
                                />
                            </div>
                            < div className="space-y-6" >
                                <AutomatedRules />
                                < QuickActions />
                            </div>
                        </DashboardGrid>
                    </DashboardSection>
                );

            case 'competition':
                return (
                    <DashboardSection title="Competition Analysis" >
                        <DashboardGrid>
                            <div className="lg:col-span-2" >
                                <CompetitorMap
                                    competitors={competitors}
                                    centerLat={48.8566}
                                    centerLng={2.3522}
                                    radius={5}
                                />
                            </div>
                            < div className="space-y-6" >
                                <MarketInsights />
                                < QuickActions />
                            </div>
                        </DashboardGrid>
                    </DashboardSection>
                );

            case 'analytics':
                return (
                    <DashboardSection title="Analytics" >
                        <DashboardGrid>
                            <Card className="lg:col-span-2" >
                                <CardHeader>
                                    <CardTitle>Performance Analytics </CardTitle>
                                </CardHeader>
                                < CardContent className="h-[400px]" >
                                    <ResponsiveContainer width="100%" height="100%" >
                                        <LineChart data={demandForecast}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="time" />
                                            <YAxis />
                                            < Tooltip />
                                            <Line type="monotone" dataKey="current" stroke="#2563eb" />
                                            <Line type="monotone" dataKey="projected" stroke="#16a34a" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                            < div className="space-y-6" >
                                <MarketInsights />
                                < SettingsMenu />
                            </div>
                        </DashboardGrid>
                    </DashboardSection>
                );
        }
    };

    return (
        <DashboardLayout>
            <Navigation currentView={currentView} />
            {renderView()}
        </DashboardLayout>
    );
};

const FuelPricingDashboard: React.FC = () =>
{
    const [currentView, setCurrentView] = React.useState<DashboardView>('overview');

    return (
        <DashboardProvider>
            <DashboardContent currentView={currentView} />
        </DashboardProvider>
    );
};

export default FuelPricingDashboard;
