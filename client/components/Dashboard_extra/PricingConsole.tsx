// "use client"

// import React, { useState, useEffect } from 'react';
// import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Slider } from '@/components/ui/slider';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import {
//   TrendingUp,
//   TrendingDown,
//   AlertTriangle,
//   History,
//   ArrowRight,
//   RotateCcw,
//   Lock,
//   Unlock,
//   Share2,
//   BarChart2
// } from 'lucide-react';
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from '@/components/ui/tooltip';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { Badge } from '@/components/ui/badge';
// import { useDashboard } from './DashboardProvider';
// import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip as RechartsTooltip } from 'recharts';

// interface FuelPrice {
//   fuelType: string;
//   currentPrice: number;
//   recommendedPrice: number;
//   futurePrices: {
//     date: Date;
//     price: number;
//   }[];
// }

// interface PriceImpact {
//   margin: number;
//   volume: number;
//   revenue: number;
//   marketShare: number;
// }

// interface PricingConsoleProps {
//   currentPrice: number;
//   minPrice?: number;
//   maxPrice?: number;
//   onPriceChange?: (price: number) => void;
//   onPriceConfirm?: (price: number) => void;
// }

// const PricingConsole: React.FC<PricingConsoleProps> = ({
//   currentPrice,
//   minPrice = 1.5,
//   maxPrice = 2.5,
//   onPriceChange,
//   onPriceConfirm
// }) => {
//   const { marketData, metrics, clientStation } = useDashboard();
//   const [price, setPrice] = useState(currentPrice);
//   const [selectedFuelType, setSelectedFuelType] = useState<string>('Regular Unleaded');
//   const [priceHistory, setPriceHistory] = useState<Array<{ price: number; timestamp: Date; type: string }>>([
//     { price: currentPrice, timestamp: new Date(), type: 'manual' }
//   ]);
//   const [showHistory, setShowHistory] = useState(false);
//   const [impact, setImpact] = useState<PriceImpact>({
//     margin: 0,
//     volume: 0,
//     revenue: 0,
//     marketShare: 0
//   });
//   const [priceLocked, setPriceLocked] = useState(false);
//   const [adjustmentMode, setAdjustmentMode] = useState<'manual' | 'smart'>('manual');

//   // Mock fuel prices data - Replace with actual data from API/Shenal
//   const [fuelPrices, setFuelPrices] = useState<FuelPrice[]>([
//     {
//       fuelType: 'Regular Unleaded',
//       currentPrice: 1.859,
//       recommendedPrice: 1.879,
//       futurePrices: [
//         { date: new Date(), price: 1.879 },
//         { date: new Date(Date.now() + 86400000), price: 1.885 },
//         { date: new Date(Date.now() + 172800000), price: 1.890 }
//       ]
//     },
//     {
//       fuelType: 'Premium Unleaded',
//       currentPrice: 1.959,
//       recommendedPrice: 1.979,
//       futurePrices: [
//         { date: new Date(), price: 1.979 },
//         { date: new Date(Date.now() + 86400000), price: 1.985 },
//         { date: new Date(Date.now() + 172800000), price: 1.990 }
//       ]
//     },
//     {
//       fuelType: 'Diesel',
//       currentPrice: 1.759,
//       recommendedPrice: 1.789,
//       futurePrices: [
//         { date: new Date(), price: 1.789 },
//         { date: new Date(Date.now() + 86400000), price: 1.795 },
//         { date: new Date(Date.now() + 172800000), price: 1.800 }
//       ]
//     }
//   ]);

//   useEffect(() => {
//     const calculateImpact = () => {
//       const priceDiff = price - currentPrice;
//       const volumeImpact = -priceDiff * 5000;
//       const baseVolume = metrics.volumeSold;
//       const newVolume = baseVolume + volumeImpact;
//       const oldRevenue = currentPrice * baseVolume;
//       const newRevenue = price * newVolume;
//       const revenueImpact = newRevenue - oldRevenue;
//       const marketShareImpact = (price > marketData.competitorAvgPrice) ? -2.5 : 1.5;

