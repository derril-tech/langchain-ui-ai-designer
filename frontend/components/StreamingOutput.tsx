'use client'

import { useEffect, useRef } from 'react'
import { Activity, Code, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

interface StreamingOutputProps {
  events: any[]
  isGenerating: boolean
}

export function StreamingOutput({ events, isGenerating }: StreamingOutputProps) {
  const outputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [events])

  const getEventIcon = (event: any) => {
    switch (event.event) {
      case 'phase':
        return <Activity className="h-4 w-4 text-blue-600" />
      case 'token':
        return <Code className="h-4 w-4 text-gray-600" />
      case 'status':
        return <Loader2 className="h-4 w-4 text-yellow-600 animate-spin" />
      case 'export':
        return <FileText className="h-4 w-4 text-green-600" />
      case 'final':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  const getEventColor = (event: any) => {
    switch (event.event) {
      case 'phase':
        return 'bg-blue-50 border-blue-200 text-blue-800'
      case 'token':
        return 'bg-gray-50 border-gray-200 text-gray-800'
      case 'status':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800'
      case 'export':
        return 'bg-green-50 border-green-200 text-green-800'
      case 'final':
        return 'bg-purple-50 border-purple-200 text-purple-800'
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800'
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800'
    }
  }

  const formatEventText = (event: any) => {
    if (event.event === 'token') {
      return event.text || ''
    }
    if (event.event === 'phase') {
      return event.text?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || ''
    }
    if (event.event === 'export') {
      return `Files written to: ${event.out_dir || event.text}`
    }
    if (event.event === 'final') {
      return 'Design specification complete!'
    }
    if (event.event === 'error') {
      return event.error || 'An error occurred'
    }
    return event.text || ''
  }

  return (
    <div className="bg-white dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-gray-800/20 p-6 h-[800px] flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl blur-lg opacity-30"></div>
            <div className="relative bg-gradient-to-r from-green-600 to-blue-600 p-2 rounded-xl">
              <Activity className="h-5 w-5 text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold gradient-text">Live Generation</h2>
            <p className="text-sm text-muted-foreground">Watch AI agents work in real-time</p>
          </div>
        </div>
        {isGenerating && (
          <div className="flex items-center space-x-2 px-3 py-1 bg-green-50 dark:bg-green-900/20 rounded-full">
            <div className="status-dot processing"></div>
            <span className="text-xs font-medium text-green-700 dark:text-green-400">Processing</span>
          </div>
        )}
      </div>

             <div 
         ref={outputRef}
         className="flex-1 overflow-y-auto space-y-3 p-4 bg-white dark:bg-muted/30 rounded-xl border border-border backdrop-blur-sm"
       >
                 {events.length === 0 && !isGenerating && (
           <div className="text-center text-muted-foreground py-12">
             <div className="relative mx-auto w-16 h-16 mb-6">
               <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-20"></div>
               <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-4">
                 <Activity className="h-8 w-8 text-white" />
               </div>
             </div>
             <p className="text-lg font-medium mb-2">Ready to Generate</p>
             <p className="text-sm">Fill out the form and click "Generate Design" to see the AI agent in action</p>
           </div>
         )}

        {events.map((event, index) => (
          <div
            key={index}
            className={`flex items-start space-x-3 p-3 rounded-lg border ${getEventColor(event)}`}
          >
            {getEventIcon(event)}
            <div className="flex-1 min-w-0">
              {event.event === 'token' ? (
                <div className="streaming-text">
                  <span className="whitespace-pre-wrap">{formatEventText(event)}</span>
                  {isGenerating && (
                    <span className="animate-streaming-cursor ml-1">|</span>
                  )}
                </div>
              ) : (
                <div>
                  <div className="font-medium text-sm">
                    {event.event?.toUpperCase()}
                  </div>
                  <div className="text-sm mt-1">
                    {formatEventText(event)}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

                 {isGenerating && events.length === 0 && (
           <div className="flex items-center justify-center space-x-3 text-muted-foreground py-12">
             <div className="spinner h-6 w-6"></div>
             <div>
               <p className="font-medium">Initializing AI agents...</p>
               <p className="text-xs">Setting up the design pipeline</p>
             </div>
           </div>
         )}
      </div>

             {/* Progress Indicator */}
       {isGenerating && (
         <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200/50 dark:border-blue-800/50">
           <div className="flex items-center space-x-3 text-sm text-foreground mb-3">
             <div className="spinner h-4 w-4"></div>
             <span className="font-medium">AI agents are working on your design...</span>
           </div>
           <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
             <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full animate-pulse-glow" style={{ width: '60%' }}></div>
           </div>
         </div>
       )}

             {/* Event Summary */}
       {events.length > 0 && (
         <div className="mt-6 p-4 bg-muted/30 rounded-xl border border-border backdrop-blur-sm">
           <div className="text-sm text-muted-foreground">
             <div className="flex items-center justify-between mb-2">
               <span className="font-medium">Total Events: {events.length}</span>
               <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                 {events.filter(e => e.event === 'token').length} tokens
               </span>
             </div>
             <div className="text-xs text-muted-foreground/70">
               Last event: {events[events.length - 1]?.event || 'None'}
             </div>
           </div>
         </div>
       )}

       {/* Creator Credit */}
       <div className="mt-4 text-center">
         <p className="text-xs text-muted-foreground/60">
           Created with ❤️ by <span className="font-medium text-primary">Derril Filemon</span>
         </p>
       </div>
    </div>
  )
}
