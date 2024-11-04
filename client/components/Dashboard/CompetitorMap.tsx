import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Map } from "lucide-react";

// Types
interface Competitor {
    id: string;
    name: string;
    price: number;
    distance: number;
    latitude: number;
    longitude: number;
    priceComparison: 'below' | 'above' | 'equal';
  }  


const CompetitorMap = ({ competitors }: { competitors: Competitor[] }) => {
    return (
      <Card className="col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Competition Map</CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-green-50">Below Average</Badge>
              <Badge variant="outline" className="bg-red-50">Above Average</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-[400px] relative">
          <div className="absolute inset-0 bg-gray-50 rounded-lg">
            {/* Map would be implemented here using a mapping library */}
            <div className="p-4 text-center text-gray-500">
              Interactive map would be rendered here
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  export default CompetitorMap;
  