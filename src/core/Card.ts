import { Feature } from "../values/features";

export class Card {
  rpm: number;
  energyRating: number;
  fastestProgram: number;
  capacity: number;

  constructor() {
    this.rpm = Math.floor(Math.random() * 1000) + 1000;
    this.energyRating = Math.floor(Math.random() * 5) + 1; // e.g., 1 to 5 scale
    this.fastestProgram = Math.floor(Math.random() * 30) + 30; // 30–60 mins
    this.capacity = Math.floor(Math.random() * 6) + 5; // 5–10 kg
  }

  getValueByFeature(feature: Feature): number {
    switch (feature) {
      case Feature.RPM:
        return this.rpm;
      case Feature.ENERGY:
        return this.energyRating;
      case Feature.FASTEST:
        return -this.fastestProgram; // lower is better
      case Feature.CAPACITY:
        return this.capacity;
    }
  }

  toString(): string {
    return `RPM: ${this.rpm}, Energy: ${this.energyRating}, Fastest Program: ${this.fastestProgram} mins, Capacity: ${this.capacity}kg`;
  }
}
