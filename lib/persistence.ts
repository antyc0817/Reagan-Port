import redis from "./redis";
import type { BaccaratCard, BaccaratGameState, GameStatus, RoundOutcome } from "./gameState";
import { burnCards, createShoe, shuffleShoe } from "./shoe";

const GAME_STATE_KEY = "baccarat:gameState";

const VALID_SUITS = new Set(["Spades", "Hearts", "Clubs", "Diamonds"]);
const VALID_RANKS = new Set(["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]);
const VALID_STATUSES = new Set<GameStatus>(["ready", "inRound", "resetting"]);
const VALID_OUTCOMES = new Set<RoundOutcome>(["Player", "Banker", "Tie"]);

function isValidCard(value: unknown): value is BaccaratCard {
  if (!value || typeof value !== "object") {
    return false;
  }

  const card = value as { suit?: unknown; rank?: unknown };
  return (
    typeof card.suit === "string" &&
    typeof card.rank === "string" &&
    VALID_SUITS.has(card.suit) &&
    VALID_RANKS.has(card.rank)
  );
}

function isValidGameState(value: unknown): value is BaccaratGameState {
  if (!value || typeof value !== "object") {
    return false;
  }

  const state = value as {
    shoe?: unknown;
    discardPile?: unknown;
    scoreboardHistory?: unknown;
    scoreboard?: unknown;
    status?: unknown;
  };

  if (!Array.isArray(state.shoe) || !state.shoe.every(isValidCard)) {
    return false;
  }

  if (!Array.isArray(state.discardPile) || !state.discardPile.every(isValidCard)) {
    return false;
  }

  if (
    !Array.isArray(state.scoreboardHistory) ||
    !state.scoreboardHistory.every(
      (entry) => typeof entry === "string" && VALID_OUTCOMES.has(entry as RoundOutcome)
    )
  ) {
    return false;
  }

  if (!state.scoreboard || typeof state.scoreboard !== "object") {
    return false;
  }

  const scoreboard = state.scoreboard as {
    playerWins?: unknown;
    bankerWins?: unknown;
    ties?: unknown;
  };

  if (
    typeof scoreboard.playerWins !== "number" ||
    typeof scoreboard.bankerWins !== "number" ||
    typeof scoreboard.ties !== "number"
  ) {
    return false;
  }

  if (typeof state.status !== "string" || !VALID_STATUSES.has(state.status as GameStatus)) {
    return false;
  }

  return true;
}

function createFreshState(): BaccaratGameState {
  const freshShoe = burnCards(shuffleShoe(createShoe()));

  return {
    shoe: freshShoe,
    discardPile: [],
    scoreboardHistory: [],
    scoreboard: {
      playerWins: 0,
      bankerWins: 0,
      ties: 0,
    },
    status: "ready",
  };
}

export async function loadGameState(): Promise<BaccaratGameState> {
  try {
    const storedState = await redis.get<unknown>(GAME_STATE_KEY);

    if (isValidGameState(storedState)) {
      return storedState;
    }
  } catch {
    // If Redis read fails, fall through to fresh state initialization.
  }

  const freshState = createFreshState();
  await saveGameState(freshState);
  return freshState;
}

export async function saveGameState(gameState: BaccaratGameState): Promise<void> {
  await redis.set(GAME_STATE_KEY, gameState);
}

export async function resetGame(): Promise<BaccaratGameState> {
  const freshState = createFreshState();
  await saveGameState(freshState);
  return freshState;
}
