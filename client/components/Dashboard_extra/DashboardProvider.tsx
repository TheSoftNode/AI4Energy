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

interface FuelRecommendation {
  fuelType: string;
  currentPrice: number;
  recommendedPrice: number;
  confidence: number;
}

interface ClientStation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  stationType: string;
  recommendations: FuelRecommendation[];
  address?: string;
  operatingHours?: string;
  lastUpdated?: Date;
}

interface DashboardState
{
  metrics: StationMetrics;
  competitors: Competitor[];
  clientStation: ClientStation[]; 
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
  updateClientStation: (stations: ClientStation) => void;
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

    clientStation: [
      {
        id: 'station-paris-central',
        name: 'Paris Central',
        latitude: 48.8590,
        longitude: 2.3550,
        stationType: 'Premium',
        recommendations: [
          {
            fuelType: 'SP95',
            currentPrice: 1.859,
            recommendedPrice: 1.879,
            confidence: 92
          },
          {
            fuelType: 'SP98',
            currentPrice: 1.959,
            recommendedPrice: 1.979,
            confidence: 88
          },
          {
            fuelType: 'G7',
            currentPrice: 1.759,
            recommendedPrice: 1.789,
            confidence: 95
          },
          {
            fuelType: 'B7',
            currentPrice: 1.759,
            recommendedPrice: 1.789,
            confidence: 95
          },
          {
            fuelType: 'E10',
            currentPrice: 1.759,
            recommendedPrice: 1.789,
            confidence: 95
          },
          
        ],
        address: '123 Champs-Élysées, Paris',
        operatingHours: '24/7',
        lastUpdated: new Date()
      },
      {
        id: 'station-paris-north',
        name: 'Paris North',
        latitude: 48.8744,
        longitude: 2.3526,
        stationType: 'Standard',
        recommendations: [
          {
            fuelType: 'SP95',
            currentPrice: 1.849,
            recommendedPrice: 1.869,
            confidence: 90
          },
          {
            fuelType: 'SP94',
            currentPrice: 1.949,
            recommendedPrice: 1.969,
            confidence: 87
          },
          {
            fuelType: 'G7',
            currentPrice: 1.749,
            recommendedPrice: 1.779,
            confidence: 93
          },
          {
            fuelType: 'B7',
            currentPrice: 1.749,
            recommendedPrice: 1.779,
            confidence: 93
          },
          {
            fuelType: 'E10',
            currentPrice: 1.749,
            recommendedPrice: 1.779,
            confidence: 93
          }
        ],
        address: '45 Rue du Faubourg Saint-Denis, Paris',
        operatingHours: '06:00 - 22:00',
        lastUpdated: new Date()
      },
      {
        id: 'station-paris-east',
        name: 'Paris East',
        latitude: 48.8534,
        longitude: 2.3788,
        stationType: 'Premium',
        recommendations: [
          {
            fuelType: 'SP95',
            currentPrice: 1.869,
            recommendedPrice: 1.889,
            confidence: 91
          },
          {
            fuelType: 'SP98',
            currentPrice: 1.969,
            recommendedPrice: 1.989,
            confidence: 89
          },
          {
            fuelType: 'G7',
            currentPrice: 1.769,
            recommendedPrice: 1.799,
            confidence: 94
          },
          {
            fuelType: 'E7',
            currentPrice: 1.969,
            recommendedPrice: 1.989,
            confidence: 89
          },
          {
            fuelType: 'E10',
            currentPrice: 1.769,
            recommendedPrice: 1.799,
            confidence: 94
          }
        ],
        address: '78 Boulevard de la Bastille, Paris',
        operatingHours: '24/7',
        lastUpdated: new Date()
      },
      {
        id: 'station-paris-south',
        name: 'Paris South',
        latitude: 48.8396,
        longitude: 2.3325,
        stationType: 'Standard',
        recommendations: [
          {
            fuelType: 'SP95',
            currentPrice: 1.839,
            recommendedPrice: 1.859,
            confidence: 93
          },
          {
            fuelType: 'SP98',
            currentPrice: 1.939,
            recommendedPrice: 1.959,
            confidence: 86
          },
          {
            fuelType: 'G7',
            currentPrice: 1.739,
            recommendedPrice: 1.769,
            confidence: 92
          },
          {
            fuelType: 'E7',
            currentPrice: 1.969,
            recommendedPrice: 1.989,
            confidence: 89
          },
          {
            fuelType: 'E10',
            currentPrice: 1.769,
            recommendedPrice: 1.799,
            confidence: 94
          }
        ],
        address: '156 Boulevard du Montparnasse, Paris',
        operatingHours: '06:00 - 23:00',
        lastUpdated: new Date()
      },
      {
        id: 'station-paris-west',
        name: 'Paris West',
        latitude: 48.8417,
        longitude: 2.2855,
        stationType: 'Premium',
        recommendations: [
          {
            fuelType: 'SP95',
            currentPrice: 1.879,
            recommendedPrice: 1.899,
            confidence: 90
          },
          {
            fuelType: 'SP98',
            currentPrice: 1.979,
            recommendedPrice: 1.999,
            confidence: 88
          },
          {
            fuelType: 'E7',
            currentPrice: 1.779,
            recommendedPrice: 1.809,
            confidence: 93
          },
          {
            fuelType: 'G7',
            currentPrice: 1.969,
            recommendedPrice: 1.989,
            confidence: 89
          },
          {
            fuelType: 'E10',
            currentPrice: 1.769,
            recommendedPrice: 1.799,
            confidence: 94
          }
        ],
        address: '234 Avenue de Versailles, Paris',
        operatingHours: '24/7',
        lastUpdated: new Date()
      }
    ],

