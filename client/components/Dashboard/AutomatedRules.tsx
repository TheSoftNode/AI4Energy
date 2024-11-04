"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";

const AutomatedRules = () =>
{
    const [rules, setRules] = useState({
        matchCompetitor: true,
        minMargin: true,
        peakPricing: false,
    });

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Automated Rules</CardTitle>
                    <Badge variant="outline" className="bg-green-50">Active</Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <span className="font-medium">Match Competitor</span>
                            <p className="text-sm text-gray-500">Stay within 2% of nearest competitor</p>
                        </div>
                        <Switch
                            checked={rules.matchCompetitor}
                            onCheckedChange={(checked) =>
                                setRules(prev => ({ ...prev, matchCompetitor: checked }))
                            }
                        />
                    </div>

                    {/* Similar items for other rules */}
                </div>
            </CardContent>
        </Card>
    );
};

export default AutomatedRules;