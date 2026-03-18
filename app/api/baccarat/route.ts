import { NextResponse } from "next/server";
import type { BaccaratCard, BaccaratGameState, RoundOutcome } from "../../../lib/gameState";
import {
  getHandValue,
  resolveHand,
  shouldBankerDraw,
  shouldPlayerDraw,
} from "../../../lib/gameLogic";
import { loadGameState, resetGame, saveGameState } from "../../../lib/persistence";

type RoundResult = {
  outcome: RoundOutcome;
  playerHand: BaccaratCard[];
  bankerHand: BaccaratCard[];
  playerValue: number;
  bankerValue: number;
  wasNatural: boolean;
  playerNatural: boolean;
  bankerNatural: boolean;
  playerDrewThirdCard: boolean;
  bankerDrewThirdCard: boolean;
  shoeReset: boolean;
};

function drawCard(state: BaccaratGameState): BaccaratCard {
  const card = state.shoe.shift();

  if (!card) {
    throw new Error("Cannot draw card from an empty shoe.");
  }

  return card;
}

function dealInitialHands(state: BaccaratGameState): {
  playerHand: BaccaratCard[];
  bankerHand: BaccaratCard[];
} {
  const playerHand: BaccaratCard[] = [drawCard(state), drawCard(state)];
  const bankerHand: BaccaratCard[] = [drawCard(state), drawCard(state)];

  return { playerHand, bankerHand };
}

function updateScoreboard(
  state: BaccaratGameState,
  outcome: RoundOutcome,
  natural: boolean
): void {
  state.scoreboardHistory.push({ outcome, natural });

  if (outcome === "Player") {
    state.scoreboard.playerWins += 1;
    return;
  }

  if (outcome === "Banker") {
    state.scoreboard.bankerWins += 1;
    return;
  }

  state.scoreboard.ties += 1;
}

function isNatural(playerHand: BaccaratCard[], bankerHand: BaccaratCard[]): boolean {
  const playerTotal = getHandValue(playerHand);
  const bankerTotal = getHandValue(bankerHand);
  return playerTotal >= 8 || bankerTotal >= 8;
}

async function playRound(): Promise<{
  gameState: BaccaratGameState;
  roundResult: RoundResult;
}> {
  const state = await loadGameState();
  state.status = "inRound";

  // Safety fallback: if the shoe is in an invalid low state, reset first.
  if (state.shoe.length < 6) {
    const freshState = await resetGame();
    return {
      gameState: freshState,
      roundResult: {
        outcome: "Tie",
        playerHand: [],
        bankerHand: [],
        playerValue: 0,
        bankerValue: 0,
        wasNatural: false,
        playerNatural: false,
        bankerNatural: false,
        playerDrewThirdCard: false,
        bankerDrewThirdCard: false,
        shoeReset: true,
      },
    };
  }

  const { playerHand, bankerHand } = dealInitialHands(state);
  const playerNatural = [8, 9].includes(getHandValue(playerHand));
  const bankerNatural = [8, 9].includes(getHandValue(bankerHand));

  let playerThirdCard: BaccaratCard | null = null;
  let bankerDrewThirdCard = false;
  const wasNatural = isNatural(playerHand, bankerHand);

  if (!wasNatural) {
    if (shouldPlayerDraw(playerHand)) {
      playerThirdCard = drawCard(state);
      playerHand.push(playerThirdCard);
    }

    if (shouldBankerDraw(bankerHand, playerThirdCard)) {
      const bankerThirdCard = drawCard(state);
      bankerHand.push(bankerThirdCard);
      bankerDrewThirdCard = true;
    }
  }

  const outcome = resolveHand(playerHand, bankerHand);
  updateScoreboard(state, outcome, playerNatural || bankerNatural);

  state.discardPile.push(...playerHand, ...bankerHand);
  state.status = "ready";

  const shouldResetShoe = state.shoe.length < 15;

  if (shouldResetShoe) {
    const freshState = await resetGame();

    return {
      gameState: freshState,
      roundResult: {
        outcome,
        playerHand,
        bankerHand,
        playerValue: getHandValue(playerHand),
        bankerValue: getHandValue(bankerHand),
        wasNatural,
        playerNatural,
        bankerNatural,
        playerDrewThirdCard: playerThirdCard !== null,
        bankerDrewThirdCard,
        shoeReset: true,
      },
    };
  }

  await saveGameState(state);

  return {
    gameState: state,
    roundResult: {
      outcome,
      playerHand,
      bankerHand,
      playerValue: getHandValue(playerHand),
      bankerValue: getHandValue(bankerHand),
      wasNatural,
      playerNatural,
      bankerNatural,
      playerDrewThirdCard: playerThirdCard !== null,
      bankerDrewThirdCard,
      shoeReset: false,
    },
  };
}

export async function GET() {
  try {
    const gameState = await loadGameState();
    return NextResponse.json(gameState);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to load Baccarat game state.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const result = await playRound();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to play Baccarat round.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
