import { Card } from "../src/core/Card";
import { Feature } from "../src/values/features";

describe("Card", () => {
  it("should generate a card with valid values", () => {
    const card = new Card();
    expect(card.rpm).toBeGreaterThanOrEqual(1000);
    expect(card.rpm).toBeLessThanOrEqual(1999);
    expect(card.energyRating).toBeGreaterThanOrEqual(1);
    expect(card.fastestProgram).toBeGreaterThanOrEqual(30);
    expect(card.capacity).toBeGreaterThanOrEqual(5);
  });

  it("should return the correct feature value", () => {
    const card = new Card();
    card.rpm = 1600;
    card.energyRating = 4;
    card.fastestProgram = 40;
    card.capacity = 8;

    expect(card.getValueByFeature(Feature.RPM)).toBe(1600);
    expect(card.getValueByFeature(Feature.ENERGY)).toBe(4);
    expect(card.getValueByFeature(Feature.FASTEST)).toBe(-40); 
    expect(card.getValueByFeature(Feature.CAPACITY)).toBe(8);
  });

  it("should display energy rating as label", () => {
    const card = new Card();
    card.energyRating = 6;
    const str = card.toString();
    expect(str.includes("A+++")).toBe(true);
  });
});
