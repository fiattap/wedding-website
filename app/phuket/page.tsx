"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Great_Vibes, Cormorant_Garamond } from "next/font/google";

const INTRO_TEXT = "meet us in Phuket...";
const NAMES = "FIAT & DEREK";

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

  useEffect(() => {
    const textTimer = setTimeout(() => setShowIntroText(true), 2600);
    const hideTimer = setTimeout(() => setShowIntro(false), 6500);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    if (showIntro) return;

    const interval = setInterval(() => {
      setIsFading(false);

      setTimeout(() => {
        setPrevPhoto((prev) => (prev + 1) % PHOTOS.length);
        setCurrentPhoto((prev) => (prev + 1) % PHOTOS.length);
        setIsFading(true);
      }, 80);
    }, 2600);

    return () => clearInterval(interval);
  }, [showIntro]);

  useEffect(() => {
    if (showIntro) return;

    const timeout = setTimeout(() => {
      setShowMoreDetails(true);
    }, 7000);

    return () => clearTimeout(timeout);
  }, [showIntro]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f3ee] text-[#4f4842]">
      {/* INTRO */}
      {showIntro && (
        <div className="absolute inset-0 z-20">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={INTRO_BACKGROUND_PHOTO}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center animate-zoomSlow"
              style={{
                transformOrigin: "center center",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "translateZ(0) scale(1.05)",
              }}
            />
            <div className="absolute inset-0 bg-black/25" />
          </div>

          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div
              className={`
                ${showIntroText ? "intro-reveal" : "opacity-0"}
                w-full text-center
              `}
            >
              <h1
                className={`
                  ${scriptFont.className}
                  text-white
                  whitespace-nowrap
                  leading-[1.1]
                  text-[clamp(40px,9vw,140px)]
                `}
                style={{
                  textShadow: "0 10px 40px rgba(0,0,0,0.35)",
                }}
              >
                {INTRO_TEXT}
              </h1>
            </div>
          </div>
        </div>
      )}

      {/* MAIN */}
      <div
        className={`relative transition-opacity duration-700 ${
          showIntro ? "opacity-0" : "opacity-100"
        }`}
      >
        <section className="relative flex min-h-screen items-center justify-center px-6 py-10 text-center">
          {/* background glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/45 blur-3xl" />
          </div>

          <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center">
            {/* names */}
            <p className="mb-6 text-[10px] uppercase tracking-[0.6em] text-[#a39a92]">
              {NAMES}
            </p>

            {/* EDITORIAL HEADLINE */}
            <div className="flex flex-col items-center leading-none">
              <h2
                className={`
                  ${scriptFont.className}
                  whitespace-nowrap
                  text-[clamp(36px,5vw,72px)]
                  text-[#6f655d]
                `}
              >
                Our adventures
              </h2>

              <span
                className={`
                  ${serifFont.className}
                  mt-2
                  text-[clamp(14px,1.6vw,18px)]
                  tracking-[0.35em]
                  uppercase
                  text-[#9a8f85]
                `}
              >
                over the years
              </span>
            </div>

            {/* PHOTO */}
            <div className="relative mt-12 flex w-full justify-center">
              <div className="absolute top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full border border-white/70 bg-white/20 shadow-[0_30px_90px_rgba(79,72,66,0.12)] md:h-[390px] md:w-[390px]" />

              <div className="relative rounded-[34px] bg-white/70 p-3 shadow-[0_28px_80px_rgba(79,72,66,0.18)] backdrop-blur-sm">
                <div className="relative aspect-[4/5] w-[250px] overflow-hidden rounded-[28px] md:w-[310px]">
                  <Image
                    src={PHOTOS[prevPhoto]}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 250px, 310px"
                    className="absolute inset-0 object-cover"
                  />

                  <Image
                    src={PHOTOS[currentPhoto]}
                    alt=""
                    fill
                    priority
                    sizes="(max-width: 768px) 250px, 310px"
                    className={`absolute inset-0 object-cover transition-opacity duration-[1800ms] ${
                      isFading ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* subtext */}
            <p
              className={`${serifFont.className} mt-7 text-[14px] italic tracking-[0.08em] text-[#9b9087]`}
            >
              a collection of places we have loved
            </p>

            {/* CTA */}
            <div
              className={`mt-8 transition-all duration-700 ${
                showMoreDetails
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <Link href="/phuket/info">
                <span className="group flex flex-col items-center text-[11px] uppercase tracking-[0.32em] text-[#8b8178]">
                  <span className="border-b border-[#b8aea4]/60 pb-2">
                    More Details
                  </span>
                  <span className="mt-3 text-[13px] opacity-60 animate-bounce">
                    ↓
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* ANIMATIONS */}
      <style jsx global>{`
        .intro-reveal {
          clip-path: inset(0 100% 0 0);
          opacity: 0;
          animation: revealText 2.2s ease forwards, fadeIn 1s ease forwards;
        }

        @keyframes revealText {
          to {
            clip-path: inset(0 0 0 0);
          }
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }

        @keyframes zoomSlow {
          from {
            transform: translateZ(0) scale(1.05);
          }
          to {
            transform: translateZ(0) scale(1.1);
          }
        }

        .animate-zoomSlow {
          animation: zoomSlow 6.5s ease-out forwards;
        }
      `}</style>
    </main>
  );
}