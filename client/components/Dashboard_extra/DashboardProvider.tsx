"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  StationMetrics,
  Competitor,
  MarketData,
  PriceRule,
} from './interface';
import { NotificationType } from './app-state';
import { Shield, TrendingUp } from 'lucide-react';

interface DashboardState
{
  metrics: StationMetrics;
  competitors: Competitor[];
  marketData: MarketData;
  rules: PriceRule[];
  notifications: NotificationType[];
  settings: {
    currency: string;
    timezone: string;
    refreshInterval: number;
  };
  view: 'overview' | 'pricing' | 'analytics' | 'competition' | 'settings';
}

interface DashboardContextType extends DashboardState
{
  updateMetrics: (metrics: Partial<StationMetrics>) => void;
  updateCompetitors: (competitors: Competitor[]) => void;
  updateMarketData: (data: Partial<MarketData>) => void;
  updateRules: (rules: PriceRule[]) => void;
  addNotification: (notification: NotificationType) => void;
  markNotificationRead: (id: string) => void;
  setView: (view: DashboardState['view']) => void;
  updateSettings: (settings: Partial<DashboardState['settings']>) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

// Separate the provider implementation
const DashboardProviderComponent: React.FC<{ children: React.ReactNode }> = ({ children }) =>
{
  const [state, setState] = useState<DashboardState>({
    metrics: {
      grossMargin: 12.5,
      targetMargin: 15,
      currentPrice: 1.859,
      inventoryLevel: 65,
      projectedDemand: 15000,
      revenue: 27865,
      volumeSold: 200,
      customerCount: 80
    },
    competitors: [
        {
          id: '1',
          name: 'Station A',
          price: 1.85,
          distance: 2.1,
          latitude: 48.8566,
          longitude: 2.3522,
          priceComparison: 'above'
        },
        {
          id: '2', 
          name: 'Station B',
          price: 1.79,
          distance: 3.5,
          latitude: 48.8504,
          longitude: 2.3482,
          priceComparison: 'below'
        },
        {
          id: '3',
          name: 'Station C',
          price: 1.82,
          distance: 4.2,
          latitude: 48.8532,
          longitude: 2.3562,
          priceComparison: 'equal'
        },
        {
          id: '4',
          name: 'Station D',
          price: 1.83,
          distance: 5.1,
          latitude: 48.8587,
          longitude: 2.3501,
          priceComparison: 'above'
        },
        {
          id: '5',
          name: 'Station E',
          price: 1.77,
          distance: 2.8,
          latitude: 48.8545,
          longitude: 2.3512,
          priceComparison: 'below'
        }
    ],
    marketData: {
      competitorAvgPrice: 1.849,
      marketShare: 28.5,
      pricePosition: 'above',
      nearbyCompetitors: 5,
      avgDailyRevenue: 15750.00,
      avgVolumeSold: 8500,
      avgCustomerCount: 450
    },
    rules: [
      {
        id: 'min-margin',
        name: 'Minimum Margin Protection',
        description: 'Maintain minimum gross margin threshold',
        enabled: true,
        threshold: 5,
        icon: <Shield className="h-5 w-5" />,
        category: 'protection',
        conditions: [
            {
                type: 'price',
                operator: 'greater',
                value: 5
            }
        ],
        actions: [
            {
                type: 'notify',
                value: 2,
            }
        ],
        priority: 1,
        statistics: {
            timesTriggered: 15,
            lastSuccess: new Date(),
            averageImpact: 2.3,
            failureRate: 0.1
        }
    },
    {
        id: 'competitor-match',
        name: 'Competitor Matching',
        description: 'Automatically match competitor prices within range',
        enabled: true,
        threshold: 2,
        icon: <TrendingUp className="h-5 w-5" />,
        category: 'optimization',
        conditions: [
            {
                type: 'price',
                operator: 'less',
                value: -0.02
            }
        ],
        actions: [
            {
                type: 'adjust_price',
                value: 100
            }
        ],
        priority: 2,
        statistics: {
            timesTriggered: 28,
            lastSuccess: new Date(),
            averageImpact: 1.8,
            failureRate: 0.15
        }
    },
    ],
    notifications: [
      { id: '1', message: 'Competitor price change detected', type: 'warning', timestamp: new Date() },
      { id: '2', message: 'Margin target achieved', type: 'success', timestamp: new Date() },
      { id: '3', message: 'New pricing rule activated', type: 'info', timestamp: new Date() }
    ],
    settings: {
      currency: 'EUR',
      timezone: 'Europe/Paris',
      refreshInterval: 5
    },
    view: 'overview'
  });

  useEffect(() =>
  {
    const interval = setInterval(() =>
    {
      updateMetrics({
        grossMargin: state.metrics.grossMargin + (Math.random() - 0.5) * 0.1,
        revenue: state.metrics.revenue + (Math.random() - 0.5) * 100,
        volumeSold: state.metrics.volumeSold + (Math.random() - 0.5) * 10
      });
    }, state.settings.refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [state.settings.refreshInterval]);

  const updateMetrics = (metrics: Partial<StationMetrics>) =>
  {
    setState(prev => ({
      ...prev,
      metrics: { ...prev.metrics, ...metrics }
    }));
  };

  const updateCompetitors = (competitors: Competitor[]) =>
  {
    setState(prev => ({ ...prev, competitors }));
  };

  const updateMarketData = (data: Partial<MarketData>) =>
  {
    setState(prev => ({
      ...prev,
      marketData: { ...prev.marketData, ...data }
    }));
  };

  const updateRules = (rules: PriceRule[]) =>
  {
    setState(prev => ({ ...prev, rules }));
  };

  const addNotification = (notification: NotificationType) =>
  {
    setState(prev => ({
      ...prev,
      notifications: [notification, ...prev.notifications]
    }));
  };

  const markNotificationRead = (id: string) =>
  {
    setState(prev => ({
      ...prev,
      notifications: prev.notifications.map(n =>
        n.id === id ? { ...n, read: true } : n
      )
    }));
  };

  const setView = (view: DashboardState['view']) =>
  {
    setState(prev => ({ ...prev, view }));
  };

  const updateSettings = (settings: Partial<DashboardState['settings']>) =>
  {
    setState(prev => ({
      ...prev,
      settings: { ...prev.settings, ...settings }
    }));
  };

  return (
    <DashboardContext.Provider
      value={{
        ...state,
        updateMetrics,
        updateCompetitors,
        updateMarketData,
        updateRules,
        addNotification,
        markNotificationRead,
        setView,
        updateSettings
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

// Export the hook first
export const useDashboard = () =>
{
  const context = useContext(DashboardContext);
  if (context === undefined)
  {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

// Then export the provider
export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) =>
{
  return <DashboardProviderComponent>{children}</DashboardProviderComponent>;
};