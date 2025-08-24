'use client'

import React, { useState } from 'react'
import { BarChart3, DollarSign, TrendingUp, Users, Target, AlertTriangle, CheckCircle, ExternalLink, Calendar, Building2, Zap, Star, Eye, Clock, FileText, Heart, Activity } from 'lucide-react'
import marketData from '../../../marketanalysis.json'

export default function MarketAnalysisDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  // Process the updated JSON data structure
  const meta = marketData.meta || {}
  const sections = marketData.sections || {}
  const facts = marketData.facts || []
  const pricing = marketData.pricing_unit_economics?.tiers || []
  const sources = marketData.sources || []
  const cba = marketData.cba || {}
  const confidence = marketData.confidence || {}
  const techPlan = marketData.tech_plan || {}
  const qaFlags = marketData.qa_flags || []
  const burndown = marketData.sections?.burndown || {}

  // Key metrics from facts - updated to match new structure
  const industrySize = facts.find(f => f.id === 'F001')?.value || 0
  const employment = facts.find(f => f.id === 'F002')?.value || 0
  const marketCagr = facts.find(f => f.id === 'F005')?.value || 0
  const yelpImpact = facts.find(f => f.id === 'F009')?.value || 0

  const formatCurrency = (value: number) => {
    if (value >= 1000000000000) return `$${(value / 1000000000000).toFixed(1)}T`
    if (value >= 1000000000) return `$${(value / 1000000000).toFixed(1)}B`
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
    return `$${value.toLocaleString()}`
  }

  const formatNumber = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`
    return value.toLocaleString()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-stone-900">{meta.title || 'PlateTrend Market Analysis Dashboard'}</h1>
              <p className="text-stone-600 mt-2">{meta.subtitle || 'Research-backed insights for restaurant intelligence platform'}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-stone-500">Confidence Score</div>
                <div className="text-2xl font-bold text-green-600">{confidence.label || Math.round((confidence.score || confidence.overall || 0) * 100) + '%'}</div>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-white" />
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
              { id: 'overview', name: 'Market Overview', icon: BarChart3 },
              { id: 'pricing', name: 'Pricing Strategy', icon: DollarSign },
              { id: 'economics', name: 'Unit Economics', icon: TrendingUp },
              { id: 'competitive', name: 'Competitive Landscape', icon: Target },
              { id: 'burndown', name: 'Cash Flow & Burndown', icon: Activity },
              { id: 'sources', name: 'Research Sources', icon: FileText }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-amber-500 text-amber-600'
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
        {/* Market Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Key Metrics Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-stone-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">2025 Forecast</span>
                </div>
                <div className="text-3xl font-bold text-stone-900 mb-2">{formatCurrency(industrySize)}</div>
                <div className="text-stone-600 text-sm">US Restaurant Industry Sales</div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-stone-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Employment</span>
                </div>
                <div className="text-3xl font-bold text-stone-900 mb-2">{formatNumber(employment)}</div>
                <div className="text-stone-600 text-sm">Restaurant Workers (2025)</div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-stone-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">CAGR</span>
                </div>
                <div className="text-3xl font-bold text-stone-900 mb-2">{marketCagr}%</div>
                <div className="text-stone-600 text-sm">Restaurant Management Software CAGR</div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-stone-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6 text-amber-600" />
                  </div>
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">Impact</span>
                </div>
                <div className="text-3xl font-bold text-stone-900 mb-2">{yelpImpact}-9%</div>
                <div className="text-stone-600 text-sm">Revenue Increase per Yelp Star</div>
              </div>
            </div>

            {/* Market Opportunity */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-stone-200">
              <h3 className="text-2xl font-bold text-stone-900 mb-6">Market Opportunity Analysis</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-stone-800 mb-4">Market Size & Growth</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                      <span className="font-medium text-stone-700">Restaurant Management Software (2024)</span>
                      <span className="font-bold text-blue-600">$5.79B</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                      <span className="font-medium text-stone-700">Projected CAGR (2024-2030)</span>
                      <span className="font-bold text-green-600">17.4%</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                      <span className="font-medium text-stone-700">2030 Market Size</span>
                      <span className="font-bold text-purple-600">$14.7B</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-stone-800 mb-4">Competitive Pricing Benchmarks</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                      <span className="font-medium text-stone-700">Toast POS (Starting)</span>
                      <span className="font-bold text-orange-600">$69/month</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                      <span className="font-medium text-stone-700">Square Plus Plan</span>
                      <span className="font-bold text-red-600">$69/month/location</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-amber-50 rounded-lg">
                      <span className="font-medium text-stone-700">PlateTrend Positioning</span>
                      <span className="font-bold text-amber-600">$149-$499/month</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pricing Strategy Tab */}
        {activeTab === 'pricing' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-stone-200">
              <h3 className="text-2xl font-bold text-stone-900 mb-6">Pricing Tier Strategy</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {pricing.map((tier, index) => (
                  <div key={index} className={`border-2 rounded-xl p-6 ${
                    tier.name === 'Growth' ? 'border-amber-300 bg-amber-50' : 'border-stone-200 bg-white'
                  }`}>
                    {tier.name === 'Growth' && (
                      <div className="text-center mb-4">
                        <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Most Popular
                        </span>
                      </div>
                    )}
                    <div className="text-center mb-6">
                      <h4 className="text-xl font-bold text-stone-900 mb-2">{tier.name}</h4>
                      <div className="text-4xl font-bold text-stone-900 mb-2">
                        {typeof tier.price_usd === 'string' ? tier.price_usd : `$${tier.price_usd}`}
                      </div>
                      <div className="text-stone-600 text-sm">per month</div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-stone-600">Est. COGS</span>
                        <span className="font-semibold">${tier.est_cogs_usd}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-stone-600">Gross Margin</span>
                        <span className="font-semibold text-green-600">{tier.gross_margin_pct?.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-stone-600">Payback Period</span>
                        <span className="font-semibold">{tier.payback_months} months</span>
                      </div>
                    </div>

                    {tier.limits && (
                      <div className="mt-6 pt-6 border-t border-stone-200">
                        <h5 className="font-semibold text-stone-800 mb-3">Features & Limits</h5>
                        <div className="space-y-2 text-sm">
                          {tier.limits.constraints?.loc && (
                            <div className="flex items-center">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                              <span>{tier.limits.constraints.loc} location{tier.limits.constraints.loc > 1 ? 's' : ''}</span>
                            </div>
                          )}
                          {tier.limits.constraints?.loc_max && (
                            <div className="flex items-center">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                              <span>Up to {tier.limits.constraints.loc_max} locations</span>
                            </div>
                          )}
                          {tier.limits.constraints?.scrape && (
                            <div className="flex items-center">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                              <span>{tier.limits.constraints.scrape === 'M' ? 'Monthly' : tier.limits.constraints.scrape === 'W' ? 'Weekly' : 'Daily'} updates</span>
                            </div>
                          )}
                          {tier.limits.constraints?.custom && (
                            <div className="flex items-center">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                              <span>Custom features</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Unit Economics Tab */}
        {activeTab === 'economics' && (
          <div className="space-y-8">
            {/* Cost Structure */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-stone-200">
              <h3 className="text-2xl font-bold text-stone-900 mb-6">Monthly Cost Structure</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-stone-800 mb-4">Fixed Monthly Costs</h4>
                  <div className="space-y-3">
                    {cba.monthly_costs?.map((cost, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                        <span className="font-medium text-stone-700">{cost.item}</span>
                        <span className="font-bold text-red-600">${cost.usd}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center p-3 bg-stone-100 rounded-lg border-t-2 border-stone-300">
                      <span className="font-bold text-stone-800">Total Fixed Costs</span>
                      <span className="font-bold text-stone-900">
                        ${cba.monthly_costs?.reduce((sum, cost) => sum + cost.usd, 0) || 0}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-stone-800 mb-4">Revenue Potential</h4>
                  <div className="space-y-3">
                    {cba.benefits?.map((benefit, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="font-medium text-stone-700">{benefit.driver}</span>
                        <span className="font-bold text-green-600">${benefit.monthly_usd}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Break-even Analysis */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-stone-200">
              <h3 className="text-2xl font-bold text-stone-900 mb-6">Break-even Analysis</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-blue-50 rounded-xl">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">{cba.metrics?.break_even_customers}</div>
                  <div className="text-stone-600">Break-even Customers</div>
                </div>
                
                <div className="text-center p-6 bg-green-50 rounded-xl">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-green-600 mb-2">{cba.metrics?.gross_margin_pct?.toFixed(1)}%</div>
                  <div className="text-stone-600">Blended Gross Margin</div>
                </div>
                
                <div className="text-center p-6 bg-amber-50 rounded-xl">
                  <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-amber-600 mb-2">$500</div>
                  <div className="text-stone-600">Est. Customer Acquisition Cost</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Competitive Landscape Tab */}
        {activeTab === 'competitive' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-stone-200">
              <h3 className="text-2xl font-bold text-stone-900 mb-6">Competitive Positioning</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-stone-800 mb-4">Direct Competitors</h4>
                  <div className="space-y-4">
                    <div className="p-4 border border-stone-200 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="font-semibold text-stone-800">Toast POS</h5>
                        <span className="text-orange-600 font-bold">$69/month</span>
                      </div>
                      <p className="text-stone-600 text-sm">Established POS with basic analytics</p>
                    </div>
                    <div className="p-4 border border-stone-200 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="font-semibold text-stone-800">Square for Restaurants</h5>
                        <span className="text-red-600 font-bold">$69/month/location</span>
                      </div>
                      <p className="text-stone-600 text-sm">Popular SMB solution with payment processing</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-stone-800 mb-4">PlateTrend Advantage</h4>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Zap className="w-5 h-5 text-green-600 mr-2" />
                        <h5 className="font-semibold text-green-800">AI-Powered Intelligence</h5>
                      </div>
                      <p className="text-green-700 text-sm">Automated competitor analysis and market insights</p>
                    </div>
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Eye className="w-5 h-5 text-blue-600 mr-2" />
                        <h5 className="font-semibold text-blue-800">Market Intelligence Focus</h5>
                      </div>
                      <p className="text-blue-700 text-sm">Specialized in competitive intelligence vs. general POS</p>
                    </div>
                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <h5 className="font-semibold text-purple-800">Premium Positioning</h5>
                      </div>
                      <p className="text-purple-700 text-sm">Higher value proposition justifies 2-7x pricing premium</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Burndown Tab */}
        {activeTab === 'burndown' && (
          <div className="space-y-8">
            {/* Key Burndown Metrics */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-stone-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Break-even</span>
                </div>
                <div className="text-3xl font-bold text-stone-900 mb-2">{burndown.kpis?.breakeven_month || 'N/A'}</div>
                <div className="text-stone-600 text-sm">Break-even Month</div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-stone-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Customers</span>
                </div>
                <div className="text-3xl font-bold text-stone-900 mb-2">{burndown.kpis?.breakeven_customers || 'N/A'}</div>
                <div className="text-stone-600 text-sm">Break-even Customers</div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-stone-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Starting Cash</span>
                </div>
                <div className="text-3xl font-bold text-stone-900 mb-2">{formatCurrency(burndown.assumptions?.starting_cash_usd || 0)}</div>
                <div className="text-stone-600 text-sm">Initial Capital</div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-stone-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-amber-600" />
                  </div>
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">Growth</span>
                </div>
                <div className="text-3xl font-bold text-stone-900 mb-2">{burndown.assumptions?.new_customers_per_month || 0}</div>
                <div className="text-stone-600 text-sm">New Customers/Month</div>
              </div>
            </div>

            {/* Assumptions */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-stone-200">
              <h3 className="text-2xl font-bold text-stone-900 mb-6">Financial Assumptions</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-stone-800 mb-4">Business Model</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium text-stone-700">Planning Period</span>
                      <span className="font-bold text-blue-600">{burndown.assumptions?.months || 0} months</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="font-medium text-stone-700">Fixed Monthly Costs</span>
                      <span className="font-bold text-green-600">{formatCurrency(burndown.assumptions?.fixed_monthly_usd || 0)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="font-medium text-stone-700">Credits (First 3 months)</span>
                      <span className="font-bold text-purple-600">{formatCurrency(burndown.assumptions?.credits_usd_per_month || 0)}/mo</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-stone-800 mb-4">Customer Mix & Pricing</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg">
                      <span className="font-medium text-stone-700">Starter ({burndown.assumptions?.mix?.starter_pct || 0}%)</span>
                      <span className="font-bold text-amber-600">{formatCurrency(burndown.assumptions?.tier_prices?.starter || 0)}/mo</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <span className="font-medium text-stone-700">Growth ({burndown.assumptions?.mix?.growth_pct || 0}%)</span>
                      <span className="font-bold text-orange-600">{formatCurrency(burndown.assumptions?.tier_prices?.growth || 0)}/mo</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="font-medium text-stone-700">Enterprise ({burndown.assumptions?.mix?.enterprise_pct || 0}%)</span>
                      <span className="font-bold text-red-600">{formatCurrency(burndown.assumptions?.tier_prices?.enterprise || 0)}/mo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Timeline */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-stone-200">
              <h3 className="text-2xl font-bold text-stone-900 mb-6">Monthly Cash Flow Projection</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-stone-200">
                      <th className="text-left py-3 px-2 font-semibold text-stone-800">Month</th>
                      <th className="text-right py-3 px-2 font-semibold text-stone-800">Customers</th>
                      <th className="text-right py-3 px-2 font-semibold text-stone-800">MRR</th>
                      <th className="text-right py-3 px-2 font-semibold text-stone-800">Variable COGS</th>
                      <th className="text-right py-3 px-2 font-semibold text-stone-800">Net Burn</th>
                      <th className="text-right py-3 px-2 font-semibold text-stone-800">Cumulative Cash</th>
                    </tr>
                  </thead>
                  <tbody>
                    {burndown.timeseries?.map((row, index) => (
                      <tr key={index} className={`border-b border-stone-100 ${
                        row.net_burn_with_credits_usd < 0 ? 'bg-green-50' : 'bg-red-50'
                      }`}>
                        <td className="py-3 px-2 font-medium text-stone-900">{row.month}</td>
                        <td className="py-3 px-2 text-right text-stone-700">{row.customers_total}</td>
                        <td className="py-3 px-2 text-right font-medium text-green-600">{formatCurrency(row.mrr_usd)}</td>
                        <td className="py-3 px-2 text-right text-red-600">{formatCurrency(row.cogs_var_usd)}</td>
                        <td className={`py-3 px-2 text-right font-medium ${
                          row.net_burn_with_credits_usd < 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {row.net_burn_with_credits_usd < 0 ? '+' : ''}{formatCurrency(Math.abs(row.net_burn_with_credits_usd))}
                        </td>
                        <td className="py-3 px-2 text-right font-bold text-stone-900">{formatCurrency(row.cumulative_cash_with_credits_usd)}</td>
                      </tr>
                    )) || []}
                  </tbody>
                </table>
              </div>
              {burndown.assumptions?.notes && (
                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-800">
                    <strong>Note:</strong> {burndown.assumptions.notes}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Research Sources Tab */}
        {activeTab === 'sources' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-stone-200">
              <h3 className="text-2xl font-bold text-stone-900 mb-6">Research Sources & Validation</h3>
              
              {/* Source Quality Overview */}
              <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-green-800">Research Quality Score</h4>
                  <div className="text-3xl font-bold text-green-600">{Math.round(confidence.overall * 100)}%</div>
                </div>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  {confidence.drivers?.map((driver, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-green-700 capitalize">{driver.replace('_', ' ')}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sources by Relevance */}
              <div className="space-y-6">
                {['load-bearing', 'supporting', 'background'].map((relevance) => (
                  <div key={relevance}>
                    <h4 className="text-lg font-semibold text-stone-800 mb-4 capitalize">
                      {relevance.replace('-', ' ')} Sources
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                        relevance === 'load-bearing' ? 'bg-red-100 text-red-700' :
                        relevance === 'supporting' ? 'bg-amber-100 text-amber-700' :
                        'bg-stone-100 text-stone-700'
                      }`}>
                        {sources.filter(s => s.relevance === relevance).length} sources
                      </span>
                    </h4>
                    <div className="grid gap-4">
                      {sources
                        .filter(source => source.relevance === relevance)
                        .map((source, index) => (
                          <div key={index} className="p-4 border border-stone-200 rounded-lg hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-2">
                              <h5 className="font-semibold text-stone-800 flex-1">{source.title}</h5>
                              <a 
                                href={source.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 ml-2"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-stone-600">
                              <span className="font-medium">{source.publisher}</span>
                              {source.date_published && (
                                <span className="flex items-center">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  {source.date_published}
                                </span>
                              )}
                              <span className="text-xs bg-stone-100 px-2 py-1 rounded">{source.id}</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
