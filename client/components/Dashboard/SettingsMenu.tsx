import { HelpCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Slider } from "../ui/slider";
import { Switch } from "../ui/switch";


const SettingsMenu = () =>
{
    return (
        <Card>
            <CardHeader>
                <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Minimum Gross Margin</label>
                        <Slider
                            value={[5]}
                            max={15}
                            min={0}
                            step={0.5}
                            className="w-full"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Notification Preferences</label>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Competitor Price Alerts</span>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Inventory Alerts</span>
                                <Switch defaultChecked />
                            </div>
                        </div>
                    </div>

                    <Button className="w-full">
                        Contact Support
                        <HelpCircle className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default SettingsMenu;