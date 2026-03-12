import type { BaccaratCard, BaccaratRank, BaccaratSuit } from "./gameState";

const SUITS: BaccaratSuit[] = ["Spades", "Hearts", "Clubs", "Diamonds"];
const RANKS: BaccaratRank[] = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

export function createShoe(): BaccaratCard[] {
  const shoe: BaccaratCard[] = [];

  for (let deckIndex = 0; deckIndex < 8; deckIndex += 1) {
    for (const suit of SUITS) {
      for (const rank of RANKS) {
        shoe.push({ suit, rank });
      }
    }
  }

  return shoe;
}

export function shuffleShoe(shoe: BaccaratCard[]): BaccaratCard[] {
  const shuffled = [...shoe];

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }

  return shuffled;
}

function getBurnValue(rank: BaccaratRank): number {
  if (rank === "A") {
    return 1;
  }

  if (rank === "10" || rank === "J" || rank === "Q" || rank === "K") {
    return 10;
  }

  return Number(rank);
}

export function burnCards(shoe: BaccaratCard[]): BaccaratCard[] {
  if (shoe.length === 0) {
    return [];
  }

  const revealedCard = shoe[0];
  const burnCount = getBurnValue(revealedCard.rank);
  const totalToRemove = 1 + burnCount;

  return shoe.slice(totalToRemove);
}