//       return {
//         margin: priceDiff * newVolume,
//         volume: (volumeImpact / baseVolume) * 100,
//         revenue: revenueImpact,
//         marketShare: marketShareImpact
//       };
//     };

//     setImpact(calculateImpact());
//   }, [price, currentPrice, metrics.volumeSold, marketData.competitorAvgPrice]);

//   const renderFuelPrices = () => (
//     <div className="space-y-4 mt-6">
//       {fuelPrices.map((fuel, index) => (
//         <div 
//           key={index} 
//           className={`p-4 rounded-lg transition-all ${
//             selectedFuelType === fuel.fuelType 
//               ? 'bg-blue-50 border border-blue-200' 
//               : 'bg-gray-50 hover:bg-gray-100'
//           }`}
//           onClick={() => setSelectedFuelType(fuel.fuelType)}
//           style={{ cursor: 'pointer' }}
//         >
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="font-medium">{fuel.fuelType}</h3>
//             {adjustmentMode === 'manual' ? (
//               <div className="text-right">
//                 <p className="text-2xl font-bold">€{fuel.currentPrice.toFixed(3)}/L</p>
//                 <span className="text-sm text-gray-500">Current Price</span>
//               </div>
//             ) : (
//               <div className="text-right">
//                 <p className="text-2xl font-bold text-green-600">€{fuel.recommendedPrice.toFixed(3)}/L</p>
//                 <span className="text-sm text-gray-500">Recommended Price</span>
//               </div>
//             )}
//           </div>
          
//           {adjustmentMode === 'smart' && selectedFuelType === fuel.fuelType && (
//             <div className="h-[100px] mt-4">
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart 
//                   data={fuel.futurePrices.map(fp => ({
//                     date: fp.date.toLocaleDateString(),
//                     price: fp.price
//                   }))}
//                   margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="date" />
//                   <YAxis domain={['auto', 'auto']} />
//                   <RechartsTooltip />
//                   <Line 
//                     type="monotone" 
//                     dataKey="price" 
//                     stroke="#16a34a" 
//                     strokeWidth={2}
//                     dot={{ r: 4 }}
//                     activeDot={{ r: 6 }}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//               <div className="mt-2 text-sm text-gray-500 text-center">
//                 Predicted price trend for next 3 days
//               </div>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );

//   const handlePriceChange = (value: number[]) => {
//     if (!priceLocked) {
//       setPrice(value[0]);
//       onPriceChange?.(value[0]);
//     }
//   };

//   const handlePriceConfirm = () => {
//     setPriceHistory([
//       { price, timestamp: new Date(), type: adjustmentMode },
//       ...priceHistory.slice(0, 9)
//     ]);
//     onPriceConfirm?.(price);
//   };

//   const getSmartPriceSuggestion = () => {
//     const selectedFuel = fuelPrices.find(f => f.fuelType === selectedFuelType);
//     return selectedFuel?.recommendedPrice || price;
//   };

//   const handleSmartAdjustment = () => {
//     const suggestedPrice = getSmartPriceSuggestion();
//     setPrice(suggestedPrice);
//     setAdjustmentMode('smart');
//   };

//   const formatTimeDiff = (date: Date) => {
//     const diff = new Date().getTime() - date.getTime();
//     const hours = Math.floor(diff / (1000 * 60 * 60));
//     const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//     return hours > 0 ? `${hours}h ago` : `${minutes}m ago`;
//   };

//   return (
//     <Card className="w-full">
//       <CardHeader>
//         <div className="flex flex-wrap sm:flex-nowrap gap-4 items-center justify-between">
//           <div className="space-y-1">
//             <CardTitle className="flex items-center space-x-2">
//               <span className="text-lg">Price Adjustment</span>
//               {priceLocked && (
//                 <Badge variant="outline" className="ml-2">Locked</Badge>
//               )}
//             </CardTitle>
//             <p className="text-sm text-gray-500">
//               {adjustmentMode === 'smart' ? 'AI-Optimized Pricing' : 'Manual Price Control'}
//             </p>
//           </div>
//           <div className="flex items-center space-x-3">
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => setPriceLocked(!priceLocked)}
//             >
//               {priceLocked ? (
//                 <Lock className="h-4 w-4" />
//               ) : (
//                 <Unlock className="h-4 w-4" />
//               )}
//             </Button>
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => setShowHistory(!showHistory)}
//             >
//               <History className="h-4 w-4 mr-2" />
//               {showHistory ? 'Hide History' : 'Show History'}
//             </Button>
//           </div>
//         </div>
//       </CardHeader>

