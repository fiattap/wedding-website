import React from "react";
import { siteConfig } from "../data/siteConfig";
import SectionTitle from "../components/SectionTitle";
import AnimatedFadeIn from "../components/AnimatedFadeIn";

export default function Story() {
  return (
    <section id="story" className="py-20 bg-white">
      <div className="max-w-2xl mx-auto px-4">
        <SectionTitle>Our Story</SectionTitle>
        <ol className="relative border-l border-neutral-200">
          {siteConfig.storyTimeline.map((item, idx) => (
            <AnimatedFadeIn key={item.year} delay={idx * 120}>
              <li className="mb-12 ml-6">
                <div className="absolute w-3 h-3 bg-neutral-300 rounded-full -left-1.5 border-2 border-white"></div>
                <span className="block text-sm text-neutral-500 mb-1 font-light">{item.year}</span>
                <h3 className="text-lg font-serif font-light text-neutral-900 mb-1">{item.title}</h3>
                <p className="text-base text-neutral-700 font-light">{item.description}</p>
              </li>
            </AnimatedFadeIn>
          ))}
        </ol>
      </div>
    </section>
  );
}
