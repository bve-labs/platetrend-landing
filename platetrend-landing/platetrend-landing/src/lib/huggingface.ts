import { HfInference } from '@huggingface/inference'

// Initialize Hugging Face client
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY)

export interface SentimentResult {
  label: string
  score: number
}

export interface ReviewAnalysis {
  text: string
  sentiment: SentimentResult
  confidence: number
}

/**
 * Analyze sentiment of text using Hugging Face
 */
export async function analyzeSentiment(text: string): Promise<SentimentResult> {
  try {
    const result = await hf.textClassification({
      model: 'cardiffnlp/twitter-roberta-base-sentiment-latest',
      inputs: text
    })
    
    // Get the highest scoring result
    const topResult = Array.isArray(result) ? result[0] : result
    
    return {
      label: topResult.label,
      score: topResult.score
    }
  } catch (error) {
    console.error('Sentiment analysis error:', error)
    throw new Error('Failed to analyze sentiment')
  }
}

/**
 * Analyze multiple reviews in batch
 */
export async function analyzeReviews(reviews: string[]): Promise<ReviewAnalysis[]> {
  const analyses: ReviewAnalysis[] = []
  
  for (const review of reviews) {
    try {
      const sentiment = await analyzeSentiment(review)
      analyses.push({
        text: review,
        sentiment,
        confidence: sentiment.score
      })
      
      // Add small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100))
    } catch (error) {
      console.error(`Failed to analyze review: ${review.substring(0, 50)}...`, error)
      // Continue with other reviews even if one fails
    }
  }
  
  return analyses
}

/**
 * Get overall sentiment summary
 */
export function getSentimentSummary(analyses: ReviewAnalysis[]) {
  if (analyses.length === 0) {
    return {
      overall: 'neutral',
      positive: 0,
      negative: 0,
      neutral: 0,
      averageScore: 0,
      totalReviews: 0
    }
  }
  
  let positive = 0
  let negative = 0
  let neutral = 0
  let totalScore = 0
  
  analyses.forEach(analysis => {
    const label = analysis.sentiment.label.toLowerCase()
    if (label.includes('positive')) {
      positive++
    } else if (label.includes('negative')) {
      negative++
    } else {
      neutral++
    }
    totalScore += analysis.sentiment.score
  })
  
  const averageScore = totalScore / analyses.length
  const total = analyses.length
  
  // Determine overall sentiment
  let overall = 'neutral'
  if (positive > negative && positive > neutral) {
    overall = 'positive'
  } else if (negative > positive && negative > neutral) {
    overall = 'negative'
  }
  
  return {
    overall,
    positive: Math.round((positive / total) * 100),
    negative: Math.round((negative / total) * 100),
    neutral: Math.round((neutral / total) * 100),
    averageScore: Math.round(averageScore * 100) / 100,
    totalReviews: total
  }
}
