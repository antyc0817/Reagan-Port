"use client";

import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import HTMLFlipBook from "react-pageflip";
import Image from "next/image";
import styles from "../projects.module.css";

// Front cover lives on the RIGHT half of the 840px book container → translateX(-210) centres it.
// Back cover lives on the LEFT half → translateX(+210) centres it.
const COVER_OFFSET = 210;
const totalPages = 7;
const BOUNDARY_UNCLIP_DELAY = 140;

const pageMap = {
    0: 1,
    1: 2, 2: 2,
    3: 3, 4: 3,
    5: 4, 6: 4,
    7: 5, 8: 5,
    9: 6, 10: 6,
    11: 7,
};

export default function EditorialFlipbook() {
    const bookRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [animOffset, setAnimOffset] = useState(-COVER_OFFSET);
    // Separate from currentPage so we can remove the clip *before* a flip starts
    const [isClipped, setIsClipped] = useState(true);

    const isOnFrontCover = currentPage === 1;
    const isOnBackCover = currentPage === totalPages;
    const canGoPrev = currentPage > 1;
    const canGoNext = currentPage < totalPages;

    // Hide the empty half-slot that react-pageflip always renders beside a single cover page.
    const coverClip = isClipped
        ? isOnFrontCover
            ? 'inset(0 0 0 420px)'   // clip the empty LEFT half
            : isOnBackCover
            ? 'inset(0 420px 0 0)'   // clip the empty RIGHT half
            : 'none'
        : 'none';

    const onFlip = (e) => {
        const newPage = pageMap[e.data] ?? currentPage;
        setCurrentPage(newPage);
        if (newPage === totalPages) {
            // Back cover has landed – slide it to centre and apply clip
            setAnimOffset(COVER_OFFSET);
            setIsClipped(true);
        } else if (newPage === 1) {
            // Front cover has landed – apply clip (offset was pre-set in goPrev)
            setIsClipped(true);
        } else {
            setAnimOffset(0);
            setIsClipped(false);
        }
    };

    const goNext = () => {
        if (!canGoNext) return;
        // Keep clip enabled while we shift cover -> middle so the empty half-slot
        // does not appear before the turn begins.
        if (isOnFrontCover) {
            flushSync(() => setAnimOffset(0));
        }
        bookRef.current?.pageFlip().flipNext();
        if (isOnFrontCover) {
            window.setTimeout(() => setIsClipped(false), BOUNDARY_UNCLIP_DELAY);
        }
    };

    const goPrev = () => {
        if (!canGoPrev) return;
        if (isOnBackCover) {
            flushSync(() => setAnimOffset(0));
        } else if (currentPage === 2) {
            flushSync(() => setAnimOffset(-COVER_OFFSET));
        }
        bookRef.current?.pageFlip().flipPrev();
        if (isOnBackCover) {
            window.setTimeout(() => setIsClipped(false), BOUNDARY_UNCLIP_DELAY);
        }
    };

    return (
        <div className={styles.soulFlipbook}>
            <div className={styles.soulFlipbookStage}>
                <div
                    className={styles.soulFlipbookBookWrap}
                    style={{ transform: `translateX(${animOffset}px)`, clipPath: coverClip }}>
                    <HTMLFlipBook
                        ref={bookRef}
                        width={420}
                        height={560}
                        size='fixed'
                        drawShadow={false}
                        flippingTime={700}
                        usePortrait={false}
                        startPage={0}
                        showCover
                        useMouseEvents={false}
                        mobileScrollSupport={false}
                        onFlip={onFlip}
                        className={styles.soulFlipbookBook}>

                        {/* Front cover */}
                        <div className={styles.soulFlipbookPage}>
                            <Image src='/books/soul-of-south-korea/a.jpg' alt='Soul of South Korea front cover' fill className={styles.soulFlipbookPageImg} sizes='420px' unoptimized priority />
                        </div>

                        {/* Spread a2 */}
                        <div className={styles.soulFlipbookPage}>
                            <div className={styles.soulFlipbookSpreadLeft}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src='/books/soul-of-south-korea/a2.jpg' alt='Soul of South Korea spread 2' className={styles.soulFlipbookSpreadImg} />
                            </div>
                        </div>
                        <div className={styles.soulFlipbookPage}>
                            <div className={styles.soulFlipbookSpreadRight}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src='/books/soul-of-south-korea/a2.jpg' alt='' aria-hidden='true' className={styles.soulFlipbookSpreadImg} />
                            </div>
                        </div>

                        {/* Spread a3 */}
                        <div className={styles.soulFlipbookPage}>
                            <div className={styles.soulFlipbookSpreadLeft}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src='/books/soul-of-south-korea/a3.jpg' alt='Soul of South Korea spread 3' className={styles.soulFlipbookSpreadImg} />
                            </div>
                        </div>
                        <div className={styles.soulFlipbookPage}>
                            <div className={styles.soulFlipbookSpreadRight}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src='/books/soul-of-south-korea/a3.jpg' alt='' aria-hidden='true' className={styles.soulFlipbookSpreadImg} />
                            </div>
                        </div>

                        {/* Spread a4 */}
                        <div className={styles.soulFlipbookPage}>
                            <div className={styles.soulFlipbookSpreadLeft}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src='/books/soul-of-south-korea/a4.jpg' alt='Soul of South Korea spread 4' className={styles.soulFlipbookSpreadImg} />
                            </div>
                        </div>
                        <div className={styles.soulFlipbookPage}>
                            <div className={styles.soulFlipbookSpreadRight}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src='/books/soul-of-south-korea/a4.jpg' alt='' aria-hidden='true' className={styles.soulFlipbookSpreadImg} />
                            </div>
                        </div>

                        {/* Spread a5 */}
                        <div className={styles.soulFlipbookPage}>
                            <div className={styles.soulFlipbookSpreadLeft}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src='/books/soul-of-south-korea/a5.jpg' alt='Soul of South Korea spread 5' className={styles.soulFlipbookSpreadImg} />
                            </div>
                        </div>
                        <div className={styles.soulFlipbookPage}>
                            <div className={styles.soulFlipbookSpreadRight}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src='/books/soul-of-south-korea/a5.jpg' alt='' aria-hidden='true' className={styles.soulFlipbookSpreadImg} />
                            </div>
                        </div>

                        {/* Spread a6 */}
                        <div className={styles.soulFlipbookPage}>
                            <div className={styles.soulFlipbookSpreadLeft}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src='/books/soul-of-south-korea/a6.jpg' alt='Soul of South Korea spread 6' className={styles.soulFlipbookSpreadImg} />
                            </div>
                        </div>
                        <div className={styles.soulFlipbookPage}>
                            <div className={styles.soulFlipbookSpreadRight}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src='/books/soul-of-south-korea/a6.jpg' alt='' aria-hidden='true' className={styles.soulFlipbookSpreadImg} />
                            </div>
                        </div>

                        {/* Back cover */}
                        <div className={styles.soulFlipbookPage}>
                            <Image src='/books/soul-of-south-korea/a7.jpg' alt='Soul of South Korea back cover' fill className={styles.soulFlipbookPageImg} sizes='420px' unoptimized />
                        </div>
                    </HTMLFlipBook>
                </div>
            </div>

            <div className={styles.soulFlipbookControls}>
                <button type='button' className={styles.soulFlipbookArrowBtn} onClick={goPrev} aria-label='Previous page' disabled={!canGoPrev}>
                    <Image src='/icons/arrow.svg' alt='' width={28} height={28} className={`${styles.soulFlipbookArrowIcon} ${styles.soulFlipbookArrowIconLeft}`} unoptimized aria-hidden />
                </button>
                <p className={styles.soulFlipbookCounter}>Page {currentPage} / {totalPages}</p>
                <button type='button' className={styles.soulFlipbookArrowBtn} onClick={goNext} aria-label='Next page' disabled={!canGoNext}>
                    <Image src='/icons/arrow.svg' alt='' width={28} height={28} className={styles.soulFlipbookArrowIcon} unoptimized aria-hidden />
                </button>
            </div>
        </div>
    );
}
