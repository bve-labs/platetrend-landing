'use client'

import { useState, useEffect } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  Eye, 
  Bell, 
  Users, 
  CheckCircle,
  ArrowRight,
  Star,
  Zap,
  Target,
  FileText,
  Smartphone,
  Heart,
  AlertTriangle,
  DollarSign
} from 'lucide-react'

export default function Home() {
  const [formData, setFormData] = useState({
    restaurantName: '',
    email: '',
    location: '',
    numLocations: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setIsSubmitted(true)
      } else {
        setError(data.error || 'Something went wrong')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full backdrop-blur-xl bg-white/80 border-b border-white/20 z-50 shadow-lg shadow-stone-900/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex justify-between items-center py-5">
            <div className="flex items-center space-x-4">
              {/* Iconic PlateTrend Branding */}
              <img 
                src="/images/platetrend_logo.png"
                alt="PlateTrend - Restaurant Intelligence"
                className="h-16 w-auto hover:opacity-80 transition-opacity duration-200"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-slate-700 to-slate-600 bg-clip-text text-transparent">
                  PlateTrend
                </span>
                <span className="text-sm font-medium text-amber-700 -mt-1">
                  Restaurant Intelligence
                </span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="/analysis" className="text-amber-600 hover:text-amber-700 transition-colors font-medium">Try Demo</a>
              <a href="#features" className="text-stone-600 hover:text-stone-900 transition-colors font-medium">Features</a>
              <a href="#pricing" className="text-stone-600 hover:text-stone-900 transition-colors font-medium">Pricing</a>
              <a href="#how-it-works" className="text-stone-600 hover:text-stone-900 transition-colors font-medium">How It Works</a>
              <a href="/faq" className="text-stone-600 hover:text-stone-900 transition-colors font-medium">FAQ</a>
              <a href="/contact" className="text-stone-600 hover:text-stone-900 transition-colors font-medium">Contact Us</a>
              <button 
                onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
                className="backdrop-blur-xl bg-gradient-to-r from-amber-600/90 to-amber-700/90 border border-amber-500/30 text-white px-6 py-2.5 rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
              >
                Get Early Access
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 sm:px-8 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-amber-200 to-stone-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-stone-200 to-amber-200 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 backdrop-blur-xl bg-amber-100/50 border border-amber-200/50 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-8 shadow-lg">
              <Bell className="w-4 h-4" />
              <span>Launching Q4 2025 - Join the Waitlist</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-stone-900 mb-8 leading-tight">
              Stop Guessing.
              <br />
              <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                Start Winning.
              </span>
            </h1>
            
            <p className="text-xl text-stone-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              AI-powered restaurant intelligence that helps you understand your competition, 
              optimize your menu, and make data-driven decisions that drive real results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <a 
                href="/analysis"
                className="backdrop-blur-xl bg-gradient-to-r from-green-600/90 to-green-700/90 border border-green-500/30 text-white px-8 py-4 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-lg flex items-center space-x-2"
              >
                <Zap className="w-5 h-5" />
                <span>Try Live Demo</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              <button 
                onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
                className="backdrop-blur-xl bg-gradient-to-r from-amber-600/90 to-amber-700/90 border border-amber-500/30 text-white px-8 py-4 rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-lg flex items-center space-x-2"
              >
                <span>Get Early Access</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col items-center">
              <div className="flex items-center space-x-3 text-stone-500 mb-4">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-10 h-10 backdrop-blur-xl bg-gradient-to-br from-amber-200/40 to-stone-200/40 border-2 border-white/50 rounded-full shadow-lg flex items-center justify-center">
                      <Users className="w-4 h-4 text-amber-700" />
                    </div>
                  ))}
                </div>
                <span className="text-sm font-medium">
                  <span className="font-bold text-stone-700">200+</span> restaurant owners already signed up
                </span>
              </div>
            </div>
          </div>

          {/* Hero Image - Restaurant Terrace */}
          <div className="relative max-w-4xl mx-auto">
            <div className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl p-8 shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-stone-100 to-amber-100 rounded-2xl flex items-center justify-center relative overflow-hidden">
                {/* Beautiful Restaurant Terrace Hero Image */}
                <img 
                  src="/images/hero/restaurant-terrace-hero.jpg"
                  alt="Premium Restaurant Terrace - PlateTrend Analytics"
                  className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30 rounded-2xl"></div>
                <div className="relative z-10 text-center text-white">
                  <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl p-8 shadow-xl max-w-2xl mx-auto">
                    <img 
                      src="/images/platetrend_logo.png"
                      alt="PlateTrend - Restaurant Intelligence"
                      className="h-48 w-auto mx-auto mb-8 filter brightness-0 invert"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <p className="font-bold text-2xl mb-3">AI-Powered Restaurant Intelligence</p>
                    <p className="text-lg opacity-90">Turn competitor insights into profit opportunities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

