# MegaWash Clash 

MegaWash Clash is a command-line card game written in TypeScript where washing machines battle using their RPM, energy rating, fastest program, and capacity. You play against bots, choose which feature to compete with each round, and try to outsmart the bots.


---

## Tech Stack

- Node.js + TypeScript
- readline-sync (for CLI input)
- Jest (for unit tests)
- Docker (for easy sharing and cloud compatibility)
- GitHub Actions (for pipeline)

---

## How to Play (Locally)

Clone the repo and run it using ts-node:

```bash
npm install
npm run start
```


## Run it with Docker

Clone the repo and use it with Docker:

```bash
npm run docker:build
npm run docker:run
```

## Run tests:

```bash
npm run test
```

