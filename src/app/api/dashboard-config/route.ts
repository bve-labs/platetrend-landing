import { NextRequest, NextResponse } from 'next/server'

// Base assumptions for financial modeling
const baseAssumptions = {
  start_month: "2025-09",
  months: 24,
  starting_cash_usd: 30000,
  fixed_monthly_usd: 5000,
  new_customers_per_month: 6,
  mix: { starter_pct: 60, growth_pct: 30, enterprise_pct: 10 },
  tier_prices: { starter: 149, growth: 249, enterprise: 499 },
  marketing_monthly_usd: 1800,
  support_steps: [
    { until_customers: 66, monthly_usd: 0 },
    { until_customers: 120, monthly_usd: 3000 },
    { until_customers: 999999, monthly_usd: 6000 }
  ]
}

// COGS configurations
const baseCogs = { starter: 45, growth: 90, enterprise: 240 }
const optCogs = { starter: 39, growth: 62, enterprise: 210 }

function computeBurndown(assumptions: any) {
  const timeseries = []
  let cumulativeCash = assumptions.starting_cash_usd
  
  for (let i = 0; i < assumptions.months; i++) {
    const monthDate = new Date(2025, 8 + i, 1) // Sept 2025 = month 8
    const monthStr = monthDate.toISOString().slice(0, 7)
    
    const customers = (i + 1) * assumptions.new_customers_per_month
    
    // Calculate MRR based on mix
    const starterCustomers = Math.round(customers * assumptions.mix.starter_pct / 100)
    const growthCustomers = Math.round(customers * assumptions.mix.growth_pct / 100)
    const enterpriseCustomers = Math.round(customers * assumptions.mix.enterprise_pct / 100)
    
    const mrr = (starterCustomers * assumptions.tier_prices.starter) +
                (growthCustomers * assumptions.tier_prices.growth) +
                (enterpriseCustomers * assumptions.tier_prices.enterprise)
    
    // Calculate variable COGS
    const varCogs = (starterCustomers * assumptions.tier_cogs.starter) +
                    (growthCustomers * assumptions.tier_cogs.growth) +
                    (enterpriseCustomers * assumptions.tier_cogs.enterprise)
    
    // Calculate support costs based on customer tiers
    let supportCost = 0
    for (const step of assumptions.support_steps) {
      if (customers <= step.until_customers) {
        supportCost = step.monthly_usd
        break
      }
    }
    
    const netCashFlow = mrr - varCogs - assumptions.fixed_monthly_usd - assumptions.marketing_monthly_usd - supportCost
    cumulativeCash += netCashFlow
    
    timeseries.push({
      Month: monthStr,
      Customers: customers,
      MRR: mrr,
      VarCOGS: varCogs,
      Fixed: assumptions.fixed_monthly_usd,
      Marketing: assumptions.marketing_monthly_usd,
      Support: supportCost,
      NetCash: netCashFlow,
      CumulativeCash: Math.round(cumulativeCash)
    })
  }
  
  return timeseries
}

function derive(state: any) {
  const withMS = state.settings.toggles.marketing_support_scenario === "on"
  const optOn = state.settings.toggles.optimizations
  
  const assumptions = {
    ...baseAssumptions,
    tier_cogs: optOn ? optCogs : baseCogs,
    marketing_monthly_usd: withMS ? baseAssumptions.marketing_monthly_usd : 0,
    support_steps: withMS ? baseAssumptions.support_steps : [{ until_customers: 999999, monthly_usd: 0 }]
  }
  
  return computeBurndown(assumptions)
}

