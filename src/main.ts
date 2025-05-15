import readlineSync from "readline-sync";
import { Game } from "./core/Game";
import { safeInput, validatePlayerCount } from "./utilities/inputValidation";


const playerCount = validatePlayerCount("Enter number of players (min 3 or type 'exit'): ");


const game = new Game(playerCount);
game.start();