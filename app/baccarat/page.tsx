"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { BaccaratCard, BaccaratGameState, RoundOutcome } from "../../lib/gameState";
import styles from "./page.module.css";

const STARTING_BALANCE = 1000;
const TOTAL_BUY_INS = 3;
const CHIP_VALUES = [50, 100, 200, 500] as const;

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

function getSuitSymbol(suit: BaccaratCard["suit"]): string {
  if (suit === "Hearts") {
    return "♥";
  }

  if (suit === "Diamonds") {
    return "♦";
  }

  if (suit === "Clubs") {
    return "♣";
  }

  return "♠";
}

function isRedSuit(suit: BaccaratCard["suit"]): boolean {
  return suit === "Hearts" || suit === "Diamonds";
}

function getRoundHeadline(roundResult: RoundResult | null): string {
  if (!roundResult) {
    return "Awaiting Next Round";
  }

  if (roundResult.outcome === "Tie") {
    return "Tie";
  }

  return `${roundResult.outcome} Wins`;
}

function getBeadClass(outcome: RoundOutcome | null): string {
  if (outcome === "Player") {
    return styles.beadPlayer;
  }

  if (outcome === "Banker") {
    return styles.beadBanker;
  }

  if (outcome === "Tie") {
    return styles.beadTie;
  }

  return styles.beadEmpty;
}

