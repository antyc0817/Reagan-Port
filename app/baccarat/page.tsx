"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import type { BaccaratCard, BaccaratGameState, RoundOutcome } from "../../lib/gameState";
import Footer from "../components/Footer";
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
  playerNatural: boolean;
  bankerNatural: boolean;
  playerDrewThirdCard: boolean;
  bankerDrewThirdCard: boolean;
  shoeReset: boolean;
};

type PlayRoundResponse = {
  gameState: BaccaratGameState;
  roundResult: RoundResult;
};

type BigRoadCell = {
  outcome: Exclude<RoundOutcome, "Tie">;
  tieCount: number;
  naturalWin: boolean;
} | null;

type AnimatedSlot = {
  dealt: boolean;
  revealed: boolean;
  card: BaccaratCard | null;
};

const EMPTY_ANIMATED_SLOT: AnimatedSlot = {
  dealt: false,
  revealed: false,
  card: null,
};

function getCardPoint(card: BaccaratCard): number {
  if (card.rank === "A") {
    return 1;
  }

  if (card.rank === "10" || card.rank === "J" || card.rank === "Q" || card.rank === "K") {
    return 0;
  }

  return Number(card.rank);
}

function getRevealedHandTotal(slots: AnimatedSlot[]): number {
  const revealedSum = slots.reduce((sum, slot) => {
    if (!slot.revealed || !slot.card) {
      return sum;
    }
    return sum + getCardPoint(slot.card);
  }, 0);

  return revealedSum % 10;
}

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
    return "Awaiting\nNext Round";
  }

  if (roundResult.outcome === "Tie") {
    return "Tie";
  }

  return `${roundResult.outcome} Wins`;
}

