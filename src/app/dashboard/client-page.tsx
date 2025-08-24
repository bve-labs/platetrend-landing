'use client'

import React from 'react'

// This file contains the dashboard specification as a TypeScript object
// The actual client dashboard is at /dashboard/client/page.tsx

export const dashboardSpec = {
  schema_version: "platetrend_dashboard_spec_v1b",
  meta: {
    title: "PlateTrend Operator Dashboard",
    version: "1.0.1",
    owner: "BVE Labs",
    created: "2025-08-24T02:52:22Z",
    description: "Operational dashboard spec with QVI-centric UX, financial burndown, and pilot controls.",
    updated: "2025-08-24T03:16:52Z"
  }
}

export default function DashboardSpec() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard Specification</h1>
      <p className="text-gray-600 mb-4">
        This file contains the dashboard specification. The actual client dashboard is available at:
      </p>
      <a 
        href="/dashboard/client" 
        className="text-blue-600 hover:text-blue-800 underline"
      >
        /dashboard/client
      </a>
      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h2 className="text-lg font-semibold mb-2">Specification Details:</h2>
        <pre className="text-sm overflow-auto">
          {JSON.stringify(dashboardSpec, null, 2)}
        </pre>
      </div>
    </div>
  )
}
