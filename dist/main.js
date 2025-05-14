"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = require("./core/Game");
const inputValidation_1 = require("./utilities/inputValidation");
const playerCount = (0, inputValidation_1.validatePlayerCount)("Enter number of players (min 3 or type 'exit'): ");
const game = new Game_1.Game(playerCount);
game.start();
