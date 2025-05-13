import { Card } from "./Card";

export class Player {
  name: string;
  deck: Card[];

  constructor(name: string) {
    this.name = name;
    this.deck = [];
  }

  isEliminated(): boolean {
    return this.deck.length === 0;
  }

  getTopCard(): Card | null {
    return this.deck[0] ?? null;
  }

  playTopCard(): Card | null {
    return this.deck.shift() ?? null;
  }

  receiveCards(cards: Card[]) {
    this.deck.push(...cards);
  }
}