{/* What PlateTrend Actually Does - Core Product Explanation */}
<section className="py-16 bg-gradient-to-br from-amber-50/40 to-white relative">
  <div className="max-w-6xl mx-auto px-6 sm:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
        What Does PlateTrend Do?
      </h2>
      <p className="text-lg text-stone-600 max-w-2xl mx-auto">
        Our AI works 24/7 to gather competitive intelligence and optimize your restaurant
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-8 items-center">
      {/* Left: What it does */}
      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-blue-600 font-bold text-sm">1</span>
          </div>
          <div>
            <h3 className="font-semibold text-stone-900 mb-1">Scans Local Competitors Daily</h3>
            <p className="text-stone-600 text-sm">Automatically monitors competitor menus, prices, reviews, and social media in your area</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-green-600 font-bold text-sm">2</span>
          </div>
          <div>
            <h3 className="font-semibold text-stone-900 mb-1">Finds Supply & Ingredient Opportunities</h3>
            <p className="text-stone-600 text-sm">Compares local suppliers and suggests cost-saving ingredient swaps based on market trends</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-amber-600 font-bold text-sm">3</span>
          </div>
          <div>
            <h3 className="font-semibold text-stone-900 mb-1">Optimizes Your Menu & Pricing</h3>
            <p className="text-stone-600 text-sm">AI analyzes gaps and recommends specific menu additions, price changes, and positioning</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-purple-600 font-bold text-sm">4</span>
          </div>
          <div>
            <h3 className="font-semibold text-stone-900 mb-1">Delivers Actionable Reports</h3>
            <p className="text-stone-600 text-sm">Monthly intelligence reports with specific recommendations you can implement immediately</p>
          </div>
        </div>
      </div>

      {/* Right: Simple visual */}
      <div className="bg-white/80 rounded-2xl p-6 shadow-lg border border-stone-200/50">
        <div className="text-center mb-4">
          <div className="text-2xl font-bold text-stone-900">Your Restaurant</div>
          <div className="text-sm text-stone-500">vs 23 Local Competitors</div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center p-4 bg-red-100 rounded-lg border-l-4 border-red-500 shadow-sm">
            <span className="text-sm font-semibold text-stone-800">Burger Price</span>
            <span className="text-red-700 font-bold text-sm bg-red-200 px-2 py-1 rounded">$2.50 UNDER market</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-green-100 rounded-lg border-l-4 border-green-500 shadow-sm">
            <span className="text-sm font-semibold text-stone-800">Missing Menu Items</span>
            <span className="text-green-700 font-bold text-sm bg-green-200 px-2 py-1 rounded">3 HIGH-PROFIT gaps</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-blue-100 rounded-lg border-l-4 border-blue-500 shadow-sm">
            <span className="text-sm font-semibold text-stone-800">Local Suppliers</span>
            <span className="text-blue-700 font-bold text-sm bg-blue-200 px-2 py-1 rounded">15% SAVINGS found</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* Market Problems Section */}