//       <CardContent className="space-y-6">
//         <div className="space-y-4">
//           <div className="flex justify-between gap-x-4 items-center">
//             <Select
//               value={adjustmentMode}
//               onValueChange={(value: 'manual' | 'smart') => setAdjustmentMode(value)}
//             >
//               <SelectTrigger className="w-[200px]">
//                 <SelectValue placeholder="Select mode" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="manual">Manual Adjustment</SelectItem>
//                 <SelectItem value="smart">Smart AI Pricing</SelectItem>
//               </SelectContent>
//             </Select>
//             {adjustmentMode === 'smart' && (
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={handleSmartAdjustment}
//               >
//                 <BarChart2 className="h-4 w-4 mr-2" />
//                 Get AI Suggestion
//               </Button>
//             )}
//           </div>

//           {renderFuelPrices()}

//           {/* Impact Analysis Section */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
//             <div className="p-4 rounded-lg bg-blue-50 transition-all hover:bg-blue-100">
//               <div className="flex items-center justify-between mb-2">
//                 <span className="text-sm text-blue-700">Margin Impact</span>
//                 {impact.margin > 0 ? (
//                   <TrendingUp className="h-4 w-4 text-blue-700" />
//                 ) : (
//                   <TrendingDown className="h-4 w-4 text-blue-700" />
//                 )}
//               </div>
//               <span className="text-xl font-bold text-blue-900">
//                 {impact.margin > 0 ? '+' : ''}€{impact.margin.toFixed(2)}
//               </span>
//             </div>

//             <div className="p-4 rounded-lg bg-green-50 transition-all hover:bg-green-100">
//               <div className="flex items-center justify-between mb-2">
//                 <span className="text-sm text-green-700">Volume Impact</span>
//                 {impact.volume > 0 ? (
//                   <TrendingUp className="h-4 w-4 text-green-700" />
//                 ) : (
//                   <TrendingDown className="h-4 w-4 text-green-700" />
//                 )}
//               </div>
//               <span className="text-xl font-bold text-green-900">
//                 {impact.volume > 0 ? '+' : ''}{impact.volume.toFixed(1)}%
//               </span>
//             </div>
//           </div>

//           {showHistory && (
//             <div className="space-y-2 mt-6">
//               <div className="flex items-center justify-between">
//                 <h4 className="font-medium">Recent Price Changes</h4>
//                 <Button variant="ghost" size="sm">
//                   <Share2 className="h-4 w-4 mr-2" />
//                   Export
//                 </Button>
//               </div>
//               <div className="space-y-2 max-h-48 overflow-y-auto">
//                 {priceHistory.map((record, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100"
//                   >
//                     <div className="flex items-center space-x-2">
//                       <span className="text-sm font-medium">
//                         €{record.price.toFixed(3)}
//                       </span>
//                       <Badge variant="outline">
//                         {record.type}
//                       </Badge>
//                     </div>
//                     <span className="text-sm text-gray-500">
//                       {formatTimeDiff(record.timestamp)}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Action Buttons */}
//           <div className="flex space-x-3 mt-6">
//             <TooltipProvider>
//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <Button
//                     className="flex-1 transition-all"
//                     onClick={handlePriceConfirm}
//                     disabled={price === currentPrice || priceLocked}
//                   >
//                     Confirm Change
//                     <ArrowRight className="ml-2 h-4 w-4" />
//                   </Button>
//                 </TooltipTrigger>
//                 <TooltipContent>
//                   <p>{priceLocked ? 'Unlock price to make changes' : 'Apply new price'}</p>
//                 </TooltipContent>
//               </Tooltip>
//             </TooltipProvider>

