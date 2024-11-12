// types/app-state.ts

import { StationMetrics } from "./interface";

export interface NotificationType
{
  id: string;
  title?: string;
  message: string;
  type: 'warning' | 'success' | 'info' | 'error';
  timestamp: Date;
  read?: boolean;
}

export interface UserPreferences
{
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

export interface NavigationState
{
  currentView: 'overview' | 'pricing' | 'competition' | 'analytics' | 'settings';
  isMobileMenuOpen: boolean;
  notifications: NotificationType[];
}

export interface DashboardFilters
{
  dateRange: 'today' | 'week' | 'month' | 'custom';
  compareWith?: 'yesterday' | 'lastWeek' | 'lastMonth';
  showCompetitors: boolean;
  showAutomatedRules: boolean;
}

export type DashboardView = 'overview' | 'pricing' | 'analytics' | 'competition' | 'settings';

export type ViewMode = 'compact' | 'detailed' | 'analysis';
export interface DashboardNavigation
{
  currentView: DashboardView;
}

export interface DashboardContextType
{
  view: DashboardView;
  navigation: DashboardNavigation;
  metrics: StationMetrics;
  competitors: Competitor[];
  notifications: Notification[];
  filters: DashboardFilters;
  setView: (view: DashboardView) => void;
  setFilters: (filters: DashboardFilters) => void;
}