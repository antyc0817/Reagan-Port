"use client";

import { useEffect, useState } from "react";
import type { BaccaratCard, BaccaratGameState, RoundOutcome } from "../../lib/gameState";

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
    <main>
      <h1>Baccarat</h1>

      {loading && <p>Loading game state...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && gameState && (
        <>
          <section>
            <h2>Global Scoreboard</h2>
            <p>Player Wins: {gameState.scoreboard.playerWins}</p>
            <p>Banker Wins: {gameState.scoreboard.bankerWins}</p>
            <p>Ties: {gameState.scoreboard.ties}</p>
          </section>

          <section>
            <h2>Player</h2>
            <p>Current Balance: ${balance}</p>
            <p>
              Buy Ins Remaining: {buyInsRemaining} / {TOTAL_BUY_INS}
            </p>
          </section>

          {!isBroke && (
            <>
              <section>
                <h2>Select Side</h2>
                <button
                  type="button"
                  onClick={() => setSelectedSide("Player")}
                  aria-pressed={selectedSide === "Player"}
                >
                  Player {selectedSide === "Player" ? "(Selected)" : ""}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedSide("Banker")}
                  aria-pressed={selectedSide === "Banker"}
                >
                  Banker {selectedSide === "Banker" ? "(Selected)" : ""}
                </button>
              </section>

              <section>
                <h2>Select Chip</h2>
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
                      style={{
                        opacity: isTooExpensive ? 0.5 : 1,
                        cursor: isTooExpensive ? "not-allowed" : "pointer",
                      }}
                    >
                      ${chipValue} {isSelected ? "(Selected)" : ""}
                    </button>
                  );
                })}
              </section>

              <section>
                <button type="button" disabled={!canPlay} onClick={handlePlay}>
                  {isPlaying ? "Playing..." : "Play"}
                </button>
              </section>
            </>
          )}

          {isBroke && !isGameOver && (
            <section>
              <h2>Out of Balance</h2>
              <p>
                Buy Ins Remaining: {buyInsRemaining} / {TOTAL_BUY_INS}
              </p>
              <button type="button" onClick={handleBuyInAgain}>
                Buy In Again
              </button>
            </section>
          )}

          {isGameOver && (
            <section>
              <h2>Game Over</h2>
              <p>All buy ins have been used.</p>
              <p>Total Rounds Played: {totalRoundsPlayed}</p>
              <p>Correct Bets: {correctBets}</p>
              <p>Wrong Bets: {wrongBets}</p>
            </section>
          )}

          {lastRoundResult && (
            <section>
              <h2>Last Round</h2>
              <p>Winner: {lastRoundResult.outcome}</p>
              <p>
                Player Hand: {formatHand(lastRoundResult.playerHand)} (Value: {lastRoundResult.playerValue})
              </p>
              <p>
                Banker Hand: {formatHand(lastRoundResult.bankerHand)} (Value: {lastRoundResult.bankerValue})
              </p>
            </section>
          )}
        </>
      )}
    </main>
  );
}
