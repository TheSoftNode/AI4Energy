import { Clock, RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";

export const MapLegend = () => (
    <div className="mt-4 flex flex-wrap gap-5 items-center justify-between text-sm">
        <div className="flex flex-wrap gap-3 items-center space-x-4">
            {/* Client Station */}
            <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2" />
                <span>Client Station</span>
            </div>
            
            {/* Competitor */}
            <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-gray-400 mr-2" />
                <span>Competitor</span>
            </div>

            {/* Price Indicators */}
            <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
                <span>Above Average</span>
            </div>
            <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
                <span>Equal</span>
            </div>
        </div>

        {/* Last Updated Status */}
        <div className="flex items-center space-x-2 text-gray-500">
            <Clock className="h-4 w-4" />
            <span>Last updated: 5 mins ago</span>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <RefreshCw className="h-4 w-4" />
            </Button>
        </div>
    </div>
);

export default MapLegend;