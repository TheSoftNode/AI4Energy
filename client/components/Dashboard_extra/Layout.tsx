// components/layout/DashboardLayout.tsx

import React from 'react';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps
{
    children: React.ReactNode;
    className?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
    children,
    className
}) =>
{
    return (
        <div className="min-h-screen bg-gray-50">
            <div className={cn(
                "container mx-auto px-4 pt-20 pb-8 space-y-6",
                className
            )}>
                {children}
            </div>
        </div>
    );
};

interface DashboardGridProps
{
    children: React.ReactNode;
    className?: string;
}

export const DashboardGrid: React.FC<DashboardGridProps> = ({
    children,
    className
}) =>
{
    return (
        <div className={cn(
            "grid grid-cols-1 lg:grid-cols-3 gap-6",
            className
        )}>
            {children}
        </div>
    );
};

interface DashboardSectionProps
{
    title: string;
    description?: string;
    children: React.ReactNode;
    action?: React.ReactNode;
    className?: string;
}

export const DashboardSection: React.FC<DashboardSectionProps> = ({
    title,
    description,
    children,
    action,
    className
}) =>
{
    return (
        <section className={cn("space-y-4", className)}>
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold">{title}</h2>
                    {description && (
                        <p className="text-sm text-gray-500">{description}</p>
                    )}
                </div>
                {action && <div>{action}</div>}
            </div>
            {children}
        </section>
    );
};

export default DashboardLayout;
