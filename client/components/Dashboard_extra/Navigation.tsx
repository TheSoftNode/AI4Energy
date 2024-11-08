// components/Navigation.tsx

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
        HelpCircle,
        Home,
        Activity,
        TrendingUp,
        BarChart2
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
import { useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useDashboard } from './DashboardProvider';
import { DashboardView } from './app-state';

interface NavigationProps
{
    currentView: DashboardView;
}

const Navigation: React.FC<NavigationProps> = ({ currentView }) =>
{
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { notifications, setView } = useDashboard();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const createQueryString = useCallback(
        (name: string, value: string) =>
        {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);
            return params.toString();
        },
        [searchParams]
    );

    const handleViewChange = (view: DashboardView): void =>
    {
        router.push(`${pathname}?${createQueryString('view', view)}`);
        setView(view);
        setIsMobileMenuOpen(false);
    };

    const toggleMobileMenu = () =>
    {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const navItems = [
        {
            title: 'Dashboard',
            icon: <Home className="h-4 w-4" />,
            view: 'overview' as const,
            badge: 'Live',
        },
        {
            title: 'Pricing Console',
            icon: <Activity className="h-4 w-4" />,
            view: 'pricing' as const,
        },
        // {
        //     title: 'Competition',
        //     icon: <TrendingUp className="h-4 w-4" />,
        //     view: 'competition' as const,
        // },
        {
            title: 'Analytics',
            icon: <BarChart2 className="h-4 w-4" />,
            view: 'analytics' as const,
            badge: 'New',
        },
    ];

    // Filter unread notifications
    const unreadNotifications = notifications.filter(n => !n.read);

    return (
        <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b z-50">
            <div className="container mx-auto h-full flex items-center justify-between px-4">
                <div className="flex items-center space-x-8">
                    <div className="flex items-center space-x-3">
                        <img src="/logos/logo_energy.png" alt="Logo" className="h-8 w-8" />
                        <h1 className="text-xl font-bold">AI4Energy</h1>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-1">
                        {navItems.map((item) => (
                            <Button
                                key={item.view}
                                variant={currentView === item.view ? 'default' : 'ghost'}
                                className="flex items-center space-x-2"
                                onClick={() => handleViewChange(item.view)}
                            >
                                {item.icon}
                                <span>{item.title}</span>
                                {item.badge && (
                                    <Badge variant="secondary" className="ml-2">
                                        {item.badge}
                                    </Badge>
                                )}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Right Side Menu Items */}
                <div className="flex items-center space-x-4">
                    {/* Notifications */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="relative">
                                <Bell className="h-5 w-5 text-gray-500" />
                                {unreadNotifications.length > 0 && (
                                    <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-80">
                            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {notifications.length > 0 ? (
                                notifications.map((notification) => (
                                    <DropdownMenuItem key={notification.id} className="flex items-center py-2">
                                        <div
                                            className={`w-2 h-2 rounded-full mr-2 ${notification.type === 'warning'
                                                    ? 'bg-yellow-400'
                                                    : notification.type === 'success'
                                                        ? 'bg-green-400'
                                                        : 'bg-blue-400'
                                                }`}
                                        />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">{notification.title}</p>
                                            <p className="text-xs text-gray-500">{notification.message}</p>
                                        </div>
                                    </DropdownMenuItem>
                                ))
                            ) : (
                                <div className="px-2 py-4 text-center text-sm text-gray-500">
                                    No new notifications
                                </div>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Settings */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Settings className="h-5 w-5 text-gray-500" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Settings</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleViewChange('settings')}>
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
                        onClick={toggleMobileMenu}
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
                        {navItems.map((item) => (
                            <Button
                                key={item.view}
                                variant={currentView === item.view ? 'default' : 'ghost'}
                                className="w-full justify-start"
                                onClick={() => handleViewChange(item.view)}
                            >
                                {item.icon}
                                <span className="ml-2">{item.title}</span>
                                {item.badge && (
                                    <Badge variant="secondary" className="ml-auto">
                                        {item.badge}
                                    </Badge>
                                )}
                            </Button>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navigation;