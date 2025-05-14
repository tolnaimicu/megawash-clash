import { Game } from "../src/core/Game";
import { Player } from "../src/core/Player";
import { Card } from "../src/core/Card";
import { Feature } from "../src/values/features";

// Helper to create a card with defined values
function createCard(rpm: number, energy: number, fastest: number, capacity: number): Card {
  const card = new Card();
  card.rpm = rpm;
  card.energyRating = energy;
  card.fastestProgram = fastest;
  card.capacity = capacity;
  return card;
}

describe("Game Logic", () => {
    it("should declare a player as winner when all others are eliminated", () => {
        const player1 = new Player("You");
        const player2 = new Player("Bot1");
        const player3 = new Player("Bot2");
    
        player1.deck = [createCard(1500, 4, 45, 9)];
        player2.deck = [createCard(1000, 2, 50, 6)];
        player3.deck = []; // Already eliminated
    
        const mockGame = Object.create(Game.prototype) as Game;
        (mockGame as any).players = [player1, player2, player3];
        (mockGame as any).currentPlayerIndex = 0;
    
        // simulating a round
        const p1 = player1.playTopCard();
        const p2 = player2.playTopCard();

        if (!p1 || !p2) {
            throw new Error("One or both players have no cards to play.");
          }

          
        player1.receiveCards([p1, p2]);
    
        expect(player1.deck.length).toBe(2);
        expect(player2.isEliminated()).toBe(true);
        expect(player3.isEliminated()).toBe(true);
  });

  it("should handle tiebreaker correctly", () => {
    const p1 = new Player("P1");
    const p2 = new Player("P2");

    p1.deck = [
      createCard(1500, 5, 40, 8),
      createCard(1300, 4, 35, 7) // used in tiebreaker
    ];

    p2.deck = [
      createCard(1500, 5, 40, 8),
      createCard(1200, 4, 30, 6) // used in tiebreaker
    ];

    const f = Feature.RPM;

    
    const r1 = p1.playTopCard();
    const r2 = p2.playTopCard();

    if (!r1 || !r2) {
      throw new Error("One or both players have no cards to play.");
    }

    expect(r1.getValueByFeature(f)).toBe(r2.getValueByFeature(f));

    // Tiebreaker cards
    const t1 = p1.playTopCard();
    const t2 = p2.playTopCard();

    if (!t1 || !t2) {
        throw new Error("One or both players have no cards to play.");
      }

    const winner = t1.getValueByFeature(f) > t2.getValueByFeature(f) ? p1 : p2;
    winner.receiveCards([r1, r2, t1, t2]);

    expect(winner.deck.length).toBe(4);
  });

  it("should eliminate a player with no cards", () => {
    const p = new Player("Solo");
    expect(p.isEliminated()).toBe(true);
  });
});
