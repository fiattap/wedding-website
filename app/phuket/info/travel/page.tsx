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

export default function TravelPage() {
  return (
    <>
      <div className="absolute top-0 left-0 w-full z-20">
           <HeaderIdentity />
         </div>
      <BackNav variant="light" />
      <main className="bg-[#f6f3ef] text-[#4f4842]">
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden text-white">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/photos/travel.jpg')" }}
          />
          <div className="absolute inset-0 bg-black/35" />

          <div className="relative z-10 px-6 text-center">
            <p className="mb-4 text-[12px] uppercase tracking-[0.45em] text-white/75">
              Travel
            </p>
            <h1 className="text-[34px] font-light leading-tight md:text-[56px] lg:text-[72px]">
              Getting to
              <br />
              Phuket
            </h1>
            <p className="mt-6 text-sm tracking-[0.25em] text-white/75">
              Thailand
            </p>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center text-white/75">
            <p className="text-[11px] uppercase tracking-[0.35em]">Scroll</p>
            <div className="mx-auto mt-3 h-10 w-px bg-white/50" />
          </div>
        </section>

        <section className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-5xl space-y-24">
            <FadeSection>
              <div className="grid gap-8 md:grid-cols-2 md:gap-14">
                <div>
                  <p className="mb-3 text-[12px] uppercase tracking-[0.35em] text-[#8b8178]">
                    First Stop
                  </p>
                  <h2 className="text-[30px] font-light leading-tight md:text-[44px]">
                    Arrive in Bangkok
                  </h2>
                </div>

                <div className="flex items-center">
                  <p className="max-w-md text-[16px] leading-8 text-[#6e655e]">
                    Our wedding will be in Phuket. For many guests traveling
                    from the United States, the trip will include arriving in
                    Bangkok first before taking a connecting flight to Phuket.
                  </p>
                </div>
              </div>
            </FadeSection>

            <FadeSection>
              <div className="grid gap-8 md:grid-cols-2 md:gap-14">
                <div>
                  <p className="mb-3 text-[12px] uppercase tracking-[0.35em] text-[#8b8178]">
                    Domestic Flight
                  </p>
                  <h2 className="text-[30px] font-light leading-tight md:text-[44px]">
                    Bangkok to Phuket
                  </h2>
                </div>

                <div className="flex items-center">
                  <p className="max-w-md text-[16px] leading-8 text-[#6e655e]">
                    The flight from Bangkok to Phuket is typically about 1 hour
                    and 30 minutes, making the final leg of the trip fairly
                    simple once you are in Thailand.
                  </p>
                </div>
              </div>
            </FadeSection>

            <FadeSection>
              <div className="grid gap-8 md:grid-cols-2 md:gap-14">
                <div>
                  <p className="mb-3 text-[12px] uppercase tracking-[0.35em] text-[#8b8178]">
                    From the Airport
                  </p>
                  <h2 className="text-[30px] font-light leading-tight md:text-[44px]">
                    Phuket Airport to Thavorn
                  </h2>
                </div>

                <div className="flex items-center">
                  <p className="max-w-md text-[16px] leading-8 text-[#6e655e]">
                    Once you land in Phuket, the drive from Phuket International
                    Airport to Thavorn Beach Village Resort is usually around 45
                    to 60 minutes, depending on traffic and time of day.
                  </p>
                </div>
              </div>
            </FadeSection>

            <FadeSection>
              <div className="relative overflow-hidden rounded-[28px] bg-[#ece5de] px-8 py-12 md:px-12 md:py-16">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.5),transparent_60%)]" />
                <div className="relative">
                  <p className="mb-4 text-[12px] uppercase tracking-[0.35em] text-[#8b8178]">
                    Travel Note
                  </p>
                  <h3 className="max-w-3xl text-[28px] font-light leading-tight md:text-[42px]">
                    Plan for a connection and one final transfer.
                  </h3>
                  <p className="mt-6 max-w-2xl text-[16px] leading-8 text-[#6e655e]">
                    We recommend building in enough time between your
                    international arrival and your domestic flight to Phuket,
                    then arranging your airport transfer to the resort in
                    advance.
                  </p>
                </div>
              </div>
            </FadeSection>

            <FadeSection>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="border-t border-[#ddd4cc] pt-5">
                  <p className="text-[12px] uppercase tracking-[0.35em] text-[#8b8178]">
                    Destination
                  </p>
                  <p className="mt-3 text-[16px] leading-7 text-[#6e655e]">
                    Phuket, Thailand
                  </p>
                </div>

                <div className="border-t border-[#ddd4cc] pt-5">
                  <p className="text-[12px] uppercase tracking-[0.35em] text-[#8b8178]">
                    Flight Time
                  </p>
                  <p className="mt-3 text-[16px] leading-7 text-[#6e655e]">
                    Bangkok to Phuket: about 1.5 hours
                  </p>
                </div>

                <div className="border-t border-[#ddd4cc] pt-5">
                  <p className="text-[12px] uppercase tracking-[0.35em] text-[#8b8178]">
                    Transfer Time
                  </p>
                  <p className="mt-3 text-[16px] leading-7 text-[#6e655e]">
                    Airport to Thavorn: about 45–60 minutes
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