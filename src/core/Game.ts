import { Card } from "./Card";
import { Player } from "./Player";
import { Deck } from "./Deck";
import { Feature, FeatureDisplayNames } from "../values/features";
import readlineSync from "readline-sync";
import { shuffle } from "../utilities/shuffle";
import { safeInput, validateNumericInput } from "../utilities/inputValidation";
import { UIService } from "../utilities/UIService";



export class Game {
    players: Player[] = [];
    currentPlayerIndex: number = 0;
    private uiService: UIService;

    constructor(private playerCount: number) {
        if (playerCount < 3) throw new Error("Minimum 3 players required.");
        this.setupGame();
        this.uiService = new UIService();
    }

    private setupGame() {
        // Create players
        this.players.push(new Player("You"));
        for (let i = 1; i < this.playerCount; i++) {
            this.players.push(new Player(`Robot_${i}`));
        }

        // Create and deal the deck
        const extraCards = 5;
        const totalCards = this.playerCount * extraCards;
        const deck = new Deck(totalCards);
        const hands = deck.deal(this.playerCount);

        this.players.forEach((player, index) => {
            player.deck = hands[index];
        });

        // Random starting player
        this.currentPlayerIndex = Math.floor(Math.random() * this.players.length);
    }

    public async start() {
        console.clear();
        await this.uiService.showGameStartBanner(this.playerCount);

        while (!this.isGameOver()) {
            this.playRound();
        }

        const winner = this.players.find(p => !p.isEliminated());
        this.uiService.showGameOver(winner, this.players);
    }

    private async playRound() {
        const before = [...this.players];
        this.removeEliminatedPlayers();
        const eliminated = before.filter(p => !this.players.includes(p));
    
        this.uiService.showEliminatedPlayers(eliminated);

    
        if (this.players.length <= 1) return; // Game is over

        // Recalculate activePlayers and currentPlayer
        const activePlayers = this.players;
        this.currentPlayerIndex %= activePlayers.length;
        const currentPlayer = activePlayers[this.currentPlayerIndex];

        this.uiService.showNewRoundBanner(currentPlayer);

    
        // --- SELECT FEATURE ---
        let chosenFeature: Feature;
        const userCard = currentPlayer.getTopCard();
    
        if (currentPlayer.name === "You") {
            console.log(`\nYour Top Card:\n${userCard?.toString()}`);
            chosenFeature = this.askUserToChooseFeature();
            console.log(`\n${currentPlayer.name} chose to compete with: ${FeatureDisplayNames[chosenFeature]}`);
        } else {
            const featureList = Object.values(Feature);
            chosenFeature = featureList[Math.floor(Math.random() * featureList.length)];
            console.log(`\n${currentPlayer.name} chose to compete with: ${FeatureDisplayNames[chosenFeature]}`);
        }
    
        // --- PLAY CARDS BEFORE COMPARISON ---
        const played: { player: Player; card: Card }[] = [];
    
        for (const player of activePlayers) {
            const card = player.playTopCard();
            if (card) {
                played.push({ player, card });
            }
        }
    
        const maxVal = Math.max(...played.map(p => p.card.getValueByFeature(chosenFeature)));
        let winners = played.filter(p => p.card.getValueByFeature(chosenFeature) === maxVal);
    
        this.uiService.showRoundResults(played, chosenFeature);

        let playedCards: Card[] = played.map(p => p.card);
    
        // --- TIEBREAKER LOOP ---
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
    
        const roundWinner = winners[0].player;
        roundWinner.receiveCards(shuffle(playedCards));
        roundWinner.incrementWin();
    
        console.log(`\n${roundWinner.name} won the round and collected ${playedCards.length} cards!`);
        this.nextTurn();
        this.showPlayerCardCounts();
        safeInput("\nPress ENTER to continue (or type 'exit'): ");
    }
    

    private askUserToChooseFeature(): Feature {
        const features = Object.values(Feature);
        const options = Object.entries(FeatureDisplayNames).map(
            ([key, label], idx) => `${idx + 1}. ${label}`
        );

        this.uiService.showFeatureSelectionMenu(options);
        const choice = validateNumericInput("> ", 1, features.length);

        return features[choice - 1];
    }

    private nextTurn() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    }

    private removeEliminatedPlayers() {
        this.players = this.players.filter(p => !p.isEliminated());
    }

    private showPlayerCardCounts() {
        this.uiService.showPlayerCardCounts(this.players);
    }

    private isGameOver(): boolean {
        return this.players.filter(p => !p.isEliminated()).length <= 1;
    }
}