function buildBigRoad(
  history: RoundOutcome[],
  naturalWinByHistoryIndex: Record<number, boolean>,
  rows = 6,
  columns = 80
): BigRoadCell[][] {
  const grid: BigRoadCell[][] = Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => null as BigRoadCell)
  );

  let currentColumn = 0;
  let currentRow = 0;
  let lastNonTieOutcome: Exclude<RoundOutcome, "Tie"> | null = null;

  for (let historyIndex = 0; historyIndex < history.length; historyIndex += 1) {
    const outcome = history[historyIndex];
    if (outcome === "Tie") {
      if (lastNonTieOutcome !== null && grid[currentRow][currentColumn]) {
        grid[currentRow][currentColumn] = {
          outcome: grid[currentRow][currentColumn]!.outcome,
          tieCount: grid[currentRow][currentColumn]!.tieCount + 1,
          naturalWin: grid[currentRow][currentColumn]!.naturalWin,
        };
      }
      continue;
    }

    const normalizedOutcome = outcome as Exclude<RoundOutcome, "Tie">;

    if (lastNonTieOutcome === null) {
      currentColumn = 0;
      currentRow = 0;
    } else if (normalizedOutcome === lastNonTieOutcome) {
      const canGoDown = currentRow < rows - 1 && grid[currentRow + 1][currentColumn] === null;
      if (canGoDown) {
        currentRow += 1;
      } else {
        currentColumn += 1;
      }
    } else {
      currentColumn += 1;
      currentRow = 0;
    }

    while (
      currentColumn < columns &&
      grid[currentRow][currentColumn] !== null
    ) {
      currentColumn += 1;
    }

    if (currentColumn >= columns) {
      break;
    }

    grid[currentRow][currentColumn] = {
      outcome: normalizedOutcome,
      tieCount: 0,
      naturalWin: Boolean(naturalWinByHistoryIndex[historyIndex]),
    };
    lastNonTieOutcome = normalizedOutcome;
  }

  return grid;
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
  const [playerAnimatedSlots, setPlayerAnimatedSlots] = useState<AnimatedSlot[]>([
    EMPTY_ANIMATED_SLOT,
    EMPTY_ANIMATED_SLOT,
    EMPTY_ANIMATED_SLOT,
  ]);
  const [bankerAnimatedSlots, setBankerAnimatedSlots] = useState<AnimatedSlot[]>([
    EMPTY_ANIMATED_SLOT,
    EMPTY_ANIMATED_SLOT,
    EMPTY_ANIMATED_SLOT,
  ]);
  const [resultPopupOutcome, setResultPopupOutcome] = useState<RoundOutcome | null>(null);
  const [naturalWinByHistoryIndex, setNaturalWinByHistoryIndex] = useState<Record<number, boolean>>({});
  const [isRevealSequenceActive, setIsRevealSequenceActive] = useState<boolean>(false);
  const [totalRoundsPlayed, setTotalRoundsPlayed] = useState<number>(0);
  const [correctBets, setCorrectBets] = useState<number>(0);
  const [wrongBets, setWrongBets] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const cardSlotRefs = useRef<Record<string, HTMLElement | null>>({});
  const cardInnerRefs = useRef<Record<string, HTMLElement | null>>({});

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
  const bigRoadGrid = gameState
    ? buildBigRoad(gameState.scoreboardHistory, naturalWinByHistoryIndex)
    : [];
  const playerLiveTotal = getRevealedHandTotal(playerAnimatedSlots);
  const bankerLiveTotal = getRevealedHandTotal(bankerAnimatedSlots);
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
  const shouldShowResultBox =
    !isRevealSequenceActive && resultPopupOutcome === null && lastRoundResult !== null;
  const middleDisplayText = isRevealSequenceActive
    ? "DEALING..."
    : lastRoundResult
      ? getRoundHeadline(lastRoundResult)
      : "AWAITING\nNEXT ROUND";

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

  function resetAnimatedSlots() {
    setPlayerAnimatedSlots([EMPTY_ANIMATED_SLOT, EMPTY_ANIMATED_SLOT, EMPTY_ANIMATED_SLOT]);
    setBankerAnimatedSlots([EMPTY_ANIMATED_SLOT, EMPTY_ANIMATED_SLOT, EMPTY_ANIMATED_SLOT]);
  }

  function wait(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async function waitForElement(
    refs: { current: Record<string, HTMLElement | null> },
    key: string
  ): Promise<HTMLElement | null> {
    for (let attempts = 0; attempts < 12; attempts += 1) {
      const element = refs.current[key];
      if (element) {
        return element;
      }
      await wait(16);
    }
    return null;
  }

  async function animateDealCard(key: string) {
    const slot = await waitForElement(cardSlotRefs, key);
    if (!slot) return;
    const inner = await waitForElement(cardInnerRefs, key);
    if (inner) {
      gsap.set(inner, { rotateY: 0 });
    }

    await new Promise<void>((resolve) => {
      gsap.fromTo(
        slot,
        { y: 70, opacity: 0, scale: 0.88 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
          onComplete: resolve,
        }
      );
    });
  }

  async function animateFlipCard(
    key: string,
    side: "player" | "banker",
    index: number
  ) {
    const inner = await waitForElement(cardInnerRefs, key);
    if (!inner) return;

    await new Promise<void>((resolve) => {
      gsap.to(inner, {
        rotateY: 180,
        duration: 0.34,
        ease: "power2.inOut",
        onComplete: () => {
          if (side === "player") {
            setPlayerAnimatedSlots((previous) =>
              previous.map((slot, slotIndex) =>
                slotIndex === index ? { ...slot, revealed: true } : slot
              )
            );
          } else {
            setBankerAnimatedSlots((previous) =>
              previous.map((slot, slotIndex) =>
                slotIndex === index ? { ...slot, revealed: true } : slot
              )
            );
          }
          resolve();
        },
      });
    });
  }

  function setAnimatedCard(
    side: "player" | "banker",
    index: number,
    card: BaccaratCard
  ) {
    if (side === "player") {
      setPlayerAnimatedSlots((previous) =>
        previous.map((slot, slotIndex) =>
          slotIndex === index ? { dealt: true, revealed: false, card } : slot
        )
      );
      return;
    }

    setBankerAnimatedSlots((previous) =>
      previous.map((slot, slotIndex) =>
        slotIndex === index ? { dealt: true, revealed: false, card } : slot
      )
    );
  }

  async function runDealAnimation(
    roundResult: RoundResult,
    onPopupShown?: () => void
  ) {
    const playerCards = roundResult.playerHand;
    const bankerCards = roundResult.bankerHand;
    const initialOrder: Array<{ side: "player" | "banker"; index: number; card: BaccaratCard; key: string }> = [
      { side: "player", index: 0, card: playerCards[0], key: "player-0" },
      { side: "banker", index: 0, card: bankerCards[0], key: "banker-0" },
      { side: "player", index: 1, card: playerCards[1], key: "player-1" },
      { side: "banker", index: 1, card: bankerCards[1], key: "banker-1" },
    ];

    for (const step of initialOrder) {
      setAnimatedCard(step.side, step.index, step.card);
      await wait(30);
      await animateDealCard(step.key);
      await wait(120);
    }

    for (const step of initialOrder) {
      await animateFlipCard(step.key, step.side, step.index);
      await wait(120);
    }

    if (playerCards.length > 2) {
      setAnimatedCard("player", 2, playerCards[2]);
      await wait(30);
      await animateDealCard("player-2");
      await wait(120);
      await animateFlipCard("player-2", "player", 2);
      await wait(120);
    }

    if (bankerCards.length > 2) {
      setAnimatedCard("banker", 2, bankerCards[2]);
      await wait(30);
      await animateDealCard("banker-2");
      await wait(120);
      await animateFlipCard("banker-2", "banker", 2);
      await wait(120);
    }

    await wait(450);
    setResultPopupOutcome(roundResult.outcome);
    onPopupShown?.();
    await wait(3000);
    setResultPopupOutcome(null);
    setIsRevealSequenceActive(false);
  }

  async function handlePlay() {
    if (!selectedSide || !selectedChip || isPlaying) {
      return;
    }

    const chosenSide = selectedSide;
    const chosenChip = selectedChip;

    setIsPlaying(true);
    setError(null);
    setResultPopupOutcome(null);
    setIsRevealSequenceActive(true);
    resetAnimatedSlots();

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
      setLastRoundResult(data.roundResult);
      await runDealAnimation(data.roundResult, () => {
        const updatedHistory = data.gameState.scoreboardHistory;
        const latestRoundIndex = updatedHistory.length - 1;

        if (latestRoundIndex >= 0) {
          const latestOutcome = updatedHistory[latestRoundIndex];
          const naturalWin =
            latestOutcome === "Player"
              ? data.roundResult.playerNatural
              : latestOutcome === "Banker"
                ? data.roundResult.bankerNatural
                : false;

          if (latestOutcome !== "Tie") {
            setNaturalWinByHistoryIndex((previous) => ({
              ...previous,
              [latestRoundIndex]: naturalWin,
            }));
          }
        }

        if (updatedHistory.length === 0) {
          setNaturalWinByHistoryIndex({});
        }

        setGameState(data.gameState);
      });
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
      setIsRevealSequenceActive(false);
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
              <h2 className={styles.sectionTitle}>Big Road</h2>
              <div className={styles.bigRoadViewport}>
                <div className={styles.bigRoadBoard}>
                  {bigRoadGrid.map((row, rowIndex) =>
                    row.map((cell, columnIndex) => (
                      <div key={`big-road-${rowIndex}-${columnIndex}`} className={styles.bigRoadCell}>
                        {cell && (
                          <span
                            className={`${styles.bigRoadBead} ${
                              cell.outcome === "Player" ? styles.bigRoadPlayer : styles.bigRoadBanker
                            } ${cell.naturalWin ? styles.bigRoadBeadNatural : ""}`}
                          >
                            {cell.tieCount > 0 && <span className={styles.bigRoadTieMark} />}
                          </span>
                        )}
                      </div>
                    ))
                  )}
                </div>
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
                      const slot = playerAnimatedSlots[index];
                      const card = slot.card;

                      if (!slot.dealt || !card) {
                        return <div key={`player-placeholder-${index}`} className={styles.cardPlaceholder} />;
                      }

                      const suitSymbol = getSuitSymbol(card.suit);
                      const isRed = isRedSuit(card.suit);

                      return (
                        <article
                          key={`player-card-${index}-${card.rank}-${card.suit}`}
                          ref={(element) => {
                            cardSlotRefs.current[`player-${index}`] = element;
                          }}
                          className={styles.playingCard}
                        >
                          <div
                            ref={(element) => {
                              cardInnerRefs.current[`player-${index}`] = element;
                            }}
                            className={`${styles.cardInner} ${slot.revealed ? styles.cardRevealed : ""}`}
                          >
                            <div className={`${styles.cardFace} ${styles.cardBack}`} />
                            <div className={`${styles.cardFace} ${styles.cardFront} ${isRed ? styles.redCard : styles.blackCard}`}>
                              <span className={styles.cardCorner}>{card.rank}</span>
                              <span className={styles.cardSuit}>{suitSymbol}</span>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                  <p className={styles.handTotal}>
                    Total: <span className={styles.highlight}>{playerLiveTotal}</span>
                  </p>
                </div>

                <div
                  className={`${styles.roundCenter} ${
                    shouldShowResultBox ? styles.roundCenterSummary : styles.roundCenterPlain
                  }`}
                >
                  {!isRevealSequenceActive && (
                    <p
                      className={`${styles.resultText} ${
                        shouldShowResultBox && lastRoundResult?.outcome === "Player"
                          ? styles.resultTextPlayer
                          : shouldShowResultBox && lastRoundResult?.outcome === "Banker"
                            ? styles.resultTextBanker
                            : shouldShowResultBox && lastRoundResult?.outcome === "Tie"
                              ? styles.resultTextTie
                              : ""
                      }`}
                    >
                      {middleDisplayText}
                    </p>
                  )}
                  {isRevealSequenceActive && resultPopupOutcome === null && (
                    <p className={styles.resultText}>{middleDisplayText}</p>
                  )}
                </div>

                <div className={styles.handColumn}>
                  <h2 className={styles.sectionTitle}>Banker Hand</h2>
                  <div className={styles.cardsRow}>
                    {[0, 1, 2].map((index) => {
                      const slot = bankerAnimatedSlots[index];
                      const card = slot.card;

                      if (!slot.dealt || !card) {
                        return <div key={`banker-placeholder-${index}`} className={styles.cardPlaceholder} />;
                      }

                      const suitSymbol = getSuitSymbol(card.suit);
                      const isRed = isRedSuit(card.suit);

                      return (
                        <article
                          key={`banker-card-${index}-${card.rank}-${card.suit}`}
                          ref={(element) => {
                            cardSlotRefs.current[`banker-${index}`] = element;
                          }}
                          className={styles.playingCard}
                        >
                          <div
                            ref={(element) => {
                              cardInnerRefs.current[`banker-${index}`] = element;
                            }}
                            className={`${styles.cardInner} ${slot.revealed ? styles.cardRevealed : ""}`}
                          >
                            <div className={`${styles.cardFace} ${styles.cardBack}`} />
                            <div className={`${styles.cardFace} ${styles.cardFront} ${isRed ? styles.redCard : styles.blackCard}`}>
                              <span className={styles.cardCorner}>{card.rank}</span>
                              <span className={styles.cardSuit}>{suitSymbol}</span>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                  <p className={styles.handTotal}>
                    Total: <span className={styles.highlight}>{bankerLiveTotal}</span>
                  </p>
                </div>

                {resultPopupOutcome && (
                  <div
                    className={`${styles.resultPopup} ${
                      resultPopupOutcome === "Player"
                        ? styles.resultPopupPlayer
                        : resultPopupOutcome === "Banker"
                          ? styles.resultPopupBanker
                          : styles.resultPopupTie
                    }`}
                  >
                    {resultPopupOutcome === "Tie" ? "Tie" : `${resultPopupOutcome} Wins`}
                  </div>
                )}
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
                  {CHIP_VALUES.map((chipValue) => {
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

                      </div>
                    );
                  })}
                </div>
                <div className={styles.wagerBox}>
                  <span className={styles.bottomLabel}>Wager</span>
                  <span className={styles.bottomValue}>${wagerAmount}</span>
                </div>
              </div>

              <div className={styles.bottomActions}>
                <button
                  type="button"
                  disabled={!canPlay}
                  onClick={handlePlay}
                  className={`${styles.playButton} ${canPlay ? styles.playButtonActive : styles.playButtonDisabled}`}
                >
                  <span className={styles.playButtonText}>{isPlaying ? "Dealing" : "Deal"}</span>
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
      <Footer />
    </main>
  );
}