//             <Button
//               variant="outline"
//               onClick={() => setPrice(currentPrice)}
//               disabled={price === currentPrice || priceLocked}
//               className="transition-all"
//             >
//               <RotateCcw className="h-4 w-4" />
//             </Button>
//           </div>

//           {/* Alerts */}
//           {Math.abs(impact.margin) > 1000 && (
//             <Alert variant="destructive" className="animate-in slide-in-from-bottom">
//               <AlertTriangle className="h-4 w-4" />
//               <AlertDescription>
//                 Large margin impact detected. Please review carefully before confirming.
//               </AlertDescription>
//             </Alert>
//           )}

//           {price > marketData.competitorAvgPrice * 1.1 && (
//             <Alert className="animate-in slide-in-from-bottom">
//               <AlertTriangle className="h-4 w-4" />
//               <AlertDescription>
//                 Price is significantly above market average. This might affect market share.
//               </AlertDescription>
//             </Alert>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default PricingConsole;

"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Alert, AlertDescription } from '@/components/ui/alert';
import
    {
        TrendingUp,
        TrendingDown,
        AlertTriangle,
        History,
        ArrowRight,
        RotateCcw,
        Lock,
        Unlock,
        Share2,
        BarChart2,
    } from 'lucide-react';
import
    {
        Tooltip,
        TooltipContent,
        TooltipProvider,
        TooltipTrigger,
    } from '@/components/ui/tooltip';
import
    {
        Select,
        SelectContent,
        SelectItem,
        SelectTrigger,
        SelectValue,
    } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useDashboard } from './DashboardProvider';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip as RechartsTooltip } from 'recharts';

interface FuelPrice
{
    fuelType: string;
    currentPrice: number;
    recommendedPrice: number;
    minPrice: number;
    maxPrice: number;
    futurePrices: {
        date: Date;
        price: number;
    }[];
}

interface PriceImpact
{
    margin: number;
    volume: number;
    revenue: number;
    marketShare: number;
}

interface PricingConsoleProps
{
    currentPrice: number;
    minPrice?: number;
    maxPrice?: number;
    onPriceChange?: (price: number) => void;
    onPriceConfirm?: (price: number) => void;
}

