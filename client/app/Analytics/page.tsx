import AnalyticsDashboard from '@/components/Dashboard_extra/AnalyticsDashboard'
import { DashboardProvider } from '@/components/Dashboard_extra/DashboardProvider'
import React from 'react'

type Props = {}

const page = (props: Props) =>
{
    return (
        <DashboardProvider>
            <AnalyticsDashboard />
        </DashboardProvider>
    )
}

export default page