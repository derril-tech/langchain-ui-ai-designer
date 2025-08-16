import { Sparkles, Github, Zap, Cpu, Palette } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-lg opacity-30"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">
                  UI Design Expert Agent
                </h1>
                <p className="text-sm text-muted-foreground">
                  AI-powered design system generator
                </p>
              </div>
            </div>
            
            
            
            {/* Status indicator */}
            <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-green-50 dark:bg-green-900/20 rounded-full">
              <div className="status-dot online"></div>
              <span className="text-xs font-medium text-green-700 dark:text-green-400">AI Ready</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Feature badges */}
            <div className="hidden lg:flex items-center space-x-3">
              <div className="flex items-center space-x-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                <Cpu className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                <span className="text-xs font-medium text-blue-700 dark:text-blue-400">Multi-Agent</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-1 bg-purple-50 dark:bg-purple-900/20 rounded-full">
                <Palette className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                <span className="text-xs font-medium text-purple-700 dark:text-purple-400">Design System</span>
              </div>
            </div>
            
            {/* Theme toggle */}
            <ThemeToggle />
            
            {/* GitHub link */}
            <a
              href="https://github.com/your-repo/ui-design-expert-agent"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-muted/50"
            >
              <Github className="h-5 w-5" />
              <span className="text-sm hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
