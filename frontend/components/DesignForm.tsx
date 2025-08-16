'use client'

import { useState } from 'react'
import { Send, Palette, Shield, Eye } from 'lucide-react'

interface DesignFormProps {
  onSubmit: (data: any) => void
  isGenerating: boolean
}

export function DesignForm({ onSubmit, isGenerating }: DesignFormProps) {
  const [formData, setFormData] = useState({
    purpose: 'Research copilot for a knowledge base',
    audience: 'Analysts and PMs',
    tone: 'calm, precise, credible',
    subject: 'knowledge work',
    brand: '#0EA5E9 as primary, #22C55E as success',
    constraints: 'dark+light themes, AA contrast, prefers shadcn',
    ai_use_cases: 'RAG search, multi-agent tool use with citations',
    latency_budget: 1800,
    needs_citations: 'true',
    safety_level: 'moderate',
    telemetry_opt_in: 'off',
    out_dir: 'ui-agent-output'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="card-gradient float">
      <div className="flex items-center space-x-3 mb-8">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-lg opacity-30"></div>
          <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
            <Palette className="h-5 w-5 text-white" />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold gradient-text">Design Brief</h2>
          <p className="text-sm text-muted-foreground">Tell us about your project</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
                 {/* Purpose */}
         <div>
           <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
             Project Type
           </label>
           <select
             value={formData.purpose}
             onChange={(e) => handleChange('purpose', e.target.value)}
             className="input-field"
             disabled={isGenerating}
           >
             <optgroup label="🚀 GenAI Integration Projects">
               <option value="AI-Powered Code Review & Refactoring Assistant">Code Review & Refactoring Assistant</option>
               <option value="Intelligent Document Processing & Knowledge Base">Document Processing & Knowledge Base</option>
               <option value="AI-Powered Resume Parser & Job Matcher">Resume Parser & Job Matcher</option>
               <option value="Real-Time AI Content Moderation System">Content Moderation System</option>
               <option value="AI-Powered Financial Analysis & Trading Bot">Financial Analysis & Trading Bot</option>
               <option value="Intelligent Customer Support Chatbot">Customer Support Chatbot</option>
               <option value="AI-Powered Medical Diagnosis Assistant">Medical Diagnosis Assistant</option>
               <option value="Smart Contract Analysis & Security Auditor">Smart Contract Security Auditor</option>
               <option value="AI-Powered Video Content Generator">Video Content Generator</option>
               <option value="Intelligent Supply Chain Optimization System">Supply Chain Optimization</option>
             </optgroup>
             
             <optgroup label="🤖 Multi-AI Agent Systems">
               <option value="Autonomous Research & Report Generation System">Research & Report Generation</option>
               <option value="Multi-Agent Software Development Team">Software Development Team</option>
               <option value="Intelligent E-commerce Management System">E-commerce Management</option>
               <option value="AI-Powered Legal Document Analysis">Legal Document Analysis</option>
               <option value="Autonomous Data Science Pipeline">Data Science Pipeline</option>
               <option value="Multi-Agent Cybersecurity Defense System">Cybersecurity Defense</option>
               <option value="Intelligent Healthcare Diagnosis & Treatment">Healthcare Diagnosis & Treatment</option>
               <option value="Autonomous Financial Trading & Portfolio Management">Financial Trading & Portfolio</option>
               <option value="Multi-Agent Content Creation & Marketing System">Content Creation & Marketing</option>
               <option value="Intelligent Smart City Management System">Smart City Management</option>
             </optgroup>
             
             <optgroup label="🎯 API-Focused GenAI Projects">
               <option value="Universal RAG Chatbot">Universal RAG Chatbot</option>
               <option value="AI Meeting Notes & Action Items">Meeting Notes & Action Items</option>
               <option value="Multilingual Customer Support Reply Generator">Multilingual Support Generator</option>
               <option value="Smart Contract Clause Explainer">Smart Contract Explainer</option>
               <option value="Podcast to Blog Post Converter">Podcast to Blog Converter</option>
               <option value="Website Content Refresher">Website Content Refresher</option>
               <option value="Resume & Cover Letter Personalizer">Resume & Cover Letter Personalizer</option>
               <option value="Learning Path Generator">Learning Path Generator</option>
               <option value="Auto Blog Post Series Creator">Blog Post Series Creator</option>
               <option value="AI Email Campaign Writer">Email Campaign Writer</option>
             </optgroup>
             
             <optgroup label="🏢 Business Automation Systems">
               <option value="Startup Idea to Pitch Deck Crew">Startup to Pitch Deck</option>
               <option value="Social Media Factory">Social Media Factory</option>
               <option value="Automated Research Department">Research Department</option>
               <option value="AI Content Localizer">Content Localizer</option>
               <option value="Recruitment Flow AI">Recruitment Flow AI</option>
               <option value="Real Estate Investment Finder">Real Estate Investment Finder</option>
               <option value="Conference Planning Crew">Conference Planning</option>
               <option value="B2B Sales Prospecting AI">B2B Sales Prospecting</option>
               <option value="SEO Growth Team">SEO Growth Team</option>
               <option value="E-Commerce Launch Crew">E-Commerce Launch</option>
             </optgroup>
             
             <optgroup label="🎨 Creative & Content Projects">
               <option value="AI-Driven Music Composition Tool">Music Composition Tool</option>
               <option value="Realistic Synthetic Data Generator">Synthetic Data Generator</option>
               <option value="Real-Time AI-Powered Text-to-3D Model Generator">Text-to-3D Generator</option>
               <option value="Dynamic Video Storyboard Creator">Video Storyboard Creator</option>
               <option value="Creative Content Generator for Social Media">Social Media Content Generator</option>
               <option value="AI Knowledgebase + Chat">Knowledgebase + Chat</option>
               <option value="Automated Market Researcher">Market Researcher</option>
               <option value="AI Code Review Bot">Code Review Bot</option>
               <option value="Multilingual Marketing Copywriter">Marketing Copywriter</option>
               <option value="AI Video Script Generator">Video Script Generator</option>
             </optgroup>
             
             <optgroup label="🔧 Developer Tools & Automation">
               <option value="Personal AI-Powered Codebase Documentation Tool">Codebase Documentation Tool</option>
               <option value="Local Retrieval-Augmented Generation (RAG) System">Local RAG System</option>
               <option value="Customer Support Email Drafting AI">Email Drafting AI</option>
               <option value="Contract Clause Analyzer">Contract Analyzer</option>
               <option value="AI Lesson Plan Creator">Lesson Plan Creator</option>
               <option value="Podcast Topic & Script Generator">Podcast Generator</option>
               <option value="A Customer Support Chatbot with Hallucination Correction">Chatbot with Hallucination Correction</option>
               <option value="Automated Market Research and Report Generation Team">Market Research Team</option>
               <option value="Cybersecurity Threat Analysis Team">Cybersecurity Analysis Team</option>
               <option value="Financial Portfolio Management System">Portfolio Management</option>
             </optgroup>
           </select>
         </div>

                 {/* Audience */}
         <div>
           <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
             Target Audience
           </label>
           <select
             value={formData.audience}
             onChange={(e) => handleChange('audience', e.target.value)}
             className="input-field"
             disabled={isGenerating}
           >
             <optgroup label="👨‍💼 Business & Enterprise">
               <option value="Enterprise executives and decision makers">Enterprise Executives</option>
               <option value="Product managers and business analysts">Product Managers & Analysts</option>
               <option value="HR and recruitment professionals">HR & Recruitment Professionals</option>
               <option value="Marketing and sales teams">Marketing & Sales Teams</option>
               <option value="Legal and compliance teams">Legal & Compliance Teams</option>
               <option value="Finance and investment professionals">Finance & Investment Professionals</option>
               <option value="Operations and supply chain managers">Operations & Supply Chain</option>
             </optgroup>
             
             <optgroup label="👨‍💻 Technology & Development">
               <option value="Software developers and engineers">Software Developers & Engineers</option>
               <option value="DevOps and platform engineers">DevOps & Platform Engineers</option>
               <option value="Data scientists and ML engineers">Data Scientists & ML Engineers</option>
               <option value="Cybersecurity professionals">Cybersecurity Professionals</option>
               <option value="Blockchain and Web3 developers">Blockchain & Web3 Developers</option>
               <option value="AI/ML researchers and practitioners">AI/ML Researchers</option>
               <option value="Technical leads and architects">Technical Leads & Architects</option>
             </optgroup>
             
             <optgroup label="🏥 Healthcare & Life Sciences">
               <option value="Healthcare providers and clinicians">Healthcare Providers & Clinicians</option>
               <option value="Medical researchers and scientists">Medical Researchers & Scientists</option>
               <option value="Pharmaceutical and biotech companies">Pharmaceutical & Biotech</option>
               <option value="Healthcare administrators">Healthcare Administrators</option>
               <option value="Medical device manufacturers">Medical Device Manufacturers</option>
               <option value="Health insurance companies">Health Insurance Companies</option>
             </optgroup>
             
             <optgroup label="🎓 Education & Research">
               <option value="Educators and teachers">Educators & Teachers</option>
               <option value="Students and learners">Students & Learners</option>
               <option value="Academic researchers">Academic Researchers</option>
               <option value="Educational institutions">Educational Institutions</option>
               <option value="Training and development teams">Training & Development</option>
               <option value="EdTech companies">EdTech Companies</option>
             </optgroup>
             
             <optgroup label="🎨 Creative & Media">
               <option value="Content creators and writers">Content Creators & Writers</option>
               <option value="Digital marketers">Digital Marketers</option>
               <option value="Social media managers">Social Media Managers</option>
               <option value="Video producers and editors">Video Producers & Editors</option>
               <option value="Graphic designers">Graphic Designers</option>
               <option value="Podcasters and broadcasters">Podcasters & Broadcasters</option>
             </optgroup>
             
             <optgroup label="🏛️ Government & Public Sector">
               <option value="Government agencies and departments">Government Agencies</option>
               <option value="Public safety and law enforcement">Public Safety & Law Enforcement</option>
               <option value="Urban planners and city managers">Urban Planners & City Managers</option>
               <option value="Non-profit organizations">Non-profit Organizations</option>
               <option value="Public health officials">Public Health Officials</option>
             </optgroup>
             
             <optgroup label="🏪 E-commerce & Retail">
               <option value="E-commerce businesses">E-commerce Businesses</option>
               <option value="Retail store managers">Retail Store Managers</option>
               <option value="Online marketplace sellers">Online Marketplace Sellers</option>
               <option value="Customer service teams">Customer Service Teams</option>
               <option value="Inventory and supply managers">Inventory & Supply Managers</option>
             </optgroup>
             
             <optgroup label="🚀 Startups & Entrepreneurs">
               <option value="Startup founders and entrepreneurs">Startup Founders & Entrepreneurs</option>
               <option value="Small business owners">Small Business Owners</option>
               <option value="Freelancers and consultants">Freelancers & Consultants</option>
               <option value="Innovation teams">Innovation Teams</option>
               <option value="Venture capitalists and investors">Venture Capitalists & Investors</option>
             </optgroup>
           </select>
         </div>

                 {/* Tone */}
         <div>
           <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
             Design Tone & Personality
           </label>
           <select
             value={formData.tone}
             onChange={(e) => handleChange('tone', e.target.value)}
             className="input-field"
             disabled={isGenerating}
           >
             <optgroup label="🎯 Professional & Corporate">
               <option value="calm, precise, credible">Calm, Precise, Credible</option>
               <option value="professional, trustworthy, authoritative">Professional, Trustworthy, Authoritative</option>
               <option value="sophisticated, elegant, refined">Sophisticated, Elegant, Refined</option>
               <option value="corporate, formal, structured">Corporate, Formal, Structured</option>
               <option value="executive, premium, distinguished">Executive, Premium, Distinguished</option>
             </optgroup>
             
             <optgroup label="🚀 Modern & Innovative">
               <option value="modern, innovative, cutting-edge">Modern, Innovative, Cutting-edge</option>
               <option value="futuristic, tech-forward, dynamic">Futuristic, Tech-forward, Dynamic</option>
               <option value="bold, confident, progressive">Bold, Confident, Progressive</option>
               <option value="energetic, vibrant, exciting">Energetic, Vibrant, Exciting</option>
               <option value="disruptive, revolutionary, game-changing">Disruptive, Revolutionary, Game-changing</option>
             </optgroup>
             
             <optgroup label="🎨 Creative & Artistic">
               <option value="creative, artistic, expressive">Creative, Artistic, Expressive</option>
               <option value="playful, fun, engaging">Playful, Fun, Engaging</option>
               <option value="imaginative, whimsical, inspiring">Imaginative, Whimsical, Inspiring</option>
               <option value="colorful, vibrant, lively">Colorful, Vibrant, Lively</option>
               <option value="artistic, aesthetic, beautiful">Artistic, Aesthetic, Beautiful</option>
             </optgroup>
             
             <optgroup label="🏥 Healthcare & Wellness">
               <option value="caring, compassionate, healing">Caring, Compassionate, Healing</option>
               <option value="medical, clinical, sterile">Medical, Clinical, Sterile</option>
               <option value="wellness, holistic, nurturing">Wellness, Holistic, Nurturing</option>
               <option value="trustworthy, reliable, safe">Trustworthy, Reliable, Safe</option>
               <option value="calming, peaceful, therapeutic">Calming, Peaceful, Therapeutic</option>
             </optgroup>
             
             <optgroup label="💰 Financial & Business">
               <option value="financial, secure, stable">Financial, Secure, Stable</option>
               <option value="business, professional, reliable">Business, Professional, Reliable</option>
               <option value="luxury, premium, exclusive">Luxury, Premium, Exclusive</option>
               <option value="success, achievement, growth">Success, Achievement, Growth</option>
               <option value="wealth, prosperity, abundance">Wealth, Prosperity, Abundance</option>
             </optgroup>
             
             <optgroup label="🎓 Educational & Academic">
               <option value="educational, informative, enlightening">Educational, Informative, Enlightening</option>
               <option value="academic, scholarly, intellectual">Academic, Scholarly, Intellectual</option>
               <option value="learning, growth, development">Learning, Growth, Development</option>
               <option value="knowledge, wisdom, expertise">Knowledge, Wisdom, Expertise</option>
               <option value="inspiring, motivational, empowering">Inspiring, Motivational, Empowering</option>
             </optgroup>
             
             <optgroup label="🔒 Security & Trust">
               <option value="secure, protected, safe">Secure, Protected, Safe</option>
               <option value="trustworthy, dependable, reliable">Trustworthy, Dependable, Reliable</option>
               <option value="confidential, private, discreet">Confidential, Private, Discreet</option>
               <option value="authoritative, commanding, strong">Authoritative, Commanding, Strong</option>
               <option value="defensive, vigilant, alert">Defensive, Vigilant, Alert</option>
             </optgroup>
             
             <optgroup label="🌱 Environmental & Sustainable">
               <option value="natural, organic, eco-friendly">Natural, Organic, Eco-friendly</option>
               <option value="sustainable, green, environmental">Sustainable, Green, Environmental</option>
               <option value="fresh, clean, pure">Fresh, Clean, Pure</option>
               <option value="earth, nature, grounded">Earth, Nature, Grounded</option>
               <option value="renewable, progressive, forward-thinking">Renewable, Progressive, Forward-thinking</option>
             </optgroup>
             
             <optgroup label="🎪 Entertainment & Media">
               <option value="entertaining, engaging, captivating">Entertaining, Engaging, Captivating</option>
               <option value="media, dynamic, fast-paced">Media, Dynamic, Fast-paced</option>
               <option value="celebrity, glamorous, star-studded">Celebrity, Glamorous, Star-studded</option>
               <option value="creative, artistic, expressive">Creative, Artistic, Expressive</option>
               <option value="trendy, fashionable, stylish">Trendy, Fashionable, Stylish</option>
             </optgroup>
             
             <optgroup label="🏛️ Government & Public">
               <option value="official, governmental, authoritative">Official, Governmental, Authoritative</option>
               <option value="public, civic, community">Public, Civic, Community</option>
               <option value="democratic, inclusive, accessible">Democratic, Inclusive, Accessible</option>
               <option value="transparent, accountable, responsible">Transparent, Accountable, Responsible</option>
               <option value="service-oriented, helpful, supportive">Service-oriented, Helpful, Supportive</option>
             </optgroup>
           </select>
         </div>

                 {/* AI Use Cases */}
         <div>
           <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
             AI Patterns & Use Cases
           </label>
           <select
             value={formData.ai_use_cases}
             onChange={(e) => handleChange('ai_use_cases', e.target.value)}
             className="input-field"
             disabled={isGenerating}
           >
             <optgroup label="🔍 RAG & Knowledge Systems">
               <option value="RAG search with vector embeddings and semantic retrieval">RAG Search with Vector Embeddings</option>
               <option value="Document processing and knowledge base creation">Document Processing & Knowledge Base</option>
               <option value="Multi-modal RAG with text, image, and audio">Multi-modal RAG (Text, Image, Audio)</option>
               <option value="Real-time information retrieval and synthesis">Real-time Information Retrieval</option>
               <option value="Contextual Q&A with source citations">Contextual Q&A with Citations</option>
             </optgroup>
             
             <optgroup label="🤖 Multi-Agent Orchestration">
               <option value="Multi-agent collaboration with role-based tasks">Multi-agent Collaboration</option>
               <option value="Agent handoffs and workflow automation">Agent Handoffs & Workflows</option>
               <option value="Distributed AI with specialized agents">Distributed AI with Specialized Agents</option>
               <option value="Agent communication and coordination protocols">Agent Communication Protocols</option>
               <option value="Autonomous decision-making with agent consensus">Autonomous Decision-making</option>
             </optgroup>
             
             <optgroup label="💬 Conversational AI">
               <option value="Natural language processing and understanding">Natural Language Processing</option>
               <option value="Intent recognition and entity extraction">Intent Recognition & Entity Extraction</option>
               <option value="Multi-turn conversation management">Multi-turn Conversation Management</option>
               <option value="Sentiment analysis and emotion detection">Sentiment Analysis & Emotion Detection</option>
               <option value="Multi-language support and translation">Multi-language Support & Translation</option>
             </optgroup>
             
             <optgroup label="🎯 Task Automation">
               <option value="Code generation and refactoring automation">Code Generation & Refactoring</option>
               <option value="Content creation and optimization">Content Creation & Optimization</option>
               <option value="Data analysis and visualization">Data Analysis & Visualization</option>
               <option value="Process automation and workflow optimization">Process Automation & Workflows</option>
               <option value="Quality assurance and testing automation">Quality Assurance & Testing</option>
             </optgroup>
             
             <optgroup label="🔐 Security & Compliance">
               <option value="Content moderation and safety filtering">Content Moderation & Safety</option>
               <option value="Fraud detection and risk assessment">Fraud Detection & Risk Assessment</option>
               <option value="Compliance monitoring and reporting">Compliance Monitoring & Reporting</option>
               <option value="Privacy-preserving AI with data protection">Privacy-preserving AI</option>
               <option value="Audit trails and explainable AI">Audit Trails & Explainable AI</option>
             </optgroup>
             
             <optgroup label="📊 Analytics & Intelligence">
               <option value="Predictive analytics and forecasting">Predictive Analytics & Forecasting</option>
               <option value="Market analysis and competitive intelligence">Market Analysis & Competitive Intelligence</option>
               <option value="Performance monitoring and optimization">Performance Monitoring & Optimization</option>
               <option value="Anomaly detection and alerting">Anomaly Detection & Alerting</option>
               <option value="Business intelligence and reporting">Business Intelligence & Reporting</option>
             </optgroup>
             
             <optgroup label="🎨 Creative AI">
               <option value="Text-to-image and visual content generation">Text-to-Image & Visual Generation</option>
               <option value="Audio and video content creation">Audio & Video Content Creation</option>
               <option value="Creative writing and storytelling">Creative Writing & Storytelling</option>
               <option value="Design automation and optimization">Design Automation & Optimization</option>
               <option value="Personalization and recommendation systems">Personalization & Recommendations</option>
             </optgroup>
             
             <optgroup label="🏥 Healthcare & Life Sciences">
               <option value="Medical diagnosis and treatment planning">Medical Diagnosis & Treatment Planning</option>
               <option value="Drug discovery and molecular analysis">Drug Discovery & Molecular Analysis</option>
               <option value="Patient monitoring and health analytics">Patient Monitoring & Health Analytics</option>
               <option value="Medical imaging and radiology analysis">Medical Imaging & Radiology</option>
               <option value="Clinical trial optimization">Clinical Trial Optimization</option>
             </optgroup>
             
             <optgroup label="💰 Financial Services">
               <option value="Algorithmic trading and portfolio management">Algorithmic Trading & Portfolio Management</option>
               <option value="Credit scoring and risk assessment">Credit Scoring & Risk Assessment</option>
               <option value="Financial fraud detection">Financial Fraud Detection</option>
               <option value="Market sentiment analysis">Market Sentiment Analysis</option>
               <option value="Regulatory compliance and reporting">Regulatory Compliance & Reporting</option>
             </optgroup>
             
             <optgroup label="🚀 Emerging Technologies">
               <option value="Blockchain and smart contract analysis">Blockchain & Smart Contract Analysis</option>
               <option value="IoT data processing and edge AI">IoT Data Processing & Edge AI</option>
               <option value="Quantum computing applications">Quantum Computing Applications</option>
               <option value="AR/VR content generation">AR/VR Content Generation</option>
               <option value="Autonomous systems and robotics">Autonomous Systems & Robotics</option>
             </optgroup>
           </select>
         </div>

                 {/* Safety Level */}
         <div>
           <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 flex items-center space-x-2">
             <Shield className="h-4 w-4" />
             <span>Safety & Compliance Level</span>
           </label>
           <select
             value={formData.safety_level}
             onChange={(e) => handleChange('safety_level', e.target.value)}
             className="input-field"
             disabled={isGenerating}
           >
             <optgroup label="🔒 Enterprise & Healthcare">
               <option value="hipaa-compliant">HIPAA Compliant (Healthcare)</option>
               <option value="sox-compliant">SOX Compliant (Financial)</option>
               <option value="gdpr-compliant">GDPR Compliant (EU Data)</option>
               <option value="enterprise-strict">Enterprise Strict</option>
               <option value="government-grade">Government Grade</option>
             </optgroup>
             
             <optgroup label="🛡️ Standard Safety Levels">
               <option value="strict">Strict (High Safety)</option>
               <option value="moderate">Moderate (Balanced)</option>
               <option value="relaxed">Relaxed (Creative Focus)</option>
             </optgroup>
             
             <optgroup label="🎯 Industry-Specific">
               <option value="financial-services">Financial Services</option>
               <option value="legal-compliance">Legal & Compliance</option>
               <option value="education-safe">Education Safe</option>
               <option value="content-moderation">Content Moderation</option>
               <option value="cybersecurity">Cybersecurity Focus</option>
             </optgroup>
             
             <optgroup label="🚀 Development & Testing">
               <option value="development-mode">Development Mode</option>
               <option value="testing-environment">Testing Environment</option>
               <option value="research-mode">Research Mode</option>
               <option value="experimental">Experimental</option>
             </optgroup>
           </select>
         </div>

                 {/* Design Complexity */}
         <div>
           <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
             Design Complexity & Scope
           </label>
           <select
             value={formData.latency_budget}
             onChange={(e) => handleChange('latency_budget', parseInt(e.target.value))}
             className="input-field"
             disabled={isGenerating}
           >
             <optgroup label="🎯 Simple & Minimal">
               <option value={1000}>Simple - Clean, minimal interface</option>
               <option value={1200}>Basic - Standard components only</option>
               <option value={1400}>Essential - Core functionality focus</option>
             </optgroup>
             
             <optgroup label="🏗️ Standard & Balanced">
               <option value={1800}>Standard - Well-rounded design system</option>
               <option value={2000}>Comprehensive - Full feature set</option>
               <option value={2200}>Professional - Enterprise-ready design</option>
             </optgroup>
             
             <optgroup label="🚀 Advanced & Complex">
               <option value={2500}>Advanced - Sophisticated interactions</option>
               <option value={2800}>Complex - Multi-layered architecture</option>
               <option value={3000}>Premium - High-end, feature-rich</option>
             </optgroup>
             
             <optgroup label="🎨 Creative & Custom">
               <option value={3500}>Creative - Custom animations & effects</option>
               <option value={4000}>Artistic - Unique visual design</option>
               <option value={4500}>Bespoke - Fully customized experience</option>
             </optgroup>
             
             <optgroup label="🏢 Enterprise & Scale">
               <option value={5000}>Enterprise - Multi-tenant, scalable</option>
               <option value={6000}>Platform - Complex ecosystem design</option>
               <option value={7000}>Suite - Complete business solution</option>
             </optgroup>
           </select>
         </div>

        {/* Brand Colors */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Brand Colors (optional)
          </label>
          <input
            type="text"
            value={formData.brand}
            onChange={(e) => handleChange('brand', e.target.value)}
            className="input-field"
            placeholder="e.g., #0EA5E9 as primary, #22C55E as success"
            disabled={isGenerating}
          />
        </div>

                 {/* Constraints */}
         <div>
           <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
             Technical & Design Constraints
           </label>
           <select
             value={formData.constraints}
             onChange={(e) => handleChange('constraints', e.target.value)}
             className="input-field"
             disabled={isGenerating}
           >
             <optgroup label="🎨 Design System Preferences">
               <option value="dark+light themes, AA contrast, prefers shadcn">Dark + Light Themes, AA Contrast, shadcn/ui</option>
               <option value="material design 3 with dynamic color">Material Design 3 with Dynamic Color</option>
               <option value="minimalist design with focus on typography">Minimalist Design with Typography Focus</option>
               <option value="glassmorphism and modern aesthetics">Glassmorphism & Modern Aesthetics</option>
               <option value="accessible design with WCAG AAA compliance">Accessible Design (WCAG AAA)</option>
             </optgroup>
             
             <optgroup label="📱 Platform & Device Support">
               <option value="mobile-first responsive design">Mobile-First Responsive Design</option>
               <option value="desktop-optimized with keyboard navigation">Desktop-Optimized with Keyboard Nav</option>
               <option value="tablet and touch-friendly interface">Tablet & Touch-Friendly Interface</option>
               <option value="cross-platform compatibility">Cross-Platform Compatibility</option>
               <option value="progressive web app (PWA) ready">Progressive Web App (PWA) Ready</option>
             </optgroup>
             
             <optgroup label="⚡ Performance Requirements">
               <option value="fast loading with optimized assets">Fast Loading with Optimized Assets</option>
               <option value="offline-first with service workers">Offline-First with Service Workers</option>
               <option value="low bandwidth optimization">Low Bandwidth Optimization</option>
               <option value="real-time updates and streaming">Real-Time Updates & Streaming</option>
               <option value="caching and performance optimization">Caching & Performance Optimization</option>
             </optgroup>
             
             <optgroup label="🔧 Technical Stack Preferences">
               <option value="next.js 14 with app router">Next.js 14 with App Router</option>
               <option value="react with typescript and strict mode">React with TypeScript & Strict Mode</option>
               <option value="tailwind css with custom design tokens">Tailwind CSS with Custom Design Tokens</option>
               <option value="headless ui components">Headless UI Components</option>
               <option value="custom component library">Custom Component Library</option>
             </optgroup>
             
             <optgroup label="🔐 Security & Privacy">
               <option value="end-to-end encryption for sensitive data">End-to-End Encryption</option>
               <option value="privacy-first with minimal data collection">Privacy-First with Minimal Data Collection</option>
               <option value="secure authentication and authorization">Secure Authentication & Authorization</option>
               <option value="data anonymization and protection">Data Anonymization & Protection</option>
               <option value="compliance with data regulations">Compliance with Data Regulations</option>
             </optgroup>
             
             <optgroup label="🌐 Internationalization">
               <option value="multi-language support with RTL">Multi-Language Support with RTL</option>
               <option value="localized content and cultural adaptation">Localized Content & Cultural Adaptation</option>
               <option value="timezone and date formatting">Timezone & Date Formatting</option>
               <option value="currency and number formatting">Currency & Number Formatting</option>
               <option value="accessibility for different cultures">Accessibility for Different Cultures</option>
             </optgroup>
             
             <optgroup label="📊 Analytics & Monitoring">
               <option value="comprehensive analytics and tracking">Comprehensive Analytics & Tracking</option>
               <option value="error monitoring and logging">Error Monitoring & Logging</option>
               <option value="user behavior analytics">User Behavior Analytics</option>
               <option value="performance monitoring and alerts">Performance Monitoring & Alerts</option>
               <option value="A/B testing and experimentation">A/B Testing & Experimentation</option>
             </optgroup>
             
             <optgroup label="🚀 Deployment & Scalability">
               <option value="cloud-native with auto-scaling">Cloud-Native with Auto-Scaling</option>
               <option value="containerized deployment with docker">Containerized Deployment with Docker</option>
               <option value="serverless architecture">Serverless Architecture</option>
               <option value="microservices architecture">Microservices Architecture</option>
               <option value="edge computing and CDN optimization">Edge Computing & CDN Optimization</option>
             </optgroup>
             
             <optgroup label="🤖 AI-Specific Requirements">
               <option value="streaming responses with real-time feedback">Streaming Responses with Real-Time Feedback</option>
               <option value="hallucination detection and correction">Hallucination Detection & Correction</option>
               <option value="explainable AI with transparency">Explainable AI with Transparency</option>
               <option value="fallback mechanisms for AI failures">Fallback Mechanisms for AI Failures</option>
               <option value="human-in-the-loop capabilities">Human-in-the-Loop Capabilities</option>
             </optgroup>
           </select>
         </div>

                 {/* Submit Button */}
         <button
           type="submit"
           disabled={isGenerating}
           className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
         >
           <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
           <div className="relative flex items-center space-x-2">
             {isGenerating ? (
               <>
                 <div className="spinner h-4 w-4"></div>
                 <span>Generating Design...</span>
               </>
             ) : (
               <>
                 <Send className="h-4 w-4" />
                 <span>Generate Design</span>
               </>
             )}
           </div>
         </button>
      </form>

             {/* Info Panel */}
       <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-200/50 dark:border-blue-800/50">
         <div className="flex items-start space-x-3">
           <div className="relative">
             <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur-lg opacity-30"></div>
             <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
               <Eye className="h-4 w-4 text-white" />
             </div>
           </div>
           <div className="text-sm">
             <p className="font-semibold mb-2 text-foreground">What you'll get:</p>
             <ul className="space-y-2 text-muted-foreground">
               <li className="flex items-center space-x-2">
                 <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                 <span>Complete Next.js + Tailwind project</span>
               </li>
               <li className="flex items-center space-x-2">
                 <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                 <span>AI-specific components (ChatComposer, RunTimeline)</span>
               </li>
               <li className="flex items-center space-x-2">
                 <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                 <span>Safety & observability features</span>
               </li>
               <li className="flex items-center space-x-2">
                 <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                 <span>Streaming-ready architecture</span>
               </li>
             </ul>
           </div>
         </div>
       </div>
    </div>
  )
}
