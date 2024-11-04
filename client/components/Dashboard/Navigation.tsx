"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import
{
  Bell,
  Settings,
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  HelpCircle
} from 'lucide-react';
import
{
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

const Navigation = () =>
{
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, message: "Competitor price change detected", type: "warning" },
    { id: 2, message: "Margin target achieved", type: "success" },
    { id: 3, message: "New pricing rule activated", type: "info" },
  ]);

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b z-50">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-3">
            <img
              src="/api/placeholder/32/32"
              alt="Logo"
              className="h-8 w-8"
            />
            <h1 className="text-xl font-bold">Fuel Price Optimizer</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            <Button variant="ghost" className="flex items-center space-x-1">
              <span>Dashboard</span>
              <Badge variant="secondary" className="ml-2">Live</Badge>
            </Button>
            <Button variant="ghost" className="flex items-center space-x-1">
              <span>Pricing Console</span>
            </Button>
            <Button variant="ghost" className="flex items-center space-x-1">
              <span>Competition</span>
            </Button>
            <Button variant="ghost" className="flex items-center space-x-1">
              <span>Analytics</span>
              <Badge variant="secondary" className="ml-2">New</Badge>
            </Button>
          </div>
        </div>

        {/* Right Side Menu Items */}
        <div className="flex items-center space-x-4">
          {/* Notifications Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-gray-500" />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="flex items-center py-2">
                  <div className={`w-2 h-2 rounded-full mr-2 ${notification.type === 'warning' ? 'bg-yellow-400' :
                    notification.type === 'success' ? 'bg-green-400' :
                      'bg-blue-400'
                    }`} />
                  <span>{notification.message}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help & Support</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b shadow-lg">
          <div className="container mx-auto py-4 px-4 space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              Dashboard
              <Badge variant="secondary" className="ml-2">Live</Badge>
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Pricing Console
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Competition
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Analytics
              <Badge variant="secondary" className="ml-2">New</Badge>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;