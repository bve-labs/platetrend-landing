import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { resend } from '@/lib/resend'
import { waitlistSchema } from '@/lib/validations'
import type { ApiResponse } from '@/types'
import { z } from 'zod'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validatedData = waitlistSchema.parse(body)
    
    // Check if email already exists
    const { data: existingEntry } = await supabaseAdmin
      .from('waitlist')
      .select('id')
      .eq('email', validatedData.email)
      .single()
    
    if (existingEntry) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Email already registered'
      }, { status: 400 })
    }
    
    // Insert into database
    const { data, error } = await supabaseAdmin
      .from('waitlist')
      .insert({
        restaurant_name: validatedData.restaurantName,
        email: validatedData.email,
        location: validatedData.location,
        num_locations: validatedData.numLocations
      })
      .select()
      .single()
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Failed to save registration'
      }, { status: 500 })
    }
    
    // Send confirmation email to user
    try {
      await resend.emails.send({
        from: 'PlateTrend <noreply@resend.dev>', // Use resend.dev for now
        to: [validatedData.email],
        subject: 'Welcome to PlateTrend Early Access! 🚀',
        html: `
          <div style="max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; text-align: center; color: white;">
              <h1 style="margin: 0; font-size: 2rem;">🍽️ Welcome to PlateTrend!</h1>
              <p style="margin: 0.5rem 0 0; opacity: 0.9;">AI-Powered Restaurant Intelligence</p>
            </div>
            
            <div style="padding: 2rem; background: white;">
              <h2 style="color: #374151; margin-bottom: 1rem;">Hi ${validatedData.restaurantName} team! 👋</h2>
              
              <p style="color: #6b7280; line-height: 1.6;">Thanks for signing up for early access to PlateTrend! You're now on our exclusive waitlist and will be among the first to experience AI-powered restaurant intelligence.</p>
              
              <div style="background: #f3f4f6; padding: 1.5rem; border-radius: 8px; margin: 1.5rem 0;">
                <h3 style="color: #374151; margin-top: 0;">🎯 What's next?</h3>
                <ul style="color: #6b7280; padding-left: 1.2rem;">
                  <li>We'll notify you as soon as we launch (Q4 2025)</li>
                  <li>You'll get special early-bird pricing (up to 30% off)</li>
                  <li>Priority access to beta testing</li>
                  <li>Exclusive insights and restaurant industry reports</li>
                </ul>
              </div>
              
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 1.5rem; border-radius: 8px; text-align: center; margin: 1.5rem 0;">
                <p style="color: white; margin: 0; font-weight: 600;">🚀 Get ready to stop guessing and start winning with data-driven restaurant intelligence!</p>
              </div>
              
              <p style="color: #6b7280; line-height: 1.6; margin-bottom: 0;">Best regards,<br><strong>The PlateTrend Team</strong></p>
            </div>
            
            <div style="background: #f9fafb; padding: 1rem; text-align: center; color: #9ca3af; font-size: 0.875rem;">
              <p>You're receiving this because you signed up for PlateTrend early access.</p>
              <p>📍 Restaurant: ${validatedData.restaurantName} | ${validatedData.location}</p>
            </div>
          </div>
        `
      })
      
      // Send notification to admin
      await resend.emails.send({
        from: 'PlateTrend <noreply@resend.dev>',
        to: [process.env.ADMIN_EMAIL!],
        subject: '🔔 New PlateTrend Waitlist Signup',
        html: `
          <div style="max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <div style="background: #16a34a; padding: 1.5rem; text-align: center; color: white;">
              <h1 style="margin: 0;">🎉 New Waitlist Signup!</h1>
            </div>
            
            <div style="padding: 2rem; background: white; border: 1px solid #e5e7eb;">
              <h2 style="color: #374151; margin-bottom: 1rem;">Restaurant Details:</h2>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 0.75rem; font-weight: 600; color: #374151;">Restaurant:</td>
                  <td style="padding: 0.75rem; color: #6b7280;">${validatedData.restaurantName}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 0.75rem; font-weight: 600; color: #374151;">Email:</td>
                  <td style="padding: 0.75rem; color: #6b7280;">${validatedData.email}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 0.75rem; font-weight: 600; color: #374151;">Location:</td>
                  <td style="padding: 0.75rem; color: #6b7280;">${validatedData.location}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 0.75rem; font-weight: 600; color: #374151;">Locations:</td>
                  <td style="padding: 0.75rem; color: #6b7280;">${validatedData.numLocations}</td>
                </tr>
                <tr>
                  <td style="padding: 0.75rem; font-weight: 600; color: #374151;">Signed up:</td>
                  <td style="padding: 0.75rem; color: #6b7280;">${new Date().toLocaleString()}</td>
                </tr>
              </table>
              
              <div style="margin-top: 1.5rem; padding: 1rem; background: #f0f9ff; border-radius: 8px;">
                <p style="margin: 0; color: #0369a1; font-weight: 600;">💡 Follow up suggestions:</p>
                <ul style="color: #0369a1; margin: 0.5rem 0; padding-left: 1.2rem;">
                  <li>Research their current competitors</li>
                  <li>Prepare personalized demo data</li>
                  <li>Add to launch notification list</li>
                </ul>
              </div>
            </div>
          </div>
        `
      })
      
      console.log('✅ Emails sent successfully')
    } catch (emailError) {
      console.error('❌ Email error:', emailError)
      // Don't fail the request if email fails - user is still registered
    }
    
    return NextResponse.json<ApiResponse>({
      success: true,
      message: 'Successfully registered for early access!',
      data: { id: data.id }
    })
    
  } catch (error) {
    console.error('API error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: error.issues[0].message
      }, { status: 400 })
    }
    
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('waitlist')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      throw error
    }
    
    return NextResponse.json<ApiResponse>({
      success: true,
      data: {
        entries: data,
        count: data.length
      }
    })
  } catch (error) {
    console.error('GET error:', error)
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Failed to fetch waitlist'
    }, { status: 500 })
  }
}