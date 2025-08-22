'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const faqs = [
  {
    question: "What exactly does PlateTrend do?",
    answer: "PlateTrend is an AI-powered competitive intelligence platform for restaurants. We automatically monitor your local competitors' menus, pricing, reviews, and social media to provide actionable insights that help you optimize your menu, pricing, and operations."
  },
  {
    question: "How does PlateTrend gather competitor data?",
    answer: "Our AI system continuously scans public data sources including competitor websites, social media, review platforms, and menu databases. We analyze this information to identify trends, pricing gaps, and opportunities specific to your market area."
  },
  {
    question: "What kind of insights will I receive?",
    answer: "You'll receive monthly intelligence reports with specific recommendations on menu pricing, trending items in your area, competitor analysis, customer sentiment insights, and profit optimization opportunities. Think of it as having a $15K consulting project delivered fresh every month."
  },
  {
    question: "How much does PlateTrend cost?",
    answer: "PlateTrend is $149/month - a fraction of what you'd pay for traditional restaurant consulting (typically $3K-15K). You get continuous, up-to-date intelligence instead of a one-time outdated report."
  },
  {
    question: "What size restaurants can use PlateTrend?",
    answer: "PlateTrend works for restaurants of all sizes - from single locations to multi-location chains. Our AI scales the analysis based on your market size and competitive landscape."
  },
  {
    question: "How accurate is the competitive data?",
    answer: "Our AI uses multiple data sources and cross-validation to ensure high accuracy. We continuously update our algorithms and data sources to provide the most reliable competitive intelligence available."
  },
  {
    question: "Can I try PlateTrend before committing?",
    answer: "Yes! We're currently in beta and offering early access to restaurant owners. Join our waitlist to be among the first to experience PlateTrend when we launch in Q4 2025."
  },
  {
    question: "How is this different from hiring a consultant?",
    answer: "Traditional consultants provide a one-time snapshot that's outdated within weeks. PlateTrend provides continuous, real-time intelligence that adapts to market changes. Plus, at $149/month, it costs significantly less than a single consulting project."
  },
  {
    question: "What markets do you cover?",
    answer: "We currently focus on major metropolitan areas in the United States. During our beta phase, we're expanding coverage based on demand. Contact us to check if your area is covered."
  },
  {
    question: "How do I get started?",
    answer: "Simply join our waitlist by providing your restaurant details. We'll notify you as soon as PlateTrend is available in your area and guide you through the setup process."
  }
]

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-stone-200/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2 text-stone-600 hover:text-stone-900 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </Link>
            <div className="flex items-center space-x-3">
              <img 
                src="/images/platetrend_logo.png"
                alt="PlateTrend Logo"
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold text-stone-900">PlateTrend</span>
            </div>
          </div>
        </div>
      </header>

      {/* FAQ Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              Everything you need to know about PlateTrend and how it can help your restaurant succeed
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-amber-500/50 rounded-2xl"
                >
                  <h3 className="text-lg font-semibold text-stone-900 pr-4">
                    {faq.question}
                  </h3>
                  {openItems.includes(index) ? (
                    <ChevronUp className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  )}
                </button>
                
                {openItems.includes(index) && (
                  <div className="px-8 pb-6">
                    <div className="border-t border-stone-200/50 pt-4">
                      <p className="text-stone-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="backdrop-blur-xl bg-gradient-to-r from-amber-50/60 to-stone-50/60 border border-amber-200/50 rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-stone-900 mb-4">
                Still have questions?
              </h2>
              <p className="text-stone-600 mb-6">
                We&apos;re here to help! Reach out to our team for personalized answers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/contact"
                  className="backdrop-blur-xl bg-gradient-to-r from-amber-600/90 to-amber-700/90 border border-amber-500/30 text-white px-8 py-3 rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                >
                  Contact Us
                </Link>
                <Link 
                  href="/"
                  className="backdrop-blur-xl bg-white/80 border border-stone-300/50 text-stone-700 px-8 py-3 rounded-xl hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                >
                  Join Waitlist
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
