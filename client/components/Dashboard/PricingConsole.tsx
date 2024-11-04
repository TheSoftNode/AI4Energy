"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Slider } from "../ui/slider";
import { TrendingUp } from "lucide-react";



const PricingConsole = () => {
    const [currentPrice, setCurrentPrice] = useState(1.85);
    
    return (
      <Card>
        <CardHeader>
          <CardTitle>Price Adjustment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Current Price</span>
                <span className="text-lg font-bold">€{currentPrice.toFixed(3)}/L</span>
              </div>
              <Slider
                value={[currentPrice]}
                onValueChange={(value) => setCurrentPrice(value[0])}
                max={2.5}
                min={1.5}
                step={0.001}
                className="w-full"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-blue-50">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-700">Margin Impact</span>
                  <TrendingUp className="h-4 w-4 text-blue-700" />
                </div>
                <span className="text-2xl font-bold text-blue-900">+€2,450</span>
              </div>
              
              <div className="p-4 rounded-lg bg-green-50">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-700">Volume Impact</span>
                  <TrendingUp className="h-4 w-4 text-green-700" />
                </div>
                <span className="text-2xl font-bold text-green-900">-3.2%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };
  