import { WebsiteGenerator } from './generate.js';
import { WebsiteDeployer } from './deploy.js';
import { DomainPurchaser } from './buy-domain.js';
import { addAnimations } from './utils.js';

/**
 * Main application class that coordinates all modules
 */
class MagicalDomainsApp {
  private generator!: WebsiteGenerator;
  private deployer!: WebsiteDeployer;
  private purchaser!: DomainPurchaser;

  constructor() {
    this.initializeApp();
  }

  private initializeApp(): void {
    // Add CSS animations
    addAnimations();

    // Initialize all modules
    this.generator = new WebsiteGenerator();
    this.deployer = new WebsiteDeployer();
    this.purchaser = new DomainPurchaser();

    // Set up global event listeners
    this.setupGlobalEventListeners();

    // Log initialization
    console.log('🎉 Magical Domains app initialized successfully!');
  }

  private setupGlobalEventListeners(): void {
    // Listen for all major events and log them
    window.addEventListener('websiteGenerated', (event: Event) => {
      const customEvent = event as CustomEvent;
      console.log('✅ Website generated:', customEvent.detail);
    });

    window.addEventListener('websiteDeployed', (event: Event) => {
      const customEvent = event as CustomEvent;
      console.log('🚀 Website deployed:', customEvent.detail);
    });

    window.addEventListener('domainPurchased', (event: Event) => {
      const customEvent = event as CustomEvent;
      console.log('💰 Domain purchased:', customEvent.detail);
    });

    // Handle page visibility changes to pause/resume operations
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        console.log('⏸️ App paused (tab hidden)');
      } else {
        console.log('▶️ App resumed (tab visible)');
      }
    });

    // Handle errors globally
    window.addEventListener('error', (event) => {
      console.error('❌ Global error:', event.error);
      this.handleGlobalError(event.error);
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      console.error('❌ Unhandled promise rejection:', event.reason);
      this.handleGlobalError(event.reason);
    });
  }

  private handleGlobalError(error: any): void {
    // In a production app, this would send errors to a logging service
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    // Show user-friendly error message
    const shouldShowToUser = !error.message?.includes('Script error') && 
                            !error.message?.includes('Non-Error promise rejection');
    
    if (shouldShowToUser) {
      setTimeout(() => {
        alert(`❌ Something went wrong: ${errorMessage}`);
      }, 100);
    }
  }

  /**
   * Get the current state of all modules
   */
  public getAppState() {
    return {
      generator: {
        projectData: this.generator.getProjectData(),
        generationResult: this.generator.getGenerationResult()
      },
      deployer: {
        projectData: this.deployer.getProjectData(),
        deploymentResult: this.deployer.getDeploymentResult()
      },
      purchaser: {
        projectData: this.purchaser.getProjectData(),
        purchaseResult: this.purchaser.getPurchaseResult()
      }
    };
  }

  /**
   * Reset the entire application to initial state
   */
  public reset(): void {
    // Reload the page to reset everything
    window.location.reload();
  }

  /**
   * Export data for debugging or analytics
   */
  public exportData(): string {
    return JSON.stringify(this.getAppState(), null, 2);
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const app = new MagicalDomainsApp();
  
  // Make app available globally for debugging
  (window as any).magicalDomainsApp = app;
  
  // Add some helpful console messages
  console.log(`
🎨 Magical Domains - AI-Generated Websites
=========================================
Available commands in console:
• magicalDomainsApp.getAppState() - Get current state
• magicalDomainsApp.exportData() - Export data as JSON
• magicalDomainsApp.reset() - Reset application

Happy building! ✨
  `);
});

// Handle page load performance
window.addEventListener('load', () => {
  const loadTime = performance.now();
  console.log(`⚡ Page loaded in ${Math.round(loadTime)}ms`);
});

export { MagicalDomainsApp }; 