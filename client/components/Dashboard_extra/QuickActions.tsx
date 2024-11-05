// components/QuickActions.tsx

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import
    {
        Zap,
        TrendingUp,
        AlertTriangle,
        BarChart2,
        RefreshCw,
        Lock
    } from 'lucide-react';
import { useDashboard } from './DashboardProvider';

const QuickActions: React.FC = () =>
{
    const { metrics, marketData } = useDashboard();

    const actions = [
        {
            title: 'Match Lowest Competitor',
            icon: <TrendingUp className="h-4 w-4" />,
            description: `Set price to €${marketData.competitorAvgPrice.toFixed(3)}`,
            variant: 'default' as const,
            badge: 'Quick Action',
        },
        {
            title: 'Optimize for Volume',
            icon: <BarChart2 className="h-4 w-4" />,
            description: 'Adjust price to increase sales volume',
            variant: 'secondary' as const,
            badge: 'AI Recommended',
        },
        {
            title: 'Emergency Price Lock',
            icon: <Lock className="h-4 w-4" />,
            description: 'Temporarily freeze price changes',
            variant: 'destructive' as const,
            badge: 'Safety Control',
        },
    ];

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
                    <Button variant="ghost" size="sm">
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    {actions.map((action, index) => (
                        <Button
                            key={index}
                            variant={action.variant}
                            className="w-full justify-start"
                        >
                            {action.icon}
                            <div className="ml-2 flex-1 text-left">
                                <div className="flex items-center justify-between">
                                    <span>{action.title}</span>
                                    <Badge variant="outline" className="ml-2">
                                        {action.badge}
                                    </Badge>
                                </div>
                                <span className="text-xs opacity-70">{action.description}</span>
                            </div>
                        </Button>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default QuickActions;
