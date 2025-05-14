import { Feature } from "../values/features";

export class Card {
    rpm: number;
    energyRating: number;
    fastestProgram: number;
    capacity: number;
  
    static energyLabels: Record<number, string> = {
      1: "D",
      2: "C",
      3: "A",
      4: "A+",
      5: "A++",
      6: "A+++"
    };
  
    constructor() {
      this.rpm = Math.floor(Math.random() * 1000) + 1000;
      this.energyRating = Math.floor(Math.random() * 6) + 1;
      this.fastestProgram = Math.floor(Math.random() * 30) + 30;
      this.capacity = Math.floor(Math.random() * 6) + 5;
    }
  
    getValueByFeature(feature: Feature): number {
      switch (feature) {
        case Feature.RPM:
          return this.rpm;
        case Feature.ENERGY:
          return this.energyRating;
        case Feature.FASTEST:
          return -this.fastestProgram;
        case Feature.CAPACITY:
          return this.capacity;
      }
    }
  
    toString(): string {
      const energyLabel = Card.energyLabels[this.energyRating] || this.energyRating.toString();
      return `RPM: ${this.rpm}, Energy: ${energyLabel}, Fastest Program: ${this.fastestProgram} mins, Capacity: ${this.capacity}kg`;
    }
  }
  
