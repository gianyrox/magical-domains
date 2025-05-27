import { StepStatus, StepState } from './types.js';
/**
 * Update the state of a specific step
 */
export declare function updateStepState(step: keyof StepState, status: StepStatus): void;
/**
 * Get the current state of all steps
 */
export declare function getCurrentStepState(): StepState;
/**
 * Update button text and disabled state
 */
export declare function updateButtonState(buttonId: string, text: string, disabled: boolean): void;
/**
 * Show or update a status message
 */
export declare function showStatusMessage(statusId: string, message: string): void;
/**
 * Hide a status message
 */
export declare function hideStatusMessage(statusId: string): void;
/**
 * Validate domain name format
 */
export declare function validateDomainName(domain: string): boolean;
/**
 * Sanitize project name for use in domain
 */
export declare function sanitizeProjectName(name: string): string;
/**
 * Format price for display
 */
export declare function formatPrice(price: number): string;
/**
 * Show loading spinner
 */
export declare function showLoadingSpinner(containerId: string): void;
/**
 * Hide loading spinner
 */
export declare function hideLoadingSpinner(): void;
/**
 * Add CSS animations if not already present
 */
export declare function addAnimations(): void;
/**
 * Debounce function for input validation
 */
export declare function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void;
//# sourceMappingURL=utils.d.ts.map