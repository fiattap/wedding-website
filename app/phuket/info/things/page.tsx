"use client";

import { useEffect, useRef, useState } from "react";
import BackNav from "../../../components/BackNav";
import HeaderIdentity from "../../../components/HeaderIdentity";

function FadeSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
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
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function ThingsPage() {
  return (
    <>
      <HeaderIdentity />
      <BackNav variant="light" />
      <main className="bg-[#f6f3ef] text-[#4f4842]">
        {/* Hero */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden text-white">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/photos/things.jpg')" }}
          />
          <div className="absolute inset-0 bg-black/35" />

          <div className="relative z-10 px-6 text-center">
            <p className="mb-4 text-[12px] uppercase tracking-[0.45em] text-white/75">
              Things To Do
            </p>
            <h1 className="text-[34px] font-light leading-tight md:text-[56px] lg:text-[72px]">
              Explore
              <br />
              Phuket
            </h1>
            <p className="mt-6 text-sm tracking-[0.25em] text-white/75">
              Beaches, culture, markets, and island days
            </p>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center text-white/75">
            <p className="text-[11px] uppercase tracking-[0.35em]">Scroll</p>
            <div className="mx-auto mt-3 h-10 w-px bg-white/50" />
          </div>
        </section>

        {/* Content */}
        <section className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-5xl space-y-24">
            <FadeSection>
              <div className="grid gap-8 md:grid-cols-2 md:gap-14">
                <div>
                  <p className="mb-3 text-[12px] uppercase tracking-[0.35em] text-[#8b8178]">
                    Beaches
                  </p>
                  <h2 className="text-[30px] font-light leading-tight md:text-[44px]">
                    Slow mornings by the sea
                  </h2>
                </div>

                <div className="flex items-center">
                  <p className="max-w-md text-[16px] leading-8 text-[#6e655e]">
                    Phuket is best known for its beaches, making it easy to spend
                    a relaxed day by the water before or after the wedding.
                    Popular areas across the island include scenic beach stretches
                    and beautiful coastal viewpoints.
                  </p>
                </div>
              </div>
            </FadeSection>

            <FadeSection>
              <div className="grid gap-8 md:grid-cols-2 md:gap-14">
                <div>
                  <p className="mb-3 text-[12px] uppercase tracking-[0.35em] text-[#8b8178]">
                    Old Town
                  </p>
                  <h2 className="text-[30px] font-light leading-tight md:text-[44px]">
                    Wander Phuket Old Town
                  </h2>
                </div>

                <div className="flex items-center">
                  <p className="max-w-md text-[16px] leading-8 text-[#6e655e]">
                    Beyond the beaches, Phuket also has a charming cultural side.
                    Old Town is perfect for a slower afternoon of cafés, walking,
                    architecture, and photos.
                  </p>
                </div>
              </div>
            </FadeSection>

            <FadeSection>
              <div className="grid gap-8 md:grid-cols-2 md:gap-14">
                <div>
                  <p className="mb-3 text-[12px] uppercase tracking-[0.35em] text-[#8b8178]">
                    Island Days
                  </p>
                  <h2 className="text-[30px] font-light leading-tight md:text-[44px]">
                    Boat trips and island hopping
                  </h2>
                </div>

                <div className="flex items-center">
                  <p className="max-w-md text-[16px] leading-8 text-[#6e655e]">
                    Phuket is a great base for island excursions, private boat
                    days, and nearby escapes if you want to turn the trip into a
                    longer holiday.
                  </p>
                </div>
              </div>
            </FadeSection>

            <FadeSection>
              <div className="grid gap-8 md:grid-cols-2 md:gap-14">
                <div>
                  <p className="mb-3 text-[12px] uppercase tracking-[0.35em] text-[#8b8178]">
                    Markets & Food
                  </p>
                  <h2 className="text-[30px] font-light leading-tight md:text-[44px]">
                    Night markets and local food
                  </h2>
                </div>

                <div className="flex items-center">
                  <p className="max-w-md text-[16px] leading-8 text-[#6e655e]">
                    Phuket’s food scene is one of the island’s highlights, with
                    fresh seafood, Thai classics, and lively market culture all
                    part of the experience.
                  </p>
                </div>
              </div>
            </FadeSection>

            <FadeSection>
              <div className="relative overflow-hidden rounded-[28px] bg-[#ece5de] px-8 py-12 md:px-12 md:py-16">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.5),transparent_60%)]" />
                <div className="relative">
                  <p className="mb-4 text-[12px] uppercase tracking-[0.35em] text-[#8b8178]">
                    Our Recommendation
                  </p>
                  <h3 className="max-w-3xl text-[28px] font-light leading-tight md:text-[42px]">
                    Keep one day relaxed, and save one day for exploring.
                  </h3>
                  <p className="mt-6 max-w-2xl text-[16px] leading-8 text-[#6e655e]">
                    A beach morning, a walk through Old Town, and one special meal
                    or market night would make for a perfect Phuket itinerary
                    around the wedding weekend.
                  </p>
                </div>
              </div>
            </FadeSection>

            <FadeSection>
              <div className="grid gap-6 md:grid-cols-4">
                <div className="border-t border-[#ddd4cc] pt-5">
                  <p className="text-[12px] uppercase tracking-[0.35em] text-[#8b8178]">
                    Beaches
                  </p>
                  <p className="mt-3 text-[16px] leading-7 text-[#6e655e]">
                    Slow mornings and sunset views
                  </p>
                </div>

                <div className="border-t border-[#ddd4cc] pt-5">
                  <p className="text-[12px] uppercase tracking-[0.35em] text-[#8b8178]">
                    Old Town
                  </p>
                  <p className="mt-3 text-[16px] leading-7 text-[#6e655e]">
                    Architecture, cafés, and photo walks
                  </p>
                </div>

                <div className="border-t border-[#ddd4cc] pt-5">
                  <p className="text-[12px] uppercase tracking-[0.35em] text-[#8b8178]">
                    Island Trips
                  </p>
                  <p className="mt-3 text-[16px] leading-7 text-[#6e655e]">
                    Boat days and nearby escapes
                  </p>
                </div>

                <div className="border-t border-[#ddd4cc] pt-5">
                  <p className="text-[12px] uppercase tracking-[0.35em] text-[#8b8178]">
                    Food
                  </p>
                  <p className="mt-3 text-[16px] leading-7 text-[#6e655e]">
                    Markets, seafood, and local specialties
                  </p>
                </div>
              </div>
            </FadeSection>
          </div>
        </section>
      </main>
    </>
  );
}