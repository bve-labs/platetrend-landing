'use client'

import { useState } from 'react'
import { ArrowLeft, Mail, MessageSquare, Building, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    restaurantName: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({
          name: '',
          email: '',
          restaurantName: '',
          subject: '',
          message: ''
        })
      } else {
        setError(result.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
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

      {/* Contact Content */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              Have questions about PlateTrend? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-3xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-stone-900 mb-6">Get in Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 backdrop-blur-xl bg-gradient-to-br from-amber-200/40 to-stone-200/40 border border-white/40 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-amber-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-stone-900 mb-1">Email Support</h3>
                      <p className="text-stone-600 text-sm mb-2">For general inquiries and support</p>
                      <a 
                        href="mailto:support@platetrend.com"
                        className="text-amber-600 hover:text-amber-700 font-medium"
                      >
                        support@platetrend.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 backdrop-blur-xl bg-gradient-to-br from-blue-200/40 to-cyan-200/40 border border-white/40 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-6 h-6 text-blue-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-stone-900 mb-1">Quick Response</h3>
                      <p className="text-stone-600 text-sm">We typically respond within 24 hours during business days</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 backdrop-blur-xl bg-gradient-to-br from-green-200/40 to-emerald-200/40 border border-white/40 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Building className="w-6 h-6 text-green-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-stone-900 mb-1">Restaurant Focused</h3>
                      <p className="text-stone-600 text-sm">Our team understands the unique challenges of restaurant operations</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Link */}
              <div className="backdrop-blur-xl bg-gradient-to-r from-amber-50/60 to-stone-50/60 border border-amber-200/50 rounded-2xl p-6">
                <h3 className="font-semibold text-stone-900 mb-2">Looking for quick answers?</h3>
                <p className="text-stone-600 text-sm mb-4">Check out our FAQ section for common questions about PlateTrend.</p>
                <Link 
                  href="/faq"
                  className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium text-sm"
                >
                  Visit FAQ →
                </Link>
              </div>
            </div>

            {/* Contact Form */}
            <div className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-3xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-stone-900 mb-6">Send us a Message</h2>
              
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Message Sent Successfully!</h3>
                  <p className="text-green-700 text-sm mb-6">
                    Thank you for contacting us. We&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-amber-600 hover:text-amber-700 font-medium text-sm"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 backdrop-blur-xl bg-white/80 border border-stone-300/50 rounded-xl focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 outline-none transition-all text-stone-900 placeholder-stone-500"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 backdrop-blur-xl bg-white/80 border border-stone-300/50 rounded-xl focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 outline-none transition-all text-stone-900 placeholder-stone-500"
                        placeholder="john@restaurant.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="restaurantName" className="block text-sm font-medium text-stone-700 mb-2">
                      Restaurant Name
                    </label>
                    <input
                      type="text"
                      id="restaurantName"
                      name="restaurantName"
                      value={formData.restaurantName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 backdrop-blur-xl bg-white/80 border border-stone-300/50 rounded-xl focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 outline-none transition-all text-stone-900 placeholder-stone-500"
                      placeholder="Your Restaurant Name"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-stone-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 backdrop-blur-xl bg-white/80 border border-stone-300/50 rounded-xl focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 outline-none transition-all text-stone-900"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="demo">Request Demo</option>
                      <option value="pricing">Pricing Questions</option>
                      <option value="technical">Technical Support</option>
                      <option value="partnership">Partnership Opportunities</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full px-4 py-3 backdrop-blur-xl bg-white/80 border border-stone-300/50 rounded-xl focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 outline-none transition-all text-stone-900 placeholder-stone-500 resize-vertical"
                      placeholder="Tell us how we can help you..."
                      required
                    />
                  </div>

                  {error && (
                    <div className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-xl">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full backdrop-blur-xl bg-gradient-to-r from-amber-600/90 to-amber-700/90 border border-amber-500/30 text-white px-8 py-4 rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all duration-300 shadow-lg hover:shadow-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending Message...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
