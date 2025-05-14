import readlineSync from "readline-sync";
import { Game } from "./core/Game";
import { safeInput } from "./utilities/inputValidation";

const input = readlineSync.question("Enter number of players (min 3 or type 'exit'): ");
const playerCount = Math.max(3, parseInt(input.trim(), 10));

const game = new Game(playerCount);
game.start();
