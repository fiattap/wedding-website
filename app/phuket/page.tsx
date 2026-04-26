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
      }, 50);
    }, 2000);

    return () => clearInterval(interval);
  }, [showIntro]);

  useEffect(() => {
    if (showIntro) return;

    const timeout = setTimeout(() => {
      setShowMoreDetails(true);
    }, 8000);

    return () => clearTimeout(timeout);
  }, [showIntro]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f6f3ef] text-[#4f4842]">

      {/* INTRO */}
      {showIntro && (
        <div className="absolute inset-0 z-20">

          {/* BACKGROUND (LOCKED — NO SHIFT) */}
          <div className="absolute inset-0">
            <Image
              src={INTRO_BACKGROUND_PHOTO}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center animate-zoomSlow"
              style={{
                transformOrigin: "center center",
                transform: "scale(1.05)", // 👈 prevents perceived shift
                willChange: "transform",
              }}
            />

            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* TEXT */}
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
      <div className={`relative transition-opacity duration-700 ${showIntro ? "opacity-0" : "opacity-100"}`}>
        <section className="flex min-h-screen flex-col items-center justify-start pt-12 px-6 text-center">
          
          {/* 👇 moved up slightly */}
          <p className="mb-4 text-[12px] uppercase tracking-[0.45em] text-[#8b8178]">
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
            transform: scale(1.05);
          }
          to {
            transform: scale(1.1);
          }
        }

        .animate-zoomSlow {
          animation: zoomSlow 6.5s ease-out forwards;
        }
      `}</style>

    </main>
  );
}