"use client";

import { useEffect, useState } from "react";
import type { BaccaratGameState } from "../../lib/gameState";

const STARTING_BALANCE = 1000;
const TOTAL_BUY_INS = 3;

export default function BaccaratPage() {
  const [gameState, setGameState] = useState<BaccaratGameState | null>(null);
  const [balance] = useState<number>(STARTING_BALANCE);
  const [buyInsRemaining] = useState<number>(TOTAL_BUY_INS);
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
        </>
      )}
    </main>
  );
}
