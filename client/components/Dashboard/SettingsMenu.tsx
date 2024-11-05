"use client"

import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Settings,
  Bell,
  HelpCircle,
  Mail,
  Smartphone,
  Globe,
  Shield,
  ChevronRight,
  AlertTriangle,
  Save
} from 'lucide-react';

interface SettingsMenuProps {
  onSettingsChange?: (setting: string, value: any) => void;
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({ onSettingsChange }) => {
  const [settings, setSettings] = useState({
    minGrossMargin: 5,
    maxPriceChange: 10,
    updateFrequency: '15min',
    notifications: {
      competitorPrices: true,
      inventory: true,
      margins: true,
      email: true,
      push: true,
    },
    currency: 'EUR',
    timezone: 'Europe/Paris',
  });

  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value,
    }));
    setUnsavedChanges(true);
    onSettingsChange?.(key, value);
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value,
      },
    }));
    setUnsavedChanges(true);
    onSettingsChange?.(`notifications.${key}`, value);
  };

  const handleSaveSettings = () => {
    // In a real application, you would typically make an API call here
    setUnsavedChanges(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </CardTitle>
            <p className="text-sm text-gray-500">
              Configure system preferences and notifications
            </p>
          </div>
          {unsavedChanges && (
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
              Unsaved Changes
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Minimum Gross Margin (%)</label>
            <div className="flex items-center space-x-4">
              <Slider
                value={[settings.minGrossMargin]}
                onValueChange={(value) => handleSettingChange('minGrossMargin', value[0])}
                max={15}
                min={0}
                step={0.5}
                className="flex-1"
              />
              <span className="text-sm font-medium w-12">
                {settings.minGrossMargin}%
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Maximum Price Change (%)</label>
            <div className="flex items-center space-x-4">
              <Slider
                value={[settings.maxPriceChange]}
                onValueChange={(value) => handleSettingChange('maxPriceChange', value[0])}
                max={20}
                min={1}
                step={0.5}
                className="flex-1"
              />
              <span className="text-sm font-medium w-12">
                {settings.maxPriceChange}%
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Price Update Frequency</label>
            <Select
              value={settings.updateFrequency}
              onValueChange={(value) => handleSettingChange('updateFrequency', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5min">Every 5 minutes</SelectItem>
                <SelectItem value="15min">Every 15 minutes</SelectItem>
                <SelectItem value="30min">Every 30 minutes</SelectItem>
                <SelectItem value="1hour">Every hour</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Currency</label>
            <Select
              value={settings.currency}
              onValueChange={(value) => handleSettingChange('currency', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EUR">Euro (€)</SelectItem>
                <SelectItem value="USD">US Dollar ($)</SelectItem>
                <SelectItem value="GBP">British Pound (£)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-sm font-medium mb-4">Notification Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Competitor Price Alerts</span>
                </div>
                <Switch
                  checked={settings.notifications.competitorPrices}
                  onCheckedChange={(checked) => 
                    handleNotificationChange('competitorPrices', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Inventory Alerts</span>
                </div>
                <Switch
                  checked={settings.notifications.inventory}
                  onCheckedChange={(checked) => 
                    handleNotificationChange('inventory', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <HelpCircle className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Margin Alerts</span>
                </div>
                <Switch
                  checked={settings.notifications.margins}
                  onCheckedChange={(checked) => 
                    handleNotificationChange('margins', checked)
                  }
                />
              </div>

              <div className="border-t pt-4">
                <h4 className="text-sm font-medium mb-4">Notification Channels</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Email Notifications</span>
                    </div>
                    <Switch
                      checked={settings.notifications.email}
                      onCheckedChange={(checked) => 
                        handleNotificationChange('email', checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Smartphone className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Push Notifications</span>
                    </div>
                    <Switch
                      checked={settings.notifications.push}
                      onCheckedChange={(checked) => 
                        handleNotificationChange('push', checked)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-sm font-medium mb-4">Regional Settings</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Timezone</label>
                <Select
                  value={settings.timezone}
                  onValueChange={(value) => handleSettingChange('timezone', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Europe/London">London (GMT)</SelectItem>
                    <SelectItem value="Europe/Paris">Paris (CET)</SelectItem>
                    <SelectItem value="America/New_York">New York (EST)</SelectItem>
                    <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {unsavedChanges && (
          <Alert className="mt-4">
            <AlertDescription className="text-sm">
              You have unsaved changes. Please save your settings before leaving this page.
            </AlertDescription>
          </Alert>
        )}

        <div className="flex justify-end space-x-4">
          <Button
            variant="outline"
            onClick={() => setUnsavedChanges(false)}
            disabled={!unsavedChanges}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveSettings}
            disabled={!unsavedChanges}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingsMenu;