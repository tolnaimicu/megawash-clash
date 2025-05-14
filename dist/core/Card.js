"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
const features_1 = require("../values/features");
class Card {
    constructor() {
        this.rpm = Math.floor(Math.random() * 1000) + 1000;
        this.energyRating = Math.floor(Math.random() * 6) + 1; // 1 to 6
        this.fastestProgram = Math.floor(Math.random() * 30) + 30;
        this.capacity = Math.floor(Math.random() * 6) + 5;
    }
    getValueByFeature(feature) {
        switch (feature) {
            case features_1.Feature.RPM:
                return this.rpm;
            case features_1.Feature.ENERGY:
                return this.energyRating;
            case features_1.Feature.FASTEST:
                return -this.fastestProgram;
            case features_1.Feature.CAPACITY:
                return this.capacity;
        }
    }
    toString() {
        const energyLabel = Card.energyLabels[this.energyRating] || this.energyRating.toString();
        return `RPM: ${this.rpm}, Energy: ${energyLabel}, Fastest Program: ${this.fastestProgram} mins, Capacity: ${this.capacity}kg`;
    }
}
exports.Card = Card;
Card.energyLabels = {
    1: "D",
    2: "C",
    3: "A",
    4: "A+",
    5: "A++",
    6: "A+++"
};
