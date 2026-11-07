import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

const resendApiKey = process.env.RESEND_API_KEY
const resend = new Resend(resendApiKey)

interface ContactRequestBody {
  name?: string
  email?: string
  company?: string
  service?: string
  details?: string
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    const { name, email, company, service, details } = (req.body || {}) as ContactRequestBody

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Name is required' })
    }

    if (!email || !email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({ error: 'Valid email address is required' })
    }

    if (!details || details.trim().length < 5) {
      return res.status(400).json({ error: 'Project details are required' })
    }

    const cleanName = escapeHtml(name.trim())
    const cleanEmail = escapeHtml(email.trim())
    const cleanCompany = company ? escapeHtml(company.trim()) : 'Not specified'
    const cleanService = service ? escapeHtml(service.trim()) : 'General Inquiry'
    const cleanDetails = escapeHtml(details.trim()).replace(/\n/g, '<br/>')

    // 1. Send Internal Team Notification
    const adminNotificationPromise = resend.emails.send({
      from: 'Articulus Inquiries <contact@mail.articulus.space>',
      to: ['contact@articulus.tech', 'articulus.tech@gmail.com'],
      replyTo: `${name.trim()} <${email.trim()}>`,
      subject: `New Inquiry: ${cleanName} — ${cleanService}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0c; color: #ededed; border: 1px solid #1e2229; border-radius: 12px; overflow: hidden; padding: 28px 32px;">
          <div style="display: flex; align-items: center; margin-bottom: 24px; border-bottom: 1px solid #1a1e26; padding-bottom: 16px;">
            <div style="font-size: 20px; font-weight: 700; letter-spacing: -0.02em; color: #ffffff;">ARTICULUS</div>
            <div style="margin-left: auto; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #10b981; background: rgba(16, 185, 129, 0.12); padding: 4px 10px; border-radius: 9999px; border: 1px solid rgba(16, 185, 129, 0.3);">New Inquiry</div>
          </div>

          <h2 style="font-size: 18px; font-weight: 600; color: #ffffff; margin: 0 0 16px 0;">Client Submission Details</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 8px 0; color: #8892b0; font-size: 13px; width: 100px;">Name</td>
              <td style="padding: 8px 0; color: #f0f0f0; font-size: 14px; font-weight: 500;">${cleanName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #8892b0; font-size: 13px;">Email</td>
              <td style="padding: 8px 0; color: #38bdf8; font-size: 14px;"><a href="mailto:${cleanEmail}" style="color: #38bdf8; text-decoration: none;">${cleanEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #8892b0; font-size: 13px;">Company</td>
              <td style="padding: 8px 0; color: #f0f0f0; font-size: 14px;">${cleanCompany}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #8892b0; font-size: 13px;">Service Area</td>
              <td style="padding: 8px 0; color: #10b981; font-size: 14px; font-weight: 500;">${cleanService}</td>
            </tr>
          </table>

          <div style="background: #11141a; border: 1px solid #1a202c; border-radius: 8px; padding: 18px 20px; margin-bottom: 24px;">
            <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #8892b0; margin-bottom: 8px;">Scope & Requirements</div>
            <div style="font-size: 14px; line-height: 1.6; color: #e2e8f0;">${cleanDetails}</div>
          </div>

          <div style="font-size: 12px; color: #525f7f; border-top: 1px solid #1a1e26; padding-top: 16px;">
            To reply directly to ${cleanName}, simply hit reply to this email.
          </div>
        </div>
      `,
    })

    // 2. Send Auto-Confirmation to Client
    const clientConfirmationPromise = resend.emails.send({
      from: 'Articulus <contact@mail.articulus.space>',
      to: [email.trim()],
      subject: 'Inquiry Received — Articulus',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 580px; margin: 0 auto; background: #0a0a0c; color: #ededed; border: 1px solid #1e2229; border-radius: 12px; overflow: hidden; padding: 32px 36px;">
          <div style="margin-bottom: 24px;">
            <div style="font-size: 20px; font-weight: 700; letter-spacing: -0.02em; color: #ffffff;">ARTICULUS</div>
          </div>

          <h1 style="font-size: 22px; font-weight: 600; color: #ffffff; margin: 0 0 16px 0; letter-spacing: -0.01em;">
            Thank you, ${cleanName}.
          </h1>

          <p style="font-size: 14px; line-height: 1.65; color: #94a3b8; margin: 0 0 20px 0;">
            We have safely received your inquiry regarding <strong>${cleanService}</strong>. Our team is reviewing your requirements and will reach out with initial technical observations and next steps within 24 hours.
          </p>

          <div style="background: #11141a; border: 1px solid #1a202c; border-radius: 8px; padding: 18px 20px; margin-bottom: 24px;">
            <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; margin-bottom: 8px;">Summary of Your Submission</div>
            <div style="font-size: 13px; line-height: 1.6; color: #cbd5e1;">${cleanDetails}</div>
          </div>

          <p style="font-size: 13px; line-height: 1.6; color: #64748b; margin: 0 0 28px 0;">
            If you have any supplementary materials, wireframes, or API specifications, simply reply directly to this email.
          </p>

          <div style="border-top: 1px solid #1a1e26; padding-top: 20px; font-size: 12px; color: #475569;">
            Articulus — High Performance Software, AI & Autonomous Systems<br/>
            <a href="https://articulus.space" style="color: #10b981; text-decoration: none;">articulus.space</a>
          </div>
        </div>
      `,
    })

    const [adminResult, clientResult] = await Promise.allSettled([
      adminNotificationPromise,
      clientConfirmationPromise,
    ])

    return res.status(200).json({
      success: true,
      message: 'Inquiry processed and emails dispatched',
      adminStatus: adminResult.status,
      clientStatus: clientResult.status,
    })
  } catch (error: any) {
    console.error('Contact handler error:', error)
    return res.status(500).json({
      error: 'Failed to process inquiry',
      message: error?.message || 'Unknown error',
    })
  }
}

