import { ProjectData, DeploymentResult } from './types.js';
export declare class WebsiteDeployer {
    private projectData;
    private websiteContent;
    private deploymentResult;
    constructor();
    private initializeEventListeners;
    private setupCustomEventListeners;
    private handleDeploy;
    private deployWebsite;
    private checkDeploymentStatus;
    getDeploymentResult(): DeploymentResult | null;
    getProjectData(): ProjectData | null;
    verifyDeployment(): Promise<boolean>;
}
//# sourceMappingURL=deploy.d.ts.map