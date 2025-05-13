import { Deck } from "../src/core/Deck";

describe("Deck", () => {
  it("should distribute cards evenly", () => {
    const totalCards = 12;
    const players = 3;
    const deck = new Deck(totalCards);
    const hands = deck.deal(players);

    expect(hands.length).toBe(3);
    expect(hands[0].length + hands[1].length + hands[2].length).toBe(12);
    expect(hands.every(hand => hand.length === 4)).toBe(true);
  });
});
