import React from "react";
import { siteConfig } from "../data/siteConfig";
import { formatDate, getCountdown } from "../utils/date";
import AnimatedFadeIn from "../components/AnimatedFadeIn";

export default function Hero() {
  const countdown = getCountdown(siteConfig.wedding.date);
  return (
    <section id="home" className="relative flex flex-col items-center justify-center min-h-[70vh] py-16 sm:py-24 bg-[#fafaf9]">
      <AnimatedFadeIn>
        <h1 className="text-center font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-neutral-900 mb-6">
          {siteConfig.couple.names}
        </h1>
        <p className="text-center text-lg sm:text-xl text-neutral-600 mb-2">
          invite you to celebrate their wedding
        </p>
        <div className="text-center text-xl sm:text-2xl font-light text-neutral-700 mb-6">
          {formatDate(siteConfig.wedding.date)}<br />
          {siteConfig.wedding.venue}, {siteConfig.wedding.city}
        </div>
        {countdown && (
          <div className="flex justify-center gap-6 mb-8">
            {Object.entries(countdown).map(([unit, value]) => (
              <div key={unit} className="flex flex-col items-center">
                <span className="text-2xl font-semibold text-neutral-900">{value}</span>
                <span className="text-xs uppercase tracking-widest text-neutral-500">{unit}</span>
              </div>
            ))}
          </div>
        )}
        <a
          href="#rsvp"
          className="inline-block rounded-full bg-neutral-900 text-white px-8 py-3 text-base font-light tracking-wide shadow-lg hover:bg-neutral-800 transition-colors duration-200"
        >
          RSVP
        </a>
      </AnimatedFadeIn>
    </section>
  );
}
