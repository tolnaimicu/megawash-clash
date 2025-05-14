# MegaWash Clash 🧼🌀

MegaWash Clash is a command-line card game written in TypeScript where washing machines battle it out using their RPM, energy rating, fastest program, and capacity. You play against bots, choose which feature to compete with each round, and try to outlast everyone.

It's designed to be fun, testable, and a bit retro — with a few added touches like CLI banners, tiebreakers, and a leaderboard.

---

## 🛠️ Tech Stack

- Node.js + TypeScript
- readline-sync (for CLI input)
- Jest (for unit tests)
- Docker (for easy sharing and cloud compatibility)

---

## 🎮 How to Play (Locally)

Clone the repo and run it using ts-node:

```bash
npm install
npx ts-node src/cli/main.ts
