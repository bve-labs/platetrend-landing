import { z } from 'zod'

export const waitlistSchema = z.object({
  restaurantName: z.string().min(1, 'Restaurant name is required').max(100),
  email: z.string().email('Please enter a valid email address'),
  location: z.string().min(1, 'Location is required').max(100),
  numLocations: z.enum(['1', '2-5', '6-10', '10+'], 'Please select number of locations')
})

export type WaitlistFormData = z.infer<typeof waitlistSchema>