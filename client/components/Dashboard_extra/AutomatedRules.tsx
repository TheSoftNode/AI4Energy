// components/AutomatedRules.tsx

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
        Dialog,
        DialogContent,
        DialogDescription,
        DialogHeader,
        DialogTitle,
        DialogTrigger,
        DialogFooter,
    } from "@/components/ui/dialog";
import
    {
        Select,
        SelectContent,
        SelectItem,
        SelectTrigger,
        SelectValue,
    } from "@/components/ui/select";
import
    {
        Shield,
        Zap,
        Clock,
        TrendingUp,
        AlertTriangle,
        Info,
        Settings,
        Plus,
        Edit,
        Trash2,
        Activity,
        Save,
        RotateCcw
    } from 'lucide-react';
import
    {
        Tooltip,
        TooltipContent,
        TooltipProvider,
        TooltipTrigger,
    } from '@/components/ui/tooltip';
import { useDashboard } from './DashboardProvider';

interface Rule
{
    id: string;
    name: string;
    description: string;
    enabled: boolean;
    threshold?: number;
    icon: React.ReactNode;
    category: 'protection' | 'optimization' | 'timing';
    conditions: RuleCondition[];
    actions: RuleAction[];
    priority: number;
    lastTriggered?: Date;
    statistics: RuleStatistics;
}

interface RuleCondition
{
    type: 'price' | 'margin' | 'inventory' | 'time' | 'competitor';
    operator: 'greater' | 'less' | 'equal' | 'between';
    value: number | string;
    value2?: number | string; // For 'between' operator
}

interface RuleAction
{
    type: 'adjust_price' | 'notify' | 'lock_price';
    value: number | string;
    duration?: number; // For lock_price
}

interface RuleStatistics
{
    timesTriggered: number;
    lastSuccess: Date | null;
    averageImpact: number;
    failureRate: number;
}

interface AutomatedRulesProps
{
    onRuleChange?: (ruleId: string, enabled: boolean, threshold?: number) => void;
}

