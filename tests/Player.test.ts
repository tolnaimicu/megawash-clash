import { Player } from "../src/core/Player";
import { Card } from "../src/core/Card";

describe("Player", () => {
  it("should add and play cards", () => {
    const player = new Player("TestPlayer");
    const card1 = new Card();
    const card2 = new Card();

    player.receiveCards([card1, card2]);
    expect(player.isEliminated()).toBe(false);

    const played = player.playTopCard();
    expect(played).toBe(card1);
    expect(player.deck.length).toBe(1);
  });

  it("should be eliminated when no cards", () => {
    const player = new Player("EmptyPlayer");
    expect(player.isEliminated()).toBe(true);
  });

  it("should track rounds won", () => {
    const player = new Player("Test");
    player.incrementWin();
    player.incrementWin();
    expect(player.roundsWon).toBe(2);
  });
});
