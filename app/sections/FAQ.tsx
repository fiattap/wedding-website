"use client";
import React, { useState } from "react";
import { siteConfig } from "../data/siteConfig";
import SectionTitle from "../components/SectionTitle";
import AnimatedFadeIn from "../components/AnimatedFadeIn";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-2xl mx-auto px-4">
        <SectionTitle>FAQ</SectionTitle>
        <div className="divide-y divide-neutral-200">
          {siteConfig.faq.map((item, idx) => (
            <AnimatedFadeIn key={item.q} delay={idx * 100}>
              <div>
                <button
                  className="w-full text-left py-4 focus:outline-none flex items-center justify-between"
                  onClick={() => setOpen(open === idx ? null : idx)}
                  aria-expanded={open === idx}
                  aria-controls={`faq-${idx}`}
                >
                  <span className="font-serif text-lg text-neutral-900 font-light">{item.q}</span>
                  <span className="ml-2 text-neutral-400">{open === idx ? "-" : "+"}</span>
                </button>
                <div
                  id={`faq-${idx}`}
                  className={`overflow-hidden transition-all duration-300 text-neutral-700 text-base font-light ${open === idx ? "max-h-40 py-2" : "max-h-0"}`}
                  aria-hidden={open !== idx}
                >
                  {item.a}
                </div>
              </div>
            </AnimatedFadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
