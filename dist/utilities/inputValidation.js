"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeInput = safeInput;
exports.validateNumericInput = validateNumericInput;
exports.validatePlayerCount = validatePlayerCount;
const readline_sync_1 = __importDefault(require("readline-sync"));
const UIService_1 = require("../utilities/UIService");
const uiService = new UIService_1.UIService(); // Create an instance of UIService
function safeInput(prompt) {
    const input = readline_sync_1.default.question(prompt).trim();
    if (input.toLowerCase() === "exit") {
        uiService.showExitMessage();
    }
    return input;
}
function validateNumericInput(prompt, min, max) {
    let choice = -1;
    while (choice < min || choice > max) {
        const input = safeInput(prompt);
        const parsed = parseInt(input, 10);
        if (!isNaN(parsed) && parsed >= min && parsed <= max) {
            choice = parsed;
        }
        else {
            console.log(`Wrong key! Please enter a number between ${min} and ${max}.`);
        }
    }
    return choice;
}
function validatePlayerCount(prompt) {
    let playerCount = 0;
    while (playerCount < 3) {
        const input = safeInput(prompt);
        const parsed = parseInt(input, 10);
        if (!isNaN(parsed) && parsed >= 3) {
            playerCount = parsed;
        }
        else {
            console.log("Please enter a number bigger or equal to 3.\n");
        }
    }
    return playerCount;
}
