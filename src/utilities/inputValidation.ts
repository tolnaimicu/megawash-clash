import readlineSync from "readline-sync";
import { UIService } from "../utilities/UIService";

const uiService = new UIService();


export function safeInput(prompt: string): string {
  const input = readlineSync.question(prompt).trim();
  if (input.toLowerCase() === "exit") {
    uiService.showExitMessage();
  }
  return input;
}


export function validateNumericInput(prompt: string, min: number, max: number): number {
    let choice = -1;
    while (choice < min || choice > max) {
      const input = safeInput(prompt);
      const parsed = parseInt(input, 10);
      if (!isNaN(parsed) && parsed >= min && parsed <= max) {
        choice = parsed;
      } else {
        console.log(`Wrong key! Please enter a number between ${min} and ${max}.`);
      }
    }
    return choice;
}


export function validatePlayerCount(prompt: string): number {
  let playerCount = 0;
  while (playerCount < 3) {
    const input = safeInput(prompt);
    const parsed = parseInt(input, 10);

    if (!isNaN(parsed) && parsed >= 3) {
      playerCount = parsed;
    } else {
      console.log("Please enter a number bigger or equal to 3.\n");
    }
  }
  return playerCount;
}
