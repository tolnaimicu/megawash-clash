import { Card } from "./Card";
import { shuffle } from "../utilities/shuffle";

export class Deck {
  cards: Card[];

  constructor(totalCards: number) {
    this.cards = [];
    for (let i = 0; i < totalCards; i++) {
      this.cards.push(new Card());
    }

    shuffle(this.cards);
  }

  deal(playersCount: number): Card[][] {
    const result: Card[][] = Array(playersCount).fill(null).map(() => []);
    for (let i = 0; i < this.cards.length; i++) {
      result[i % playersCount].push(this.cards[i]);
    }
    return result;
  }
}
