/**
 * Main application class that coordinates all modules
 */
declare class MagicalDomainsApp {
    private generator;
    private deployer;
    private purchaser;
    constructor();
    private initializeApp;
    private setupGlobalEventListeners;
    private handleGlobalError;
    /**
     * Get the current state of all modules
     */
    getAppState(): {
        generator: {
            projectData: import("./types.js").ProjectData | null;
            generationResult: import("./types.js").GenerationResult | null;
        };
        deployer: {
            projectData: import("./types.js").ProjectData | null;
            deploymentResult: import("./types.js").DeploymentResult | null;
        };
        purchaser: {
            projectData: import("./types.js").ProjectData | null;
            purchaseResult: import("./types.js").DomainPurchaseResult | null;
        };
    };
    /**
     * Reset the entire application to initial state
     */
    reset(): void;
    /**
     * Export data for debugging or analytics
     */
    exportData(): string;
}
export { MagicalDomainsApp };
//# sourceMappingURL=main.d.ts.map