import React, { useState } from 'react'

interface FormData {
  name: string
  email: string
  company: string
  service: string
  details: string
}

const helpOptions = [
  'Web Development',
  'AI & Automation',
  'AI Agents & RAG',
  'SEO & Search Optimization',
  'Research & Intelligence',
  'Software & MVP Development',
  'Technical Consulting',
  'Other',
]

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    service: 'Web Development',
    details: '',
  })

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your name.'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.'
    }

    if (!formData.details.trim()) {
      newErrors.details = 'Please describe your project or requirements.'
    } else if (formData.details.trim().length < 10) {
      newErrors.details = 'Please provide a little more detail (at least 10 characters).'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    if (!validate()) {
      return
    }

    setIsSubmitting(true)

    try {
      const contactApiUrl = import.meta.env.VITE_CONTACT_API_URL
      const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'contact@articulus.tech'

      if (contactApiUrl && contactApiUrl.trim() !== '') {
        const response = await fetch(contactApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            recipient: contactEmail,
            timestamp: new Date().toISOString(),
          }),
        })

        if (!response.ok) {
          throw new Error('Server responded with an error.')
        }
      } else {
        // Safe development simulation fallback
        await new Promise((resolve) => setTimeout(resolve, 600))
        console.info('[Articulus Inquiry Received]', {
          to: contactEmail,
          data: formData,
        })
      }

      setIsSuccess(true)
    } catch {
      setErrorMessage(
        'Unable to send your request at this moment. Please check your connection or try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="relative p-8 sm:p-10 rounded border border-subtle-border bg-gradient-to-br from-surface to-background space-y-4 animate-in fade-in duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
        {/* Subtle top gradient accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-green to-accent-blue" />

        <div className="w-12 h-12 rounded-full bg-accent-green/10 border border-accent-green/40 flex items-center justify-center text-accent-green text-xl mb-2 shadow-[0_0_16px_rgba(16,185,129,0.25)]">
          ✓
        </div>
        <h3 className="text-2xl font-bold text-primary-text">
          Request received.
        </h3>
        <p className="text-secondary-text leading-relaxed max-w-lg">
          Thanks for reaching out. We've received your request and will get back to you shortly.
        </p>
        <div className="pt-4">
          <button
            type="button"
            onClick={() => {
              setIsSuccess(false)
              setFormData({
                name: '',
                email: '',
                company: '',
                service: 'Web Development',
                details: '',
              })
            }}
            className="text-sm font-medium text-accent-blue hover:text-blue-400 underline underline-offset-4 transition-colors"
          >
            Send another inquiry
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {errorMessage && (
        <div
          role="alert"
          className="p-4 rounded border border-red-500/30 bg-red-500/10 text-red-200 text-sm"
        >
          {errorMessage}
        </div>
      )}

      {/* Grid: Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-secondary-text mb-2">
            Name <span className="text-accent-blue" aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={`w-full px-4 py-3 rounded bg-surface border ${
              errors.name ? 'border-red-500' : 'border-subtle-border focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/30'
            } text-primary-text placeholder-muted-text/50 text-sm transition-all duration-150 focus:outline-none`}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-xs text-red-400">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-secondary-text mb-2">
            Email <span className="text-accent-blue" aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="you@company.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={`w-full px-4 py-3 rounded bg-surface border ${
              errors.email ? 'border-red-500' : 'border-subtle-border focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/30'
            } text-primary-text placeholder-muted-text/50 text-sm transition-all duration-150 focus:outline-none`}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs text-red-400">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Grid: Company & Help With */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-secondary-text mb-2">
            Company <span className="text-muted-text/60 text-xs font-normal">(Optional)</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            value={formData.company}
            onChange={handleChange}
            placeholder="Organization or project"
            className="w-full px-4 py-3 rounded bg-surface border border-subtle-border focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/30 text-primary-text placeholder-muted-text/50 text-sm transition-all duration-150 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="service" className="block text-sm font-medium text-secondary-text mb-2">
            What can we help with?
          </label>
          <div className="relative">
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded bg-surface border border-subtle-border focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/30 text-primary-text text-sm transition-all duration-150 focus:outline-none appearance-none pr-10 cursor-pointer"
            >
              {helpOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-surface text-primary-text">
                  {opt}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted-text">
              <span className="text-xs">▼</span>
            </div>
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div>
        <label htmlFor="details" className="block text-sm font-medium text-secondary-text mb-2">
          Project details <span className="text-accent-blue" aria-hidden="true">*</span>
        </label>
        <textarea
          id="details"
          name="details"
          rows={5}
          required
          value={formData.details}
          onChange={handleChange}
          placeholder="Tell us about what you are looking to build, optimize, or solve..."
          aria-invalid={Boolean(errors.details)}
          aria-describedby={errors.details ? 'details-error' : undefined}
          className={`w-full px-4 py-3 rounded bg-surface border ${
            errors.details ? 'border-red-500' : 'border-subtle-border focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/30'
          } text-primary-text placeholder-muted-text/50 text-sm transition-all duration-150 focus:outline-none resize-y`}
        />
        {errors.details && (
          <p id="details-error" className="mt-1.5 text-xs text-red-400">
            {errors.details}
          </p>
        )}
      </div>

      {/* Submit Button with Gradient Accent */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex items-center justify-center px-8 py-3.5 rounded text-sm sm:text-base font-medium bg-gradient-to-r from-accent-blue via-blue-600 to-indigo-700 hover:from-blue-500 hover:to-accent-blue disabled:opacity-50 disabled:cursor-not-allowed text-white transition-all duration-200 shadow-[0_4px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_28px_rgba(37,99,235,0.45)] hover:-translate-y-0.5"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              Sending...
            </span>
          ) : (
            <>
              <span>Send Request</span>
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-150">→</span>
            </>
          )}
        </button>
      </div>
    </form>
  )
}
