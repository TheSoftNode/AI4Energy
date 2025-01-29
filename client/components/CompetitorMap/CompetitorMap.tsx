"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import
    {
        Map,
        Filter,
        Maximize2,
        Activity,
        Clock,
    } from 'lucide-react';
import
    {
        Select,
        SelectContent,
        SelectItem,
        SelectTrigger,
        SelectValue,
    } from "@/components/ui/select";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { CompetitorAnalysis, PriceHistory } from './types';
import { useDashboard } from '../Dashboard_extra/DashboardProvider';
import FilterPanel from './FilterPanel';
import { MapControls } from './MapControls';
import { LiveUpdates } from './LiveUpdates';
import { CompetitorDetails } from './CompetitorDetails';
import AnalyticsPanel from './AnalyticsPanel';
import MapLegend from './MapLegend';

// Types
interface FuelRecommendation
{
    fuelType: string;
    currentPrice: number;
    recommendedPrice: number;
    confidence: number;
}

interface ClientStation
{
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    recommendations: FuelRecommendation[];
}

interface CompetitorMapProps
{
    competitors: Competitor[];
    clientStation: ClientStation;
    centerLat?: number;
    centerLng?: number;
    radius?: number;
}

mapboxgl.accessToken = 'pk.eyJ1IjoidGhlc29mdCIsImEiOiJjbTNqMjY5ZXowODdpMmtzZXA5Nm9ycmJiIn0.4ch5c7tjwTC9oDdX0xgruQ';