// Mock data structure matching your enhanced dashboard spec
function getMockDashboardConfig() {
  const state = {
    settings: {
      toggles: {
        marketing_support_scenario: "on",
        founders_pricing_active: true,
        pilot_program_enabled: true,
        optimizations: true  // default ON to show effect
      }
    },
    pilot_program: {
      pilots_planned: 24,
      cost_per_pilot_usd: 35,
      expected_conversion_pct: 35
    }
  }

  const timeseries = derive(state)
  const arpu = 214.0
  const gmPerCustomer = 146.68

  return {
    analytics: {
      qvi: {
        current: 58.7,
        delta_7d: 1.6,
        rank_local: 3,
        scale: {
          min: 0,
          max: 100,
          baseline: 50
        },
        confidence: {
          method: "bootstrap_ci",
          level: 0.95,
          min_sample: 100
        }
      },
      sentiment_topics: [
        { topic: 'Food Quality', positive: 78, negative: 22 },
        { topic: 'Service', positive: 65, negative: 35 },
        { topic: 'Atmosphere', positive: 82, negative: 18 },
        { topic: 'Value', positive: 58, negative: 42 },
        { topic: 'Speed', positive: 71, negative: 29 }
      ],
      price_histogram: {
        bins: ['$8-12', '$12-16', '$16-20', '$20-24', '$24+'],
        your_restaurant: [5, 12, 8, 3, 2],
        competitors: [8, 15, 12, 6, 4]
      }
    },
    competitors: [
      {
        name: "Pasta House",
        price_index: 0.92,
        quality_index: 1.05,
        review_volume: 580,
        segment: "Italian"
      },
      {
        name: "Burger Barn",
        price_index: 0.88,
        quality_index: 0.98,
        review_volume: 420,
        segment: "Burgers"
      },
      {
        name: "Sushi Go",
        price_index: 1.15,
        quality_index: 1.12,
        review_volume: 640,
        segment: "Sushi"
      },
      {
        name: "Your Venue",
        price_index: 1.0,
        quality_index: 1.08,
        review_volume: 500,
        segment: "Self",
        self: true
      }
    ],
    competitors_sorted_by_qvi: [
      {
        rank: 1,
        name: "Sushi Go",
        qvi: 64.1,
        delta_7d: 2.3,
        price_index: 1.15,
        opp: "Lower lunch combos"
      },
      {
        rank: 2,
        name: "Pasta House",
        qvi: 61.9,
        delta_7d: 1.1,
        price_index: 0.92,
        opp: "Raise pasta mains +$1"
      },
      {
        rank: 3,
        name: "Your Venue",
        qvi: 58.7,
        delta_7d: 1.6,
        price_index: 1.0,
        opp: "Bundle sides Tue-Thu"
      },
      {
        rank: 4,
        name: "Burger Barn",
        qvi: 52.3,
        delta_7d: -0.4,
        price_index: 0.88,
        opp: "Upsell shakes"
      }
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
        {
          ts: "2025-08-22T06:05:00Z",
          msg: "Price increase detected at Sushi Go (+4 items)"
        },
        {
          ts: "2025-08-21T19:40:00Z",
          msg: "Negative review spike for Burger Barn (3σ)"
        }
      ]
    },
    recommendations: {
      menu_top3: [
        "Raise flagship burger +$1 (elasticity low, QVI gain +1.2)",
        "Add seasonal pasta using local supplier deal (COGS -9%)",
        "Promote weekday bundle (app + drink) to lift lunch traffic"
      ]
    },
    jobs: {
      reports: [
        {
          id: "R-1021",
          type: "Monthly Pulse",
          tier: "Starter",
          status: "queued",
          eta: "02:15",
          cost_est: 12.4
        },
        {
          id: "R-1022",
          type: "Deep-Dive",
          tier: "Growth",
          status: "running",
          eta: "09:50",
          cost_est: 23.1
        }
      ]
    },
    cost: {
      llm_per_report: 0.18,
      proxy_gb_per_report: 0.12,
      cache_hit_rate: 0.67
    },
    state,
    derived: {
      arpu,
      gm_dollars_per_customer: gmPerCustomer,
      timeseries
    },
    calc: {
      pilot: {
        spend: state.pilot_program.pilots_planned * state.pilot_program.cost_per_pilot_usd,
        paying: Math.round(state.pilot_program.pilots_planned * (state.pilot_program.expected_conversion_pct / 100)),
        added_mrr: Math.round(state.pilot_program.pilots_planned * (state.pilot_program.expected_conversion_pct / 100) * arpu),
        payback_months: Math.round(((state.pilot_program.pilots_planned * state.pilot_program.cost_per_pilot_usd) / (state.pilot_program.pilots_planned * (state.pilot_program.expected_conversion_pct / 100) * gmPerCustomer)) * 10) / 10
      }
    },
    slos: [
      "Dashboard freshness by 06:00 local",
      "Monthly report delivered by day 3"
    ]
  }
}

export async function GET(request: NextRequest) {
  try {
    // In a real implementation, you would:
    // 1. Authenticate the user
    // 2. Fetch real data from your database
    // 3. Calculate derived metrics
    // 4. Apply user-specific filters/settings
    
    // Simulate some processing delay
    await new Promise(resolve => setTimeout(resolve, 100))
    
    return NextResponse.json({
      success: true,
      data: getMockDashboardConfig(),
      timestamp: new Date().toISOString(),
      version: "1.0.0"
    })
  } catch (error) {
    console.error('Dashboard config API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch dashboard configuration',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    
    // In a real implementation, you would:
    // 1. Validate the patch data
    // 2. Update the database
    // 3. Recalculate derived metrics if needed
    
    console.log('Dashboard config update:', body)
    
    return NextResponse.json({
      success: true,
      message: 'Configuration updated successfully',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Dashboard config update error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update dashboard configuration',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
