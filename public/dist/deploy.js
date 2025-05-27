import { StepStatus } from './types.js';
import { updateStepState, updateButtonState, showStatusMessage } from './utils.js';
export class WebsiteDeployer {
    constructor() {
        this.projectData = null;
        this.websiteContent = null;
        this.deploymentResult = null;
        this.initializeEventListeners();
        this.setupCustomEventListeners();
    }
    initializeEventListeners() {
        const deployButton = document.getElementById('deployButton');
        deployButton?.addEventListener('click', () => this.handleDeploy());
    }
    setupCustomEventListeners() {
        // Listen for website generation completion
        window.addEventListener('websiteGenerated', (event) => {
            const customEvent = event;
            const { projectData, result } = customEvent.detail;
            this.projectData = projectData;
            this.websiteContent = result.websiteContent;
        });
    }
    async handleDeploy() {
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
                const buyButton = document.getElementById('buyButton');
                if (buyButton) {
                    buyButton.disabled = false;
                }
                alert(`🚀 Your website is now live at ${result.url}!`);
                // Trigger custom event for other modules
                window.dispatchEvent(new CustomEvent('websiteDeployed', {
                    detail: { projectData: this.projectData, result }
                }));
            }
            else {
                throw new Error(result.error || 'Deployment failed');
            }
        }
        catch (error) {
            updateStepState('deploy', StepStatus.ERROR);
            updateButtonState('deployButton', 'Deploy to Domain', false);
            alert(`❌ Deployment failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    async deployWebsite(projectData, _websiteContent) {
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
    async checkDeploymentStatus(_url) {
        // Simulate checking if deployment is live
        try {
            // In a real implementation, this would ping the URL to verify it's live
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(true); // Assume deployment is successful
                }, 500);
            });
        }
        catch (error) {
            return false;
        }
    }
    getDeploymentResult() {
        return this.deploymentResult;
    }
    getProjectData() {
        return this.projectData;
    }
    async verifyDeployment() {
        if (!this.deploymentResult?.url) {
            return false;
        }
        return await this.checkDeploymentStatus(this.deploymentResult.url);
    }
}
//# sourceMappingURL=deploy.js.map