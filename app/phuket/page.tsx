"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Great_Vibes, Cormorant_Garamond } from "next/font/google";

const INTRO_TEXT = "meet us in Phuket...";
const NAMES = "FIAT & DEREK";
const MAIN_HEADING = "Our adventures over the years";

const PHOTOS = [
  "/photos/photo-1.jpg",
  "/photos/photo-2.jpg",
  "/photos/photo-3.jpg",
  "/photos/photo-4.jpg",
  "/photos/photo-5.jpg",
  "/photos/photo-6.jpg",
  "/photos/photo-7.jpg",
  "/photos/photo-8.jpg",
  "/photos/photo-9.jpg",
  "/photos/photo-10.jpg",
];

const INTRO_BACKGROUND_PHOTO = "/photos/hero.jpg";

const scriptFont = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
});

const serifFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export default function PhuketPage() {
  const [showIntro, setShowIntro] = useState(true);
  const [showIntroText, setShowIntroText] = useState(false);

  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [prevPhoto, setPrevPhoto] = useState(0);
  const [isFading, setIsFading] = useState(true);

  const [showMoreDetails, setShowMoreDetails] = useState(false);

  // INTRO TIMING
  useEffect(() => {
    const textTimer = setTimeout(() => setShowIntroText(true), 2800);
    const hideTimer = setTimeout(() => setShowIntro(false), 5800);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  // PHOTO CROSSFADE (fixed dependency issue)
  useEffect(() => {
    if (showIntro) return;

    const interval = setInterval(() => {
      setIsFading(false);

      setTimeout(() => {
        setPrevPhoto((prev) => (prev + 1) % PHOTOS.length);
        setCurrentPhoto((prev) => (prev + 1) % PHOTOS.length);
        setIsFading(true);
      }, 50);
    }, 2000);

    return () => clearInterval(interval);
  }, [showIntro]);

  // CTA APPEAR
  useEffect(() => {
    if (showIntro) return;

    const timeout = setTimeout(() => {
      setShowMoreDetails(true);
    }, 8000);

    return () => clearTimeout(timeout);
  }, [showIntro]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f6f3ef] text-[#4f4842]">

      {/* INTRO OVERLAY */}
      {showIntro && (
        <div className="absolute inset-0 z-20">

          <div className="absolute inset-0">
            <Image
              src={INTRO_BACKGROUND_PHOTO}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center scale-[1.03]"
            />
            <div className="absolute inset-0 bg-black/25" />
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className={showIntroText ? "intro-reveal" : "opacity-0"}>
              <h1 className={`${scriptFont.className} text-[54px] md:text-[88px] lg:text-[108px] text-white`}>
                {INTRO_TEXT}
              </h1>
            </div>
          </div>

        </div>
      )}

      {/* MAIN CONTENT */}
      <div className={`relative transition-opacity duration-700 ${showIntro ? "opacity-0" : "opacity-100"}`}>
        <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">

          <p className="mb-6 text-[12px] uppercase tracking-[0.45em] text-[#8b8178]">
            {NAMES}
          </p>

          <h2 className={`${scriptFont.className} text-[34px] md:text-[56px] text-[#6f655d]`}>
            {MAIN_HEADING}
          </h2>

          {/* PHOTO */}
          <div className="mt-12">
            <div className="relative w-[220px] md:w-[260px] aspect-[4/5] mx-auto overflow-hidden rounded-[24px] shadow-lg">

              <Image
                src={PHOTOS[prevPhoto]}
                alt=""
                fill
                sizes="(max-width: 768px) 220px, 260px"
                className="object-cover absolute inset-0"
              />

              <Image
                src={PHOTOS[currentPhoto]}
                alt=""
                fill
                priority
                sizes="(max-width: 768px) 220px, 260px"
                className={`object-cover absolute inset-0 transition-opacity duration-[1800ms] ${
                  isFading ? "opacity-100" : "opacity-0"
                }`}
              />

            </div>
          </div>

          <p className={`${serifFont.className} mt-8 text-[14px] tracking-[0.12em] text-[#a0968d]`}>
            a collection of places we have loved
          </p>

          {/* CTA */}
          <div className={`mt-10 transition-all duration-700 ${showMoreDetails ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <Link href="/phuket/info">
              <span className="flex flex-col items-center text-[11px] uppercase tracking-[0.3em] text-[#8b8178]">
                <span>More Details</span>
                <span className="mt-2 text-[12px] opacity-70 animate-bounce">↓</span>
              </span>
            </Link>
          </div>

        </section>
      </div>

      {/* ANIMATION */}
      <style jsx global>{`
        .intro-reveal {
          clip-path: inset(0 100% 0 0);
          animation: revealText 2.4s ease forwards;
        }

        @keyframes revealText {
          to {
            clip-path: inset(0 0 0 0);
          }
        }
      `}</style>

    </main>
  );
}