<section className="py-20 bg-gradient-to-br from-stone-100 via-stone-50 to-white relative overflow-hidden">
  <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">Market Problems</h2>
      <h3 className="text-2xl md:text-3xl font-semibold text-stone-700 mb-6">The $10,000 Problem Every Restaurant Faces</h3>
      <p className="text-xl text-stone-600 mb-6">You&apos;re flying blind while competitors steal your customers.</p>
      
      <div className="max-w-4xl mx-auto mb-8">
        <p className="text-lg text-stone-700 font-medium mb-8">
          Stop losing potential revenue each month. Get competitive insights:
        </p>
        
        {/* Glassmorphism Icons with Questions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            {
              icon: DollarSign,
              text: "What are you charging vs. your competitors?",
              gradient: "from-blue-200/40 to-cyan-200/40",
              iconColor: "text-blue-600"
            },
            {
              icon: TrendingUp,
              text: "Which menu items are trending in your area",
              gradient: "from-emerald-200/40 to-green-200/40", 
              iconColor: "text-emerald-600"
            },
            {
              icon: Users,
              text: "Why do customers choose competitors over you?",
              gradient: "from-amber-200/40 to-orange-200/40",
              iconColor: "text-amber-600"
            }
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className={`w-16 h-16 backdrop-blur-xl bg-gradient-to-br ${item.gradient} border border-white/40 rounded-2xl flex items-center justify-center mb-4 shadow-lg hover:scale-110 transition-transform`}>
                <item.icon className={`w-8 h-8 ${item.iconColor}`} />
              </div>
              <p className="text-stone-700 font-medium leading-relaxed max-w-xs">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="space-y-4">
        <p className="text-2xl md:text-3xl font-bold text-stone-900">
          Stop Guessing. Start Winning.
        </p>
        
        <div className="flex justify-center">
          <span className="text-4xl font-bold bg-gradient-to-r from-slate-700 to-slate-600 bg-clip-text text-transparent">
            PlateTrend
          </span>
        </div>
      </div>
    </div>

    {/* Transition Arrow */}
    <div className="flex justify-center mb-8">
      <div className="w-16 h-16 backdrop-blur-xl bg-gradient-to-br from-amber-200/50 to-amber-300/50 border border-amber-300/30 rounded-full flex items-center justify-center shadow-lg animate-bounce">
        <ArrowRight className="w-8 h-8 text-amber-700 rotate-90" />
      </div>
    </div>
  </div>
</section>

