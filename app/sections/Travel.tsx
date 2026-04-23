import React from "react";
import { siteConfig } from "../data/siteConfig";
import SectionTitle from "../components/SectionTitle";
import AnimatedFadeIn from "../components/AnimatedFadeIn";

export default function Travel() {
  const { hotels, airports, info } = siteConfig.travel;
  return (
    <section id="travel" className="py-20 bg-[#fafaf9]">
      <div className="max-w-2xl mx-auto px-4">
        <SectionTitle>Travel & Hotel</SectionTitle>
        <AnimatedFadeIn>
          <div className="space-y-8">
            <div>
              <span className="block text-sm text-neutral-500 mb-1">Recommended Hotels</span>
              <ul className="space-y-2">
                {hotels.map((hotel) => (
                  <li key={hotel.name}>
                    <a
                      href={hotel.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base text-neutral-800 underline hover:text-neutral-600 transition-colors"
                    >
                      {hotel.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="block text-sm text-neutral-500 mb-1">Airports</span>
              <div className="text-base text-neutral-700">{airports.join(", ")}</div>
            </div>
            <div className="text-base text-neutral-700">{info}</div>
          </div>
        </AnimatedFadeIn>
      </div>
    </section>
  );
}
