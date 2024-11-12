// "use client"

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import type {
//   StationMetrics,
//   Competitor,
//   MarketData,
//   PriceRule,
// } from './interface';
// import { NotificationType } from './app-state';

// interface DashboardState
// {
//   metrics: StationMetrics;
//   competitors: Competitor[];
//   marketData: MarketData;
//   rules: PriceRule[];
//   notifications: NotificationType[];
//   settings: {
//     currency: string;
//     timezone: string;
//     refreshInterval: number;
//   };
//   view: 'overview' | 'pricing' | 'analytics' | 'competition' | 'settings';
// }

// interface DashboardContextType extends DashboardState
// {
//   updateMetrics: (metrics: Partial<StationMetrics>) => void;
//   updateCompetitors: (competitors: Competitor[]) => void;
//   view: DashboardState['view'];
//   updateMarketData: (data: Partial<MarketData>) => void;
//   updateRules: (rules: PriceRule[]) => void;
//   addNotification: (notification: NotificationType) => void;
//   markNotificationRead: (id: string) => void;
//   setView: (view: DashboardState['view']) => void;
//   updateSettings: (settings: Partial<DashboardState['settings']>) => void;
// }

// const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

// export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) =>
// {
//   const [state, setState] = useState<DashboardState>({
//     metrics: {
//       grossMargin: 12.5,
//       targetMargin: 15,
//       currentPrice: 1.859,
//       inventoryLevel: 65,
//       projectedDemand: 15000,
//       revenue: 27865,
//       volumeSold: 200,
//       customerCount: 80
//     },
//     competitors: [],
//     marketData: {
//       competitorAvgPrice: 1.849,
//       marketShare: 28.5,
//       pricePosition: 'above',
//       nearbyCompetitors: 5
//     },
//     rules: [],
//     notifications: [],
//     settings: {
//       currency: 'EUR',
//       timezone: 'Europe/Paris',
//       refreshInterval: 5
//     },
//     view: 'overview'
//   });

//   // Simulated data refresh
//   useEffect(() =>
//   {
//     const interval = setInterval(() =>
//     {
//       // Update metrics with simulated changes
//       updateMetrics({
//         grossMargin: state.metrics.grossMargin + (Math.random() - 0.5) * 0.1,
//         revenue: state.metrics.revenue + (Math.random() - 0.5) * 100,
//         volumeSold: state.metrics.volumeSold + (Math.random() - 0.5) * 10
//       });
//     }, state.settings.refreshInterval * 1000);

//     return () => clearInterval(interval);
//   }, [state.settings.refreshInterval]);

//   const updateMetrics = (metrics: Partial<StationMetrics>) =>
//   {
//     setState(prev => ({
//       ...prev,
//       metrics: { ...prev.metrics, ...metrics }
//     }));
//   };

//   const updateCompetitors = (competitors: Competitor[]) =>
//   {
//     setState(prev => ({ ...prev, competitors }));
//   };

//   const updateMarketData = (data: Partial<MarketData>) =>
//   {
//     setState(prev => ({
//       ...prev,
//       marketData: { ...prev.marketData, ...data }
//     }));
//   };

//   const updateRules = (rules: PriceRule[]) =>
//   {
//     setState(prev => ({ ...prev, rules }));
//   };

//   const addNotification = (notification: NotificationType) =>
//   {
//     setState(prev => ({
//       ...prev,
//       notifications: [notification, ...prev.notifications]
//     }));
//   };

//   const markNotificationRead = (id: string) =>
//   {
//     setState(prev => ({
//       ...prev,
//       notifications: prev.notifications.map(n =>
//         n.id === id ? { ...n, read: true } : n
//       )
//     }));
//   };

//   const setView = (view: DashboardState['view']) =>
//   {
//     setState(prev => ({ ...prev, view }));
//   };

//   const updateSettings = (settings: Partial<DashboardState['settings']>) =>
//   {
//     setState(prev => ({
//       ...prev,
//       settings: { ...prev.settings, ...settings }
//     }));
//   };

//   return (
//     <DashboardContext.Provider
//       value={{
//         ...state,
//         updateMetrics,
//         updateCompetitors,
//         updateMarketData,
//         updateRules,
//         addNotification,
//         markNotificationRead,
//         setView,
//         updateSettings
//       }}
//     >
//       {children}
//     </DashboardContext.Provider>
//   );
// };

// export const useDashboard = () =>
// {
//   const context = useContext(DashboardContext);
//   if (context === undefined)
//   {
//     throw new Error('useDashboard must be used within a DashboardProvider');
//   }
//   return context;
// };

// DashboardProvider.tsx
"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  StationMetrics,
  Competitor,
  MarketData,
  PriceRule,
} from './interface';
import { NotificationType } from './app-state';

interface DashboardState {
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

interface DashboardContextType extends DashboardState {
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
const DashboardProviderComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
    competitors: [],
    marketData: {
      competitorAvgPrice: 1.849,
      marketShare: 28.5,
      pricePosition: 'above',
      nearbyCompetitors: 5
    },
    rules: [],
    notifications: [],
    settings: {
      currency: 'EUR',
      timezone: 'Europe/Paris',
      refreshInterval: 5
    },
    view: 'overview'
  });

  useEffect(() => {
    const interval = setInterval(() => {
      updateMetrics({
        grossMargin: state.metrics.grossMargin + (Math.random() - 0.5) * 0.1,
        revenue: state.metrics.revenue + (Math.random() - 0.5) * 100,
        volumeSold: state.metrics.volumeSold + (Math.random() - 0.5) * 10
      });
    }, state.settings.refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [state.settings.refreshInterval]);

  const updateMetrics = (metrics: Partial<StationMetrics>) => {
    setState(prev => ({
      ...prev,
      metrics: { ...prev.metrics, ...metrics }
    }));
  };

  const updateCompetitors = (competitors: Competitor[]) => {
    setState(prev => ({ ...prev, competitors }));
  };

  const updateMarketData = (data: Partial<MarketData>) => {
    setState(prev => ({
      ...prev,
      marketData: { ...prev.marketData, ...data }
    }));
  };

  const updateRules = (rules: PriceRule[]) => {
    setState(prev => ({ ...prev, rules }));
  };

  const addNotification = (notification: NotificationType) => {
    setState(prev => ({
      ...prev,
      notifications: [notification, ...prev.notifications]
    }));
  };

  const markNotificationRead = (id: string) => {
    setState(prev => ({
      ...prev,
      notifications: prev.notifications.map(n =>
        n.id === id ? { ...n, read: true } : n
      )
    }));
  };

  const setView = (view: DashboardState['view']) => {
    setState(prev => ({ ...prev, view }));
  };

  const updateSettings = (settings: Partial<DashboardState['settings']>) => {
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
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

// Then export the provider
export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <DashboardProviderComponent>{children}</DashboardProviderComponent>;
};