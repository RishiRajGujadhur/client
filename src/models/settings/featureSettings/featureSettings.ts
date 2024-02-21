export interface FeatureSettings {
    id: number;
    isFeatureEnabled: boolean;
    featureName: string;
    featureDescription: string;
    displayOrder: number;
    featureIcon: string;
    featureRoute: string;
    featureType: string;
    featureCategory: string;
    parentFeatureId: number;
    adminFeature: boolean;
    enabledForRoles: string[];
}
