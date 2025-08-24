import { NextRequest, NextResponse } from 'next/server'
import { getRestaurantData } from '@/lib/scraper'
import { analyzeReviews, getSentimentSummary } from '@/lib/huggingface'
import { z } from 'zod'

const analyzeSchema = z.object({
  restaurantName: z.string().min(1, 'Restaurant name is required').max(100),
  includeReviewText: z.boolean().optional().default(false)
})

export interface AnalysisResponse {
  success: boolean
  data?: {
    restaurantName: string
    summary: {
      overall: string
      positive: number
      negative: number
      neutral: number
      averageScore: number
      totalReviews: number
    }
    reviews?: Array<{
      text: string
      sentiment: {
        label: string
        score: number
      }
      source: string
      rating?: number
    }>
    averageRating?: number
  }
  error?: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { restaurantName, includeReviewText } = analyzeSchema.parse(body)

    // Step 1: Scrape restaurant data
    console.log(`🔍 Scraping data for: ${restaurantName}`)
    const restaurantData = await getRestaurantData(restaurantName)
    
    if (restaurantData.reviews.length === 0) {
      return NextResponse.json<AnalysisResponse>({
        success: false,
        error: 'No reviews found for this restaurant'
      }, { status: 404 })
    }

    // Step 2: Analyze sentiment of reviews
    console.log(`🤖 Analyzing sentiment for ${restaurantData.reviews.length} reviews`)
    const reviewTexts = restaurantData.reviews.map(r => r.text)
    const analyses = await analyzeReviews(reviewTexts)
    
    // Step 3: Generate summary
    const summary = getSentimentSummary(analyses)
    
    // Step 4: Prepare response
    const responseData: {
      restaurantName: string
      summary: typeof summary
      averageRating?: number
      reviews?: Array<{
        text: string
        sentiment: { label: string; score: number }
        source: string
        rating?: number
      }>
    } = {
      restaurantName,
      summary,
      averageRating: restaurantData.averageRating
    }

    // Include detailed review analysis if requested
    if (includeReviewText) {
      (responseData as any).reviews = analyses.map((analysis, index) => ({
        text: analysis.text,
        sentiment: analysis.sentiment,
        source: restaurantData.reviews[index]?.source || 'Unknown',
        rating: restaurantData.reviews[index]?.rating
      }))
    }

    console.log(`✅ Analysis complete for ${restaurantName}:`, summary)

    return NextResponse.json<AnalysisResponse>({
      success: true,
      data: responseData
    })

  } catch (error) {
    console.error('Analysis API error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json<AnalysisResponse>({
        success: false,
        error: error.issues[0].message
      }, { status: 400 })
    }

    // Check for Hugging Face API errors
    if (error instanceof Error && error.message.includes('Failed to analyze sentiment')) {
      return NextResponse.json<AnalysisResponse>({
        success: false,
        error: 'AI analysis service temporarily unavailable. Please try again later.'
      }, { status: 503 })
    }

    return NextResponse.json<AnalysisResponse>({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Restaurant Sentiment Analysis API',
    endpoints: {
      'POST /api/analyze': 'Analyze restaurant sentiment',
      'parameters': {
        'restaurantName': 'string (required)',
        'includeReviewText': 'boolean (optional, default: false)'
      }
    }
  })
}
