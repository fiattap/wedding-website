"use client";

import { useEffect, useRef, useState } from "react";
import BackNav from "../../../components/BackNav";
import HeaderIdentity from "../../../components/HeaderIdentity";

function FadeSection({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

export default function SchedulePage() {
  return (
    <>
     <div className="absolute top-0 left-0 w-full z-20">
      <HeaderIdentity />
    </div>
      <BackNav variant="light" />
      <main className="bg-[#f6f3ef] text-[#4f4842]">
        
        {/* HERO */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden text-white">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/photos/schedule.jpg')" }}
          />
          <div className="absolute inset-0 bg-black/35" />

          <div className="relative z-10 px-6 text-center">
            <p className="mb-4 text-[12px] uppercase tracking-[0.45em] text-white/75">
              Wedding Schedule
            </p>

            <h1 className="text-[34px] font-light leading-tight md:text-[56px] lg:text-[72px]">
              The Day
            </h1>

            <p className="mt-6 text-sm tracking-[0.25em] text-white/75">
              January 23, 2027
            </p>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center text-white/75">
            <p className="text-[11px] uppercase tracking-[0.35em]">Scroll</p>
            <div className="mx-auto mt-3 h-10 w-px bg-white/50" />
          </div>
        </section>

        {/* CONTENT */}
        <section className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-3xl space-y-20">

            <FadeSection>
              <div className="text-center">
                <p className="mb-3 text-[12px] uppercase tracking-[0.35em] text-[#8b8178]">
                  Morning Ceremony
                </p>

                <h2 className="text-[28px] md:text-[40px] font-light leading-tight">
                  Monk Blessing Ceremony
                </h2>

                <p className="mt-4 text-[16px] text-[#6e655e]">
                  7:09 AM
                </p>
              </div>
            </FadeSection>

            <FadeSection>
              <div className="text-center">
                <h2 className="text-[26px] md:text-[38px] font-light">
                  Khan Maak Procession
                </h2>

                <p className="mt-4 text-[#6e655e]">
                  8:09 AM
                </p>
              </div>
            </FadeSection>

            <FadeSection>
              <div className="text-center">
                <h2 className="text-[26px] md:text-[38px] font-light">
                  Water Blessing Ceremony
                </h2>

                <p className="mt-4 text-[#6e655e]">
                  9:39 AM
                </p>
              </div>
            </FadeSection>


            {/* Divider */}
            <FadeSection>
              <div className="h-px bg-[#ddd4cc] w-full" />
            </FadeSection>

            <FadeSection>
              <div className="text-center">
                <p className="mb-3 text-[12px] uppercase tracking-[0.35em] text-[#8b8178]">
                  Evening
                </p>

                <h2 className="text-[28px] md:text-[40px] font-light leading-tight">
                  Dinner Reception
                </h2>

                <p className="mt-6 text-[#6e655e]">
                  6:00 PM — Cocktail Hour
                </p>

                <p className="mt-2 text-[#6e655e]">
                  6:30 PM — Dinner 
                </p>
              </div>
            </FadeSection>

          </div>
        </section>
      </main>
    </>
  );
}