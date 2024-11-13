// types/interfaces.ts
import * as React from 'react';

export interface StationMetrics
{
  grossMargin: number;
  targetMargin: number;
  currentPrice: number;
  inventoryLevel: number;
  projectedDemand: number;
  revenue: number;
  volumeSold: number;
  customerCount: number;
}

export interface Competitor
{
  id: string;
  name: string;
  price: number;
  distance: number;
  latitude: number;
  longitude: number;
  priceComparison: 'below' | 'above' | 'equal';
}

export interface PriceChange
{
  price: number;
  timestamp: Date;
  type: 'manual' | 'automated';
  reason?: string;
}

export interface RuleCondition
{
    type: 'price' | 'margin' | 'inventory' | 'time' | 'competitor';
    operator: 'greater' | 'less' | 'equal' | 'between';
    value: number | string;
    value2?: number | string; 
}

export interface RuleAction
{
    type: 'adjust_price' | 'notify' | 'lock_price';
    value: number | string;
    duration?: number; 
}

export interface RuleStatistics
{
    timesTriggered: number;
    lastSuccess: Date | null;
    averageImpact: number;
    failureRate?: number;
}

export interface PriceRule
{
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  threshold?: number;
  icon: React.ReactNode;
  category: 'protection' | 'optimization' | 'timing';
  conditions: RuleCondition[];
  actions: RuleAction[];
  priority?: number;
  lastTriggered?: Date;
  statistics?: RuleStatistics;
}


export interface MarketData
{
  competitorAvgPrice: number;
  marketShare: number;
  pricePosition: 'below' | 'above' | 'equal';
  nearbyCompetitors: number;
  avgDailyRevenue: number;
  avgVolumeSold: number;
  avgCustomerCount: number;
}

