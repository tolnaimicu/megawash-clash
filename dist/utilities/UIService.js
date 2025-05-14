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
exports.UIService = void 0;
const Card_1 = require("../core/Card");
const features_1 = require("../values/features");
class UIService {
    clearScreen() {
        console.clear();
    }
    showGameStartBanner(playerCount, players, cardsPerPlayer) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`
            /=========================================\\
            |                                         |
            |         MEGAWASH CLASH BEGINS!          |
            |       The Ultimate Appliance Battle     |
            |                                         |
            \\=========================================/\n`);
            console.log(`(Type "exit" at any time to quit the game.)\n\n`);
            console.log(`Starting with ${playerCount} players...`);
            yield delay(2000);
            console.log(`<<< ${players.map(p => p.name).join(" vs ")} >>>`);
            yield delay(3000);
            console.log(`\n\nEvery player has been dealt ${cardsPerPlayer} cards...\n`);
            yield delay(2000);
        });
    }
    showExitMessage() {
        console.clear();
        console.log(`
        /=========================================\\
        |                                         |
        |         EXITING MEGAWASH CLASH!         |
        |           see you next time :)          |
        |                                         |
        \\=========================================/
        `);
        process.exit(0);
    }
    showEliminatedPlayers(eliminatedPlayers) {
        eliminatedPlayers.forEach(player => {
            console.log(`
      /=============================\\
      |        ELIMINATED!          |
      |   ${player.name.padEnd(25)} |
      \\=============================/\n`);
        });
    }
    showNewRoundBanner(currentPlayer, roundNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`\n/-------------------- ROUND ${roundNumber} --------------------\\`);
            if (currentPlayer.name === "You") {
                console.log("|                  It's your turn!                |");
            }
            else {
                console.log(`| Turn: ${currentPlayer.name.padEnd(42)}|`);
            }
            console.log("\\-------------------------------------------------/");
            yield delay(2000);
        });
    }
    showRoundResults(played, chosenFeature) {
        console.log("\n+================ ROUND RESULTS ================+");
        played.forEach(p => {
            var _a;
            const val = p.card.getValueByFeature(chosenFeature);
            const displayVal = chosenFeature === features_1.Feature.ENERGY
                ? (_a = Card_1.Card.energyLabels[p.card.energyRating]) !== null && _a !== void 0 ? _a : val
                : val;
            console.log(`| ${p.player.name.padEnd(10)}: ${features_1.FeatureDisplayNames[chosenFeature]} = ${displayVal}`);
        });
        console.log("+==============================================+\n");
    }
    showRoundWinner(winner, cardCount) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`\n${winner.name} won the round and collected ${cardCount} cards!`);
            yield delay(1000);
        });
    }
    showPlayerCardCounts(players) {
        console.log("\n\n------------ Current Card Counts --------------");
        players.forEach(player => {
            console.log(`${player.name}: ${player.deck.length} cards`);
        });
        console.log("-----------------------------------------------");
    }
    showGameOver(winner, players) {
        console.log("\n/==========================\\");
        console.log("|       GAME OVER!         |");
        console.log(`|  Winner: ${winner === null || winner === void 0 ? void 0 : winner.name.padEnd(16)}|`);
        console.log("\\==========================/");
        console.log("\n// FINAL LEADERBOARD \\\\");
        players
            .sort((a, b) => b.roundsWon - a.roundsWon)
            .forEach((p, i) => {
            console.log(`${i + 1}. ${p.name.padEnd(10)} - ${p.roundsWon} round(s) won`);
        });
    }
    showFeatureSelectionMenu(options) {
        console.log("\nChoose a feature to play:");
        console.log("/------------------------------\\");
        options.forEach(opt => console.log(`| ${opt.padEnd(28)}|`));
        console.log("\\------------------------------/");
    }
}
exports.UIService = UIService;
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
