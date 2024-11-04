interface Competitor {
    id: string;
    name: string;
    price: number;
    distance: number;
    latitude: number;
    longitude: number;
    priceComparison: 'below' | 'above' | 'equal';
  }
  
  interface StationMetrics {
    grossMargin: number;
    targetMargin: number;
    currentPrice: number;
    inventoryLevel: number;
    projectedDemand: number;
    revenue: number;
  }