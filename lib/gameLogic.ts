import type { BaccaratCard, RoundOutcome } from "./gameState";

function getCardPoint(card: BaccaratCard): number {
  if (card.rank === "A") {
    return 1;
  }

  if (card.rank === "10" || card.rank === "J" || card.rank === "Q" || card.rank === "K") {
    return 0;
  }

  return Number(card.rank);
}

export function getHandValue(hand: BaccaratCard[]): number {
  const total = hand.reduce((sum, card) => sum + getCardPoint(card), 0);
  return total % 10;
}

export function shouldPlayerDraw(hand: BaccaratCard[]): boolean {
  const playerTotal = getHandValue(hand);
  return playerTotal >= 0 && playerTotal <= 5;
}

export function shouldBankerDraw(
  bankerHand: BaccaratCard[],
  playerThirdCard: BaccaratCard | null
): boolean {
  const bankerTotal = getHandValue(bankerHand);

  if (playerThirdCard === null) {
    return bankerTotal <= 5;
  }

  const playerThirdValue = getCardPoint(playerThirdCard);

  if (bankerTotal <= 2) {
    return true;
  }

  if (bankerTotal === 3) {
    return playerThirdValue !== 8;
  }

  if (bankerTotal === 4) {
    return playerThirdValue >= 2 && playerThirdValue <= 7;
  }

  if (bankerTotal === 5) {
    return playerThirdValue >= 4 && playerThirdValue <= 7;
  }

  if (bankerTotal === 6) {
    return playerThirdValue === 6 || playerThirdValue === 7;
  }

  return false;
}

export function resolveHand(playerHand: BaccaratCard[], bankerHand: BaccaratCard[]): RoundOutcome {
  const playerTotal = getHandValue(playerHand);
  const bankerTotal = getHandValue(bankerHand);

  if (playerTotal > bankerTotal) {
    return "Player";
  }

  if (bankerTotal > playerTotal) {
    return "Banker";
  }

  return "Tie";
}
