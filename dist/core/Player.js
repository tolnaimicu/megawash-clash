"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
    constructor(name) {
        this.roundsWon = 0;
        this.name = name;
        this.deck = [];
    }
    isEliminated() {
        return this.deck.length === 0;
    }
    getTopCard() {
        return this.deck.length > 0 ? this.deck[0] : null;
    }
    playTopCard() {
        var _a;
        return (_a = this.deck.shift()) !== null && _a !== void 0 ? _a : null;
    }
    receiveCards(cards) {
        this.deck.push(...cards);
    }
    incrementWin() {
        this.roundsWon++;
    }
}
exports.Player = Player;
