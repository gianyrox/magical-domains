import { StepStatus, StepState } from './types.js';

// Global state management
let currentStepState: StepState = {
  generate: StepStatus.PENDING,
  deploy: StepStatus.PENDING,
  buyDomain: StepStatus.PENDING
};

/**
 * Update the state of a specific step
 */
export function updateStepState(step: keyof StepState, status: StepStatus): void {
  currentStepState[step] = status;
  
  // Update visual indicators based on state
  updateStepVisualState(step, status);
}

/**
 * Get the current state of all steps
 */
export function getCurrentStepState(): StepState {
  return { ...currentStepState };
}

/**
 * Update button text and disabled state
 */
export function updateButtonState(buttonId: string, text: string, disabled: boolean): void {
  const button = document.getElementById(buttonId) as HTMLButtonElement;
  if (button) {
    button.textContent = text;
    button.disabled = disabled;
    
    // Update button styling based on state
    if (disabled && text.includes('✓')) {
      button.style.background = '#38a169';
      button.style.cursor = 'default';
    } else if (disabled) {
      button.style.background = '#cbd5e0';
      button.style.cursor = 'not-allowed';
    } else {
      button.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
      button.style.cursor = 'pointer';
    }
  }
}

/**
 * Show or update a status message
 */
export function showStatusMessage(statusId: string, message: string): void {
  const statusElement = document.getElementById(statusId) as HTMLElement;
  if (statusElement) {
    statusElement.textContent = message;
    statusElement.style.display = 'inline';
  }
}

/**
 * Hide a status message
 */
export function hideStatusMessage(statusId: string): void {
  const statusElement = document.getElementById(statusId) as HTMLElement;
  if (statusElement) {
    statusElement.style.display = 'none';
  }
}

/**
 * Update visual state of step cards based on status
 */
function updateStepVisualState(step: keyof StepState, status: StepStatus): void {
  const stepMapping = {
    generate: 1,
    deploy: 2,
    buyDomain: 3
  };
  
  const stepNumber = stepMapping[step];
  const stepCard = document.querySelector(`.step-card:nth-child(${stepNumber})`) as HTMLElement;
  const stepNumberElement = stepCard?.querySelector('.step-number') as HTMLElement;
  
  if (!stepCard || !stepNumberElement) return;
  
  // Remove existing status classes
  stepCard.classList.remove('step-pending', 'step-in-progress', 'step-completed', 'step-error');
  
  // Add appropriate class and update styling
  switch (status) {
    case StepStatus.PENDING:
      stepCard.classList.add('step-pending');
      stepNumberElement.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
      break;
      
    case StepStatus.IN_PROGRESS:
      stepCard.classList.add('step-in-progress');
      stepNumberElement.style.background = 'linear-gradient(135deg, #f6ad55, #ed8936)';
      stepNumberElement.innerHTML = '<span style="animation: spin 1s linear infinite;">⟳</span>';
      break;
      
    case StepStatus.COMPLETED:
      stepCard.classList.add('step-completed');
      stepNumberElement.style.background = 'linear-gradient(135deg, #38a169, #2f855a)';
      stepNumberElement.innerHTML = '✓';
      break;
      
    case StepStatus.ERROR:
      stepCard.classList.add('step-error');
      stepNumberElement.style.background = 'linear-gradient(135deg, #e53e3e, #c53030)';
      stepNumberElement.innerHTML = '✗';
      break;
  }
}

/**
 * Validate domain name format
 */
export function validateDomainName(domain: string): boolean {
  const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/;
  return domainRegex.test(domain) && domain.length >= 1 && domain.length <= 63;
}

/**
 * Sanitize project name for use in domain
 */
export function sanitizeProjectName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 63);
}

/**
 * Format price for display
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
}

/**
 * Show loading spinner
 */
export function showLoadingSpinner(containerId: string): void {
  const container = document.getElementById(containerId);
  if (container) {
    const spinner = document.createElement('div');
    spinner.id = 'loading-spinner';
    spinner.style.cssText = `
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 3px solid #f3f3f3;
      border-top: 3px solid #667eea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-left: 10px;
    `;
    container.appendChild(spinner);
  }
}

/**
 * Hide loading spinner
 */
export function hideLoadingSpinner(): void {
  const spinner = document.getElementById('loading-spinner');
  if (spinner) {
    spinner.remove();
  }
}

/**
 * Add CSS animations if not already present
 */
export function addAnimations(): void {
  if (!document.getElementById('magical-animations')) {
    const style = document.createElement('style');
    style.id = 'magical-animations';
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      .step-card.step-in-progress {
        box-shadow: 0 8px 30px rgba(102, 126, 234, 0.3);
      }
      
      .step-card.step-completed {
        box-shadow: 0 8px 30px rgba(56, 161, 105, 0.3);
      }
      
      .step-card.step-error {
        box-shadow: 0 8px 30px rgba(229, 62, 62, 0.3);
      }
    `;
    document.head.appendChild(style);
  }
}

/**
 * Debounce function for input validation
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
} 