export interface PriceHistory
{
    timestamp: Date;
    price: number;
}

export interface CompetitorAnalysis
{
    priceVolatility: number;
    averageResponse: number;
    marketInfluence: number;
    priceHistory: PriceHistory[];
}

export interface CompetitorMapProps
{
    competitors: Competitor[];
    centerLat?: number;
    centerLng?: number;
    radius?: number;
}
