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

export interface PriceRule
{
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  threshold?: number;
  icon: React.ReactNode;
  category: 'protection' | 'optimization' | 'timing';
}

export interface MarketData
{
  competitorAvgPrice: number;
  marketShare: number;
  pricePosition: 'below' | 'above' | 'equal';
  nearbyCompetitors: number;
}

