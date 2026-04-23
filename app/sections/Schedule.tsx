import React from "react";
import { siteConfig } from "../data/siteConfig";
import SectionTitle from "../components/SectionTitle";
import AnimatedFadeIn from "../components/AnimatedFadeIn";

export default function Schedule() {
  return (
    <section id="schedule" className="py-20 bg-white">
      <div className="max-w-2xl mx-auto px-4">
        <SectionTitle>Weekend Schedule</SectionTitle>
        <div className="space-y-10">
          {siteConfig.schedule.map((day, idx) => (
            <AnimatedFadeIn key={day.day} delay={idx * 120}>
              <div>
                <div className="text-neutral-500 text-sm mb-2 font-light uppercase tracking-widest">{day.day}</div>
                <ul className="space-y-2">
                  {day.events.map((event, i) => (
                    <li key={event.title + i} className="flex items-baseline gap-4">
                      <span className="text-neutral-700 font-light w-20 text-sm">{event.time}</span>
                      <span className="text-neutral-900 font-serif font-light text-base">{event.title}</span>
                      <span className="text-neutral-500 text-sm">{event.location}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedFadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
