import readlineSync from "readline-sync";
import { Game } from "./core/Game";

const input = readlineSync.question("Enter number of players (min 3): ");
const playerCount = Math.max(3, parseInt(input.trim(), 10));

const game = new Game(playerCount);
game.start();
