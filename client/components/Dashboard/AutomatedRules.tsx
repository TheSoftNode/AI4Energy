"use client"

import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Slider } from '@/components/ui/slider';
import
{
    Shield,
    Zap,
    Clock,
    TrendingUp,
    AlertTriangle,
    Info,
    Settings
} from 'lucide-react';

interface Rule
{
    id: string;
    name: string;
    description: string;
    enabled: boolean;
    threshold?: number;
    icon: React.ReactNode;
    category: 'protection' | 'optimization' | 'timing';
}

interface AutomatedRulesProps
{
    onRuleChange?: (ruleId: string, enabled: boolean, threshold?: number) => void;
}

const AutomatedRules: React.FC<AutomatedRulesProps> = ({ onRuleChange }) =>
{
    const [rules, setRules] = useState<Rule[]>([
        {
            id: 'min-margin',
            name: 'Minimum Margin Protection',
            description: 'Maintain minimum gross margin threshold',
            enabled: true,
            threshold: 5,
            icon: <Shield className="h-5 w-5" />,
            category: 'protection'
        },
        {
            id: 'competitor-match',
            name: 'Competitor Matching',
            description: 'Automatically match competitor prices within range',
            enabled: true,
            threshold: 2,
            icon: <TrendingUp className="h-5 w-5" />,
            category: 'optimization'
        },
        {
            id: 'peak-pricing',
            name: 'Peak Hour Pricing',
            description: 'Adjust prices during high-demand periods',
            enabled: false,
            threshold: 10,
            icon: <Clock className="h-5 w-5" />,
            category: 'timing'
        },
        {
            id: 'smart-optimization',
            name: 'Smart Price Optimization',
            description: 'AI-driven price adjustments based on market conditions',
            enabled: true,
            icon: <Zap className="h-5 w-5" />,
            category: 'optimization'
        }
    ]);

    const [showAlert, setShowAlert] = useState(false);
    const [expandedRule, setExpandedRule] = useState<string | null>(null);

    const handleRuleToggle = (ruleId: string, enabled: boolean) =>
    {
        setRules(prevRules =>
            prevRules.map(rule =>
                rule.id === ruleId ? { ...rule, enabled } : rule
            )
        );

        const rule = rules.find(r => r.id === ruleId);
        if (rule)
        {
            onRuleChange?.(ruleId, enabled, rule.threshold);
        }

        if (ruleId === 'min-margin' && !enabled)
        {
            setShowAlert(true);
        }
    };

    const handleThresholdChange = (ruleId: string, threshold: number) =>
    {
        setRules(prevRules =>
            prevRules.map(rule =>
                rule.id === ruleId ? { ...rule, threshold } : rule
            )
        );

        const rule = rules.find(r => r.id === ruleId);
        if (rule)
        {
            onRuleChange?.(ruleId, rule.enabled, threshold);
        }
    };

    const activeRulesCount = rules.filter(rule => rule.enabled).length;

    const getRuleCategoryColor = (category: Rule['category'], enabled: boolean) =>
    {
        if (!enabled) return 'bg-gray-50';
        switch (category)
        {
            case 'protection':
                return 'bg-blue-50';
            case 'optimization':
                return 'bg-green-50';
            case 'timing':
                return 'bg-purple-50';
            default:
                return 'bg-gray-50';
        }
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <CardTitle className="flex items-center space-x-2">
                            <Settings className="h-5 w-5" />
                            <span>Automated Rules</span>
                        </CardTitle>
                        <p className="text-sm text-gray-500">
                            Configure automatic price adjustments
                        </p>
                    </div>
                    <Badge
                        variant="outline"
                        className={`${activeRulesCount > 0 ? 'bg-green-50 text-green-700' : 'bg-gray-50'
                            }`}
                    >
                        {activeRulesCount} Active Rules
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {showAlert && (
                    <Alert variant="destructive" className="animate-in slide-in-from-top">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                            Disabling minimum margin protection may lead to reduced profitability.
                        </AlertDescription>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowAlert(false)}
                            className="ml-auto"
                        >
                            Dismiss
                        </Button>
                    </Alert>
                )}

                <div className="space-y-4">
                    {rules.map((rule) => (
                        <div
                            key={rule.id}
                            className={`p-4 rounded-lg transition-all ${getRuleCategoryColor(rule.category, rule.enabled)
                                }`}
                        >
                            <div className="flex items-start justify-between">
                                <div
                                    className="flex items-start space-x-3 cursor-pointer"
                                    onClick={() => setExpandedRule(
                                        expandedRule === rule.id ? null : rule.id
                                    )}
                                >
                                    <div className={`
                    p-2 rounded-full transition-colors
                    ${rule.enabled
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'bg-gray-200 text-gray-600'
                                        }
                  `}>
                                        {rule.icon}
                                    </div>
                                    <div className="space-y-1">
                                        <div className="font-medium">{rule.name}</div>
                                        <p className="text-sm text-gray-500">{rule.description}</p>
                                        {rule.threshold && (
                                            <p className="text-sm font-medium">
                                                Current threshold: {rule.threshold}%
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <Switch
                                    checked={rule.enabled}
                                    onCheckedChange={(checked) => handleRuleToggle(rule.id, checked)}
                                />
                            </div>

                            {expandedRule === rule.id && rule.threshold !== undefined && (
                                <div className="mt-4 pt-4 border-t">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">
                                                Adjustment Threshold
                                            </label>
                                            <div className="flex items-center space-x-4">
                                                <Slider
                                                    value={[rule.threshold]}
                                                    onValueChange={(value) =>
                                                        handleThresholdChange(rule.id, value[0])
                                                    }
                                                    max={20}
                                                    min={0}
                                                    step={0.5}
                                                    className="flex-1"
                                                />
                                                <span className="text-sm font-medium w-12">
                                                    {rule.threshold}%
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                                            <Info className="h-4 w-4" />
                                            <span>
                                                Adjust the threshold to fine-tune the rule's sensitivity
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default AutomatedRules;