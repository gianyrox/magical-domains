import { ProjectData, DomainPurchaseResult } from './types.js';
export declare class DomainPurchaser {
    private projectData;
    private deployedUrl;
    private purchaseResult;
    constructor();
    private initializeEventListeners;
    private setupCustomEventListeners;
    private handleBuyDomain;
    private showDomainSelectionModal;
    private createDomainModal;
    private checkDomainAvailability;
    private purchaseDomain;
    getPurchaseResult(): DomainPurchaseResult | null;
    getProjectData(): ProjectData | null;
}
//# sourceMappingURL=buy-domain.d.ts.map