// // context/DashboardContext.tsx

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import type { NavigationState, UserPreferences, DashboardFilters, ViewMode } from './app-state';
// import type { StationMetrics, Competitor, MarketData } from './interface';

// interface DashboardContextType {
//   navigation: NavigationState;
//   setNavigation: React.Dispatch<React.SetStateAction<NavigationState>>;
//   metrics: StationMetrics;
//   setMetrics: React.Dispatch<React.SetStateAction<StationMetrics>>;
//   competitors: Competitor[];
//   setCompetitors: React.Dispatch<React.SetStateAction<Competitor[]>>;
//   marketData: MarketData;
//   setMarketData: React.Dispatch<React.SetStateAction<MarketData>>;
//   preferences: UserPreferences;
//   setPreferences: React.Dispatch<React.SetStateAction<UserPreferences>>;
//   filters: DashboardFilters;
//   setFilters: React.Dispatch<React.SetStateAction<DashboardFilters>>;
//   viewMode: ViewMode;
//   setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>;
// }

// const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

// export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [navigation, setNavigation] = useState<NavigationState>({
//     currentView: 'dashboard',
//     isMobileMenuOpen: false,
//     notifications: [
//       {
//         id: '1',
//         message: 'Competitor price change detected',
//         type: 'warning',
//         timestamp: new Date(),
//       },
//       {
//         id: '2',
//         message: 'Margin target achieved',
//         type: 'success',
//         timestamp: new Date(),
//       },
//     ],
//   });

//   const [metrics, setMetrics] = useState<StationMetrics>({
//     grossMargin: 12.5,
//     targetMargin: 15,
//     currentPrice: 1.859,
//     inventoryLevel: 65,
//     projectedDemand: 15000,
//     revenue: 27865,
//     volumeSold: 200,
//     customerCount: 80,
//   });

//   const [competitors, setCompetitors] = useState<Competitor[]>([]);
//   const [marketData, setMarketData] = useState<MarketData>({
//     competitorAvgPrice: 1.849,
//     marketShare: 28.5,
//     pricePosition: 'above',
//     nearbyCompetitors: 5,
//   });

//   const [preferences, setPreferences] = useState<UserPreferences>({
//     currency: 'EUR',
//     timezone: 'Europe/Paris',
//     notifications: {
//       email: true,
//       push: true,
//       priceAlerts: true,
//       marginAlerts: true,
//       inventoryAlerts: true,
//     },
//   });

//   const [filters, setFilters] = useState<DashboardFilters>({
//     dateRange: 'today',
//     showCompetitors: true,
//     showAutomatedRules: true,
//   });

//   const [viewMode, setViewMode] = useState<ViewMode>('detailed');

//   // Add mock data loading effect
//   useEffect(() => {
//     // Simulate data loading
//     const loadMockData = async () => {
//       // Add mock data loading logic here
//     };

//     loadMockData();
//   }, []);

//   return (
//     <DashboardContext.Provider
//       value={{
//         navigation,
//         setNavigation,
//         metrics,
//         setMetrics,
//         competitors,
//         setCompetitors,
//         marketData,
//         setMarketData,
//         preferences,
//         setPreferences,
//         filters,
//         setFilters,
//         viewMode,
//         setViewMode,
//       }}
//     >
//       {children}
//     </DashboardContext.Provider>
//   );
// };

// export const useDashboard = () => {
//   const context = useContext(DashboardContext);
//   if (context === undefined) {
//     throw new Error('useDashboard must be used within a DashboardProvider');
//   }
//   return context;
// };

// context/DashboardContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  StationMetrics,
  Competitor,
  MarketData,
  PriceRule,
} from './interface';
import { NotificationType } from './app-state';

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
  view: 'overview' | 'pricing' | 'analytics' | 'settings';
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

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) =>
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

  // Simulated data refresh
  useEffect(() =>
  {
    const interval = setInterval(() =>
    {
      // Update metrics with simulated changes
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

export const useDashboard = () =>
{
  const context = useContext(DashboardContext);
  if (context === undefined)
  {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};