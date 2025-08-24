import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Lazy import Resend to avoid build-time initialization
async function getResendClient() {
  const { Resend } = await import('resend')
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY environment variable is not set')
  }
  return new Resend(apiKey)
}

// Contact form validation schema
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Please enter a valid email address'),
  restaurantName: z.string().max(100, 'Restaurant name must be less than 100 characters').optional(),
  subject: z.enum(['general', 'demo', 'pricing', 'technical', 'partnership', 'other']),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000, 'Message must be less than 2000 characters')
})

type ContactFormData = z.infer<typeof contactSchema>

interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData: ContactFormData = contactSchema.parse(body)

    const { name, email, restaurantName, subject, message } = validatedData

    // Subject mapping for better email subjects
    const subjectMap = {
      general: 'General Inquiry',
      demo: 'Demo Request',
      pricing: 'Pricing Question',
      technical: 'Technical Support',
      partnership: 'Partnership Opportunity',
      other: 'Other Inquiry'
    }

    const emailSubject = `PlateTrend Contact: ${subjectMap[subject]} - ${name}`
    
    // Email content for support team
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #f59e0b, #d97706); padding: 20px; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
        </div>
        
        <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #374151; margin-top: 0;">Contact Details</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #f59e0b;">${email}</a></p>
            ${restaurantName ? `<p><strong>Restaurant:</strong> ${restaurantName}</p>` : ''}
            <p><strong>Subject:</strong> ${subjectMap[subject]}</p>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 8px;">
            <h2 style="color: #374151; margin-top: 0;">Message</h2>
            <div style="background: #f3f4f6; padding: 15px; border-radius: 6px; border-left: 4px solid #f59e0b;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #fef3c7; border-radius: 6px; border: 1px solid #fbbf24;">
            <p style="margin: 0; color: #92400e; font-size: 14px;">
              <strong>Action Required:</strong> Please respond to this inquiry within 24 hours during business days.
            </p>
          </div>
        </div>
      </div>
    `

    // Send email to support team
    const resendClient = await getResendClient()
    const emailResponse = await resendClient.emails.send({
      from: 'PlateTrend Contact <noreply@platetrend.com>',
      to: ['support@platetrend.com'],
      replyTo: email,
      subject: emailSubject,
      html: emailHtml,
    })

    if (emailResponse.error) {
      console.error('Failed to send contact email:', emailResponse.error)
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Failed to send message. Please try again or email us directly at support@platetrend.com'
      }, { status: 500 })
    }

    // Send confirmation email to user
    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #f59e0b, #d97706); padding: 20px; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Thank You for Contacting PlateTrend</h1>
        </div>
        
        <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
          <div style="background: white; padding: 20px; border-radius: 8px;">
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              Hi ${name},
            </p>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              Thank you for reaching out to PlateTrend! We've received your message about <strong>${subjectMap[subject].toLowerCase()}</strong> and our team will get back to you within 24 hours during business days.
            </p>
            
            <div style="background: #fef3c7; padding: 15px; border-radius: 6px; border-left: 4px solid #f59e0b; margin: 20px 0;">
              <p style="margin: 0; color: #92400e; font-size: 14px;">
                <strong>Your Message:</strong><br>
                ${message.replace(/\n/g, '<br>')}
              </p>
            </div>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              In the meantime, feel free to explore our <a href="https://platetrend.com/faq" style="color: #f59e0b;">FAQ section</a> for quick answers to common questions.
            </p>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              Best regards,<br>
              <strong>The PlateTrend Team</strong>
            </p>
          </div>
        </div>
      </div>
    `

    await resendClient.emails.send({
      from: 'PlateTrend Support <support@platetrend.com>',
      to: [email],
      subject: `Thank you for contacting PlateTrend - ${subjectMap[subject]}`,
      html: confirmationHtml,
    })

    return NextResponse.json<ApiResponse>({
      success: true,
      data: { message: 'Contact form submitted successfully' }
    })

  } catch (error) {
    console.error('Contact form error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: error.issues[0].message
      }, { status: 400 })
    }

    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'An unexpected error occurred. Please try again.'
    }, { status: 500 })
  }
}
