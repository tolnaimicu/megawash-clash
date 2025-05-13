export enum Feature {
    RPM = "rpm",
    ENERGY = "energyRating",
    FASTEST = "fastestProgram",
    CAPACITY = "capacity"
  }
  
  export const FeatureDisplayNames: Record<Feature, string> = {
    [Feature.RPM]: "RPM",
    [Feature.ENERGY]: "Energy Rating",
    [Feature.FASTEST]: "Fastest Program",
    [Feature.CAPACITY]: "Capacity"
  };