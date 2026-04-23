import React from "react";
import { siteConfig } from "../data/siteConfig";
import SectionTitle from "../components/SectionTitle";
import AnimatedFadeIn from "../components/AnimatedFadeIn";

export default function Details() {
  const { venue, address, city, dressCode } = siteConfig.wedding;
  return (
    <section id="details" className="py-20 bg-[#fafaf9]">
      <div className="max-w-2xl mx-auto px-4">
        <SectionTitle>Wedding Details</SectionTitle>
        <AnimatedFadeIn>
          <div className="space-y-6 text-neutral-800">
            <div>
              <span className="block text-sm text-neutral-500 mb-1">Venue</span>
              <div className="text-lg font-serif font-light">{venue}</div>
              <div className="text-base text-neutral-600">{address}, {city}</div>
            </div>
            <div>
              <span className="block text-sm text-neutral-500 mb-1">Dress Code</span>
              <div className="text-base font-light">{dressCode}</div>
            </div>
          </div>
        </AnimatedFadeIn>
      </div>
    </section>
  );
}
