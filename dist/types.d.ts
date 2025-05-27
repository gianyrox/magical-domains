export interface ProjectData {
    name: string;
    description: string;
    domain?: string;
}
export interface GenerationResult {
    success: boolean;
    websiteContent?: string;
    preview?: string;
    error?: string;
}
export interface DeploymentResult {
    success: boolean;
    url?: string;
    error?: string;
}
export interface DomainPurchaseResult {
    success: boolean;
    domain?: string;
    price?: number;
    error?: string;
}
export declare enum StepStatus {
    PENDING = "pending",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed",
    ERROR = "error"
}
export interface StepState {
    generate: StepStatus;
    deploy: StepStatus;
    buyDomain: StepStatus;
}
//# sourceMappingURL=types.d.ts.map