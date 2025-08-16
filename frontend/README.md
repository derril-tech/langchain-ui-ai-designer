# 🎨 Frontend - UI Design Expert Agent

> **Beautiful Next.js Frontend** - Modern, responsive interface for the AI Design Expert Agent

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000` to see the application!

## 🏗️ Architecture

### Tech Stack

- **Next.js 14**: App Router, Server Components, API Routes
- **TypeScript**: Type safety and better developer experience
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful, customizable icons
- **React Hooks**: State management and side effects

### Project Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Main page component
│   └── globals.css        # Global styles and design system
├── components/            # Reusable React components
│   ├── Header.tsx         # Application header with theme toggle
│   ├── DesignForm.tsx     # Design brief input form
│   ├── StreamingOutput.tsx # Real-time generation output
│   ├── GeneratedFiles.tsx # File preview and summary
│   └── ThemeToggle.tsx    # Light/dark theme switcher
├── public/               # Static assets
├── tailwind.config.js    # Tailwind configuration
├── next.config.js        # Next.js configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## 🎨 Design System

### Theme System

The application uses a sophisticated theme system with CSS variables:

```css
:root {
  /* Light theme */
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  /* ... more variables */
}

.dark {
  /* Dark theme */
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 217.2 91.2% 59.8%;
  /* ... more variables */
}
```

### Component Classes

#### Buttons
```css
.btn-primary    /* Primary action button with gradient */
.btn-secondary  /* Secondary button with hover effects */
.btn-ghost      /* Minimal button for subtle actions */
```

#### Cards
```css
.card           /* Standard card with shadow and border */
.card-glass     /* Glassmorphism effect with backdrop blur */
.card-gradient  /* Gradient background card */
```

#### Forms
```css
.input-field    /* Styled input with focus effects */
.streaming-text /* Monospace text for code/streaming content */
```

### Animations

- **`animate-pulse-slow`**: Slow pulsing animation
- **`animate-bounce-slow`**: Slow bouncing animation
- **`animate-streaming-cursor`**: Typing cursor effect
- **`animate-pulse-glow`**: Glowing pulse effect

## 🧩 Components

### Header Component

**File**: `components/Header.tsx`

The application header with:
- Project title with gradient text
- Status indicators
- Feature badges
- Theme toggle
- GitHub link

**Features**:
- Sticky positioning
- Backdrop blur effect
- Responsive design
- Theme-aware styling

### DesignForm Component

**File**: `components/DesignForm.tsx`

Comprehensive design brief form with:

#### Input Categories
- **Project Type**: 60+ options across 6 categories
- **Target Audience**: 8 audience groups with specific roles
- **Design Tone**: 50+ personality options across 10 categories
- **AI Patterns**: 9 use case categories with specific patterns
- **Safety Level**: 4 compliance levels with industry-specific options
- **Design Complexity**: 5 complexity levels with detailed descriptions
- **Brand Colors**: Optional custom color specification
- **Technical Constraints**: 9 constraint categories with specific options

#### Features
- Dropdown-based selection for better UX
- Grouped options with emojis for visual appeal
- Real-time validation
- Loading states during generation
- Responsive design

### StreamingOutput Component

**File**: `components/StreamingOutput.tsx`

Real-time display of AI agent activity:

#### Event Types
- **Phase**: Agent workflow stages
- **Token**: Streaming text generation
- **Status**: Processing updates
- **Export**: File generation events
- **Final**: Completion events
- **Error**: Error handling

#### Features
- Auto-scrolling to latest events
- Event-specific icons and colors
- Streaming cursor animation
- Progress indicators
- Event summaries

### GeneratedFiles Component

**File**: `components/GeneratedFiles.tsx`

Display generated project files and specifications:

#### Sections
- **File Overview**: Generated file types and descriptions
- **Design Summary**: Key design specifications
- **Quick Actions**: Copy commands and next steps
- **Project Structure**: File tree visualization

#### Features
- Copy-to-clipboard functionality
- Design specification breakdown
- Next steps guidance
- Responsive layout

### ThemeToggle Component

**File**: `components/ThemeToggle.tsx`

Light/dark theme switcher:

#### Features
- Three modes: Light, Dark, System
- Persistent theme storage
- Smooth transitions
- System preference detection
- Loading states

## 🎯 Key Features

### 🌓 Theme System

- **Light Mode**: Clean, professional appearance
- **Dark Mode**: Modern, eye-friendly interface
- **System Mode**: Automatic theme switching
- **Persistent**: Theme preference saved in localStorage

### 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Friendly**: Enhanced layout for tablets
- **Desktop Optimized**: Full-featured desktop experience
- **Touch Friendly**: Optimized for touch interactions

### ⚡ Performance

- **Code Splitting**: Automatic bundle optimization
- **Image Optimization**: Next.js built-in image optimization
- **Lazy Loading**: Components loaded on demand
- **Caching**: Intelligent caching strategies

### ♿ Accessibility

- **WCAG AA**: 4.5:1 contrast ratio compliance
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: Proper ARIA labels and roles
- **Focus Management**: Clear focus indicators

## 🔧 Configuration

### Tailwind Configuration

**File**: `tailwind.config.js`

```javascript
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Design system colors mapped to CSS variables
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: 'hsl(var(--primary))',
        // ... more colors
      },
      animation: {
        // Custom animations
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'streaming-cursor': 'blink 1s infinite',
      }
    }
  }
}
```

### Next.js Configuration

**File**: `next.config.js`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/api/:path*',
      },
    ]
  }
}
```