const AutomatedRules: React.FC<AutomatedRulesProps> = ({ onRuleChange }) =>
{
    const { marketData, metrics } = useDashboard();
    const [rules, setRules] = useState<Rule[]>([
        {
            id: 'min-margin',
            name: 'Minimum Margin Protection',
            description: 'Maintain minimum gross margin threshold',
            enabled: true,
            threshold: 5,
            icon: <Shield className="h-5 w-5" />,
            category: 'protection',
            conditions: [
                {
                    type: 'margin',
                    operator: 'less',
                    value: 5
                }
            ],
            actions: [
                {
                    type: 'adjust_price',
                    value: 0.05
                }
            ],
            priority: 1,
            statistics: {
                timesTriggered: 15,
                lastSuccess: new Date(),
                averageImpact: 2.3,
                failureRate: 0.1
            }
        },
        {
            id: 'competitor-match',
            name: 'Competitor Matching',
            description: 'Automatically match competitor prices within range',
            enabled: true,
            threshold: 2,
            icon: <TrendingUp className="h-5 w-5" />,
            category: 'optimization',
            conditions: [
                {
                    type: 'competitor',
                    operator: 'less',
                    value: -0.02
                }
            ],
            actions: [
                {
                    type: 'adjust_price',
                    value: 'match'
                }
            ],
            priority: 2,
            statistics: {
                timesTriggered: 28,
                lastSuccess: new Date(),
                averageImpact: 1.8,
                failureRate: 0.15
            }
        },
        // Add more predefined rules...
    ]);

    const [showAlert, setShowAlert] = useState(false);
    const [expandedRule, setExpandedRule] = useState<string | null>(null);
    const [editingRule, setEditingRule] = useState<Rule | null>(null);
    const [isNewRule, setIsNewRule] = useState(false);

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

    const handleDeleteRule = (ruleId: string) =>
    {
        setRules(prevRules => prevRules.filter(rule => rule.id !== ruleId));
    };

    const handleEditRule = (rule: Rule) =>
    {
        setEditingRule(rule);
        setIsNewRule(false);
    };

    const handleCreateRule = () =>
    {
        setEditingRule({
            id: '',
            name: '',
            description: '',
            enabled: true,
            icon: <Activity className="h-5 w-5" />,
            category: 'optimization',
            conditions: [],
            actions: [],
            priority: rules.length + 1,
            statistics: {
                timesTriggered: 0,
                lastSuccess: null,
                averageImpact: 0,
                failureRate: 0
            }
        });
        setIsNewRule(true);
    };

    const handleSaveRule = (rule: Rule) =>
    {
        if (isNewRule)
        {
            setRules(prevRules => [...prevRules, { ...rule, id: `rule-${Date.now()}` }]);
        } else
        {
            setRules(prevRules =>
                prevRules.map(r => (r.id === rule.id ? rule : r))
            );
        }
        setEditingRule(null);
    };

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
                    <div className="flex items-center space-x-2">
                        <Badge
                            variant="outline"
                            className={`${rules.filter(r => r.enabled).length > 0 ? 'bg-green-50 text-green-700' : 'bg-gray-50'}`}
                        >
                            {rules.filter(r => r.enabled).length} Active Rules
                        </Badge>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCreateRule}
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            New Rule
                        </Button>
                    </div>
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
                            className={`p-4 rounded-lg transition-all ${getRuleCategoryColor(rule.category, rule.enabled)}`}
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
                                        <div className="font-medium flex items-center space-x-2">
                                            <span>{rule.name}</span>
                                            <Badge variant="outline" className="text-xs">
                                                {rule.category}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-gray-500">{rule.description}</p>
                                        {rule.lastTriggered && (
                                            <p className="text-xs text-gray-500">
                                                Last triggered: {rule.lastTriggered.toLocaleString()}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleEditRule(rule)}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>Edit rule</TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    <Switch
                                        checked={rule.enabled}
                                        onCheckedChange={(checked) => handleRuleToggle(rule.id, checked)}
                                    />
                                </div>
                            </div>

                            {expandedRule === rule.id && (
                                <div className="mt-4 pt-4 border-t space-y-4">
                                    {rule.threshold !== undefined && (
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
                                    )}

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-3 bg-white rounded-lg border">
                                            <h4 className="text-sm font-medium mb-2">Statistics</h4>
                                            <div className="space-y-1 text-sm">
                                                <p>Times triggered: {rule.statistics.timesTriggered}</p>
                                                <p>Average impact: {rule.statistics.averageImpact}%</p>
                                                <p>Failure rate: {(rule.statistics.failureRate * 100).toFixed(1)}%</p>
                                            </div>
                                        </div>
                                        <div className="p-3 bg-white rounded-lg border">
                                            <h4 className="text-sm font-medium mb-2">Conditions</h4>
                                            <div className="space-y-1 text-sm">
                                                {rule.conditions.map((condition, index) => (
                                                    <p key={index}>
                                                        {condition.type} {condition.operator} {condition.value}
                                                        {condition.value2 ? ` - ${condition.value2}` : ''}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                                        <Info className="h-4 w-4" />
                                        <span>
                                            Priority level: {rule.priority} - Higher priority rules are evaluated first
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <Dialog open={editingRule !== null} onOpenChange={() => setEditingRule(null)}>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>
                                {isNewRule ? 'Create New Rule' : 'Edit Rule'}
                            </DialogTitle>
                            <DialogDescription>
                                Configure the automated pricing rule settings
                            </DialogDescription>
                        </DialogHeader>

                        {editingRule && (
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Rule Name</label>
                                    <Input
                                        value={editingRule.name}
                                        onChange={(e) => setEditingRule({
                                            ...editingRule,
                                            name: e.target.value
                                        })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Description</label>
                                    <Input
                                        value={editingRule.description}
                                        onChange={(e) => setEditingRule({
                                            ...editingRule,
                                            description: e.target.value
                                        })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Category</label>
                                    <Select
                                        value={editingRule.category}
                                        onValueChange={(value: Rule['category']) =>
                                            setEditingRule({
                                                ...editingRule,
                                                category: value
                                            })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="protection">Protection</SelectItem>
                                            <SelectItem value="optimization">Optimization</SelectItem>
                                            <SelectItem value="timing">Timing</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Conditions</label>
                                    {editingRule.conditions.map((condition, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <Select
                                                value={condition.type}
                                                onValueChange={(value) =>
                                                {
                                                    const newConditions = [...editingRule.conditions];
                                                    newConditions[index] = { ...condition, type: value as RuleCondition['type'] };
                                                    setEditingRule({
                                                        ...editingRule,
                                                        conditions: newConditions
                                                    });
                                                }}
                                            >
                                                <SelectTrigger className="w-[150px]">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="price">Price</SelectItem>
                                                    <SelectItem value="margin">Margin</SelectItem>
                                                    <SelectItem value="inventory">Inventory</SelectItem>
                                                    <SelectItem value="time">Time</SelectItem>
                                                    <SelectItem value="competitor">Competitor</SelectItem>
                                                </SelectContent>
                                            </Select>

                                            <Select
                                                value={condition.operator}
                                                onValueChange={(value) =>
                                                {
                                                    const newConditions = [...editingRule.conditions];
                                                    newConditions[index] = { ...condition, operator: value as RuleCondition['operator'] };
                                                    setEditingRule({
                                                        ...editingRule,
                                                        conditions: newConditions
                                                    });
                                                }}
                                            >
                                                <SelectTrigger className="w-[120px]">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="greater">Greater than</SelectItem>
                                                    <SelectItem value="less">Less than</SelectItem>
                                                    <SelectItem value="equal">Equal to</SelectItem>
                                                    <SelectItem value="between">Between</SelectItem>
                                                </SelectContent>
                                            </Select>

                                            <Input
                                                type="number"
                                                value={condition.value}
                                                onChange={(e) =>
                                                {
                                                    const newConditions = [...editingRule.conditions];
                                                    newConditions[index] = { ...condition, value: parseFloat(e.target.value) };
                                                    setEditingRule({
                                                        ...editingRule,
                                                        conditions: newConditions
                                                    });
                                                }}
                                                className="w-[100px]"
                                            />

                                            {condition.operator === 'between' && (
                                                <Input
                                                    type="number"
                                                    value={condition.value2 || ''}
                                                    onChange={(e) =>
                                                    {
                                                        const newConditions = [...editingRule.conditions];
                                                        newConditions[index] = { ...condition, value2: parseFloat(e.target.value) };
                                                        setEditingRule({
                                                            ...editingRule,
                                                            conditions: newConditions
                                                        });
                                                    }}
                                                    className="w-[100px]"
                                                />
                                            )}

                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                {
                                                    const newConditions = editingRule.conditions.filter((_, i) => i !== index);
                                                    setEditingRule({
                                                        ...editingRule,
                                                        conditions: newConditions
                                                    });
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                        {
                                            setEditingRule({
                                                ...editingRule,
                                                conditions: [
                                                    ...editingRule.conditions,
                                                    {
                                                        type: 'price',
                                                        operator: 'greater',
                                                        value: 0
                                                    }
                                                ]
                                            });
                                        }}
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Condition
                                    </Button>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Actions</label>
                                    {editingRule.actions.map((action, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <Select
                                                value={action.type}
                                                onValueChange={(value) =>
                                                {
                                                    const newActions = [...editingRule.actions];
                                                    newActions[index] = { ...action, type: value as RuleAction['type'] };
                                                    setEditingRule({
                                                        ...editingRule,
                                                        actions: newActions
                                                    });
                                                }}
                                            >
                                                <SelectTrigger className="w-[150px]">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="adjust_price">Adjust Price</SelectItem>
                                                    <SelectItem value="notify">Notify</SelectItem>
                                                    <SelectItem value="lock_price">Lock Price</SelectItem>
                                                </SelectContent>
                                            </Select>

                                            {action.type === 'adjust_price' && (
                                                <Input
                                                    type="number"
                                                    value={action.value}
                                                    onChange={(e) =>
                                                    {
                                                        const newActions = [...editingRule.actions];
                                                        newActions[index] = { ...action, value: parseFloat(e.target.value) };
                                                        setEditingRule({
                                                            ...editingRule,
                                                            actions: newActions
                                                        });
                                                    }}
                                                    className="w-[100px]"
                                                />
                                            )}

                                            {action.type === 'lock_price' && (
                                                <div className="flex items-center space-x-2">
                                                    <Input
                                                        type="number"
                                                        value={action.duration || ''}
                                                        onChange={(e) =>
                                                        {
                                                            const newActions = [...editingRule.actions];
                                                            newActions[index] = { ...action, duration: parseInt(e.target.value) };
                                                            setEditingRule({
                                                                ...editingRule,
                                                                actions: newActions
                                                            });
                                                        }}
                                                        className="w-[100px]"
                                                    />
                                                    <span className="text-sm">minutes</span>
                                                </div>
                                            )}

                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                {
                                                    const newActions = editingRule.actions.filter((_, i) => i !== index);
                                                    setEditingRule({
                                                        ...editingRule,
                                                        actions: newActions
                                                    });
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                        {
                                            setEditingRule({
                                                ...editingRule,
                                                actions: [
                                                    ...editingRule.actions,
                                                    {
                                                        type: 'adjust_price',
                                                        value: 0
                                                    }
                                                ]
                                            });
                                        }}
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Action
                                    </Button>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Priority</label>
                                    <Input
                                        type="number"
                                        value={editingRule.priority}
                                        onChange={(e) => setEditingRule({
                                            ...editingRule,
                                            priority: parseInt(e.target.value)
                                        })}
                                        min="1"
                                        max="100"
                                    />
                                    <p className="text-xs text-gray-500">
                                        Higher priority rules are evaluated first (1-100)
                                    </p>
                                </div>
                            </div>
                        )}

                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setEditingRule(null)}
                            >
                                <RotateCcw className="h-4 w-4 mr-2" />
                                Cancel
                            </Button>
                            <Button
                                onClick={() =>
                                {
                                    if (editingRule)
                                    {
                                        handleSaveRule(editingRule);
                                    }
                                }}
                            >
                                <Save className="h-4 w-4 mr-2" />
                                Save Rule
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
};

export default AutomatedRules;
