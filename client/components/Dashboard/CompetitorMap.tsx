"use client"

import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Map, Filter, Maximize2, ZoomIn, ZoomOut } from 'lucide-react';

interface Competitor
{
    id: string;
    name: string;
    price: number;
    distance: number;
    latitude: number;
    longitude: number;
    priceComparison: 'below' | 'above' | 'equal';
}

interface CompetitorMapProps
{
    competitors: Competitor[];
    centerLat?: number;
    centerLng?: number;
    radius?: number;
}

const CompetitorMap = ({
    competitors,
    centerLat = 48.8566,
    centerLng = 2.3522,
    radius = 5
}: CompetitorMapProps) =>
{
    const [searchRadius, setSearchRadius] = useState(radius);
    const [selectedCompetitor, setSelectedCompetitor] = useState<Competitor | null>(null);
    const [showFilters, setShowFilters] = useState(false);
    const [priceFilter, setPriceFilter] = useState<'all' | 'below' | 'above'>('all');

    const filteredCompetitors = competitors.filter(competitor =>
    {
        if (priceFilter === 'all') return true;
        return competitor.priceComparison === priceFilter;
    });

    const handleCompetitorClick = (competitor: Competitor) =>
    {
        setSelectedCompetitor(competitor);
    };

    return (
        <Card className="col-span-2">
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
                <div className="space-y-1">
                    <CardTitle className="text-xl font-bold">Competition Map</CardTitle>
                    <p className="text-sm text-gray-500">
                        {filteredCompetitors.length} competitors within {searchRadius}km
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                    </Button>
                    <Button variant="outline" size="sm">
                        <Maximize2 className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>

            <CardContent>
                {showFilters && (
                    <div className="mb-4 p-4 bg-gray-50 rounded-lg space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Search Radius (km)</label>
                            <Slider
                                value={[searchRadius]}
                                onValueChange={(value) => setSearchRadius(value[0])}
                                max={20}
                                min={1}
                                step={0.5}
                                className="w-full"
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Badge
                                variant="outline"
                                className={`cursor-pointer ${priceFilter === 'all' ? 'bg-blue-50' : ''}`}
                                onClick={() => setPriceFilter('all')}
                            >
                                All
                            </Badge>
                            <Badge
                                variant="outline"
                                className={`cursor-pointer ${priceFilter === 'below' ? 'bg-green-50' : ''}`}
                                onClick={() => setPriceFilter('below')}
                            >
                                Below Average
                            </Badge>
                            <Badge
                                variant="outline"
                                className={`cursor-pointer ${priceFilter === 'above' ? 'bg-red-50' : ''}`}
                                onClick={() => setPriceFilter('above')}
                            >
                                Above Average
                            </Badge>
                        </div>
                    </div>
                )}

                <div className="relative h-[500px] bg-gray-100 rounded-lg overflow-hidden">
                    <div className="absolute inset-0">
                        {/* Map placeholder - would be replaced with actual mapping library */}
                        <div className="w-full h-full flex items-center justify-center">
                            <Map className="h-12 w-12 text-gray-400" />
                        </div>
                    </div>

                    {/* Map controls */}
                    <div className="absolute top-4 right-4 flex flex-col space-y-2">
                        <Button variant="secondary" size="sm">
                            <ZoomIn className="h-4 w-4" />
                        </Button>
                        <Button variant="secondary" size="sm">
                            <ZoomOut className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Competitor details panel */}
                    {selectedCompetitor && (
                        <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold">{selectedCompetitor.name}</h3>
                                    <p className="text-sm text-gray-500">
                                        {selectedCompetitor.distance}km away
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold">€{selectedCompetitor.price.toFixed(3)}/L</p>
                                    <Badge
                                        variant="outline"
                                        className={
                                            selectedCompetitor.priceComparison === 'below'
                                                ? 'bg-green-50'
                                                : selectedCompetitor.priceComparison === 'above'
                                                    ? 'bg-red-50'
                                                    : ''
                                        }
                                    >
                                        {selectedCompetitor.priceComparison === 'below' ? 'Below' : 'Above'} Average
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Legend */}
                <div className="mt-4 flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-green-500 mr-2" />
                            <span>Below Average</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
                            <span>Above Average</span>
                        </div>
                    </div>
                    <p className="text-gray-500">Last updated: 5 mins ago</p>
                </div>
            </CardContent>
        </Card>
    );
};

export default CompetitorMap;