function getChipImagePath(chipValue: number): string {
  if (chipValue === 50) {
    return "/images/coins/50-chip.png";
  }

  if (chipValue === 100) {
    return "/images/coins/100-chip.png";
  }

  if (chipValue === 200) {
    return "/images/coins/200-chip.png";
  }

  return "/images/coins/500-chip.png";
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
  const canSelectBet = !isBroke && !isGameOver && !isPlaying;
  const wagerAmount = selectedChip ?? 0;
  const hasAnyBet = selectedSide !== null || selectedChip !== null;
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

  function handleClearBet() {
    setSelectedSide(null);
    setSelectedChip(null);
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
              <h2 className={styles.sectionTitle}>Bead Plate</h2>
              {(() => {
                const rows = 6;
                const history = gameState.scoreboardHistory;
                const columns = Math.max(1, Math.ceil(history.length / rows));
                const totalSpots = columns * rows;

                return (
                  <>
                    <div className={styles.beadPlate} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
                      {Array.from({ length: totalSpots }, (_, index) => {
                        const outcome = history[index] ?? null;

                        return (
                          <div key={`bead-${index}`} className={styles.beadCell}>
                            <span className={`${styles.bead} ${getBeadClass(outcome)}`} />
                          </div>
                        );
                      })}
                    </div>

                    <div className={styles.scoreboardSummary}>
                      <p className={styles.summaryItem}>
                        Player: <span className={styles.summaryValue}>{gameState.scoreboard.playerWins}</span>
                      </p>
                      <p className={styles.summaryItem}>
                        Banker: <span className={styles.summaryValue}>{gameState.scoreboard.bankerWins}</span>
                      </p>
                      <p className={styles.summaryItem}>
                        Tie: <span className={styles.summaryValue}>{gameState.scoreboard.ties}</span>
                      </p>
                    </div>
                  </>
                );
              })()}
            </section>

            <section className={styles.feltArea}>
              <button
                type="button"
                onClick={() => setSelectedSide((current) => (current === "Player" ? null : "Player"))}
                disabled={!canSelectBet}
                className={`${styles.betZone} ${styles.playerZone} ${selectedSide === "Player" ? styles.betZoneSelected : ""}`}
              >
                <span className={styles.betZoneHeader}>
                  <span className={styles.betZoneLabel}>Player</span>
                  <span className={styles.betZoneSubtext}>
                    {selectedSide === "Player" && selectedChip !== null ? "Tap To Remove" : "Tap To Bet"}
                  </span>
                </span>
                <span className={styles.betMarkerSlot}>
                  {selectedSide === "Player" && selectedChip !== null && (
                    <Image
                      src={getChipImagePath(selectedChip)}
                      alt="Bet placed on Player"
                      width={126}
                      height={126}
                      className={styles.betMarkerImage}
                    />
                  )}
                </span>
              </button>

              <section className={styles.cardDisplay}>
                <div className={styles.handColumn}>
                  <h2 className={styles.sectionTitle}>Player Hand</h2>
                  <div className={styles.cardsRow}>
                    {[0, 1, 2].map((index) => {
                      const card = lastRoundResult?.playerHand[index] ?? null;

                      if (!card) {
                        return <div key={`player-placeholder-${index}`} className={styles.cardPlaceholder} />;
                      }

                      const suitSymbol = getSuitSymbol(card.suit);
                      const isRed = isRedSuit(card.suit);

                      return (
                        <article
                          key={`player-card-${index}-${card.rank}-${card.suit}`}
                          className={`${styles.playingCard} ${isRed ? styles.redCard : styles.blackCard}`}
                        >
                          <span className={styles.cardCorner}>{card.rank}</span>
                          <span className={styles.cardSuit}>{suitSymbol}</span>
                        </article>
                      );
                    })}
                  </div>
                  <p className={styles.handTotal}>
                    Total: <span className={styles.highlight}>{lastRoundResult?.playerValue ?? "--"}</span>
                  </p>
                </div>

                <div className={styles.roundCenter}>
                  <p className={styles.resultText}>{getRoundHeadline(lastRoundResult)}</p>
                </div>

                <div className={styles.handColumn}>
                  <h2 className={styles.sectionTitle}>Banker Hand</h2>
                  <div className={styles.cardsRow}>
                    {[0, 1, 2].map((index) => {
                      const card = lastRoundResult?.bankerHand[index] ?? null;

                      if (!card) {
                        return <div key={`banker-placeholder-${index}`} className={styles.cardPlaceholder} />;
                      }

                      const suitSymbol = getSuitSymbol(card.suit);
                      const isRed = isRedSuit(card.suit);

                      return (
                        <article
                          key={`banker-card-${index}-${card.rank}-${card.suit}`}
                          className={`${styles.playingCard} ${isRed ? styles.redCard : styles.blackCard}`}
                        >
                          <span className={styles.cardCorner}>{card.rank}</span>
                          <span className={styles.cardSuit}>{suitSymbol}</span>
                        </article>
                      );
                    })}
                  </div>
                  <p className={styles.handTotal}>
                    Total: <span className={styles.highlight}>{lastRoundResult?.bankerValue ?? "--"}</span>
                  </p>
                </div>
              </section>

              <button
                type="button"
                onClick={() => setSelectedSide((current) => (current === "Banker" ? null : "Banker"))}
                disabled={!canSelectBet}
                className={`${styles.betZone} ${styles.bankerZone} ${selectedSide === "Banker" ? styles.betZoneSelected : ""}`}
              >
                <span className={styles.betZoneHeader}>
                  <span className={styles.betZoneLabel}>Banker</span>
                  <span className={styles.betZoneSubtext}>
                    {selectedSide === "Banker" && selectedChip !== null ? "Tap To Remove" : "Tap To Bet"}
                  </span>
                </span>
                <span className={styles.betMarkerSlot}>
                  {selectedSide === "Banker" && selectedChip !== null && (
                    <Image
                      src={getChipImagePath(selectedChip)}
                      alt="Bet placed on Banker"
                      width={126}
                      height={126}
                      className={styles.betMarkerImage}
                    />
                  )}
                </span>
              </button>
            </section>

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

            <section className={styles.bottomBar}>
              <div className={styles.bottomBalance}>
                <p className={styles.balanceLabel}>Balance</p>
                <p className={styles.balanceValue}>${balance}</p>
                <p className={styles.balanceMeta}>
                  Buy Ins: {buyInsRemaining}/{TOTAL_BUY_INS}
                </p>
              </div>

              <div className={styles.bottomChips}>
                <div className={styles.chipsRow}>
                  {CHIP_VALUES.map((chipValue, index) => {
                    const isTooExpensive = chipValue > balance;
                    const isSelected = selectedChip === chipValue;

                    return (
                      <div key={chipValue} className={styles.chipSlot}>
                        <button
                          type="button"
                          onClick={() => setSelectedChip((current) => (current === chipValue ? null : chipValue))}
                          disabled={!canSelectBet || isTooExpensive}
                          aria-pressed={isSelected}
                          className={`${styles.chipButton} ${isSelected ? styles.chipSelected : ""} ${isTooExpensive ? styles.chipDisabled : ""}`}
                        >
                          <span className={styles.chipImageWrap}>
                            <Image
                              src={getChipImagePath(chipValue)}
                              alt={`$${chipValue} chip`}
                              width={72}
                              height={72}
                              className={styles.chipImage}
                            />
                          </span>
                        </button>

                        {index === 1 && (
                          <div className={styles.wagerBox}>
                            <span className={styles.bottomLabel}>Wager</span>
                            <span className={styles.bottomValue}>${wagerAmount}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className={styles.bottomActions}>
                <button
                  type="button"
                  disabled={!canPlay}
                  onClick={handlePlay}
                  className={`${styles.playButton} ${canPlay ? styles.playButtonActive : styles.playButtonDisabled}`}
                >
                  {isPlaying ? "Dealing..." : "Deal"}
                </button>
                <button
                  type="button"
                  onClick={handleClearBet}
                  className={`${styles.clearButton} ${hasAnyBet ? "" : styles.clearButtonHidden}`}
                  aria-hidden={!hasAnyBet}
                  tabIndex={hasAnyBet ? 0 : -1}
                >
                  Clear
                </button>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
