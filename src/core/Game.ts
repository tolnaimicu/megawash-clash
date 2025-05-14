import { Card } from "./Card";
import { Player } from "./Player";
import { Deck } from "./Deck";
import { Feature, FeatureDisplayNames } from "../values/features";
import readlineSync from "readline-sync";
import { shuffle } from "../utilities/shuffle";

export class Game {
  players: Player[] = [];
  currentPlayerIndex: number = 0;

  constructor(private playerCount: number) {
    if (playerCount < 3) throw new Error("Minimum 3 players required.");
    this.setupGame();
  }

  private setupGame() {
    // Create players
    this.players.push(new Player("You"));
    for (let i = 1; i < this.playerCount; i++) {
      this.players.push(new Player(`Robot_${i}`));
    }

    // Create and deal the deck
    const totalCards = this.playerCount * 8;
    const deck = new Deck(totalCards);
    const hands = deck.deal(this.playerCount);

    this.players.forEach((player, index) => {
      player.deck = hands[index];
    });

    // Random starting player
    this.currentPlayerIndex = Math.floor(Math.random() * this.players.length);
  }

  public start() {
    console.log("Welcome to MegaWash Clash!");
    console.log(`Starting with ${this.players.length} players...\n`);

    while (!this.isGameOver()) {
      this.playRound();
    }

    const winner = this.players.find(p => !p.isEliminated());
    console.log(`\nGame Over! Winner: ${winner?.name}`);
  }

  private playRound() {
    console.log("------------------------------------------------");
    this.removeEliminatedPlayers();
    const activePlayers = this.players;

    if (activePlayers.length === 1) return;

    const currentPlayer = activePlayers[this.currentPlayerIndex];

    const topCards = activePlayers.map(p => p.getTopCard()!);

    // --- SELECT FEATURE ---
    let chosenFeature: Feature;
    const card = currentPlayer.getTopCard()!;
    console.log(`${currentPlayer.name}'s Turn!`);

    if (currentPlayer.name === "You") {
      console.log(`Your Top Card:\n${card.toString()}`);
      chosenFeature = this.askUserToChooseFeature();
    } else {
      const featureList = Object.values(Feature);
      chosenFeature = featureList[Math.floor(Math.random() * featureList.length)];
      console.log(`${currentPlayer.name} chose to compete with: ${FeatureDisplayNames[chosenFeature]}`);
    }

    // --- COMPARE CARDS ---
    const results = activePlayers.map(p => ({
      player: p,
      card: p.playTopCard()!,
      value: p.getTopCard()?.getValueByFeature(chosenFeature)
    }));

    const maxVal = Math.max(
      ...results.map(r => r.card.getValueByFeature(chosenFeature))
    );

    let winners = results.filter(r => r.card.getValueByFeature(chosenFeature) === maxVal);

    console.log(`\n--- Round Results ---`);
    results.forEach(r =>
      console.log(`${r.player.name}: ${FeatureDisplayNames[chosenFeature]} = ${r.card.getValueByFeature(chosenFeature)}`)
    );

    let playedCards: Card[] = results.map(r => r.card);

    // TIEBREAKER LOOP
    while (winners.length > 1) {
      console.log("\nTiebreaker!");

      const newCards: { player: Player; card: Card }[] = [];

      for (const winner of winners) {
        const newCard = winner.player.playTopCard();
        if (newCard) {
          newCards.push({ player: winner.player, card: newCard });
        }
      }

      playedCards.push(...newCards.map(c => c.card));

      const tiebreakValues = newCards.map(c => ({
        ...c,
        value: c.card.getValueByFeature(chosenFeature)
      }));

      const newMax = Math.max(...tiebreakValues.map(c => c.value));
      winners = tiebreakValues.filter(c => c.value === newMax);
    }

    const roundWinner = winners[0];
    roundWinner.player.receiveCards(shuffle(playedCards));

    console.log(`\n${roundWinner.player.name} won the round and collected ${playedCards.length} cards!`);
    this.nextTurn(roundWinner.player);
    this.showPlayerCardCounts();
    readlineSync.question("\nPress ENTER to continue...");
  }

  private askUserToChooseFeature(): Feature {
    const options = Object.entries(FeatureDisplayNames).map(([key, label], idx) => `${idx + 1}. ${label}`);
    const input = readlineSync.question(`Choose a feature:\n${options.join("\n")}\n> `);
    const choice = parseInt(input.trim(), 10) - 1;
    return Object.values(Feature)[choice] ?? Feature.RPM;
  }

  private nextTurn(currentWinner: Player) {
    const idx = this.players.indexOf(currentWinner);
    const newIdx = (idx - 1 + this.players.length) % this.players.length;
    this.currentPlayerIndex = newIdx;
  }

  private removeEliminatedPlayers() {
    this.players = this.players.filter(p => !p.isEliminated());
  }

  private showPlayerCardCounts() {
    console.log("\nCurrent Card Counts:");
    this.players.forEach(p => {
      console.log(`${p.name}: ${p.deck.length} cards`);
    });
  }

  private isGameOver(): boolean {
    return this.players.filter(p => !p.isEliminated()).length <= 1;
  }
}