{/* Your AI Restaurant Intelligence Solution */}
<section className="py-20 bg-gradient-to-br from-white to-amber-50/30 relative overflow-hidden">
  <div className="max-w-7xl mx-auto px-6 sm:px-8">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">Your AI Restaurant Intelligence Solution</h2>
      <p className="text-xl text-stone-600 max-w-3xl mx-auto mb-8">
        Turn those 3 problems into profit opportunities with AI that works 24/7
      </p>
      <div className="inline-flex items-center space-x-2 backdrop-blur-xl bg-green-100/50 border border-green-200/50 text-green-800 px-4 py-2 rounded-full text-sm font-medium shadow-lg">
        <CheckCircle className="w-4 h-4" />
        <span>$149/month vs $15K consultant fees</span>
      </div>
    </div>

    <div className="grid lg:grid-cols-2 gap-16 items-center">
      {/* Solution Features */}
      <div className="space-y-8">
        {[
          {
            icon: DollarSign,
            title: "Smart Menu Pricing",
            description: "Real-time competitor price tracking and AI-powered pricing recommendations that optimize your profit margins",
            gradient: "from-blue-200/40 to-cyan-200/40",
            iconColor: "text-blue-600",
            solves: "Pricing Questions"
          },
          {
            icon: TrendingUp,
            title: "Spot Opportunity Trends",
            description: "Identify emerging menu items and customer preferences before your competitors catch on",
            gradient: "from-emerald-200/40 to-green-200/40",
            iconColor: "text-emerald-600",
            solves: "Trending Items"
          },
          {
            icon: Users,
            title: "Customer Analysis",
            description: "Deep sentiment analysis of competitor reviews to understand why customers choose them",
            gradient: "from-amber-200/40 to-orange-200/40",
            iconColor: "text-amber-600",
            solves: "Customer Insights"
          },
          {
            icon: FileText,
            title: "Monthly Reports",
            description: "Automated strategic analysis delivered fresh every month - no expensive consultants needed",
            gradient: "from-purple-200/40 to-pink-200/40",
            iconColor: "text-purple-600",
            solves: "Expensive Consulting Reports"
          }
        ].map((feature, index) => (
          <div key={index} className="group flex items-start space-x-4">
            <div className={`w-14 h-14 backdrop-blur-xl bg-gradient-to-br ${feature.gradient} border border-white/40 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
              <feature.icon className={`w-7 h-7 ${feature.iconColor} relative z-10`} />
            </div>
            <div>
              <div className="flex items-center mb-2">
                <h3 className="text-xl font-semibold text-stone-900 mr-3">{feature.title}</h3>
                <span className="text-xs bg-green-100/80 text-green-700 px-2 py-1 rounded-full font-medium">
                  Solves: {feature.solves}
                </span>
              </div>
              <p className="text-stone-600 leading-relaxed">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Demo Mockup - Updated */}
      <div className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-300">
        <div className="bg-stone-900 rounded-2xl p-6 mb-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-emerald-500/5 to-blue-500/5"></div>
          <div className="flex items-center space-x-2 mb-4 relative z-10">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-stone-400 text-xs ml-4">PlateTrend Intelligence</span>
          </div>
          <div className="text-green-400 text-sm font-mono leading-relaxed relative z-10">
            <div className="flex items-center mb-1">
              <Zap className="w-3 h-3 mr-2" />
              <span>Analyzing 23 local competitors...</span>
            </div>
            <div className="flex items-center mb-1">
              <BarChart3 className="w-3 h-3 mr-2" />
              <span>Processing 1,247 customer reviews</span>
            </div>
            <div className="flex items-center mb-1">
              <TrendingUp className="w-3 h-3 mr-2" />
              <span>Identifying pricing opportunities...</span>
            </div>
            <div className="flex items-center">
              <Star className="w-3 h-3 mr-2 text-yellow-400" />
              <span className="text-yellow-400 font-bold">3 PROFIT OPPORTUNITIES FOUND</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 backdrop-blur-xl bg-blue-50/60 border border-blue-200/50 rounded-xl">
            <span className="text-stone-700 font-medium">Market avg burger price</span>
            <span className="font-bold text-blue-600 text-lg">$14.50</span>
          </div>
          <div className="flex justify-between items-center p-4 backdrop-blur-xl bg-red-50/60 border border-red-200/50 rounded-xl">
            <span className="text-stone-700 font-medium">Your current price</span>
            <span className="font-bold text-red-600 text-lg">$12.00</span>
          </div>
          <div className="p-4 backdrop-blur-xl bg-gradient-to-r from-green-50/60 to-blue-50/60 border border-green-300/50 rounded-xl border-l-4 border-l-green-500">
            <p className="text-sm text-stone-700 font-medium mb-2">
              <span className="font-bold text-green-600">AI Recommendation:</span> Increase to $13.75. Customer sentiment analysis shows 89% satisfaction with quality.
            </p>
            <div className="flex items-center">
              <DollarSign className="w-4 h-4 text-green-600 mr-1" />
              <p className="text-xs text-green-600 font-bold">
                Monthly revenue increase: +$2,847
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/images/misc/chef-burger-prep-section.jpg"
            alt="Professional Chef at Work"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/92 to-white/88"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">How It Works</h2>
            <p className="text-xl text-stone-600">From setup to profit optimization in 3 simple steps</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                icon: Smartphone,
                title: "Quick Setup",
                description: "Upload your menu and basic restaurant info. Our AI immediately starts analyzing your local market and competitors."
              },
              {
                step: "2",
                icon: BarChart3,
                title: "AI Analysis",
                description: "We scan competitor menus, analyze thousands of reviews, and identify market trends to find your profit opportunities."
              },
              {
                step: "3",
                icon: TrendingUp,
                title: "Profit & Grow",
                description: "Get specific recommendations on pricing, menu positioning, and new opportunities. Watch your margins improve."
              }
            ].map((step, index) => (
              <div key={index} className="group text-center backdrop-blur-xl bg-stone-50/50 border border-white/40 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative">
                <div className="w-20 h-20 backdrop-blur-xl bg-gradient-to-br from-amber-600/20 to-amber-700/20 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <step.icon className="w-10 h-10 text-amber-700" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 backdrop-blur-xl bg-amber-600 border border-amber-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">{step.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-stone-900 mb-4">{step.title}</h3>
                <p className="text-stone-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/images/features/bright-bar-view.jpg"
            alt="Modern Restaurant Bar"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-stone-50/95 via-stone-50/90 to-stone-50/85"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">Everything You Need to Outcompete</h2>
            <p className="text-xl text-stone-600">The complete restaurant intelligence suite</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Target, title: "Menu Gap Analysis", description: "Identify profitable menu items your competitors offer that you're missing" },
              { icon: DollarSign, title: "Smart Pricing", description: "Data-driven pricing recommendations based on local market analysis" },
              { icon: Heart, title: "Sentiment Tracking", description: "Monitor what customers love (and hate) about your competitors" },
              { icon: Bell, title: "Trend Alerts", description: "Get notified when new food trends emerge in your market" },
              { icon: Users, title: "Social Media Intelligence", description: "Track competitor social media performance and viral content" },
              { icon: FileText, title: "Custom Reports", description: "Monthly intelligence reports tailored to your restaurant's needs" }
            ].map((feature, index) => (
              <div key={index} className="group backdrop-blur-xl bg-white/60 border border-white/40 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 backdrop-blur-xl bg-gradient-to-br from-amber-200/50 to-stone-200/50 border border-amber-300/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-amber-700" />
                </div>
                <h3 className="text-lg font-semibold text-stone-900 mb-2">{feature.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/images/testimonials/friendly-staff.jpg"
            alt="Professional Restaurant Staff"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-stone-900/85 via-stone-900/80 to-stone-900/75"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Trusted by Restaurant Owners</h2>
            <p className="text-xl text-stone-200">See what early adopters are saying about PlateTrend</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "Finally, data that actually helps my bottom line. PlateTrend showed me I was underpricing my signature dishes by 20%.",
                author: "Maria Rodriguez",
                title: "Owner, Casa Bella",
                location: "Austin, TX"
              },
              {
                quote: "The competitor analysis is incredible. I discovered menu gaps that led to three new profitable items.",
                author: "James Chen",
                title: "Chef/Owner, Fusion Kitchen",
                location: "Seattle, WA"
              },
              {
                quote: "ROI was immediate. First month recommendations increased our average ticket by $4.50 per customer.",
                author: "Sarah Thompson",
                title: "GM, The Local Bistro",
                location: "Denver, CO"
              }
            ].map((testimonial, index) => (
              <div key={index} className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-white mb-6 leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="text-stone-200">
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm opacity-80">{testimonial.title}</div>
                  <div className="text-sm opacity-60">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">Simple, Profitable Pricing</h2>
            <p className="text-xl text-stone-600">Choose the plan that fits your restaurant&apos;s size</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Starter",
                description: "Perfect for single location restaurants",
                price: "$149",
                features: ["1 Restaurant Location", "Competitor Analysis", "Monthly Reports", "Basic Trends"],
                popular: false
              },
              {
                name: "Growth", 
                description: "For restaurants ready to scale",
                price: "$249",
                features: ["Up to 5 Locations", "Advanced Analytics", "Weekly Reports", "Social Media Intelligence", "Trend Alerts"],
                popular: true
              },
              {
                name: "Enterprise",
                description: "For restaurant groups and chains", 
                price: "$499",
                features: ["Unlimited Locations", "Custom Reports", "API Access", "Priority Support", "Dedicated Account Manager"],
                popular: false
              }
            ].map((plan, index) => (
              <div key={index} className={`group backdrop-blur-xl bg-white/70 border rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 relative ${plan.popular ? 'border-amber-300/60 shadow-xl scale-105' : 'border-white/40'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 backdrop-blur-xl bg-gradient-to-r from-amber-600/90 to-amber-700/90 border border-amber-500/30 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-semibold text-stone-900 mb-2">{plan.name}</h3>
                <p className="text-stone-600 mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-stone-900">{plan.price}</span>
                  <span className="text-stone-600">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-stone-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    plan.popular 
                      ? 'backdrop-blur-xl bg-gradient-to-r from-amber-600/90 to-amber-700/90 border border-amber-500/30 text-white hover:from-amber-700 hover:to-amber-800 shadow-lg hover:shadow-xl' 
                      : 'backdrop-blur-xl bg-white/60 border-2 border-stone-300/60 text-stone-700 hover:border-amber-500 hover:text-amber-700 hover:bg-amber-50/50'
                  }`}
                >
                  Get Notified
                </button>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-stone-600 mb-4">
              <DollarSign className="w-5 h-5 inline mr-1" />
              <span className="font-semibold">ROI Guarantee:</span> Most customers see 3-5x ROI within the first month
            </p>
            <p className="text-sm text-stone-500">Compare to hiring a consultant: $5K+ for a one-time analysis vs. continuous intelligence for $149-499/month</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="signup" className="relative py-20 bg-gradient-to-br from-amber-600/90 to-amber-700/90 backdrop-blur-xl overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Stop Guessing and Start Winning?
          </h2>
          <p className="text-xl text-amber-100 mb-10">
            Join 200+ restaurant owners getting early access to PlateTrend. 
            Be the first to know when we launch and get exclusive early-bird pricing.
          </p>
          
          <div className="backdrop-blur-xl bg-white/90 border border-white/40 rounded-3xl p-8 max-w-md mx-auto shadow-2xl">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 backdrop-blur-xl bg-green-100/80 border border-green-200/50 rounded-full flex items-center justify-center">
                <Bell className="w-6 h-6 text-green-600" />
              </div>
              <span className="ml-3 text-lg font-semibold text-stone-900">Get Notified When We Launch</span>
            </div>
            
            {isSubmitted ? (
              <div className="text-center">
                <div className="w-16 h-16 backdrop-blur-xl bg-green-100/80 border border-green-200/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">Success! You&apos;re on the list.</h3>
                <p className="text-green-700 text-sm">We&apos;ll notify you as soon as PlateTrend launches!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="restaurantName"
                  placeholder="Restaurant Name"
                  value={formData.restaurantName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 backdrop-blur-xl bg-white/80 border border-stone-300/50 rounded-xl focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 outline-none transition-all text-stone-900 placeholder-stone-500"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 backdrop-blur-xl bg-white/80 border border-stone-300/50 rounded-xl focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 outline-none transition-all text-stone-900 placeholder-stone-500"
                  required
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Restaurant Location (City, State)"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 backdrop-blur-xl bg-white/80 border border-stone-300/50 rounded-xl focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 outline-none transition-all text-stone-900 placeholder-stone-500"
                  required
                />
                <select
                  name="numLocations"
                  value={formData.numLocations}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 backdrop-blur-xl bg-white/80 border border-stone-300/50 rounded-xl focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 outline-none transition-all text-stone-900 placeholder-stone-500"
                  required
                >
                  <option value="">Number of Locations</option>
                  <option value="1">1 Location</option>
                  <option value="2-5">2-5 Locations</option>
                  <option value="6-10">6-10 Locations</option>
                  <option value="10+">10+ Locations</option>
                </select>
                
                {error && (
                  <div className="backdrop-blur-xl bg-red-50/80 border border-red-200/50 text-red-600 text-sm text-center p-3 rounded-xl">
                    {error}
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full backdrop-blur-xl bg-gradient-to-r from-amber-600/90 to-amber-700/90 border border-amber-500/30 text-white px-6 py-4 rounded-xl font-semibold text-lg hover:from-amber-700 hover:to-amber-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </span>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Zap className="w-5 h-5 mr-2" />
                      Reserve My Early Access Spot
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </button>
              </form>
            )}
            
            <p className="text-xs text-stone-500 mt-4 text-center">
              🔒 We respect your privacy. No spam, ever. Unsubscribe anytime.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12 text-center">
            <div className="text-white">
              <div className="text-3xl font-bold mb-2">2-min</div>
              <div className="text-amber-200">Setup Time</div>
            </div>
            <div className="text-white">
              <div className="text-3xl font-bold mb-2">$5K+</div>
              <div className="text-amber-200">Saved vs Consultants</div>
            </div>
            <div className="text-white">
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-amber-200">Market Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-stone-50/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">Restaurant Owners Are Excited</h2>
            <p className="text-xl text-stone-600">See what early adopters are saying</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Maria Rodriguez",
                title: "Owner, Local Bistro",
                quote: "Finally! Something that tells me what my competitors are actually doing. Can't wait to see how this impacts my margins.",
                image: "/images/testimonials/friendly-staff.jpg"
              },
              {
                name: "David Kim", 
                title: "Manager, Urban Eats",
                quote: "I've been manually checking competitors for years. Having AI do this automatically would be a game-changer for our pricing strategy.",
                image: "/images/testimonials/friendly-staff.jpg"
              },
              {
                name: "Sarah Patel",
                title: "Co-owner, Farm Table", 
                quote: "The competitive analysis feature sounds exactly like what we pay our consultant $5K for quarterly. Sign me up!",
                image: "/images/testimonials/friendly-staff.jpg"
              }
            ].map((testimonial, index) => {
              const cardStyles = [
                "backdrop-blur-xl bg-blue-50/60 border border-blue-200/50",
                "backdrop-blur-xl bg-green-50/60 border border-green-200/50", 
                "backdrop-blur-xl bg-amber-50/60 border border-amber-200/50"
              ];
              
              return (
                <div key={index} className={`group ${cardStyles[index]} rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/50 shadow-lg">
                      <img 
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-3">
                      <h4 className="font-semibold text-stone-900">{testimonial.name}</h4>
                      <p className="text-sm text-stone-600">{testimonial.title}</p>
                    </div>
                  </div>
                  <p className="text-stone-700 leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div className="flex items-center mt-4">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer className="bg-stone-900/95 backdrop-blur-xl text-white py-12 border-t border-stone-800/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                {/* Full Brand Logo in Footer */}
                <img 
                  src="/images/platetrend_logo.png"
                  alt="PlateTrend - Restaurant Intelligence"
                  className="h-16 w-auto"
                  onLoad={() => console.log('✅ Footer logo loaded successfully!')}
                  onError={(e) => {
                    console.log('❌ Footer logo failed to load:', (e.target as HTMLImageElement).src);
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
              <p className="text-stone-400 mb-6 max-w-md leading-relaxed">
                AI-powered restaurant intelligence that helps you stop guessing and start winning against your competition.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: Users, label: 'Twitter' },
                  { icon: Users, label: 'LinkedIn' },
                  { icon: Users, label: 'Instagram' }
                ].map((social, i) => (
                  <a key={i} href="#" className="w-10 h-10 backdrop-blur-xl bg-stone-800/60 border border-stone-700/50 rounded-lg flex items-center justify-center hover:bg-stone-700/60 transition-all duration-300 hover:scale-110">
                    <social.icon className="w-4 h-4 text-stone-300" />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-lg">Product</h4>
              <ul className="space-y-3 text-stone-400">
                <li><a href="#features" className="hover:text-white transition-colors flex items-center group">
                  <span className="w-4 h-4 mr-3 transition-transform group-hover:translate-x-1 text-sm">🍴</span>Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors flex items-center group">
                  <span className="w-4 h-4 mr-3 transition-transform group-hover:translate-x-1 text-sm">🍴</span>Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center group">
                  <span className="w-4 h-4 mr-3 transition-transform group-hover:translate-x-1 text-sm">🍴</span>Demo</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center group">
                  <span className="w-4 h-4 mr-3 transition-transform group-hover:translate-x-1 text-sm">🍴</span>API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-lg">Company</h4>
              <ul className="space-y-3 text-stone-400">
                <li><a href="#" className="hover:text-white transition-colors flex items-center group">
                  <span className="w-4 h-4 mr-3 transition-transform group-hover:translate-x-1 text-sm">🍴</span>About</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center group">
                  <span className="w-4 h-4 mr-3 transition-transform group-hover:translate-x-1 text-sm">🍴</span>Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center group">
                  <span className="w-4 h-4 mr-3 transition-transform group-hover:translate-x-1 text-sm">🍴</span>Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center group">
                  <span className="w-4 h-4 mr-3 transition-transform group-hover:translate-x-1 text-sm">🍴</span>Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-stone-800/50 mt-12 pt-8 text-center text-stone-400">
            <p>&copy; 2025 PlateTrend. All rights reserved. Made with ❤️ for restaurant owners.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}