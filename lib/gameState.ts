export type BaccaratSuit = "Spades" | "Hearts" | "Clubs" | "Diamonds";

export type BaccaratRank =
  | "A"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K";

export interface BaccaratCard {
  suit: BaccaratSuit;
  rank: BaccaratRank;
}

export type RoundOutcome = "Player" | "Banker" | "Tie";

export interface ScoreboardTotals {
  playerWins: number;
  bankerWins: number;
  ties: number;
}

export type GameStatus = "ready" | "inRound" | "resetting";

export interface BaccaratGameState {
  shoe: BaccaratCard[];
  discardPile: BaccaratCard[];
  scoreboardHistory: RoundOutcome[];
  scoreboard: ScoreboardTotals;
  status: GameStatus;
}