    competitors: [
      // Competitors near Paris Central (48.8590, 2.3550)
      {
        id: 'comp-central-1',
        name: 'TotalEnergies Central',
        price: 1.85,
        distance: 2.1,
        latitude: 48.8566,
        longitude: 2.3522,
        priceComparison: 'above'
      },
      {
        id: 'comp-central-2',
        name: 'Shell Central',
        price: 1.79,
        distance: 3.5,
        latitude: 48.8504,
        longitude: 2.3482,
        priceComparison: 'below'
      },
  
      // Competitors near Paris North (48.8744, 2.3526)
      {
        id: 'comp-north-1',
        name: 'BP North',
        price: 1.83,
        distance: 2.3,
        latitude: 48.8780,
        longitude: 2.3490,
        priceComparison: 'above'
      },
      {
        id: 'comp-north-2',
        name: 'Esso North',
        price: 1.81,
        distance: 2.8,
        latitude: 48.8720,
        longitude: 2.3610,
        priceComparison: 'equal'
      },
  
      // Competitors near Paris East (48.8534, 2.3788)
      {
        id: 'comp-east-1',
        name: 'Shell East',
        price: 1.84,
        distance: 1.9,
        latitude: 48.8550,
        longitude: 2.3820,
        priceComparison: 'above'
      },
      {
        id: 'comp-east-2',
        name: 'TotalEnergies East',
        price: 1.78,
        distance: 2.5,
        latitude: 48.8510,
        longitude: 2.3750,
        priceComparison: 'below'
      },
  
      // Competitors near Paris South (48.8396, 2.3325)
      {
        id: 'comp-south-1',
        name: 'Esso South',
        price: 1.82,
        distance: 2.2,
        latitude: 48.8360,
        longitude: 2.3360,
        priceComparison: 'equal'
      },
      {
        id: 'comp-south-2',
        name: 'BP South',
        price: 1.77,
        distance: 3.1,
        latitude: 48.8420,
        longitude: 2.3280,
        priceComparison: 'below'
      },
  
      // Competitors near Paris West (48.8417, 2.2855)
      {
        id: 'comp-west-1',
        name: 'TotalEnergies West',
        price: 1.86,
        distance: 1.8,
        latitude: 48.8440,
        longitude: 2.2820,
        priceComparison: 'above'
      },
      {
        id: 'comp-west-2',
        name: 'Shell West',
        price: 1.80,
        distance: 2.7,
        latitude: 48.8390,
        longitude: 2.2890,
        priceComparison: 'equal'
      }
  ],

    // competitors: [
    //     {
    //       id: '1',
    //       name: 'Station A',
    //       price: 1.85,
    //       distance: 2.1,
    //       latitude: 48.8566,
    //       longitude: 2.3522,
    //       priceComparison: 'above'
    //     },
    //     {
    //       id: '2', 
    //       name: 'Station B',
    //       price: 1.79,
    //       distance: 3.5,
    //       latitude: 48.8504,
    //       longitude: 2.3482,
    //       priceComparison: 'below'
    //     },
    //     {
    //       id: '3',
    //       name: 'Station C',
    //       price: 1.82,
    //       distance: 4.2,
    //       latitude: 48.8532,
    //       longitude: 2.3562,
    //       priceComparison: 'equal'
    //     },
    //     {
    //       id: '4',
    //       name: 'Station D',
    //       price: 1.83,
    //       distance: 5.1,
    //       latitude: 48.8587,
    //       longitude: 2.3501,
    //       priceComparison: 'above'
    //     },
    //     {
    //       id: '5',
    //       name: 'Station E',
    //       price: 1.77,
    //       distance: 2.8,
    //       latitude: 48.8545,
    //       longitude: 2.3512,
    //       priceComparison: 'below'
    //     }
    // ],

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

  const updateClientStation = (station: Partial<ClientStation>) => {
    setState(prev => ({
      ...prev,
      clientStation: { ...prev.clientStation, ...station }
    }));
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
        updateClientStation,
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