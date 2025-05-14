"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deck = void 0;
const Card_1 = require("./Card");
const shuffle_1 = require("../utilities/shuffle");
class Deck {
    constructor(totalCards) {
        this.cards = [];
        for (let i = 0; i < totalCards; i++) {
            this.cards.push(new Card_1.Card());
        }
        (0, shuffle_1.shuffle)(this.cards);
    }
    deal(playersCount) {
        const result = Array(playersCount).fill(null).map(() => []);
        for (let i = 0; i < this.cards.length; i++) {
            result[i % playersCount].push(this.cards[i]);
        }
        return result;
    }
}
exports.Deck = Deck;