const CompetitorMap: React.FC<CompetitorMapProps> = ({
    competitors,
    clientStation,
    centerLat = 48.8566,
    centerLng = 2.3522,
    radius = 10
}) =>
{
    const { marketData, metrics } = useDashboard();
    const [searchRadius, setSearchRadius] = useState(radius);
    const [selectedCompetitor, setSelectedCompetitor] = useState<Competitor | null>(null);
    const [showFilters, setShowFilters] = useState(false);
    const [showAnalytics, setShowAnalytics] = useState(false);
    const [priceFilter, setPriceFilter] = useState<'all' | 'below' | 'above'>('all');
    const [mapView, setMapView] = useState<'standard' | 'heatmap' | 'cluster'>('standard');
    const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');
    const [competitorAnalysis, setCompetitorAnalysis] = useState<CompetitorAnalysis | null>(null);
    const [map, setMap] = useState<mapboxgl.Map | null>(null);

    // Function to create the tooltip content for the client station
    const createClientTooltipContent = (recommendations: FuelRecommendation[]) =>
    {
        return `
            <div class="p-3 bg-white rounded shadow-lg">
                <h3 class="font-bold text-sm mb-2">Recommended Prices</h3>
                <div class="space-y-2">
                    ${recommendations.map(rec => `
                        <div class="flex justify-between items-center gap-4">
                            <span class="text-sm">${rec.fuelType}</span>
                            <div class="flex items-center gap-2">
                                <span class="text-sm">€${rec.currentPrice.toFixed(3)}</span>
                                <span class="text-green-600">→</span>
                                <span class="font-medium">€${rec.recommendedPrice.toFixed(3)}</span>
                                <span class="text-xs text-gray-500">${rec.confidence}%</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    };

    // Initialize map
    useEffect(() =>
    {
        const initMap = () =>
        {
            const mapContainer = document.getElementById('map');
            if (mapContainer)
            {
                const newMap = new mapboxgl.Map({
                    container: mapContainer,
                    style: 'mapbox://styles/mapbox/streets-v11',
                    center: [centerLng, centerLat],
                    zoom: 12
                });
                setMap(newMap);
            }
        };
        initMap();
    }, [centerLat, centerLng]);

    // Handle markers and interactions
    useEffect(() =>
    {
        if (map)
        {
            // Clear existing markers
            const existingMarkers = document.querySelectorAll('.mapboxgl-marker');
            existingMarkers.forEach(marker => marker.remove());

            // Add client station marker
            const clientEl = document.createElement('div');
            clientEl.className = 'cursor-pointer';
            clientEl.innerHTML = `
                <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg transform transition-transform hover:scale-110">
                    C
                </div>
            `;

            // Create and configure tooltip
            const tooltip = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: false,
                offset: [0, -10],
                className: 'client-station-tooltip'
            });

            // Create client marker
            const clientMarker = new mapboxgl.Marker(clientEl)
                .setLngLat([clientStation.longitude, clientStation.latitude])
                .addTo(map);

            // Add hover events
            clientEl.addEventListener('mouseenter', () =>
            {
                tooltip
                    .setLngLat([clientStation.longitude, clientStation.latitude])
                    .setHTML(createClientTooltipContent(clientStation.recommendations))
                    .addTo(map);
            });

            clientEl.addEventListener('mouseleave', () =>
            {
                tooltip.remove();
            });

            // Add click event to open price console
            clientEl.addEventListener('click', () =>
            {
                window.open('/price-console', '_blank');
            });

            // Add competitor markers within 10km radius
            competitors.forEach((competitor) =>
            {
                // Calculate distance using Haversine formula
                const R = 6371; // Earth's radius in km
                const dLat = (competitor.latitude - clientStation.latitude) * Math.PI / 180;
                const dLon = (competitor.longitude - clientStation.longitude) * Math.PI / 180;
                const a =
                    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(clientStation.latitude * Math.PI / 180) * Math.cos(competitor.latitude * Math.PI / 180) *
                    Math.sin(dLon / 2) * Math.sin(dLon / 2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                const distance = R * c;

                if (distance <= radius)
                {
                    const el = document.createElement('div');
                    el.className = 'cursor-pointer';
                    el.innerHTML = `
                        <div class="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold shadow-lg transform transition-transform hover:scale-110">
                            S
                        </div>
                    `;

                    const marker = new mapboxgl.Marker(el)
                        .setLngLat([competitor.longitude, competitor.latitude])
                        .addTo(map);

                    el.addEventListener('click', () =>
                    {
                        handleCompetitorClick(competitor);
                    });
                }
            });

            // Fit bounds to include all markers
            const bounds = new mapboxgl.LngLatBounds();
            bounds.extend([clientStation.longitude, clientStation.latitude]);
            competitors.forEach((competitor) =>
            {
                bounds.extend([competitor.longitude, competitor.latitude]);
            });
            map.fitBounds(bounds, { padding: 50 });
        }
    }, [map, competitors, clientStation]);

    // Handle competitor click
    const handleCompetitorClick = (competitor: Competitor) =>
    {
        setSelectedCompetitor(competitor);
    };

    // Calculate price change indicator
    // Generate mock price history data
    const generatePriceHistory = (basePrice: number): PriceHistory[] =>
    {
        const history: PriceHistory[] = [];
        const now = new Date();
        for (let i = 0; i < 24; i++)
        {
            const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
            const price = basePrice + (Math.random() - 0.5) * 0.1;
            history.push({ timestamp, price });
        }
        return history.reverse();
    };

    const getPriceChangeIndicator = (competitor: Competitor) =>
    {
        const diff = ((competitor.price - metrics.currentPrice) / metrics.currentPrice) * 100;
        if (Math.abs(diff) < 0.1) return 'Equal';
        return diff > 0 ?
            `${diff.toFixed(1)}% Higher` :
            `${Math.abs(diff).toFixed(1)}% Lower`;
    };

    // Filter competitors based on price filter
    const filteredCompetitors = competitors.filter(competitor =>
    {
        if (priceFilter === 'all') return true;
        return competitor.priceComparison === priceFilter;
    });

    return (
        <Card className="col-span-2">
            <CardHeader className="flex-row flex-wrap gap-3 items-center justify-between space-y-0 pb-4">
                <div className="space-y-1">
                    <CardTitle className="text-xl font-bold">Competition Map</CardTitle>
                    <p className="text-sm text-gray-500">
                        {filteredCompetitors.length} competitors within {searchRadius}km
                    </p>
                </div>
                <div className="flex flex-wrap gap-3 items-center space-x-2">
                    <Select
                        value={mapView}
                        onValueChange={(value: 'standard' | 'heatmap' | 'cluster') => setMapView(value)}
                    >
                        <SelectTrigger className="w-[130px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="heatmap">Heat Map</SelectItem>
                            <SelectItem value="cluster">Clusters</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowAnalytics(!showAnalytics)}
                    >
                        <Activity className="h-4 w-4 mr-2" />
                        Analytics
                    </Button>

                    <Button variant="outline" size="sm">
                        <Maximize2 className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>

            <CardContent>
                {showFilters && (
                    <FilterPanel
                        searchRadius={searchRadius}
                        setSearchRadius={setSearchRadius}
                        timeRange={timeRange}
                        setTimeRange={setTimeRange}
                        priceFilter={priceFilter}
                        setPriceFilter={setPriceFilter}
                    />
                )}

                <div className="relative h-[500px] bg-gray-100 rounded-lg overflow-hidden">
                    <div id="map" className="w-full h-full" />
                    <MapControls />
                    <LiveUpdates />

                    {selectedCompetitor && competitorAnalysis && (
                        <CompetitorDetails
                            competitor={selectedCompetitor}
                            analysis={competitorAnalysis}
                            metrics={metrics}
                            getPriceChangeIndicator={getPriceChangeIndicator}
                        />
                    )}

                    {showAnalytics && (
                        <AnalyticsPanel
                            competitors={competitors}
                            marketData={marketData}
                            filteredCompetitors={filteredCompetitors}
                            generatePriceHistory={generatePriceHistory}
                            onClose={() => setShowAnalytics(false)}
                        />
                    )}
                </div>

                <MapLegend />
            </CardContent>
        </Card>
    );
};

export default CompetitorMap;