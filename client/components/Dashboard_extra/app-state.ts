// types/app-state.ts

export interface NotificationType {
    id: string;
    title?: string;
    message: string;
    type: 'warning' | 'success' | 'info' | 'error';
    timestamp: Date;
    read?: boolean;
  }
  
  export interface UserPreferences {
    currency: string;
    timezone: string;
    notifications: {
      email: boolean;
      push: boolean;
      priceAlerts: boolean;
      marginAlerts: boolean;
      inventoryAlerts: boolean;
    };
  }
  
  export interface NavigationState {
    currentView: 'dashboard' | 'pricing' | 'competition' | 'analytics';
    isMobileMenuOpen: boolean;
    notifications: NotificationType[];
  }
  
  export interface DashboardFilters {
    dateRange: 'today' | 'week' | 'month' | 'custom';
    compareWith?: 'yesterday' | 'lastWeek' | 'lastMonth';
    showCompetitors: boolean;
    showAutomatedRules: boolean;
  }
  
  export type ViewMode = 'compact' | 'detailed' | 'analysis';
  