# Magical Domains

AI-Generated Websites in Seconds

## Overview

Magical Domains is a modern web application that allows users to create AI-generated websites through a simple 3-step process:

1. **Generate Your AI Website** - Enter project name and description
2. **Deploy Once You Like It** - Preview and deploy to *.magical.domains
3. **Buy Your Custom Domain** - Purchase a custom domain for your site

## Features

- 🤖 **AI Website Generation** - Advanced AI creates personalized websites
- 🚀 **Instant Deployment** - Deploy to magical.domains subdomains with SSL
- 💎 **Custom Domains** - Purchase and redirect to custom domains
- 📱 **Responsive Design** - Beautiful UI that works on all devices
- ⚡ **TypeScript** - Fully typed, modular codebase
- 🎨 **Modern UI** - Gradient backgrounds, smooth animations, glass morphism

## Project Structure

```
magical-domains/
├── src/
│   ├── types.ts          # TypeScript interfaces and types
│   ├── generate.ts       # AI website generation module
│   ├── deploy.ts         # Website deployment module
│   ├── buy-domain.ts     # Domain purchase module
│   ├── utils.ts          # Shared utility functions
│   └── main.ts           # Main application coordinator
├── dist/                 # Compiled JavaScript output
├── index.html           # Main HTML file
├── package.json         # Node.js dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── README.md           # This file
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A modern web browser

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the TypeScript files:**
   ```bash
   npm run build
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:8000`

### Development

For development with auto-compilation:
```bash
npm run dev
```

This will watch for changes in TypeScript files and automatically recompile.

## Architecture

### Modular Design

The application is built with a modular architecture where each step is handled by a separate TypeScript class:

- **WebsiteGenerator** - Handles AI generation and validation
- **WebsiteDeployer** - Manages deployment to magical.domains
- **DomainPurchaser** - Handles custom domain purchases
- **MagicalDomainsApp** - Coordinates all modules and global state

### Event-Driven Communication

Modules communicate through custom DOM events:
- `websiteGenerated` - Fired when AI generation completes
- `websiteDeployed` - Fired when deployment is successful
- `domainPurchased` - Fired when domain purchase completes

### State Management

Global state is managed through:
- Step status tracking (pending, in-progress, completed, error)
- Visual state updates (button states, animations, status messages)
- Data flow between modules via events

## API Integration

Currently uses simulated APIs for:
- AI website generation
- Deployment to magical.domains
- Domain availability checking
- Domain purchasing

In production, these would connect to:
- OpenAI API or similar for website generation
- Vercel/Netlify APIs for deployment
- Domain registrar APIs for purchases

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Performance

- **Fast Loading** - Optimized CSS and minimal JavaScript
- **Progressive Enhancement** - Works with JavaScript disabled (basic HTML)
- **Mobile Optimized** - Responsive design with touch-friendly interactions

## Security

- Input validation and sanitization
- HTTPS enforcement
- CSP headers (when deployed)
- XSS protection

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Build and test: `npm run build`
5. Commit your changes: `git commit -m 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## Debugging

The app exposes a global object for debugging:
```javascript
// In browser console
magicalDomainsApp.getAppState()     // Get current state
magicalDomainsApp.exportData()      // Export data as JSON
magicalDomainsApp.reset()           // Reset application
```

## License

MIT License - see LICENSE file for details

## Support

For support, please open an issue on GitHub or contact the development team.

---

Built with ❤️ for the magical.domains platform 