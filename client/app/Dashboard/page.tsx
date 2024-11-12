"use client"

import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Filter, RefreshCw } from 'lucide-react';
import AnalyticsDashboard from '@/components/Dashboard_extra/AnalyticsDashboard';
import SettingsMenu from '@/components/Dashboard/SettingsMenu';
import { DashboardProvider, useDashboard } from '@/components/Dashboard_extra/DashboardProvider';
import Navigation from '@/components/Dashboard_extra/Navigation';
import DashboardMetrics from '@/components/Dashboard_extra/DashboardMetrics';
import CompetitorMap from '@/components/Dashboard_extra/CompetitorMap';
import PricingConsole from '@/components/Dashboard_extra/PricingConsole';
import AutomatedRules from '@/components/Dashboard_extra/AutomatedRules';

const DashboardContent = () =>
{
    const { view } = useDashboard();

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
        <DashboardProvider>
            <DashboardContent />
        </DashboardProvider>
    );
};

const OverviewDashboard = () =>
{
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Dashboard Overview</h1>
                    <p className="text-sm text-gray-500">
                        Real-time pricing and market insights
                    </p>
                </div>
                <div className="flex items-center space-x-3">
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
                        competitors={[]}
                        centerLat={48.8566}
                        centerLng={2.3522}
                        radius={5}
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