import { ProjectData, GenerationResult } from './types.js';
export declare class WebsiteGenerator {
    private projectData;
    private generationResult;
    constructor();
    private initializeEventListeners;
    private autoResizeTextarea;
    private validateInputs;
    private handleGenerate;
    private generateWebsite;
    private generateMockWebsiteContent;
    getProjectData(): ProjectData | null;
    getGenerationResult(): GenerationResult | null;
}
//# sourceMappingURL=generate.d.ts.map