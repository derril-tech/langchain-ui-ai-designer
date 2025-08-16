'use client'

import { useState } from 'react'
import { FileText, Download, Code, Palette, Settings, Eye, Copy, Check } from 'lucide-react'

interface GeneratedFilesProps {
  files: string[]
  spec: any
}

export function GeneratedFiles({ files, spec }: GeneratedFilesProps) {
  const [copiedFile, setCopiedFile] = useState<string | null>(null)

  const fileTypes = [
    {
      name: 'tailwind.config.ts',
      description: 'Tailwind configuration with custom tokens',
      icon: Settings,
      color: 'text-blue-600'
    },
    {
      name: 'app/layout.tsx',
      description: 'Next.js root layout with theme integration',
      icon: Code,
      color: 'text-green-600'
    },
    {
      name: 'components/ChatComposer.tsx',
      description: 'AI chat interface component',
      icon: FileText,
      color: 'text-purple-600'
    },
    {
      name: 'components/RunTimeline.tsx',
      description: 'Agent activity timeline',
      icon: Eye,
      color: 'text-orange-600'
    },
    {
      name: 'components/MessageBubble.tsx',
      description: 'Chat message with citations',
      icon: FileText,
      color: 'text-indigo-600'
    },
    {
      name: 'ui-spec.json',
      description: 'Complete design specification',
      icon: Palette,
      color: 'text-pink-600'
    }
  ]

  const handleCopy = async (text: string, fileName: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedFile(fileName)
      setTimeout(() => setCopiedFile(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const getSpecSummary = () => {
    if (!spec) return null

    return {
      palette: spec.designSystem?.palette?.primary || 'N/A',
      aiPattern: spec.ux?.aiPattern || 'N/A',
      components: spec.components?.length || 0,
      safety: spec.aiSolution?.safety?.contentFiltering ? 'Enabled' : 'Disabled',
      streaming: spec.ux?.streamingStrategy || 'N/A'
    }
  }

  const specSummary = getSpecSummary()

  return (
    <div className="mt-8 space-y-8">
      {/* Generated Files Grid */}
      <div className="card-gradient">
        <div className="flex items-center space-x-3 mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl blur-lg opacity-30"></div>
            <div className="relative bg-gradient-to-r from-green-600 to-blue-600 p-2 rounded-xl">
              <FileText className="h-5 w-5 text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold gradient-text">Generated Files</h2>
            <p className="text-sm text-muted-foreground">Your AI-generated project files</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fileTypes.map((fileType) => {
            const Icon = fileType.icon
            return (
              <div
                key={fileType.name}
                className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon className={`h-5 w-5 ${fileType.color}`} />
                    <div>
                      <h3 className="font-medium text-sm text-gray-900">
                        {fileType.name}
                      </h3>
                      <p className="text-xs text-gray-600 mt-1">
                        {fileType.description}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(`// ${fileType.name} content`, fileType.name)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {copiedFile === fileType.name ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

                 <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl border border-green-200/50 dark:border-green-800/50">
           <div className="flex items-center space-x-3 text-green-700 dark:text-green-400">
             <div className="relative">
               <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg blur-lg opacity-30"></div>
               <div className="relative bg-gradient-to-r from-green-600 to-blue-600 p-2 rounded-lg">
                 <Download className="h-4 w-4 text-white" />
               </div>
             </div>
             <span className="text-sm font-medium">
               Files written to: {files[0] || 'ui-agent-output'}
             </span>
           </div>
         </div>
      </div>

             {/* Design Specification Summary */}
       {specSummary && (
         <div className="card-glass">
           <div className="flex items-center space-x-3 mb-8">
             <div className="relative">
               <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur-lg opacity-30"></div>
               <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-xl">
                 <Palette className="h-5 w-5 text-white" />
               </div>
             </div>
             <div>
               <h2 className="text-2xl font-bold gradient-text">Design Specification</h2>
               <p className="text-sm text-muted-foreground">Your AI-generated design system</p>
             </div>
           </div>

                     <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
             <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl border border-blue-200/50 dark:border-blue-800/50">
               <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                 {specSummary.palette}
               </div>
               <div className="text-xs text-blue-700 dark:text-blue-300 mt-1">Primary Color</div>
             </div>
 
             <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl border border-green-200/50 dark:border-green-800/50">
               <div className="text-lg font-bold text-green-600 dark:text-green-400">
                 {specSummary.aiPattern}
               </div>
               <div className="text-xs text-green-700 dark:text-green-300 mt-1">AI Pattern</div>
             </div>
 
             <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl border border-purple-200/50 dark:border-purple-800/50">
               <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                 {specSummary.components}
               </div>
               <div className="text-xs text-purple-700 dark:text-purple-300 mt-1">Components</div>
             </div>
 
             <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl border border-orange-200/50 dark:border-orange-800/50">
               <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
                 {specSummary.safety}
               </div>
               <div className="text-xs text-orange-700 dark:text-orange-300 mt-1">Safety</div>
             </div>
 
             <div className="text-center p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 rounded-xl border border-indigo-200/50 dark:border-indigo-800/50">
               <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                 {specSummary.streaming}
               </div>
               <div className="text-xs text-indigo-700 dark:text-indigo-300 mt-1">Streaming</div>
             </div>
           </div>

                     {/* Quick Actions */}
           <div className="mt-8 flex flex-wrap gap-4">
             <button className="btn-primary flex items-center space-x-2 glow-primary">
               <Download className="h-4 w-4" />
               <span>Download Project</span>
             </button>
             
             <button className="btn-secondary flex items-center space-x-2">
               <Code className="h-4 w-4" />
               <span>View Full Spec</span>
             </button>
             
             <button className="btn-secondary flex items-center space-x-2">
               <Eye className="h-4 w-4" />
               <span>Preview Components</span>
             </button>
           </div>
        </div>
      )}

             {/* Next Steps */}
       <div className="card">
         <div className="flex items-center space-x-3 mb-6">
           <div className="relative">
             <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl blur-lg opacity-30"></div>
             <div className="relative bg-gradient-to-r from-orange-600 to-red-600 p-2 rounded-xl">
               <Code className="h-5 w-5 text-white" />
             </div>
           </div>
           <div>
             <h3 className="text-xl font-bold gradient-text">Next Steps</h3>
             <p className="text-sm text-muted-foreground">Get your project up and running</p>
           </div>
         </div>
         <div className="space-y-4">
           <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200/50 dark:border-blue-800/50">
             <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
               <span className="text-sm font-bold text-white">1</span>
             </div>
             <div>
               <p className="text-sm font-semibold text-foreground">Navigate to the generated directory</p>
               <p className="text-xs text-muted-foreground mt-1">
                 <code className="bg-muted px-2 py-1 rounded-lg font-mono">cd {files[0] || 'ui-agent-output'}</code>
               </p>
             </div>
           </div>
 
           <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl border border-green-200/50 dark:border-green-800/50">
             <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center">
               <span className="text-sm font-bold text-white">2</span>
             </div>
             <div>
               <p className="text-sm font-semibold text-foreground">Install dependencies</p>
               <p className="text-xs text-muted-foreground mt-1">
                 <code className="bg-muted px-2 py-1 rounded-lg font-mono">npm install</code>
               </p>
             </div>
           </div>
 
           <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200/50 dark:border-purple-800/50">
             <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
               <span className="text-sm font-bold text-white">3</span>
             </div>
             <div>
               <p className="text-sm font-semibold text-foreground">Start the development server</p>
               <p className="text-xs text-muted-foreground mt-1">
                 <code className="bg-muted px-2 py-1 rounded-lg font-mono">npm run dev</code>
               </p>
             </div>
           </div>
         </div>
       </div>
    </div>
  )
}
