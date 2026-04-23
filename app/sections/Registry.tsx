import React from "react";
import { siteConfig } from "../data/siteConfig";
import SectionTitle from "../components/SectionTitle";
import AnimatedFadeIn from "../components/AnimatedFadeIn";

export default function Registry() {
  return (
    <section id="registry" className="py-20 bg-[#fafaf9]">
      <div className="max-w-2xl mx-auto px-4">
        <SectionTitle>Registry</SectionTitle>
        <AnimatedFadeIn>
          <ul className="space-y-4">
            {siteConfig.registry.map((item) => (
              <li key={item.name}>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full border border-neutral-200 px-6 py-3 text-base font-light text-neutral-900 bg-white hover:bg-neutral-50 transition-colors shadow-sm"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </AnimatedFadeIn>
      </div>
    </section>
  );
}
