'use client'

import { useState } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Search,
  Loader2,
  Star,
  MessageSquare,
  AlertCircle
} from 'lucide-react'

interface SentimentSummary {
  overall: string
  positive: number
  negative: number
  neutral: number
  averageScore: number
  totalReviews: number
}

interface AnalysisData {
  restaurantName: string
  summary: SentimentSummary
  averageRating?: number
  reviews?: Array<{
    text: string
    sentiment: {
      label: string
      score: number
    }
    source: string
    rating?: number
  }>
}

export default function SentimentAnalysis() {
  const [restaurantName, setRestaurantName] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null)
  const [error, setError] = useState('')
  const [showDetailedReviews, setShowDetailedReviews] = useState(false)

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!restaurantName.trim()) return

    setIsAnalyzing(true)
    setError('')
    setAnalysisData(null)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          restaurantName: restaurantName.trim(),
          includeReviewText: showDetailedReviews
        }),
      })

      const data = await response.json()

      if (data.success) {
        setAnalysisData(data.data)
      } else {
        setError(data.error || 'Analysis failed')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return <TrendingUp className="w-5 h-5 text-green-500" />
      case 'negative':
        return <TrendingDown className="w-5 h-5 text-red-500" />
      default:
        return <Minus className="w-5 h-5 text-yellow-500" />
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'negative':
        return 'text-red-600 bg-red-50 border-red-200'
      default:
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <BarChart3 className="w-4 h-4" />
          <span>AI-Powered Restaurant Intelligence</span>
        </div>
        <h1 className="text-3xl font-bold text-stone-900 mb-2">
          Restaurant Sentiment Analysis
        </h1>
        <p className="text-stone-600">
          Analyze competitor reviews and understand customer sentiment with AI
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleAnalyze} className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              placeholder="Enter restaurant name (e.g., 'Joe's Italian Kitchen')"
              className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              disabled={isAnalyzing}
            />
          </div>
          <button
            type="submit"
            disabled={isAnalyzing || !restaurantName.trim()}
            className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg hover:from-amber-700 hover:to-amber-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 font-medium"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Analyze</span>
              </>
            )}
          </button>
        </div>
        
        <div className="mt-3">
          <label className="flex items-center space-x-2 text-sm text-stone-600">
            <input
              type="checkbox"
              checked={showDetailedReviews}
              onChange={(e) => setShowDetailedReviews(e.target.checked)}
              className="rounded border-stone-300 text-amber-600 focus:ring-amber-500"
            />
            <span>Include detailed review analysis</span>
          </label>
        </div>
      </form>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <span className="text-red-700">{error}</span>
        </div>
      )}

      {/* Analysis Results */}
      {analysisData && (
        <div className="space-y-6">
          {/* Restaurant Header */}
          <div className="bg-white rounded-xl shadow-lg border border-stone-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-stone-900">
                {analysisData.restaurantName}
              </h2>
              {analysisData.averageRating && (
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="font-semibold text-stone-700">
                    {analysisData.averageRating}
                  </span>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-stone-900">
                  {analysisData.summary.totalReviews}
                </div>
                <div className="text-sm text-stone-600">Total Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {analysisData.summary.positive}%
                </div>
                <div className="text-sm text-stone-600">Positive</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {analysisData.summary.negative}%
                </div>
                <div className="text-sm text-stone-600">Negative</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {analysisData.summary.neutral}%
                </div>
                <div className="text-sm text-stone-600">Neutral</div>
              </div>
            </div>
          </div>

          {/* Overall Sentiment */}
          <div className="bg-white rounded-xl shadow-lg border border-stone-200 p-6">
            <h3 className="text-lg font-semibold text-stone-900 mb-4">Overall Sentiment</h3>
            <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full border ${getSentimentColor(analysisData.summary.overall)}`}>
              {getSentimentIcon(analysisData.summary.overall)}
              <span className="font-medium capitalize">
                {analysisData.summary.overall}
              </span>
              <span className="text-sm">
                (Score: {analysisData.summary.averageScore})
              </span>
            </div>
          </div>

          {/* Sentiment Distribution Chart */}
          <div className="bg-white rounded-xl shadow-lg border border-stone-200 p-6">
            <h3 className="text-lg font-semibold text-stone-900 mb-4">Sentiment Distribution</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-16 text-sm text-stone-600">Positive</div>
                <div className="flex-1 bg-stone-200 rounded-full h-3">
                  <div 
                    className="bg-green-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${analysisData.summary.positive}%` }}
                  ></div>
                </div>
                <div className="w-12 text-sm font-medium text-stone-700">
                  {analysisData.summary.positive}%
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-16 text-sm text-stone-600">Negative</div>
                <div className="flex-1 bg-stone-200 rounded-full h-3">
                  <div 
                    className="bg-red-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${analysisData.summary.negative}%` }}
                  ></div>
                </div>
                <div className="w-12 text-sm font-medium text-stone-700">
                  {analysisData.summary.negative}%
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-16 text-sm text-stone-600">Neutral</div>
                <div className="flex-1 bg-stone-200 rounded-full h-3">
                  <div 
                    className="bg-yellow-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${analysisData.summary.neutral}%` }}
                  ></div>
                </div>
                <div className="w-12 text-sm font-medium text-stone-700">
                  {analysisData.summary.neutral}%
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Reviews */}
          {analysisData.reviews && analysisData.reviews.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg border border-stone-200 p-6">
              <h3 className="text-lg font-semibold text-stone-900 mb-4 flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>Review Analysis</span>
              </h3>
              <div className="space-y-4">
                {analysisData.reviews.map((review, index) => (
                  <div key={index} className="border border-stone-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getSentimentColor(review.sentiment.label)}`}>
                          {review.sentiment.label}
                        </span>
                        <span className="text-xs text-stone-500">
                          {review.source}
                        </span>
                        {review.rating && (
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            <span className="text-xs text-stone-600">{review.rating}</span>
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-stone-500">
                        Confidence: {Math.round(review.sentiment.score * 100)}%
                      </span>
                    </div>
                    <p className="text-stone-700 text-sm leading-relaxed">
                      {review.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
