export interface WaitlistEntry {
    id: string
    restaurant_name: string
    email: string
    location: string
    num_locations: string
    created_at: string
    updated_at: string
  }
  
  export interface ApiResponse<T = unknown> {
    success: boolean
    data?: T
    error?: string
    message?: string
  }