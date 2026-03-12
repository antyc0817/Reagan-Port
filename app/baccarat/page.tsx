"use client";

import { useEffect, useState } from "react";
import type { BaccaratCard, BaccaratGameState, RoundOutcome } from "../../lib/gameState";
import styles from "./page.module.css";

const STARTING_BALANCE = 1000;
const TOTAL_BUY_INS = 3;
const CHIP_VALUES = [100, 200, 500] as const;

type BetSide = "Player" | "Banker";

type RoundResult = {
  outcome: RoundOutcome;
  playerHand: BaccaratCard[];
  bankerHand: BaccaratCard[];
  playerValue: number;
  bankerValue: number;
  wasNatural: boolean;
  playerDrewThirdCard: boolean;
  bankerDrewThirdCard: boolean;
  shoeReset: boolean;
};

type PlayRoundResponse = {
  gameState: BaccaratGameState;
  roundResult: RoundResult;
};

function formatHand(hand: BaccaratCard[]): string {
  if (hand.length === 0) {
    return "No cards";
  }

  return hand.map((card) => `${card.rank}${card.suit[0]}`).join(" ");
}

function getChipClass(chipValue: number): string {
  if (chipValue === 100) {
    return styles.chip100;
  }

  if (chipValue === 200) {
    return styles.chip200;
  }

  return styles.chip500;
}

