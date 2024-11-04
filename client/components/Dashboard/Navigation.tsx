import React from 'react'
import { Button } from '../ui/button'
import { Bell, Settings } from 'lucide-react'

type Props = {}

function Navigation({}: Props) {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b z-50">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        <div className="flex items-center space-x-8">
          <h1 className="text-xl font-bold">Fuel Price Optimizer</h1>
          <div className="hidden md:flex space-x-6">
            <Button variant="ghost">Dashboard</Button>
            <Button variant="ghost">Pricing Console</Button>
            <Button variant="ghost">Competition</Button>
            <Button variant="ghost">Analytics</Button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Bell className="h-5 w-5 text-gray-500" />
          <Settings className="h-5 w-5 text-gray-500" />
        </div>
      </div>
    </nav>
  )
}

export default Navigation