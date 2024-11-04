import { Filter } from "lucide-react";
import { Button } from "../ui/button";
import Navigation from "./Navigation";
import DashboardMetrics from "./DashboardMetrics";
import CompetitorMap from "./CompetitorMap";
import PricingConsole from "./PricingConsole";
import AutomatedRules from "./AutomatedRules";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import SettingsMenu from "./SettingsMenu";



const FuelPricingDashboard = () => {
    const mockMetrics: StationMetrics = {
      grossMargin: 12.5,
      targetMargin: 15,
      currentPrice: 1.859,
      inventoryLevel: 65,
      projectedDemand: 15000,
      revenue: 27865,
    };
  
    const mockCompetitors: Competitor[] = [
      {
        id: '1',
        name: 'Station A',
        price: 1.849,
        distance: 1.2,
        latitude: 48.8566,
        longitude: 2.3522,
        priceComparison: 'below'
      },
      // Add more mock competitors
    ];
  
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        <main className="container mx-auto pt-20 px-4 space-y-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Dashboard Overview</h2>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter View
            </Button>
          </div>
          
          <DashboardMetrics metrics={mockMetrics} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <CompetitorMap competitors={mockCompetitors} />
            <div className="space-y-6">
              <PricingConsole />
              <AutomatedRules />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Demand Forecast</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    { time: '00:00', current: 100, projected: 95 },
                    { time: '04:00', current: 80, projected: 75 },
                    { time: '08:00', current: 120, projected: 115 },
                    { time: '12:00', current: 150, projected: 140 },
                    { time: '16:00', current: 180, projected: 170 },
                    { time: '20:00', current: 130, projected: 125 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="current" stroke="#2563eb" />
                    <Line type="monotone" dataKey="projected" stroke="#16a34a" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <SettingsMenu />
            </div>
          </div>
        </main>
      </div>
    );
  };
  
  export default FuelPricingDashboard;