const PricingConsole: React.FC<PricingConsoleProps> = ({
    currentPrice,
    minPrice = 1.5,
    maxPrice = 2.5,
    onPriceChange,
    onPriceConfirm
}) =>
{
    const { marketData, metrics, clientStation } = useDashboard();
    const [price, setPrice] = useState(currentPrice);
    const [selectedFuelType, setSelectedFuelType] = useState<string>('Regular Unleaded');
    const [priceHistory, setPriceHistory] = useState<Array<{ price: number; timestamp: Date; type: string }>>([
        { price: currentPrice, timestamp: new Date(), type: 'manual' }
    ]);
    const [showHistory, setShowHistory] = useState(false);
    const [impact, setImpact] = useState<PriceImpact>({
        margin: 0,
        volume: 0,
        revenue: 0,
        marketShare: 0
    });
    const [priceLocked, setPriceLocked] = useState(false);
    const [adjustmentMode, setAdjustmentMode] = useState<'manual' | 'smart'>('manual');

    const [fuelPrices, setFuelPrices] = useState<FuelPrice[]>([
        {
            fuelType: 'Regular Unleaded',
            currentPrice: 1.859,
            recommendedPrice: 1.879,
            minPrice: 1.5,
            maxPrice: 2.2,
            futurePrices: [
                { date: new Date(), price: 1.879 },
                { date: new Date(Date.now() + 86400000), price: 1.885 },
                { date: new Date(Date.now() + 172800000), price: 1.890 }
            ]
        },
        {
            fuelType: 'Premium Unleaded',
            currentPrice: 1.959,
            recommendedPrice: 1.979,
            minPrice: 1.7,
            maxPrice: 2.5,
            futurePrices: [
                { date: new Date(), price: 1.979 },
                { date: new Date(Date.now() + 86400000), price: 1.985 },
                { date: new Date(Date.now() + 172800000), price: 1.990 }
            ]
        },
        {
            fuelType: 'Diesel',
            currentPrice: 1.759,
            recommendedPrice: 1.789,
            minPrice: 1.4,
            maxPrice: 2.1,
            futurePrices: [
                { date: new Date(), price: 1.789 },
                { date: new Date(Date.now() + 86400000), price: 1.795 },
                { date: new Date(Date.now() + 172800000), price: 1.800 }
            ]
        }
    ]);

    useEffect(() =>
    {
        const calculateImpact = () =>
        {
            const priceDiff = price - currentPrice;
            const volumeImpact = -priceDiff * 5000;
            const baseVolume = metrics.volumeSold;
            const newVolume = baseVolume + volumeImpact;
            const oldRevenue = currentPrice * baseVolume;
            const newRevenue = price * newVolume;
            const revenueImpact = newRevenue - oldRevenue;
            const marketShareImpact = (price > marketData.competitorAvgPrice) ? -2.5 : 1.5;

            return {
                margin: priceDiff * newVolume,
                volume: (volumeImpact / baseVolume) * 100,
                revenue: revenueImpact,
                marketShare: marketShareImpact
            };
        };

        setImpact(calculateImpact());
    }, [price, currentPrice, metrics.volumeSold, marketData.competitorAvgPrice]);

    const handlePriceChange = (value: number[]) =>
    {
        if (!priceLocked)
        {
            setPrice(value[0]);
            onPriceChange?.(value[0]);
        }
    };

    const handleFuelPriceChange = (fuelType: string, value: number[]) =>
    {
        if (!priceLocked)
        {
            const updatedPrices = fuelPrices.map(fuel =>
                fuel.fuelType === fuelType
                    ? { ...fuel, currentPrice: value[0] }
                    : fuel
            );
            setFuelPrices(updatedPrices);

            // Update main price if selected fuel type
            if (fuelType === selectedFuelType)
            {
                setPrice(value[0]);
                onPriceChange?.(value[0]);
            }
        }
    };

    const handlePriceConfirm = () =>
    {
        setPriceHistory([
            { price, timestamp: new Date(), type: adjustmentMode },
            ...priceHistory.slice(0, 9)
        ]);
        onPriceConfirm?.(price);
    };

    const getSmartPriceSuggestion = () =>
    {
        const selectedFuel = fuelPrices.find(f => f.fuelType === selectedFuelType);
        return selectedFuel?.recommendedPrice || price;
    };

    const handleSmartAdjustment = () =>
    {
        const suggestedPrice = getSmartPriceSuggestion();
        setPrice(suggestedPrice);

        // Update fuel prices in smart mode
        const updatedPrices = fuelPrices.map(fuel => ({
            ...fuel,
            currentPrice: fuel.recommendedPrice
        }));
        setFuelPrices(updatedPrices);
        setAdjustmentMode('smart');
    };

    const formatTimeDiff = (date: Date) =>
    {
        const diff = new Date().getTime() - date.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        return hours > 0 ? `${hours}h ago` : `${minutes}m ago`;
    };

    const renderFuelTypeCard = (fuel: FuelPrice) => (
        <div
            key={fuel.fuelType}
            className={`bg-white rounded-lg border transition-all ${selectedFuelType === fuel.fuelType
                    ? 'border-blue-200 shadow-sm'
                    : 'border-gray-100 hover:border-gray-200'
                }`}
            onClick={() => setSelectedFuelType(fuel.fuelType)}
        >
            <div className="p-6 space-y-4">
                {/* Fuel Type Header */}
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <h3 className="text-lg font-semibold">{fuel.fuelType}</h3>
                        <p className="text-sm text-gray-500">
                            Market Avg: €{marketData.competitorAvgPrice.toFixed(3)}
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                            €{fuel.currentPrice.toFixed(3)}
                            <span className="text-sm text-gray-500 ml-1">/L</span>
                        </div>
                        <Badge
                            variant="outline"
                            className={`${fuel.currentPrice > marketData.competitorAvgPrice
                                    ? 'bg-red-50 text-red-700'
                                    : 'bg-green-50 text-green-700'
                                }`}
                        >
                            {fuel.currentPrice > marketData.competitorAvgPrice ? 'Above' : 'Below'} Market
                        </Badge>
                    </div>
                </div>

                {/* Price Controls */}
                <div className="space-y-6">
                    {/* Price Slider */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Price Adjustment</span>
                            {adjustmentMode === 'smart' && (
                                <Badge variant="outline" className="bg-blue-50">
                                    AI Recommended: €{fuel.recommendedPrice.toFixed(3)}
                                </Badge>
                            )}
                        </div>
                        <Slider
                            value={[fuel.currentPrice]}
                            min={fuel.minPrice}
                            max={fuel.maxPrice}
                            step={0.001}
                            onValueChange={(value) => handleFuelPriceChange(fuel.fuelType, value)}
                            disabled={priceLocked || adjustmentMode === 'smart'}
                            className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Min: €{fuel.minPrice.toFixed(3)}</span>
                            <span>Max: €{fuel.maxPrice.toFixed(3)}</span>
                        </div>
                    </div>

                    {/* Price Impact */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 rounded-lg bg-blue-50/50 border border-blue-100">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-sm text-blue-700">Margin Impact</span>
                                {impact.margin > 0 ? (
                                    <TrendingUp className="h-4 w-4 text-blue-700" />
                                ) : (
                                    <TrendingDown className="h-4 w-4 text-blue-700" />
                                )}
                            </div>
                            <span className="text-lg font-bold text-blue-900">
                                {impact.margin > 0 ? '+' : ''}€{impact.margin.toFixed(2)}
                            </span>
                        </div>

                        <div className="p-3 rounded-lg bg-green-50/50 border border-green-100">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-sm text-green-700">Volume Impact</span>
                                {impact.volume > 0 ? (
                                    <TrendingUp className="h-4 w-4 text-green-700" />
                                ) : (
                                    <TrendingDown className="h-4 w-4 text-green-700" />
                                )}
                            </div>
                            <span className="text-lg font-bold text-green-900">
                                {impact.volume > 0 ? '+' : ''}{impact.volume.toFixed(1)}%
                            </span>
                        </div>
                    </div>

                    {/* Smart Mode Prediction Chart */}
                    {adjustmentMode === 'smart' && selectedFuelType === fuel.fuelType && (
                        <div className="space-y-2">
                            <span className="text-sm font-medium">Price Prediction</span>
                            <div className="h-[120px] w-full">
                                <ResponsiveContainer>
                                    <LineChart data={fuel.futurePrices.map(fp => ({
                                        date: fp.date.toLocaleDateString(),
                                        price: fp.price
                                    }))}>
                                        <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
                                        <XAxis
                                            dataKey="date"
                                            tick={{ fontSize: 12 }}
                                            tickLine={{ display: 'none' }}
                                        />
                                        <YAxis
                                            domain={[
                                                Math.min(...fuel.futurePrices.map(fp => fp.price)) * 0.99,
                                                Math.max(...fuel.futurePrices.map(fp => fp.price)) * 1.01
                                            ]}
                                            tick={{ fontSize: 12 }}
                                            tickLine={{ display: 'none' }}
                                        />
                                        <RechartsTooltip
                                            content={({ active, payload }) =>
                                            {
                                                if (active && payload?.[0]?.value && typeof payload[0].value === 'number')
                                                {
                                                    return (
                                                        <div className="bg-white p-2 border rounded shadow-sm">
                                                            <p className="text-sm font-medium">
                                                                €{payload[0].value.toFixed(3)}
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                {payload[0].payload.date}
                                                            </p>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="price"
                                            stroke="#16a34a"
                                            strokeWidth={2}
                                            dot={{ r: 4, strokeWidth: 2 }}
                                            activeDot={{ r: 6, strokeWidth: 2 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )

    return (
        <Card className="w-full border-gray-200">
            <CardHeader className="border-b border-gray-100">
                <div className="flex flex-wrap sm:flex-nowrap gap-4 items-center justify-between">
                    <div className="space-y-1">
                        <CardTitle className="flex items-center gap-2">
                            <span className="text-xl font-bold">Price Adjustment</span>
                            {priceLocked && (
                                <Badge variant="outline" className="ml-2">Locked</Badge>
                            )}
                        </CardTitle>
                        <p className="text-sm text-gray-500">
                            {adjustmentMode === 'smart'
                                ? 'AI-Optimized Pricing Recommendations'
                                : 'Manual Price Control and Adjustment'}
                        </p>
                    </div>

                    <div className="flex items-center flex-wrap gap-3">
                        <Select
                            value={adjustmentMode}
                            onValueChange={(value: 'manual' | 'smart') => setAdjustmentMode(value)}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="manual">
                                    <div className="flex items-center gap-2">
                                        <span>Manual Adjustment</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="smart">
                                    <div className="flex items-center gap-2">
                                        <span>Smart AI Pricing</span>
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        {adjustmentMode === 'smart' && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleSmartAdjustment}
                                className="gap-2"
                            >
                                <BarChart2 className="h-4 w-4" />
                                Get AI Suggestions
                            </Button>
                        )}

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setPriceLocked(!priceLocked)}
                                        className={priceLocked ? 'bg-gray-50' : ''}
                                    >
                                        {priceLocked ? (
                                            <Lock className="h-4 w-4" />
                                        ) : (
                                            <Unlock className="h-4 w-4" />
                                        )}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {priceLocked ? 'Unlock price adjustments' : 'Lock price adjustments'}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowHistory(!showHistory)}
                            className="gap-2"
                        >
                            <History className="h-4 w-4" />
                            {showHistory ? 'Hide History' : 'Show History'}
                        </Button>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
                {/* Fuel Type Cards */}
                <div className="grid gap-6">
                    {fuelPrices.map((fuel) => renderFuelTypeCard(fuel))}
                </div>

                {/* Price History Panel */}
                {showHistory && (
                    <div className="space-y-3 mt-6 animate-in slide-in-from-top duration-200">
                        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                            <h4 className="font-semibold text-gray-900">Recent Price Changes</h4>
                            <Button variant="ghost" size="sm" className="gap-2">
                                <Share2 className="h-4 w-4" />
                                Export History
                            </Button>
                        </div>
                        <div className="space-y-1 max-h-[300px] overflow-y-auto rounded-lg border border-gray-100">
                            {priceHistory.map((record, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="font-medium">€{record.price.toFixed(3)}</span>
                                        <Badge variant="outline" className={
                                            record.type === 'smart' ? 'bg-blue-50 text-blue-700' : undefined
                                        }>
                                            {record.type === 'smart' ? 'AI Adjusted' : 'Manual Change'}
                                        </Badge>
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        {formatTimeDiff(record.timestamp)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-100">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    size="lg"
                                    className="flex-1 gap-2"
                                    onClick={handlePriceConfirm}
                                    disabled={priceLocked}
                                >
                                    Confirm Price Changes
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{priceLocked ? 'Unlock price to make changes' : 'Apply new prices'}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <Button
                        variant="outline"
                        size="lg"
                        onClick={() =>
                        {
                            setPrice(currentPrice);
                            setFuelPrices(fuelPrices.map(fuel => ({
                                ...fuel,
                                currentPrice: fuel.currentPrice
                            })));
                        }}
                        disabled={priceLocked}
                        className="gap-2"
                    >
                        <RotateCcw className="h-4 w-4" />
                        Reset Changes
                    </Button>
                </div>

                {/* Alerts */}
                {Math.abs(impact.margin) > 1000 && (
                    <Alert variant="destructive" className="mt-4 animate-in slide-in-from-bottom duration-200">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                            Large margin impact detected. Please review carefully before confirming.
                        </AlertDescription>
                    </Alert>
                )}

                {fuelPrices.some(fuel => fuel.currentPrice > marketData.competitorAvgPrice * 1.1) && (
                    <Alert className="mt-4 animate-in slide-in-from-bottom duration-200">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                            Some fuel prices are significantly above market average. This might affect market share.
                        </AlertDescription>
                    </Alert>
                )}
            </CardContent>
        </Card>
    );
};

export default PricingConsole;