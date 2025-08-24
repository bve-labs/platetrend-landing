'use client'

import React, { useState, useEffect } from 'react'
import { BarChart3, DollarSign, TrendingUp, Target, FileText, Settings } from 'lucide-react'

// Mock data structure matching API response format
const mockDashboardData = {
  analytics: {
    qvi: {
      current: 58.7,
      delta_7d: 1.6,
      rank_local: 3,
      scale: { min: 0, max: 100, baseline: 50 },
      confidence: { method: "bootstrap_ci", level: 0.95, min_sample: 100 }
    },
    sentiment_topics: [
      { topic: "Food Quality", positive: 78, negative: 22 },
      { topic: "Service", positive: 65, negative: 35 },
      { topic: "Atmosphere", positive: 82, negative: 18 },
      { topic: "Value", positive: 58, negative: 42 },
      { topic: "Speed", positive: 71, negative: 29 }
    ],
    price_histogram: {
      bins: ["$8-12", "$12-16", "$16-20", "$20-24", "$24+"],
      your_restaurant: [5, 12, 8, 3, 2],
      competitors: [8, 15, 12, 6, 4]
    }
  },
  competitors: [
    { name: "Pasta House", price_index: 0.92, quality_index: 1.05, review_volume: 580, segment: "Italian" },
    { name: "Burger Barn", price_index: 0.88, quality_index: 0.98, review_volume: 420, segment: "Burgers" },
    { name: "Sushi Go", price_index: 1.15, quality_index: 1.12, review_volume: 640, segment: "Sushi" },
    { name: "Your Venue", price_index: 1, quality_index: 1.08, review_volume: 500, segment: "Self", self: true }
  ],
  competitors_sorted_by_qvi: [
    { rank: 1, name: "Sushi Go", qvi: 64.1, delta_7d: 2.3, price_index: 1.15, opp: "Lower lunch combos" },
    { rank: 2, name: "Pasta House", qvi: 61.9, delta_7d: 1.1, price_index: 0.92, opp: "Raise pasta mains +$1" },
    { rank: 3, name: "Your Venue", qvi: 58.7, delta_7d: 1.6, price_index: 1, opp: "Bundle sides Tue-Thu" },
    { rank: 4, name: "Burger Barn", qvi: 52.3, delta_7d: -0.4, price_index: 0.88, opp: "Upsell shakes" }
  ],
  billing: {
    credits: {
      available: 3,
      rollover_max: 4,
      earned_this_month: 1,
      expires_next: "2025-11-01"
    }
  },
  alerts: {
    latest: [
      { ts: "2025-08-22T06:05:00Z", msg: "Price increase detected at Sushi Go (+4 items)" },
      { ts: "2025-08-21T19:40:00Z", msg: "Negative review spike for Burger Barn (3σ)" }
    ]
  },
  recommendations: {
    menu_top3: [
      "Raise flagship burger +$1 (elasticity low, QVI gain +1.2)",
      "Add seasonal pasta using local supplier deal (COGS -9%)",
      "Promote weekday bundle (app + drink) to lift lunch traffic"
    ]
  }
}

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState('Home')
  const [dashboardData, setDashboardData] = useState(mockDashboardData)

  // Fetch data from API endpoint
  useEffect(() => {
    const fetchDashboardConfig = async () => {
      try {
        const response = await fetch('/api/dashboard-config')
        const result = await response.json()
        if (result.success) {
          setDashboardData(result.data)
        }
      } catch (error) {
        console.error('Failed to fetch dashboard config:', error)
      }
    }
    fetchDashboardConfig()
  }, [])

  const formatNumber = (value: number | undefined, decimals: number = 2) => {
    return value?.toFixed(decimals) || '0.00'
  }

  const getQVIColor = (value: number) => {
    if (value >= 1.2) return 'text-green-600'
    if (value >= 1.0) return 'text-amber-600'
    return 'text-red-600'
  }

  const getDeltaColor = (delta: number) => {
    return delta >= 0 ? 'text-green-600' : 'text-red-600'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-stone-900">PlateTrend Operator Dashboard</h1>
              <p className="text-stone-600 mt-2">Quality Value Index & Competitive Intelligence</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-stone-500">QVI Score</div>
                <div className={`text-2xl font-bold ${getQVIColor(dashboardData.analytics.qvi.current)}`}>
                  {formatNumber(dashboardData.analytics.qvi.current)}
                </div>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex space-x-8">
            {[
              { id: 'Home', name: 'Home', icon: BarChart3 },
              { id: 'Competitors', name: 'Competitors', icon: Target },
              { id: 'Reports', name: 'Reports', icon: FileText },
              { id: 'Financials', name: 'Financials', icon: DollarSign },
              { id: 'Admin', name: 'Admin', icon: Settings }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Home Tab */}
        {activeTab === 'Home' && (
          <div className="space-y-8">
            {/* QVI Hero Section */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-lg border border-stone-200">
                <h3 className="text-2xl font-bold text-stone-900 mb-6">QVI — Are we winning?</h3>
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-sm text-stone-500 mb-2">Current QVI</div>
                    <div className={`text-4xl font-bold ${getQVIColor(dashboardData.analytics.qvi.current)}`}>
                      {formatNumber(dashboardData.analytics.qvi.current)}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-stone-500 mb-2">7d Change</div>
                    <div className={`text-4xl font-bold ${getDeltaColor(dashboardData.analytics.qvi.delta_7d)}`}>
                      {dashboardData.analytics.qvi.delta_7d >= 0 ? '+' : ''}{formatNumber(dashboardData.analytics.qvi.delta_7d)}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-stone-500 mb-2">Local Rank</div>
                    <div className="text-4xl font-bold text-blue-600">
                      #{dashboardData.analytics.qvi.rank_local}
                    </div>
                  </div>
                </div>
              </div>

              {/* Price vs Quality Matrix */}
              <div className="bg-white rounded-xl p-8 shadow-lg border border-stone-200">
                <h3 className="text-xl font-bold text-stone-900 mb-6">Price vs Quality — You vs Competitors</h3>
                <div className="relative h-64 bg-gray-50 rounded-lg p-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-gray-500 text-sm">
                      Interactive scatter plot would go here
                      <br />
                      (Price Index vs Quality Index)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Local Leaderboard & Credits/Alerts */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-lg border border-stone-200">
                <h3 className="text-xl font-bold text-stone-900 mb-6">Local Leaderboard (QVI)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-stone-200">
                        <th className="text-left py-2">#</th>
                        <th className="text-left py-2">Restaurant</th>
                        <th className="text-right py-2">QVI</th>
                        <th className="text-right py-2">Δ7d</th>
                        <th className="text-left py-2">Top Opportunity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.competitors.map((comp, index) => (
                        <tr key={index} className={`border-b border-stone-100 ${comp.segment === 'self' ? 'bg-blue-50' : ''}`}>
                          <td className="py-2 font-medium">{index + 1}</td>
                          <td className="py-2">{comp.name}</td>
                          <td className={`py-2 text-right font-medium ${getQVIColor(comp.qvi)}`}>
                            {formatNumber(comp.qvi)}
                          </td>
                          <td className={`py-2 text-right ${getDeltaColor(comp.delta_7d)}`}>
                            {comp.delta_7d >= 0 ? '+' : ''}{formatNumber(comp.delta_7d)}
                          </td>
                          <td className="py-2 text-stone-600">{comp.opp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-6">
                {/* Report Credits */}
                <div className="bg-white rounded-xl p-6 shadow-lg border border-stone-200">
                  <h4 className="text-lg font-semibold text-stone-800 mb-4">Report Credits (Starter)</h4>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <div className="bg-gray-200 rounded-full h-4">
                        <div 
                          className="bg-blue-500 h-4 rounded-full" 
                          style={{ width: `${(dashboardData.billing.credits.available / dashboardData.billing.credits.rollover_max) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-stone-900">
                      {dashboardData.billing.credits.available}/{dashboardData.billing.credits.rollover_max}
                    </div>
                  </div>
                </div>

                {/* Trend Alerts */}
                <div className="bg-white rounded-xl p-6 shadow-lg border border-stone-200">
                  <h4 className="text-lg font-semibold text-stone-800 mb-4">Trend & Risk Alerts</h4>
                  <div className="space-y-3">
                    {dashboardData.alerts.latest.map((alert: {msg: string, ts: string}, index: number) => (
                      <div key={index} className="p-3 rounded-lg border-l-4 bg-amber-50 border-amber-400">
                        <div className="text-sm text-stone-700">{alert.msg}</div>
                        <div className="text-xs text-stone-500 mt-1">{new Date(alert.ts).toLocaleDateString()}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Menu Actions */}
                <div className="bg-white rounded-xl p-6 shadow-lg border border-stone-200">
                  <h4 className="text-lg font-semibold text-stone-800 mb-4">Top Menu Actions</h4>
                  <div className="space-y-2">
                    {dashboardData.recommendations.menu_top3.map((rec: {action: string, impact: string}, index: number) => (
                      <div key={index} className="p-2 bg-gray-50 rounded text-sm text-stone-700">
                        {rec.action} ({rec.impact})
                      </div>
                    ))}
                  </div>
                  <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                    Run Menu Deep-Dive
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Competitors Tab */}
        {activeTab === 'Competitors' && (
          <div className="space-y-8">
            {/* Competitor Leaderboard */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-stone-200">
              <h3 className="text-2xl font-bold text-stone-900 mb-6">QVI Leaderboard</h3>
              <div className="space-y-4">
                {dashboardData.competitors_sorted_by_qvi?.map((competitor: any) => (
                  <div key={competitor.rank} className={`p-4 rounded-lg border-2 ${
                    competitor.name === 'Your Venue' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                          competitor.rank === 1 ? 'bg-yellow-500' : 
                          competitor.rank === 2 ? 'bg-gray-400' : 
                          competitor.rank === 3 ? 'bg-amber-600' : 'bg-gray-300'
                        }`}>
                          {competitor.rank}
                        </div>
                        <div>
                          <h4 className="font-semibold text-stone-900">{competitor.name}</h4>
                          <p className="text-sm text-stone-600">Price Index: {competitor.price_index}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-stone-900">{competitor.qvi}</div>
                        <div className={`text-sm ${competitor.delta_7d >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {competitor.delta_7d >= 0 ? '+' : ''}{competitor.delta_7d} (7d)
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-stone-700 bg-amber-50 p-2 rounded">
                      💡 <strong>Opportunity:</strong> {competitor.opp}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price-Quality Matrix */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-stone-200">
              <h3 className="text-2xl font-bold text-stone-900 mb-6">Price-Quality Matrix</h3>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-stone-800 mb-4">Your Position</h4>
                  <div className="space-y-2">
                    {dashboardData.competitors.map((comp) => (
                      <div key={comp.name} className={`flex justify-between p-2 rounded ${
                        comp.self ? 'bg-blue-100 font-semibold' : 'bg-gray-50'
                      }`}>
                        <span>{comp.name}</span>
                        <span>Q:{comp.quality_index} P:{comp.price_index}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-stone-800 mb-4">Sentiment by Topic</h4>
                  <div className="space-y-3">
                    {dashboardData.analytics.sentiment_topics.map((topic) => (
                      <div key={topic.topic}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{topic.topic}</span>
                          <span>{topic.positive}% positive</span>
                        </div>
                        <div className="bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${topic.positive}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Price Distribution */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-stone-200">
              <h3 className="text-2xl font-bold text-stone-900 mb-6">Menu Price Distribution</h3>
              <div className="space-y-4">
                {dashboardData.analytics.price_histogram.bins.map((bin, index) => (
                  <div key={bin} className="flex items-center space-x-4">
                    <div className="w-16 text-sm font-medium">{bin}</div>
                    <div className="flex-1 flex space-x-2">
                      <div className="flex-1">
                        <div className="text-xs text-blue-600 mb-1">You</div>
                        <div className="bg-gray-200 rounded h-6 relative">
                          <div 
                            className="bg-blue-500 h-6 rounded" 
                            style={{ width: `${(dashboardData.analytics.price_histogram.your_restaurant[index] / Math.max(...dashboardData.analytics.price_histogram.your_restaurant)) * 100}%` }}
                          ></div>
                          <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                            {dashboardData.analytics.price_histogram.your_restaurant[index]}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-gray-600 mb-1">Competitors</div>
                        <div className="bg-gray-200 rounded h-6 relative">
                          <div 
                            className="bg-gray-500 h-6 rounded" 
                            style={{ width: `${(dashboardData.analytics.price_histogram.competitors[index] / Math.max(...dashboardData.analytics.price_histogram.competitors)) * 100}%` }}
                          ></div>
                          <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                            {dashboardData.analytics.price_histogram.competitors[index]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'Reports' && (
          <div className="space-y-8">
            {/* Report Credits & Billing */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-stone-200">
              <h3 className="text-2xl font-bold text-stone-900 mb-6">Report Credits & Usage</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{dashboardData.billing.credits.available}</div>
                  <div className="text-sm text-stone-600">Available Credits</div>
                  <div className="text-xs text-stone-500 mt-1">Max rollover: {dashboardData.billing.credits.rollover_max}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{dashboardData.billing.credits.earned_this_month}</div>
                  <div className="text-sm text-stone-600">Earned This Month</div>
                  <div className="text-xs text-stone-500 mt-1">Next expire: {new Date(dashboardData.billing.credits.expires_next).toLocaleDateString()}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600">Starter</div>
                  <div className="text-sm text-stone-600">Current Plan</div>
                  <button className="text-xs text-blue-600 hover:text-blue-800 mt-1">Upgrade Plan</button>
                </div>
              </div>
            </div>

            {/* Report Queue */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-stone-200">
              <h3 className="text-2xl font-bold text-stone-900 mb-6">Report Queue</h3>
              <div className="space-y-4">
                {(dashboardData as any).jobs?.reports?.map((job: {id: string, type: string, status: string, tier: string, eta: string, cost_est: string}, index: number) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${
                        job.status === 'running' ? 'bg-blue-500 animate-pulse' : 
                        job.status === 'queued' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></div>
                      <div>
                        <div className="font-semibold">{job.type}</div>
                        <div className="text-sm text-stone-600">ID: {job.id} • {job.tier} tier</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{job.status}</div>
                      <div className="text-sm text-stone-600">ETA: {job.eta} • ${job.cost_est}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-6 w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                Request New Report
              </button>
            </div>

            {/* Cost Metrics */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-stone-200">
              <h3 className="text-2xl font-bold text-stone-900 mb-6">Cost Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">${dashboardData.cost?.llm_per_report?.toFixed(2)}</div>
                  <div className="text-sm text-stone-600">LLM Cost/Report</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">${dashboardData.cost?.proxy_gb_per_report?.toFixed(2)}</div>
                  <div className="text-sm text-stone-600">Proxy GB/Report</div>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-lg">
                  <div className="text-2xl font-bold text-amber-600">{(dashboardData.cost?.cache_hit_rate * 100)?.toFixed(0)}%</div>
                  <div className="text-sm text-stone-600">Cache Hit Rate</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Financials Tab */}
        {activeTab === 'Financials' && (
          <div className="space-y-8">
            {/* Marketing/Support Toggles */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-stone-200">
              <h3 className="text-2xl font-bold text-stone-900 mb-6">Scenario Planning</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-stone-800">Marketing Scenarios</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span>Aggressive Growth</span>
                      <div className={`w-12 h-6 rounded-full p-1 ${dashboardData.financials?.marketing?.aggressive ? 'bg-blue-500' : 'bg-gray-300'}`}>
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${dashboardData.financials?.marketing?.aggressive ? 'translate-x-6' : 'translate-x-0'}`}></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span>Conservative</span>
                      <div className={`w-12 h-6 rounded-full p-1 ${dashboardData.financials?.marketing?.conservative ? 'bg-blue-500' : 'bg-gray-300'}`}>
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${dashboardData.financials?.marketing?.conservative ? 'translate-x-6' : 'translate-x-0'}`}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-stone-800">Support Scenarios</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span>24/7 Premium</span>
                      <div className={`w-12 h-6 rounded-full p-1 ${dashboardData.financials?.support?.premium ? 'bg-green-500' : 'bg-gray-300'}`}>
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${dashboardData.financials?.support?.premium ? 'translate-x-6' : 'translate-x-0'}`}></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span>Standard Hours</span>
                      <div className={`w-12 h-6 rounded-full p-1 ${dashboardData.financials?.support?.standard ? 'bg-green-500' : 'bg-gray-300'}`}>
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${dashboardData.financials?.support?.standard ? 'translate-x-6' : 'translate-x-0'}`}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cash Burndown */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-stone-200">
              <h3 className="text-2xl font-bold text-stone-900 mb-6">Cash Runway</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">${dashboardData.financials?.cash_runway?.current_balance?.toLocaleString()}</div>
                  <div className="text-sm text-stone-600">Current Balance</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">${dashboardData.financials?.cash_runway?.monthly_burn?.toLocaleString()}</div>
                  <div className="text-sm text-stone-600">Monthly Burn</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600">{dashboardData.financials?.cash_runway?.months_remaining}</div>
                  <div className="text-sm text-stone-600">Months Remaining</div>
                </div>
              </div>
              <div className="mt-6">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-red-500 h-4 rounded-full" 
                    style={{width: `${Math.max(10, Math.min(100, (dashboardData.financials?.cash_runway?.months_remaining || 0) * 8.33))}%`}}
                  ></div>
                </div>
                <div className="text-xs text-stone-500 mt-2">Runway visualization (12+ months = healthy)</div>
              </div>
            </div>

            {/* ROI Metrics */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-stone-200">
              <h3 className="text-2xl font-bold text-stone-900 mb-6">Pilot Program ROI</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{dashboardData.financials?.pilot_roi?.customer_acquisition_cost}</div>
                  <div className="text-sm text-stone-600">CAC</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{dashboardData.financials?.pilot_roi?.lifetime_value}</div>
                  <div className="text-sm text-stone-600">LTV</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{dashboardData.financials?.pilot_roi?.ltv_cac_ratio}x</div>
                  <div className="text-sm text-stone-600">LTV:CAC Ratio</div>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-lg">
                  <div className="text-2xl font-bold text-amber-600">{dashboardData.financials?.pilot_roi?.payback_months}mo</div>
                  <div className="text-sm text-stone-600">Payback Period</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Admin Tab */}
        {activeTab === 'Admin' && (
          <div className="space-y-8">
            {/* System Controls */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-stone-200">
              <h3 className="text-2xl font-bold text-stone-900 mb-6">System Controls</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-stone-800">Pricing Controls</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span>Founders Pricing</span>
                      <div className={`w-12 h-6 rounded-full p-1 ${dashboardData.slos?.founders_pricing_enabled ? 'bg-purple-500' : 'bg-gray-300'}`}>
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${dashboardData.slos?.founders_pricing_enabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span>Cost Optimizations</span>
                      <div className={`w-12 h-6 rounded-full p-1 ${dashboardData.slos?.cost_optimizations_enabled ? 'bg-green-500' : 'bg-gray-300'}`}>
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${dashboardData.slos?.cost_optimizations_enabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-stone-800">Performance Monitoring</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span>API Response Time</span>
                        <span className="font-semibold">{dashboardData.slos?.api_response_time_ms}ms</span>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span>System Uptime</span>
                        <span className="font-semibold">{dashboardData.slos?.uptime_percentage}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SLO Monitoring */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-stone-200">
              <h3 className="text-2xl font-bold text-stone-900 mb-6">Service Level Objectives</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{dashboardData.slos?.uptime_percentage}%</div>
                  <div className="text-sm text-stone-600">Uptime SLO</div>
                  <div className="text-xs text-stone-500 mt-1">Target: 99.9%</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{dashboardData.slos?.api_response_time_ms}ms</div>
                  <div className="text-sm text-stone-600">Response Time</div>
                  <div className="text-xs text-stone-500 mt-1">Target: &lt;200ms</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{dashboardData.slos?.error_rate_percentage}%</div>
                  <div className="text-sm text-stone-600">Error Rate</div>
                  <div className="text-xs text-stone-500 mt-1">Target: &lt;0.1%</div>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-lg">
                  <div className="text-2xl font-bold text-amber-600">{dashboardData.slos?.throughput_rps}</div>
                  <div className="text-sm text-stone-600">Throughput (RPS)</div>
                  <div className="text-xs text-stone-500 mt-1">Current load</div>
                </div>
              </div>
            </div>

            {/* System Health */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-stone-200">
              <h3 className="text-2xl font-bold text-stone-900 mb-6">System Health</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                  <div>
                    <div className="font-semibold text-green-800">All Systems Operational</div>
                    <div className="text-sm text-green-600">No incidents reported in the last 24 hours</div>
                  </div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-stone-900">Database</div>
                    <div className="text-sm text-green-600">Healthy</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-stone-900">Cache</div>
                    <div className="text-sm text-green-600">Healthy</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-stone-900">API Gateway</div>
                    <div className="text-sm text-green-600">Healthy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
