'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Eye, EyeOff, Shield } from 'lucide-react'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simple password check - in production, you'd want something more secure
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'platetrend2025'
    
    if (password === adminPassword) {
      // Set session storage for admin access
      sessionStorage.setItem('platetrend_admin', 'authenticated')
      router.push('/admin/dashboard')
    } else {
      setError('Invalid password. Access denied.')
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-stone-900 to-slate-900 flex items-center justify-center px-6">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">PlateTrend Admin</h1>
            <p className="text-stone-300 text-sm">Enter password to access market analysis dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-stone-300 mb-2">
                Admin Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pl-12 pr-12 backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Enter admin password"
                  required
                />
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 backdrop-blur-xl bg-red-500/20 border border-red-400/30 rounded-xl">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full backdrop-blur-xl bg-gradient-to-r from-amber-600/90 to-orange-600/90 border border-amber-500/30 text-white py-3 px-6 rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Authenticating...' : 'Access Dashboard'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-stone-400 text-xs text-center">
              This is a secure admin area. Unauthorized access is prohibited.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
