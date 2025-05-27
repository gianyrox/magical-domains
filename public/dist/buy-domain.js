import { StepStatus } from './types.js';
import { updateStepState, updateButtonState, showStatusMessage } from './utils.js';
export class DomainPurchaser {
    constructor() {
        this.projectData = null;
        this.deployedUrl = null;
        this.purchaseResult = null;
        this.initializeEventListeners();
        this.setupCustomEventListeners();
    }
    initializeEventListeners() {
        const buyButton = document.getElementById('buyButton');
        buyButton?.addEventListener('click', () => this.handleBuyDomain());
    }
    setupCustomEventListeners() {
        // Listen for website deployment completion
        window.addEventListener('websiteDeployed', (event) => {
            const customEvent = event;
            const { projectData, result } = customEvent.detail;
            this.projectData = projectData;
            this.deployedUrl = result.url;
        });
    }
    async handleBuyDomain() {
        if (!this.projectData || !this.deployedUrl) {
            alert('❌ Please deploy your website first before purchasing a domain!');
            return;
        }
        try {
            // Show domain selection modal/process
            const customDomain = await this.showDomainSelectionModal();
            if (!customDomain) {
                return; // User cancelled
            }
            updateStepState('buyDomain', StepStatus.IN_PROGRESS);
            updateButtonState('buyButton', 'Processing...', true);
            const result = await this.purchaseDomain(customDomain);
            if (result.success) {
                this.purchaseResult = result;
                updateStepState('buyDomain', StepStatus.COMPLETED);
                updateButtonState('buyButton', '✓ Domain Purchased', true);
                showStatusMessage('buyStatus', `✓ ${result.domain} purchased`);
                alert(`🎉 Domain ${result.domain} has been purchased successfully! 
               Your website will be available at both:
               • ${this.deployedUrl}
               • https://${result.domain}`);
                // Trigger custom event
                window.dispatchEvent(new CustomEvent('domainPurchased', {
                    detail: { projectData: this.projectData, result }
                }));
            }
            else {
                throw new Error(result.error || 'Domain purchase failed');
            }
        }
        catch (error) {
            updateStepState('buyDomain', StepStatus.ERROR);
            updateButtonState('buyButton', 'Buy Custom Domain', false);
            alert(`❌ Domain purchase failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    async showDomainSelectionModal() {
        return new Promise((resolve) => {
            // Create a simple modal for domain selection
            const modal = this.createDomainModal();
            document.body.appendChild(modal);
            const form = modal.querySelector('form');
            const domainInput = modal.querySelector('#customDomain');
            const checkButton = modal.querySelector('#checkAvailability');
            const cancelButton = modal.querySelector('#cancelPurchase');
            const confirmButton = modal.querySelector('#confirmPurchase');
            // Set default domain suggestion
            if (this.projectData) {
                domainInput.value = `${this.projectData.name}.com`;
            }
            checkButton.addEventListener('click', async () => {
                const domain = domainInput.value.trim();
                if (domain) {
                    checkButton.textContent = 'Checking...';
                    checkButton.disabled = true;
                    const isAvailable = await this.checkDomainAvailability(domain);
                    if (isAvailable) {
                        confirmButton.disabled = false;
                        confirmButton.textContent = `Buy ${domain} - $12.99/year`;
                    }
                    else {
                        alert('❌ Domain is not available. Please try another.');
                    }
                    checkButton.textContent = 'Check Availability';
                    checkButton.disabled = false;
                }
            });
            cancelButton.addEventListener('click', () => {
                document.body.removeChild(modal);
                resolve(null);
            });
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const domain = domainInput.value.trim();
                if (domain) {
                    document.body.removeChild(modal);
                    resolve(domain);
                }
            });
        });
    }
    createDomainModal() {
        const modal = document.createElement('div');
        modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    `;
        modal.innerHTML = `
      <div style="
        background: white;
        padding: 2rem;
        border-radius: 16px;
        max-width: 500px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
      ">
        <h2 style="margin-bottom: 1rem; color: #4a5568;">Purchase Custom Domain</h2>
        <p style="margin-bottom: 1.5rem; color: #718096;">
          Enter your desired domain name. We'll check availability and pricing.
        </p>
        
        <form>
          <div style="margin-bottom: 1rem;">
            <input 
              type="text" 
              id="customDomain" 
              placeholder="yoursite.com"
              style="
                width: 100%;
                padding: 0.75rem;
                border: 2px solid #e2e8f0;
                border-radius: 8px;
                font-size: 1rem;
                outline: none;
              "
              required
            >
          </div>
          
          <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem;">
            <button 
              type="button" 
              id="checkAvailability"
              style="
                flex: 1;
                padding: 0.75rem;
                background: #667eea;
                color: white;
                border: none;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
              "
            >
              Check Availability
            </button>
          </div>
          
          <div style="display: flex; gap: 1rem;">
            <button 
              type="button" 
              id="cancelPurchase"
              style="
                flex: 1;
                padding: 0.75rem;
                background: #e2e8f0;
                color: #4a5568;
                border: none;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
              "
            >
              Cancel
            </button>
            <button 
              type="submit" 
              id="confirmPurchase"
              disabled
              style="
                flex: 1;
                padding: 0.75rem;
                background: #38a169;
                color: white;
                border: none;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                opacity: 0.5;
              "
            >
              Check domain first
            </button>
          </div>
        </form>
      </div>
    `;
        return modal;
    }
    async checkDomainAvailability(_domain) {
        // Simulate domain availability check
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simulate that most domains are available
                const isAvailable = Math.random() > 0.3;
                resolve(isAvailable);
            }, 1000);
        });
    }
    async purchaseDomain(domain) {
        // Simulate domain purchase process
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simulate successful purchase
                resolve({
                    success: true,
                    domain: domain,
                    price: 12.99
                });
            }, 2000 + Math.random() * 1000); // 2-3 seconds
        });
    }
    getPurchaseResult() {
        return this.purchaseResult;
    }
    getProjectData() {
        return this.projectData;
    }
}
//# sourceMappingURL=buy-domain.js.map