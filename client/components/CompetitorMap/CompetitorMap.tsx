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
    stationType: string;
    recommendations: FuelRecommendation[];
    address?: string;
  operatingHours?: string;
  lastUpdated?: Date;
}

interface CompetitorMapProps
{
    competitors: Competitor[];
    clientStation: ClientStation[];
    radius?: number;
}

mapboxgl.accessToken = 'pk.eyJ1IjoidGhlc29mdCIsImEiOiJjbTNqMjY5ZXowODdpMmtzZXA5Nm9ycmJiIn0.4ch5c7tjwTC9oDdX0xgruQ';

const CompetitorMap: React.FC<CompetitorMapProps> = ({
    competitors,
    clientStation,
    radius = 10
}) =>
{

    console.log('CompetitorMap props:', { competitors, clientStation, radius });
    const { marketData, metrics, setView } = useDashboard();
    const [searchRadius, setSearchRadius] = useState(radius);
    const [selectedCompetitor, setSelectedCompetitor] = useState<Competitor | null>(null);
    const [showFilters, setShowFilters] = useState(false);
    const [showAnalytics, setShowAnalytics] = useState(false);
    const [priceFilter, setPriceFilter] = useState<'all' | 'below' | 'above'>('all');
    const [mapView, setMapView] = useState<'standard' | 'heatmap' | 'cluster'>('standard');
    const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');
    const [competitorAnalysis, setCompetitorAnalysis] = useState<CompetitorAnalysis | null>(null);
    const [map, setMap] = useState<mapboxgl.Map | null>(null);



    

    // Function to create competitor tooltip content
const createCompetitorTooltipContent = (competitor: Competitor) => {
    return `
        <div class="min-w-[250px] max-w-[350px] p-4 bg-white rounded-lg shadow-lg">
            <div class="border-b border-gray-100 pb-2 mb-3">
                <h3 class="text-base font-semibold text-gray-900 truncate">${competitor.name}</h3>
                <p class="text-xs text-gray-500 mt-1">${competitor.distance.toFixed(1)}km away</p>
            </div>
            <div class="space-y-2">
                <div class="flex justify-between items-center">
                    <span class="text-sm font-medium">Current Price</span>
                    <span class="text-sm text-gray-900">€${competitor.price.toFixed(3)}/L</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-sm font-medium">Price Position</span>
                    <Badge variant="outline" class="px-2 py-1 text-xs ${
                        competitor.priceComparison === 'above' ? 'bg-red-50 text-red-700' : 
                        competitor.priceComparison === 'below' ? 'bg-green-50 text-green-700' : 
                        'bg-blue-50 text-blue-700'
                    }">
                        ${competitor.priceComparison.charAt(0).toUpperCase() + competitor.priceComparison.slice(1)} Market
                    </Badge>
                </div>
            </div>
        </div>
    `;
};
    const createClientTooltipContent = (client: ClientStation) => {
        return `
            <div class="min-w-[250px] max-w-[350px] p-4 bg-white rounded-lg shadow-lg">
                <div class="border-b border-gray-100 pb-2 mb-3">
                    <h3 class="text-base font-semibold text-gray-900 truncate">${client.name}</h3>
                    ${client.address ? 
                        `<p class="text-xs text-gray-500 mt-1 truncate">${client.address}</p>` 
                        : ''}
                </div>
                <div class="space-y-2">
                    <h4 class="text-sm font-medium text-gray-700">Recommended Prices</h4>
                    <div class="space-y-2">
                        ${client.recommendations.map(rec => `
                            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 py-1">
                                <span class="text-xs font-medium whitespace-nowrap">${rec.fuelType}</span>
                                <div class="flex items-center gap-1 ml-auto">
                                    <span class="text-xs text-gray-600">€${rec.currentPrice.toFixed(3)}</span>
                                    <svg class="w-3 h-3 text-green-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                    <span class="text-xs font-medium text-green-700">€${rec.recommendedPrice.toFixed(3)}</span>
                                    <span class="px-1 py-0.5 text-[10px] rounded bg-green-50 text-green-700 whitespace-nowrap">${rec.confidence}%</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    ${client.operatingHours ? `
                        <div class="pt-2 mt-2 border-t border-gray-100">
                            <p class="text-[10px] text-gray-500 truncate">
                                <span class="font-medium">Hours:</span> ${client.operatingHours}
                            </p>
                        </div>
                    ` : ''}
                    ${client.lastUpdated ? `
                        <div class="text-[10px] text-gray-400 mt-1">
                            Updated: ${new Date(client.lastUpdated).toLocaleString()}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    };

    useEffect(() =>
    {
        console.log('CompetitorMap Mounted:', {
            hasCompetitors: !!competitors?.length,
            hasClientStation: !!clientStation,
            clientStation,
            competitors
        });
    }, [competitors, clientStation]);

    useEffect(() => {
        // Add custom styles to document
        const styleSheet = document.createElement("style");
        styleSheet.textContent = tooltipStyles;
        document.head.appendChild(styleSheet);

        const initMap = () => {
            const mapContainer = document.getElementById('map');
            if (mapContainer) {
                // Calculate center point from all client stations
                const centerLat = clientStation.reduce((sum, station) => sum + station.latitude, 0) / clientStation.length;
                const centerLng = clientStation.reduce((sum, station) => sum + station.longitude, 0) / clientStation.length;

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

        return () => {
            styleSheet.remove();
        };
    }, [clientStation]);


   
useEffect(() => {
    if (map) {
        // Clear existing markers
        const existingMarkers = document.querySelectorAll('.mapboxgl-marker');
        existingMarkers.forEach(marker => marker.remove());

        const bounds = new mapboxgl.LngLatBounds();

       // Add client station markers
       clientStation.forEach(station => {
        const clientEl = document.createElement('div');
        clientEl.className = 'cursor-pointer';
        clientEl.innerHTML = `
            <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg transform transition-transform hover:scale-110">
                ${station.name.charAt(0)}
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
            .setLngLat([station.longitude, station.latitude])
            .addTo(map);

        // Add hover events
        clientEl.addEventListener('mouseenter', () => {
            tooltip
                .setLngLat([station.longitude, station.latitude])
                .setHTML(createClientTooltipContent(station))
                .addTo(map);
        });

        clientEl.addEventListener('mouseleave', () => {
            tooltip.remove();
        });

       // In CompetitorMap component

// Then in the marker creation code
clientEl.addEventListener('click', () => {
    setView('pricing');  // This will switch to the pricing tab
});

        // Add click event to open price console
        // clientEl.addEventListener('click', () => {
        //     window.open(`/priceconsole?station=${station.id}`, '_blank');
        // });

        bounds.extend([station.longitude, station.latitude]);
    });

        // Add competitor markers
        competitors.forEach((competitor) => {
            // Check if competitor is within radius of ANY client station
            const isNearAnyStation = clientStation.some(station => {
                const R = 6371; // Earth's radius in km
                const dLat = (competitor.latitude - station.latitude) * Math.PI / 180;
                const dLon = (competitor.longitude - station.longitude) * Math.PI / 180;
                const a = 
                    Math.sin(dLat/2) * Math.sin(dLat/2) +
                    Math.cos(station.latitude * Math.PI / 180) * Math.cos(competitor.latitude * Math.PI / 180) * 
                    Math.sin(dLon/2) * Math.sin(dLon/2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                const distance = R * c;
                return distance <= radius;
            });

            // In the competitors.forEach loop
if (isNearAnyStation) {
    const el = document.createElement('div');
    el.className = 'cursor-pointer';
    el.innerHTML = `
        <div class="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold shadow-lg transform transition-transform hover:scale-110">
            S
        </div>
    `;

    const competitorTooltip = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        offset: [0, -10],
        className: 'competitor-station-tooltip'
    });

    const marker = new mapboxgl.Marker(el)
        .setLngLat([competitor.longitude, competitor.latitude])
        .addTo(map);

    // Add hover events for competitor
    el.addEventListener('mouseenter', () => {
        competitorTooltip
            .setLngLat([competitor.longitude, competitor.latitude])
            .setHTML(createCompetitorTooltipContent(competitor))
            .addTo(map);
    });

    el.addEventListener('mouseleave', () => {
        competitorTooltip.remove();
    });

    el.addEventListener('click', () => {
        handleCompetitorClick(competitor);
    });

    bounds.extend([competitor.longitude, competitor.latitude]);
}
            // if (isNearAnyStation) {
            //     // Create and add competitor marker...
            //     const el = document.createElement('div');
            //     el.className = 'cursor-pointer';
            //     el.innerHTML = `
            //         <div class="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold shadow-lg transform transition-transform hover:scale-110">
            //             S
            //         </div>
            //     `;

            //     const marker = new mapboxgl.Marker(el)
            //         .setLngLat([competitor.longitude, competitor.latitude])
            //         .addTo(map);

            //     el.addEventListener('click', () => {
            //         handleCompetitorClick(competitor);
            //     });

            //     bounds.extend([competitor.longitude, competitor.latitude]);
            // }
        });

        // Fit map to include all markers
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

                <div className="relative h-[800px] bg-gray-100 rounded-lg overflow-hidden">
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


// Custom styles for the map tooltip
const tooltipStyles = `
.mapboxgl-popup-content {
  padding: 0 !important;
  border-radius: 8px !important;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1) !important;
}

.client-tooltip {
  min-width: 320px;
  max-width: 400px;
}

.client-tooltip-header {
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
  background-color: #f8fafc;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.client-tooltip-content {
  padding: 12px 16px;
}

.fuel-price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  border-bottom: 1px solid #f1f5f9;
}

.fuel-price-row:last-child {
  border-bottom: none;
}
`;