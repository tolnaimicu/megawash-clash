import readlineSync from "readline-sync";

export function safeInput(prompt: string): string {
  const input = readlineSync.question(prompt).trim();
  if (input.toLowerCase() === "exit") {
    console.log("\nExiting MegaWash Clash. See you next spin!");
    process.exit(0);
  }
  return input;
}
