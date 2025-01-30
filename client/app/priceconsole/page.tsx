"use client"
import { DashboardProvider } from '@/components/Dashboard_extra/DashboardProvider'
import PricingConsole from '@/components/Dashboard_extra/PricingConsole'
import React from 'react'

type Props = {}

function page({}: Props) {
  return (
    <DashboardProvider>
        <PricingConsole
            currentPrice={1.859}
            minPrice={1.5}
            maxPrice={2.5}
            onPriceChange={(price) => console.log('Price changed:', price)}
            onPriceConfirm={(price) => console.log('Price confirmed:', price)}
        />
    </DashboardProvider>
  )
}

export default page