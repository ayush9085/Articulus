import React, { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

interface ServiceItem {
  id: string
  title: string
  description: string
  category: string
  capabilities: string[]
  deliverables: string[]
  architecture: {
    input: string
    processing: string
    output: string
  }
}

const services: ServiceItem[] = [
  {
    id: '01',
    title: 'Web Development',
    description: 'Business websites, web applications, dashboards and custom digital experiences.',
    category: 'DIGITAL INFRASTRUCTURE',
    capabilities: ['Next-Gen Frontend', 'High-Frequency State', 'Design Systems', 'Interactive Graphics'],
    deliverables: ['Custom Web Applications', 'Executive Dashboards', 'Brand Flagship Websites', 'Client Portals'],
    architecture: {
      input: 'Business Requirements & UX Specs',
      processing: 'Modular Architecture · Strict TypeScript · Responsive Layout Engine',
      output: 'Production-Grade, Sub-second Web Systems',
    },
  },
  {
    id: '02',
    title: 'AI & Automation',
    description: 'AI workflows, agents, integrations and business process automation.',
    category: 'SYSTEM AUTOMATION',
    capabilities: ['Workflow Synthesis', 'Event-Driven Pipes', 'Custom Connectors', 'Operational Efficiency'],
    deliverables: ['Autonomous Workflows', 'Custom CRM/ERP Automations', 'Data Processing Pipelines', 'Internal Bot Systems'],
    architecture: {
      input: 'Disjointed Manual Processes & APIs',
      processing: 'Intelligent Orchestration · Fail-safe Retries · Webhook Routing',
      output: 'Continuous Self-Operating Business Loops',
    },
  },
  {
    id: '03',
    title: 'AI Agents & RAG',
    description: 'Knowledge systems, intelligent assistants and retrieval-based applications.',
    category: 'DECISION & REASONING',
    capabilities: ['Vector Retrieval', 'Multi-Agent Networks', 'Domain Semantic Search', 'Deterministic Guardrails'],
    deliverables: ['Enterprise RAG Systems', 'Context-Aware AI Assistants', 'Automated Research Copilots', 'Document Intelligence'],
    architecture: {
      input: 'Unstructured Proprietary Knowledge & Docs',
      processing: 'Hybrid Vector Embeddings · Reranking · Grounded Synthesis',
      output: 'Hallucination-Resistant Intelligence',
    },
  },
  {
    id: '04',
    title: 'SEO & Search Optimization',
    description: 'Technical SEO, search strategy, content optimization and visibility.',
    category: 'DISCOVERY ENGINE',
    capabilities: ['Structured Data', 'Core Web Vitals Engineering', 'Information Architecture', 'Semantic Relevance'],
    deliverables: ['Technical SEO Audits', 'Structured Schema Graph', 'Performance Optimization', 'Search Visibility Strategy'],
    architecture: {
      input: 'Digital Surface & Competitive Query Landscape',
      processing: 'Lighthouse CWV Optimization · Semantic Entity Mapping · Indexability Tuning',
      output: 'Durable Organic Search Dominance',
    },
  },
  {
    id: '05',
    title: 'Research & Intelligence',
    description: 'Market, competitor, industry and customer research.',
    category: 'STRATEGIC ANALYSIS',
    capabilities: ['Data Triangulation', 'Market Topology', 'Technology Landscaping', 'Competitive Benchmarking'],
    deliverables: ['Comprehensive Intelligence Reports', 'Competitive Landscape Matrix', 'Market Feasibility Dossiers', 'Strategic Insights'],
    architecture: {
      input: 'Fragmented Market Signals & Industry Data',
      processing: 'Multi-source Data Extraction · Rigorous Verification · Pattern Analysis',
      output: 'High-Conviction Strategic Clarity',
    },
  },
  {
    id: '06',
    title: 'Software & MVP Development',
    description: 'MVPs, internal tools, SaaS prototypes and custom software.',
    category: 'PRODUCT ENGINEERING',
    capabilities: ['Full-Stack Rapid Delivery', 'Cloud-Native Architecture', 'Clean Database Schemas', 'Security Baseline'],
    deliverables: ['Production-Ready MVPs', 'Internal Operations Tooling', 'SaaS Prototype Backbones', 'Custom Business Software'],
    architecture: {
      input: 'Core Problem Statement & Target User Workflows',
      processing: 'Modular Monolith / Microservices · Relational Schemas · Secure APIs',
      output: 'Scalable Software Foundation Ready for Market',
    },
  },
  {
    id: '07',
    title: 'Technical Consulting',
    description: 'Architecture, technology strategy, AI implementation and technical planning.',
    category: 'ADVISORY & GOVERNANCE',
    capabilities: ['Systems Audit', 'Tech Stack Evaluation', 'Scalability Planning', 'AI Feasibility Analysis'],
    deliverables: ['Architectural Blueprints', 'Modernization Roadmaps', 'Security & Scale Review', 'Implementation Advisory'],
    architecture: {
      input: 'Complex Architectural Bottlenecks & Strategic Goals',
      processing: 'Deep Codebase & Infra Analysis · Cost/Performance Tradeoff Modeling',
      output: 'Actionable Technology Execution Roadmap',
    },
  },
]

export const Services: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('01')
  const shouldReduceMotion = useReducedMotion()

  const currentService = services.find((s) => s.id === activeId) || services[0]

  return (
    <section id="services" className="relative py-24 sm:py-32 border-b border-subtle-border overflow-hidden">
      {/* Background ambient dual glow */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 rounded-full bg-accent-blue/[0.06] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-24 w-96 h-96 rounded-full bg-accent-green/[0.05] blur-[120px] pointer-events-none" />

      <div className="max-w-content mx-auto px-5 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-2xl mb-16 sm:mb-20 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-subtle-border bg-gradient-to-r from-accent-blue/[0.08] to-accent-green/[0.08]">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
            <p className="text-xs sm:text-[13px] font-medium tracking-[0.22em] text-accent-blue uppercase">
              WHAT WE DO
            </p>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-tight text-primary-text leading-[1.15]">
            Technology for real problems.
          </h2>
          <p className="text-base sm:text-lg text-secondary-text leading-relaxed">
            We combine software engineering, artificial intelligence, research and digital expertise to solve complex business problems.
          </p>
        </motion.div>

        {/* Desktop Split Architecture: Interactive Service Index + Live Technical Dossier */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-start">
          
          {/* Left Column (7 cols): The 7 Services Interactive Directory */}
          <div className="col-span-7 divide-y divide-subtle-border border-y border-subtle-border">
            {services.map((service) => {
              const isActive = service.id === activeId

              return (
                <div
                  key={service.id}
                  onClick={() => setActiveId(service.id)}
                  onMouseEnter={() => setActiveId(service.id)}
                  className={`group relative py-6 px-6 transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-white/[0.04] via-white/[0.02] to-transparent'
                      : 'hover:bg-white/[0.02]'
                  }`}
                >
                  {/* Left Active Glow Indicator */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-b from-accent-green to-accent-blue opacity-100 shadow-[0_0_12px_#2563EB]'
                        : 'opacity-0 group-hover:opacity-60 bg-white/30'
                    }`}
                    aria-hidden="true"
                  />

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-baseline gap-5">
                      <span
                        className={`font-mono text-sm tracking-wider transition-colors duration-200 ${
                          isActive ? 'text-accent-blue font-bold' : 'text-muted-text/70 group-hover:text-primary-text'
                        }`}
                      >
                        {service.id}
                      </span>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-3">
                          <h3
                            className={`text-xl font-semibold transition-colors duration-200 ${
                              isActive ? 'text-white' : 'text-primary-text group-hover:text-white'
                            }`}
                          >
                            {service.title}
                          </h3>
                          {isActive && (
                            <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded bg-accent-blue/15 border border-accent-blue/30 text-accent-blue uppercase">
                              INSPECTING
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-secondary-text leading-relaxed font-normal max-w-lg">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`text-lg transition-all duration-200 mt-1 ${
                        isActive
                          ? 'text-accent-blue translate-x-1'
                          : 'text-muted-text/40 group-hover:text-primary-text group-hover:translate-x-0.5'
                      }`}
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right Column (5 cols): Live Technical Blueprint / Capability Dossier */}
          <div className="col-span-5 sticky top-28">
            <div className="relative p-7 rounded-lg border border-subtle-border bg-gradient-to-br from-surface via-[#0B101D] to-background shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden">
              {/* Top Accent Gradient Rule */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-green via-accent-blue to-accent-blue-deep" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentService.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="space-y-6"
                >
                  {/* Dossier Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono tracking-[0.25em] text-accent-green uppercase font-semibold">
                        {currentService.category}
                      </span>
                      <h4 className="text-xl font-bold text-white tracking-tight">
                        {currentService.title}
                      </h4>
                    </div>
                    <span className="font-mono text-xs px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-muted-text">
                      SYS // {currentService.id}
                    </span>
                  </div>

                  {/* Architecture Pipeline Spec */}
                  <div className="space-y-2.5">
                    <p className="text-xs font-mono uppercase tracking-wider text-muted-text/80">
                      Engineering Blueprint
                    </p>
                    <div className="p-3.5 rounded bg-black/40 border border-white/[0.05] space-y-2 text-xs font-mono">
                      <div className="flex items-start gap-2">
                        <span className="text-accent-green font-bold">IN:</span>
                        <span className="text-secondary-text">{currentService.architecture.input}</span>
                      </div>
                      <div className="flex items-start gap-2 pt-1 border-t border-white/[0.04]">
                        <span className="text-accent-blue font-bold">PROC:</span>
                        <span className="text-secondary-text">{currentService.architecture.processing}</span>
                      </div>
                      <div className="flex items-start gap-2 pt-1 border-t border-white/[0.04]">
                        <span className="text-white font-bold">OUT:</span>
                        <span className="text-primary-text font-medium">{currentService.architecture.output}</span>
                      </div>
                    </div>
                  </div>

                  {/* Technical Capabilities */}
                  <div className="space-y-2.5">
                    <p className="text-xs font-mono uppercase tracking-wider text-muted-text/80">
                      Technical Capabilities
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {currentService.capabilities.map((cap) => (
                        <span
                          key={cap}
                          className="text-xs px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.08] text-secondary-text font-medium"
                        >
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* High-Impact Deliverables */}
                  <div className="space-y-2.5 pt-2 border-t border-white/[0.06]">
                    <p className="text-xs font-mono uppercase tracking-wider text-muted-text/80">
                      Key Deliverables
                    </p>
                    <ul className="grid grid-cols-1 gap-1.5 text-xs text-secondary-text">
                      {currentService.deliverables.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Direct Action */}
                  <div className="pt-2">
                    <a
                      href="#contact"
                      className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded text-xs font-medium text-primary-text bg-white/[0.04] hover:bg-gradient-to-r hover:from-accent-blue/20 hover:to-accent-green/20 border border-subtle-border hover:border-accent-blue/40 transition-all duration-200"
                    >
                      <span>Inquire about {currentService.title}</span>
                      <span className="ml-1.5">→</span>
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* Mobile & Tablet: Interactive Expanding Accordion Directory */}
        <div className="lg:hidden divide-y divide-subtle-border border-y border-subtle-border">
          {services.map((service) => {
            const isExpanded = service.id === activeId

            return (
              <div
                key={service.id}
                className="py-6 transition-colors duration-200"
              >
                <div
                  onClick={() => setActiveId(isExpanded ? '' : service.id)}
                  className="flex items-start justify-between gap-4 cursor-pointer"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-accent-blue font-bold">
                        {service.id}
                      </span>
                      <h3 className="text-xl font-semibold text-primary-text">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-sm text-secondary-text leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <span
                    className={`text-base font-mono text-muted-text transition-transform duration-200 mt-1 ${
                      isExpanded ? 'rotate-90 text-accent-blue' : ''
                    }`}
                  >
                    →
                  </span>
                </div>

                {/* Expanded Details on Mobile */}
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-white/[0.06] space-y-4 text-xs"
                  >
                    <div className="p-3 rounded bg-black/40 border border-white/[0.06] space-y-2 font-mono">
                      <div>
                        <span className="text-accent-green font-bold">BLUEPRINT: </span>
                        <span className="text-secondary-text">{service.architecture.processing}</span>
                      </div>
                      <div>
                        <span className="text-white font-bold">OUT: </span>
                        <span className="text-primary-text">{service.architecture.output}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {service.capabilities.map((cap) => (
                        <span
                          key={cap}
                          className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-secondary-text"
                        >
                          {cap}
                        </span>
                      ))}
                    </div>

                    <a
                      href="#contact"
                      className="inline-block text-xs font-medium text-accent-blue underline underline-offset-4"
                    >
                      Inquire about {service.title} →
                    </a>
                  </motion.div>
                )}
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
