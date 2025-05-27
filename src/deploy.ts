import { ProjectData, DeploymentResult, StepStatus } from './types.js';
import { updateStepState, updateButtonState, showStatusMessage } from './utils.js';

export class WebsiteDeployer {
  private projectData: ProjectData | null = null;
  private websiteContent: string | null = null;
  private deploymentResult: DeploymentResult | null = null;

  constructor() {
    this.initializeEventListeners();
    this.setupCustomEventListeners();
  }

  private initializeEventListeners(): void {
    const deployButton = document.getElementById('deployButton') as HTMLButtonElement;
    deployButton?.addEventListener('click', () => this.handleDeploy());
  }

  private setupCustomEventListeners(): void {
    // Listen for website generation completion
    window.addEventListener('websiteGenerated', (event: Event) => {
      const customEvent = event as CustomEvent;
      const { projectData, result } = customEvent.detail;
      this.projectData = projectData;
      this.websiteContent = result.websiteContent;
    });
  }

  private async handleDeploy(): Promise<void> {
    if (!this.projectData || !this.websiteContent) {
      alert('❌ No website to deploy! Please generate a website first.');
      return;
    }

    try {
      updateStepState('deploy', StepStatus.IN_PROGRESS);
      updateButtonState('deployButton', 'Deploying...', true);

      const result = await this.deployWebsite(this.projectData, this.websiteContent);
      
      if (result.success) {
        this.deploymentResult = result;
        updateStepState('deploy', StepStatus.COMPLETED);
        updateButtonState('deployButton', '✓ Deployed', true);
        showStatusMessage('deployStatus', `✓ Live at ${result.url}`);
        showStatusMessage('buyStatus', 'Available for purchase');
        
        // Enable buy domain button
        const buyButton = document.getElementById('buyButton') as HTMLButtonElement;
        if (buyButton) {
          buyButton.disabled = false;
        }

        alert(`🚀 Your website is now live at ${result.url}!`);
        
        // Trigger custom event for other modules
        window.dispatchEvent(new CustomEvent('websiteDeployed', { 
          detail: { projectData: this.projectData, result } 
        }));
      } else {
        throw new Error(result.error || 'Deployment failed');
      }
    } catch (error) {
      updateStepState('deploy', StepStatus.ERROR);
      updateButtonState('deployButton', 'Deploy to Domain', false);
      alert(`❌ Deployment failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async deployWebsite(projectData: ProjectData, _websiteContent: string): Promise<DeploymentResult> {
    // Simulate deployment process
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate successful deployment
        const url = `https://${projectData.name}.magical.domains`;
        
        // In a real implementation, this would:
        // 1. Upload the website content to a hosting service
        // 2. Configure DNS records for the subdomain
        // 3. Set up SSL certificates
        // 4. Configure CDN
        
        resolve({
          success: true,
          url: url
        });
      }, 1500 + Math.random() * 500); // 1.5-2 seconds
    });
  }

  private async checkDeploymentStatus(_url: string): Promise<boolean> {
    // Simulate checking if deployment is live
    try {
      // In a real implementation, this would ping the URL to verify it's live
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true); // Assume deployment is successful
        }, 500);
      });
    } catch (error) {
      return false;
    }
  }

  public getDeploymentResult(): DeploymentResult | null {
    return this.deploymentResult;
  }

  public getProjectData(): ProjectData | null {
    return this.projectData;
  }

  public async verifyDeployment(): Promise<boolean> {
    if (!this.deploymentResult?.url) {
      return false;
    }
    
    return await this.checkDeploymentStatus(this.deploymentResult.url);
  }
} 