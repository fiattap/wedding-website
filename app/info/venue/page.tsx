"use client";

import { useEffect, useRef, useState } from "react";
import BackNav from "../../components/BackNav";
import HeaderIdentity from "../../components/HeaderIdentity";

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

export default function VenuePage() {
  return (
    <>
      <HeaderIdentity />
      <BackNav variant="light" />
      <main className="bg-[#f6f3ef] text-[#4f4842]">
        {/* Hero */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden text-white">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/photos/venue.jpg')" }}
          />
          <div className="absolute inset-0 bg-black/35" />

          <div className="relative z-10 px-6 text-center">
            <p className="mb-4 text-[12px] uppercase tracking-[0.45em] text-white/75">
              Venue
            </p>
            <h1 className="text-[34px] font-light leading-tight md:text-[56px] lg:text-[72px]">
              Thavorn Beach
              <br />
              Village Resort
            </h1>
            <p className="mt-6 text-sm tracking-[0.25em] text-white/75">
              Phuket, Thailand
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
                    Morning Ceremony
                  </p>
                  <h2 className="text-[30px] font-light leading-tight md:text-[44px]">
                    Thavorn Beach Village Resort
                  </h2>
                </div>

                <div className="flex items-center">
                  <p className="max-w-md text-[16px] leading-8 text-[#6e655e]">
                    Our morning ceremony will take place in a serene tropical
                    setting by the sea, surrounded by lush greenery and the soft
                    rhythm of Phuket.
                  </p>
                </div>
              </div>
            </FadeSection>

            <FadeSection>
              <div className="grid gap-8 md:grid-cols-2 md:gap-14">
                <div>
                  <p className="mb-3 text-[12px] uppercase tracking-[0.35em] text-[#8b8178]">
                    Dinner Reception
                  </p>
                  <h2 className="text-[30px] font-light leading-tight md:text-[44px]">
                    Thavorn Beach Village Resort
                  </h2>
                </div>

                <div className="flex items-center">
                  <p className="max-w-md text-[16px] leading-8 text-[#6e655e]">
                    As the sun sets, we’ll gather for dinner and celebration in a
                    warm, romantic setting overlooking the water.
                  </p>
                </div>
              </div>
            </FadeSection>

            <FadeSection>
              <div className="relative overflow-hidden rounded-[28px] bg-[#ece5de] px-8 py-12 md:px-12 md:py-16">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.5),transparent_60%)]" />
                <div className="relative">
                  <p className="mb-4 text-[12px] uppercase tracking-[0.35em] text-[#8b8178]">
                    Why We Chose It
                  </p>
                  <h3 className="max-w-3xl text-[28px] font-light leading-tight md:text-[42px]">
                    A venue that feels intimate, tropical, and quietly romantic.
                  </h3>
                  <p className="mt-6 max-w-2xl text-[16px] leading-8 text-[#6e655e]">
                    Nestled along a private beachfront, Thavorn Beach Village
                    combines ocean views, tropical gardens, and a peaceful sense
                    of escape. It felt like the perfect place to celebrate this
                    chapter with the people we love.
                  </p>
                </div>
              </div>
            </FadeSection>

            <FadeSection>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="border-t border-[#ddd4cc] pt-5">
                  <p className="text-[12px] uppercase tracking-[0.35em] text-[#8b8178]">
                    Location
                  </p>
                  <p className="mt-3 text-[16px] leading-7 text-[#6e655e]">
                    Phuket, Thailand
                  </p>
                </div>

                <div className="border-t border-[#ddd4cc] pt-5">
                  <p className="text-[12px] uppercase tracking-[0.35em] text-[#8b8178]">
                    Ceremony
                  </p>
                  <p className="mt-3 text-[16px] leading-7 text-[#6e655e]">
                    Morning at Sala Pier
                  </p>
                </div>

                <div className="border-t border-[#ddd4cc] pt-5">
                  <p className="text-[12px] uppercase tracking-[0.35em] text-[#8b8178]">
                    Reception
                  </p>
                  <p className="mt-3 text-[16px] leading-7 text-[#6e655e]">
                    Dinner celebration at Beach Lawn
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