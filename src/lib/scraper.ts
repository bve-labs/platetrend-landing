import * as cheerio from 'cheerio'

export interface ScrapedReview {
  text: string
  rating?: number
  author?: string
  date?: string
  source: string
}

export interface RestaurantData {
  name: string
  reviews: ScrapedReview[]
  averageRating?: number
  totalReviews?: number
}

/**
 * Scrape Google Reviews (simplified demo version)
 * Note: In production, you'd want to use proper APIs or more robust scraping
 */
export async function scrapeGoogleReviews(_restaurantName: string): Promise<ScrapedReview[]> {
  // For demo purposes, we'll return mock data
  // In production, you'd implement actual scraping logic
  // Note: restaurantName parameter is for future implementation
  const mockReviews: ScrapedReview[] = [
    {
      text: "Amazing food and great service! The pasta was perfectly cooked and the atmosphere was wonderful. Highly recommend this place for a date night.",
      rating: 5,
      author: "Sarah M.",
      date: "2 days ago",
      source: "Google"
    },
    {
      text: "Food was okay but service was really slow. Waited 45 minutes for our appetizers. The main course was good though.",
      rating: 3,
      author: "Mike R.",
      date: "1 week ago", 
      source: "Google"
    },
    {
      text: "Terrible experience. Food was cold and the staff was rude. Would not recommend to anyone. Save your money.",
      rating: 1,
      author: "Jennifer L.",
      date: "3 days ago",
      source: "Google"
    },
    {
      text: "Best Italian restaurant in town! The tiramisu is to die for. Staff is friendly and knowledgeable about the menu.",
      rating: 5,
      author: "David K.",
      date: "5 days ago",
      source: "Google"
    },
    {
      text: "Good food but a bit overpriced for the portion sizes. The ambiance is nice and it's a good spot for business meetings.",
      rating: 4,
      author: "Lisa P.",
      date: "1 week ago",
      source: "Google"
    }
  ]

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return mockReviews
}

/**
 * Scrape Yelp Reviews (simplified demo version)
 * Note: restaurantName parameter is for future implementation
 */
export async function scrapeYelpReviews(_restaurantName: string): Promise<ScrapedReview[]> {
  const mockReviews: ScrapedReview[] = [
    {
      text: "This place exceeded my expectations! The chef clearly knows what they're doing. Every dish was flavorful and beautifully presented.",
      rating: 5,
      author: "Alex T.",
      date: "4 days ago",
      source: "Yelp"
    },
    {
      text: "Mediocre at best. The soup was lukewarm and the bread was stale. For these prices, I expected much better quality.",
      rating: 2,
      author: "Rachel W.",
      date: "6 days ago",
      source: "Yelp"
    },
    {
      text: "Great atmosphere and excellent cocktails! The food was good too. Perfect for a night out with friends.",
      rating: 4,
      author: "Tom H.",
      date: "1 week ago",
      source: "Yelp"
    }
  ]

  await new Promise(resolve => setTimeout(resolve, 800))
  return mockReviews
}

/**
 * Get comprehensive restaurant data from multiple sources
 */
export async function getRestaurantData(restaurantName: string): Promise<RestaurantData> {
  try {
    const [googleReviews, yelpReviews] = await Promise.all([
      scrapeGoogleReviews(restaurantName),
      scrapeYelpReviews(restaurantName)
    ])

    const allReviews = [...googleReviews, ...yelpReviews]
    
    // Calculate average rating
    const ratingsWithValues = allReviews.filter(r => r.rating !== undefined)
    const averageRating = ratingsWithValues.length > 0 
      ? ratingsWithValues.reduce((sum, r) => sum + (r.rating || 0), 0) / ratingsWithValues.length
      : undefined

    return {
      name: restaurantName,
      reviews: allReviews,
      averageRating: averageRating ? Math.round(averageRating * 10) / 10 : undefined,
      totalReviews: allReviews.length
    }
  } catch (error) {
    console.error('Error scraping restaurant data:', error)
    throw new Error(`Failed to scrape data for ${restaurantName}`)
  }
}

/**
 * Extract clean text from HTML content
 */
export function extractTextFromHtml(html: string): string {
  const $ = cheerio.load(html)
  return $.text().trim()
}

/**
 * Validate and clean review text
 */
export function cleanReviewText(text: string): string {
  return text
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/[^\w\s.,!?-]/g, '') // Remove special characters except basic punctuation
    .trim()
    .substring(0, 500) // Limit length for API efficiency
}