## 🚀 Development

### Adding New Components

1. **Create Component**: Add new component in `components/` directory
2. **Add Types**: Define TypeScript interfaces
3. **Add Styles**: Use Tailwind classes or add to `globals.css`
4. **Test**: Ensure responsive design and accessibility
5. **Document**: Update this README

### Styling Guidelines

- **Use Tailwind**: Prefer Tailwind utility classes
- **CSS Variables**: Use design system variables for colors
- **Responsive**: Always consider mobile, tablet, and desktop
- **Accessibility**: Ensure proper contrast and focus states

### State Management

- **Local State**: Use `useState` for component-specific state
- **Form State**: Use controlled components with state
- **Theme State**: Managed by `ThemeToggle` component
- **API State**: Handle loading, success, and error states

## 🧪 Testing

### Manual Testing Checklist

- [ ] **Theme Switching**: Light, dark, and system modes
- [ ] **Responsive Design**: Mobile, tablet, desktop layouts
- [ ] **Form Validation**: All input fields and dropdowns
- [ ] **Streaming**: Real-time event display
- [ ] **Accessibility**: Keyboard navigation and screen readers
- [ ] **Performance**: Loading states and animations

### Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 📦 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add OPENAI_API_KEY
```

### Other Platforms

- **Netlify**: Use `npm run build` and deploy `out/` directory
- **Railway**: Connect GitHub repository for automatic deployment
- **Docker**: Use provided Dockerfile for containerized deployment

## 🔍 Troubleshooting

### Common Issues

#### Theme Not Switching
- Check localStorage for theme preference
- Ensure `ThemeToggle` component is properly mounted
- Verify CSS variables are defined in `globals.css`

#### Form Not Submitting
- Check browser console for errors
- Verify API endpoint is running
- Ensure all required fields are filled

#### Streaming Not Working
- Check network tab for SSE connection
- Verify backend server is running
- Ensure CORS is properly configured

### Performance Issues

- **Large Bundle**: Check for unused dependencies
- **Slow Loading**: Optimize images and use lazy loading
- **Memory Leaks**: Ensure proper cleanup in useEffect hooks

## 🤝 Contributing

### Frontend Development Guidelines

1. **TypeScript**: Use strict mode and proper typing
2. **Components**: Create reusable, composable components
3. **Styling**: Follow design system and use Tailwind
4. **Accessibility**: Ensure WCAG AA compliance
5. **Testing**: Test across different devices and browsers

### Code Style

- **Naming**: Use PascalCase for components, camelCase for functions
- **Imports**: Group imports by type (React, components, utilities)
- **Comments**: Add JSDoc comments for complex functions
- **Formatting**: Use Prettier for consistent formatting

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**

*Create beautiful, intelligent UIs with the power of AI agents!* 🚀
