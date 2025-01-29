import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface FilterPanelProps {
    searchRadius: number;
    setSearchRadius: (value: number) => void;
    timeRange: '24h' | '7d' | '30d';
    setTimeRange: (value: '24h' | '7d' | '30d') => void;
    priceFilter: 'all' | 'below' | 'above';
    setPriceFilter: (value: 'all' | 'below' | 'above') => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
    searchRadius,
    setSearchRadius,
    timeRange,
    setTimeRange,
    priceFilter,
    setPriceFilter
}) => (
    <div className="mb-4 p-4 bg-gray-50 rounded-lg space-y-4">
        {/* Search Radius Slider */}
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Search Radius (km)</label>
                <span className="text-sm text-gray-500">{searchRadius}km</span>
            </div>
            <Slider
                value={[searchRadius]}
                onValueChange={(value) => setSearchRadius(value[0])}
                max={20}
                min={1}
                step={0.5}
                className="w-full"
            />
        </div>

        {/* Time Range Selection */}
        <div className="space-y-2">
            <label className="text-sm font-medium">Time Range</label>
            <div className="flex items-center space-x-2">
                <Badge
                    variant="outline"
                    className={`cursor-pointer ${timeRange === '24h' ? 'bg-blue-50' : ''}`}
                    onClick={() => setTimeRange('24h')}
                >
                    24 Hours
                </Badge>
                <Badge
                    variant="outline"
                    className={`cursor-pointer ${timeRange === '7d' ? 'bg-blue-50' : ''}`}
                    onClick={() => setTimeRange('7d')}
                >
                    7 Days
                </Badge>
                <Badge
                    variant="outline"
                    className={`cursor-pointer ${timeRange === '30d' ? 'bg-blue-50' : ''}`}
                    onClick={() => setTimeRange('30d')}
                >
                    30 Days
                </Badge>
            </div>
        </div>

        {/* Price Filter */}
        <div className="space-y-2">
            <label className="text-sm font-medium">Price Filter</label>
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

        {/* Search Box */}
        <div className="flex items-center space-x-4">
            <Input
                type="text"
                placeholder="Search competitors..."
                className="flex-1"
            />
            <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Search
            </Button>
        </div>
    </div>
);

export default FilterPanel;