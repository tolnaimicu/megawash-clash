import { Player } from "../core/Player"; // Adjusted path to match the correct location
import { Card } from "../core/Card";
import { Feature, FeatureDisplayNames } from "../values/features";



export class UIService {
    clearScreen() {
        console.clear();
    }

    async showGameStartBanner(playerCount: number, players: Player[]) {
        console.log(`
            /=========================================\\
            |                                         |
            |         MEGAWASH CLASH BEGINS!          |
            |       The Ultimate Appliance Battle     |
            |                                         |
            \\=========================================/`);
    
            console.log(`(Type "exit" at any time to quit the game.)\n\n`);
            console.log(`Starting with ${playerCount} players...`);
            await delay(2000);
            console.log(players.map(p => p.name).join(" vs "));
            await delay(3000);
            console.log(`\n\nEvery player has been dealt 5 cards...\n`);
            await delay(2000);
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


    showEliminatedPlayers(eliminatedPlayers: Player[]) {
        eliminatedPlayers.forEach(player => {
            console.log(`
      /=============================\\
      |        ELIMINATED!          |
      |   ${player.name.padEnd(25)}|
      \\=============================/\n`);
        });
    }

   async showNewRoundBanner(currentPlayer: Player) {
        console.log("\n/------------------- NEW ROUND -------------------\\");
        if (currentPlayer.name === "You") {
            console.log("|                  It's your turn!                |");
        } else {
            console.log(`| Turn: ${currentPlayer.name.padEnd(42)}|`);
        }
        console.log("\\-------------------------------------------------/");
        await delay(2000);
    }

    showRoundResults(played: { player: Player; card: Card }[], chosenFeature: Feature) {
        console.log("\n+================ ROUND RESULTS ================+");
        played.forEach(p => {
            const val = p.card.getValueByFeature(chosenFeature);
            const displayVal = chosenFeature === Feature.ENERGY
                ? Card.energyLabels[p.card.energyRating] ?? val
                : val;
            console.log(`| ${p.player.name.padEnd(10)}: ${FeatureDisplayNames[chosenFeature]} = ${displayVal}`);
        });
        console.log("+==============================================+\n");
    }

    

   async showRoundWinner(winner: Player, cardCount: number) {
        console.log(`\n${winner.name} won the round and collected ${cardCount} cards!`);
        await delay(1000);
    }

    showPlayerCardCounts(players: Player[]) {
        console.log("\n\n------------ Current Card Counts --------------");
        players.forEach(player => {
            console.log(`${player.name}: ${player.deck.length} cards`);
        });
        console.log("-----------------------------------------------");
    }

    showGameOver(winner: Player | undefined, players: Player[]) {
        console.log("\n/==========================\\");
        console.log("|       GAME OVER!         |");
        console.log(`|  Winner: ${winner?.name.padEnd(16)}|`);
        console.log("\\==========================/");

        console.log("\n// FINAL LEADERBOARD \\\\");
        players
            .sort((a, b) => b.roundsWon - a.roundsWon)
            .forEach((p, i) => {
                console.log(`${i + 1}. ${p.name.padEnd(10)} - ${p.roundsWon} round(s) won`);
            });
    }

    showFeatureSelectionMenu(options: string[]) {
        console.log("\nChoose a feature to play:");
        console.log("/------------------------------\\");
        options.forEach(opt => console.log(`| ${opt.padEnd(28)}|`));
        console.log("\\------------------------------/");
    }
}


function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