export default function BaccaratPage() {
  const [gameState, setGameState] = useState<BaccaratGameState | null>(null);
  const [balance, setBalance] = useState<number>(STARTING_BALANCE);
  const [buyInsRemaining, setBuyInsRemaining] = useState<number>(TOTAL_BUY_INS);
  const [selectedSide, setSelectedSide] = useState<BetSide | null>(null);
  const [selectedChip, setSelectedChip] = useState<number | null>(null);
  const [lastRoundResult, setLastRoundResult] = useState<RoundResult | null>(null);
  const [totalRoundsPlayed, setTotalRoundsPlayed] = useState<number>(0);
  const [correctBets, setCorrectBets] = useState<number>(0);
  const [wrongBets, setWrongBets] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGameState() {
      try {
        const response = await fetch("/api/baccarat", {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch game state.");
        }

        const data = (await response.json()) as BaccaratGameState;
        setGameState(data);
      } catch (fetchError) {
        setError(fetchError instanceof Error ? fetchError.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchGameState();
  }, []);

  const isBroke = balance <= 0;
  const isGameOver = isBroke && buyInsRemaining === 0;
  const canPlay =
    selectedSide !== null &&
    selectedChip !== null &&
    selectedChip <= balance &&
    !isPlaying &&
    !isBroke &&
    !isGameOver;

  function handleBuyInAgain() {
    if (!isBroke || buyInsRemaining <= 0) {
      return;
    }

    setBalance(STARTING_BALANCE);
    setBuyInsRemaining((remaining) => Math.max(remaining - 1, 0));
    setSelectedSide(null);
    setSelectedChip(null);
    setError(null);
  }

  async function handlePlay() {
    if (!selectedSide || !selectedChip || isPlaying) {
      return;
    }

    const chosenSide = selectedSide;
    const chosenChip = selectedChip;

    setIsPlaying(true);
    setError(null);

    try {
      const response = await fetch("/api/baccarat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          side: chosenSide,
          chip: chosenChip,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to play round.");
      }

      const data = (await response.json()) as PlayRoundResponse;
      setGameState(data.gameState);
      setLastRoundResult(data.roundResult);
      setTotalRoundsPlayed((rounds) => rounds + 1);

      if (data.roundResult.outcome === "Tie") {
        // Push: balance does not change on ties.
      } else if (data.roundResult.outcome === chosenSide) {
        setCorrectBets((total) => total + 1);
        setBalance((currentBalance) => currentBalance + chosenChip);
      } else {
        setWrongBets((total) => total + 1);
        setBalance((currentBalance) => currentBalance - chosenChip);
      }
    } catch (playError) {
      setError(playError instanceof Error ? playError.message : "Unknown error");
    } finally {
      setSelectedSide(null);
      setSelectedChip(null);
      setIsPlaying(false);
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.table}>
        <h1 className={styles.title}>Baccarat</h1>

        {loading && <p className={styles.statusText}>Loading game state...</p>}
        {error && <p className={styles.errorText}>{error}</p>}

        {!loading && !error && gameState && (
          <>
            <section className={styles.scoreboardCard}>
              <h2 className={styles.sectionTitle}>Global Scoreboard</h2>
              <div className={styles.scoreboardGrid}>
                <div className={styles.scoreboardItem}>
                  <span className={styles.scoreboardLabel}>Player Wins</span>
                  <span className={styles.scoreboardValue}>{gameState.scoreboard.playerWins}</span>
                </div>
                <div className={styles.scoreboardItem}>
                  <span className={styles.scoreboardLabel}>Banker Wins</span>
                  <span className={styles.scoreboardValue}>{gameState.scoreboard.bankerWins}</span>
                </div>
                <div className={styles.scoreboardItem}>
                  <span className={styles.scoreboardLabel}>Ties</span>
                  <span className={styles.scoreboardValue}>{gameState.scoreboard.ties}</span>
                </div>
              </div>
            </section>

            <section className={styles.playerCard}>
              <h2 className={styles.sectionTitle}>Player</h2>
              <div className={styles.playerStatsRow}>
                <p className={styles.playerStat}>
                  Current Balance: <span className={styles.highlight}>${balance}</span>
                </p>
                <p className={styles.playerStat}>
                  Buy Ins Remaining:{" "}
                  <span className={styles.highlight}>
                    {buyInsRemaining} / {TOTAL_BUY_INS}
                  </span>
                </p>
              </div>
            </section>

            {!isBroke && (
              <>
                <section className={styles.card}>
                  <h2 className={styles.sectionTitle}>Select Side</h2>
                  <div className={styles.sideButtons}>
                    <button
                      type="button"
                      onClick={() => setSelectedSide("Player")}
                      aria-pressed={selectedSide === "Player"}
                      className={`${styles.sideButton} ${selectedSide === "Player" ? styles.sideButtonSelected : ""}`}
                    >
                      Player
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedSide("Banker")}
                      aria-pressed={selectedSide === "Banker"}
                      className={`${styles.sideButton} ${selectedSide === "Banker" ? styles.sideButtonSelected : ""}`}
                    >
                      Banker
                    </button>
                  </div>
                </section>

                <section className={styles.card}>
                  <h2 className={styles.sectionTitle}>Select Chip</h2>
                  <div className={styles.chipRow}>
                    {CHIP_VALUES.map((chipValue) => {
                      const isTooExpensive = chipValue > balance;
                      const isSelected = selectedChip === chipValue;

                      return (
                        <button
                          key={chipValue}
                          type="button"
                          onClick={() => setSelectedChip(chipValue)}
                          disabled={isTooExpensive}
                          aria-pressed={isSelected}
                          className={`${styles.chipButton} ${getChipClass(chipValue)} ${isSelected ? styles.chipSelected : ""} ${isTooExpensive ? styles.chipDisabled : ""}`}
                        >
                          ${chipValue}
                        </button>
                      );
                    })}
                  </div>
                </section>

                <section className={styles.playRow}>
                  <button
                    type="button"
                    disabled={!canPlay}
                    onClick={handlePlay}
                    className={`${styles.playButton} ${canPlay ? styles.playButtonActive : styles.playButtonDisabled}`}
                  >
                    {isPlaying ? "Playing..." : "Play"}
                  </button>
                </section>
              </>
            )}

            {isBroke && !isGameOver && (
              <section className={styles.card}>
                <h2 className={styles.sectionTitle}>Out of Balance</h2>
                <p className={styles.statusText}>
                  Buy Ins Remaining: {buyInsRemaining} / {TOTAL_BUY_INS}
                </p>
                <button type="button" onClick={handleBuyInAgain} className={styles.buyInButton}>
                  Buy In Again
                </button>
              </section>
            )}

            {isGameOver && (
              <section className={styles.card}>
                <h2 className={styles.sectionTitle}>Game Over</h2>
                <p className={styles.statusText}>All buy ins have been used.</p>
                <p className={styles.statusText}>Total Rounds Played: {totalRoundsPlayed}</p>
                <p className={styles.statusText}>Correct Bets: {correctBets}</p>
                <p className={styles.statusText}>Wrong Bets: {wrongBets}</p>
              </section>
            )}

            {lastRoundResult && (
              <section className={styles.card}>
                <h2 className={styles.sectionTitle}>Last Round</h2>
                <p className={styles.statusText}>
                  Winner: <span className={styles.highlight}>{lastRoundResult.outcome}</span>
                </p>
                <p className={styles.statusText}>
                  Player Hand: {formatHand(lastRoundResult.playerHand)} (Value: {lastRoundResult.playerValue})
                </p>
                <p className={styles.statusText}>
                  Banker Hand: {formatHand(lastRoundResult.bankerHand)} (Value: {lastRoundResult.bankerValue})
                </p>
              </section>
            )}
          </>
        )}
      </div>
    </main>
  );
}
