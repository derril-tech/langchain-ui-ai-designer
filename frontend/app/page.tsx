'use client'

import { useState } from 'react'
import { DesignForm } from '@/components/DesignForm'
import { StreamingOutput } from '@/components/StreamingOutput'
import { GeneratedFiles } from '@/components/GeneratedFiles'
import { Header } from '@/components/Header'

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [events, setEvents] = useState<any[]>([])
  const [generatedFiles, setGeneratedFiles] = useState<string[]>([])
  const [finalSpec, setFinalSpec] = useState<any>(null)

  const handleDesignRequest = async (formData: any) => {
    setIsGenerating(true)
    setEvents([])
    setGeneratedFiles([])
    setFinalSpec(null)

    try {
      const response = await fetch('/api/design/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) {
        throw new Error('No response body')
      }

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6))
              setEvents(prev => [...prev, data])
              
              if (data.event === 'export') {
                setGeneratedFiles(prev => [...prev, data.out_dir])
              } else if (data.event === 'final') {
                setFinalSpec(data.spec)
              }
            } catch (e) {
              // Ignore parsing errors
            }
          }
        }
      }
    } catch (error) {
      console.error('Error:', error)
      setEvents(prev => [...prev, { 
        event: 'error', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }])
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Create Beautiful AI-Powered UIs
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Generate production-ready Next.js applications with intelligent design systems, 
            streaming interfaces, and AI-specific components.
          </p>
        </div>
        
                 <div className="relative">
           {/* Big pink brain emoji positioned to the left side */}
           <div className="absolute -top-32 left-4 z-10 lg:block hidden">
             <div className="relative">
               <div className="text-8xl animate-pulse-slow">🧠</div>
             </div>
           </div>
           
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <DesignForm 
              onSubmit={handleDesignRequest}
              isGenerating={isGenerating}
            />
            
            <StreamingOutput 
              events={events}
              isGenerating={isGenerating}
            />
          </div>
        </div>
        
        {generatedFiles.length > 0 && (
          <GeneratedFiles 
            files={generatedFiles}
            spec={finalSpec}
          />
        )}
        
        {/* Footer */}
        <footer className="mt-16 text-center text-muted-foreground">
          <p className="text-sm">
            Built with ❤️ using Next.js, Tailwind CSS, and LangChain
          </p>
        </footer>
      </main>
    </div>
  )
}
