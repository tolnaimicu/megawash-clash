"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const Player_1 = require("./Player");
const Deck_1 = require("./Deck");
const features_1 = require("../values/features");
const shuffle_1 = require("../utilities/shuffle");
const inputValidation_1 = require("../utilities/inputValidation");
const UIService_1 = require("../utilities/UIService");
class Game {
    constructor(playerCount) {
        this.playerCount = playerCount;
        this.players = [];
        this.currentPlayerIndex = 0;
        this.roundNumber = 1; // Add a property to track the round number
        this.cardsPerPlayer = 0;
        if (playerCount < 3)
            throw new Error("Minimum 3 players required.");
        this.uiService = new UIService_1.UIService();
    }
    setupGame() {
        // Create players
        this.players.push(new Player_1.Player("You"));
        for (let i = 1; i < this.playerCount; i++) {
            this.players.push(new Player_1.Player(`Robot_${i}`));
        }
        // Create and deal the deck
        const totalCards = this.playerCount * this.cardsPerPlayer; // Use cardsPerPlayer
        const deck = new Deck_1.Deck(totalCards);
        const hands = deck.deal(this.playerCount);
        this.players.forEach((player, index) => {
            player.deck = hands[index];
        });
        console.log("\n--- Player Card Counts ---");
        this.players.forEach((player, index) => {
            console.log(`${player.name}: ${player.deck.length} cards`);
        });
        console.log("--------------------------");
        // Random starting player
        this.currentPlayerIndex = Math.floor(Math.random() * this.players.length);
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            console.clear();
            this.cardsPerPlayer = (0, inputValidation_1.validateNumericInput)("Enter the number of cards each player should receive (min 1): ", 1, 52 // Assuming a maximum of 52 cards in the deck
            );
            // Call setupGame after cardsPerPlayer is set
            this.setupGame();
            yield this.uiService.showGameStartBanner(this.playerCount, this.players, this.cardsPerPlayer);
            while (!this.isGameOver()) {
                yield this.playRound();
            }
            const winner = this.players.find(p => !p.isEliminated());
            this.uiService.showGameOver(winner, this.players);
        });
    }
    playRound() {
        return __awaiter(this, void 0, void 0, function* () {
            const before = [...this.players];
            this.removeEliminatedPlayers();
            const eliminated = before.filter(p => !this.players.includes(p));
            this.uiService.showEliminatedPlayers(eliminated);
            if (this.players.length <= 1)
                return; // Game is over
            // Recalculate activePlayers and currentPlayer
            const activePlayers = this.players;
            this.currentPlayerIndex %= activePlayers.length;
            const currentPlayer = activePlayers[this.currentPlayerIndex];
            yield this.uiService.showNewRoundBanner(currentPlayer, this.roundNumber);
            this.roundNumber++;
            // --- SELECT FEATURE ---
            let chosenFeature;
            const userCard = currentPlayer.getTopCard();
            if (currentPlayer.name === "You") {
                console.log(`\nYour Top Card:\n${userCard === null || userCard === void 0 ? void 0 : userCard.toString()}`);
                chosenFeature = this.askUserToChooseFeature();
                console.log(`\n${currentPlayer.name} chose to compete with: ${features_1.FeatureDisplayNames[chosenFeature]}`);
            }
            else {
                const featureList = Object.values(features_1.Feature);
                chosenFeature = featureList[Math.floor(Math.random() * featureList.length)];
                console.log(`\n${currentPlayer.name} chose to compete with: ${features_1.FeatureDisplayNames[chosenFeature]}`);
            }
            // --- PLAY CARDS BEFORE COMPARISON ---
            const played = [];
            for (const player of activePlayers) {
                const card = player.playTopCard();
                if (card) {
                    played.push({ player, card });
                }
            }
            const maxVal = Math.max(...played.map(p => p.card.getValueByFeature(chosenFeature)));
            let winners = played.filter(p => p.card.getValueByFeature(chosenFeature) === maxVal);
            this.uiService.showRoundResults(played, chosenFeature);
            let playedCards = played.map(p => p.card);
            // --- TIEBREAKER LOOP ---
            while (winners.length > 1) {
                console.log("\nTiebreaker!");
                const newCards = [];
                for (const winner of winners) {
                    const newCard = winner.player.playTopCard();
                    if (newCard) {
                        newCards.push({ player: winner.player, card: newCard });
                    }
                }
                playedCards.push(...newCards.map(c => c.card));
                const tiebreakValues = newCards.map(c => (Object.assign(Object.assign({}, c), { value: c.card.getValueByFeature(chosenFeature) })));
                const newMax = Math.max(...tiebreakValues.map(c => c.value));
                winners = tiebreakValues.filter(c => c.value === newMax);
            }
            const roundWinner = winners[0].player;
            roundWinner.receiveCards((0, shuffle_1.shuffle)(playedCards));
            roundWinner.incrementWin();
            yield this.uiService.showRoundWinner(roundWinner, playedCards.length);
            this.nextTurn();
            this.showPlayerCardCounts();
            (0, inputValidation_1.safeInput)("\nPress ENTER to continue (or type 'exit'): ");
        });
    }
    askUserToChooseFeature() {
        const features = Object.values(features_1.Feature);
        const options = Object.entries(features_1.FeatureDisplayNames).map(([key, label], idx) => `${idx + 1}. ${label}`);
        this.uiService.showFeatureSelectionMenu(options);
        const choice = (0, inputValidation_1.validateNumericInput)("> ", 1, features.length);
        return features[choice - 1];
    }
    nextTurn() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    }
    removeEliminatedPlayers() {
        this.players = this.players.filter(p => !p.isEliminated());
    }
    showPlayerCardCounts() {
        this.uiService.showPlayerCardCounts(this.players);
    }
    isGameOver() {
        return this.players.filter(p => !p.isEliminated()).length <= 1;
    }
}
exports.Game = Game;
