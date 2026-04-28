"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderIdentity from "../../components/HeaderIdentity";
import { Great_Vibes } from "next/font/google";

const scriptFont = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
});

export default function InfoPage() {
  const pathname = usePathname();
  const [showDetails, setShowDetails] = useState(false);
  const [guestName, setGuestName] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setShowDetails(true), 700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const guest = localStorage.getItem("guest-data");

    if (guest) {
      try {
        const parsed = JSON.parse(guest);

        // ✅ handle BOTH shapes:
        // 1. { firstName: "Carol" }
        // 2. { guest: { firstName: "Carol" } }
        const firstName =
          parsed?.firstName ||
          parsed?.guest?.firstName ||
          "";

        if (firstName?.trim()) {
          setGuestName(firstName.trim());
          return;
        }
      } catch (err) {
        console.error("Failed to parse guest-data", err);
      }
    }

    // fallback
    const simpleName = localStorage.getItem("guestName");

    if (simpleName?.trim()) {
      setGuestName(simpleName.trim());
    }
  }, []);

  const navItems = [
    { label: "Wedding Schedule", path: "/phuket/info/schedule" },
    { label: "Venue", path: "/phuket/info/venue" },
    { label: "Travel", path: "/phuket/info/travel" },
    { label: "Things To Do", path: "/phuket/info/things" },
    { label: "FAQ", path: "/phuket/info/faq" },
    { label: "Our Story", path: "/phuket/info/story" },
    { label: "RSVP", path: "/phuket/info/rsvp" },
  ];

  return (
    <>
      <div className="absolute top-0 left-0 z-20 w-full">
        <HeaderIdentity />
      </div>

      <main className="bg-[#f6f3ef] text-[#4f4842]">
        {/* HERO */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden text-white">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/photos/info.jpg')" }}
          />
          <div className="absolute inset-0 bg-black/35" />

          <div className="relative z-10 px-6 text-center">
            <h1 className="text-[34px] font-light leading-tight md:text-[56px] lg:text-[72px]">
              Our Wedding
            </h1>

            <div className="mt-8 mb-3 flex flex-col items-center gap-0.5">
              <div className="text-[11px] uppercase tracking-[0.45em] text-white/80">
                January 23, 2027
              </div>
              <div className="text-[17px] font-light leading-[1.18] text-white md:text-[20px]">
                Thavorn Beach Village Resort
              </div>
              <div className="text-[11px] uppercase tracking-[0.38em] text-white/60">
                Phuket, Thailand
              </div>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center text-white/75">
            <p className="text-[11px] uppercase tracking-[0.35em]">
              Explore
            </p>
            <div className="mx-auto mt-3 h-10 w-px bg-white/50" />
          </div>
        </section>

        {/* NAV + CONTENT */}
        <section className="flex min-h-[60vh] items-center px-6 py-16 md:py-20">
          <div
            className={`mx-auto w-full max-w-4xl text-center transition-all duration-700 ${
              showDetails
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            {/* NAV */}
            <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-x-8 gap-y-5">
              {navItems.map((item) => {
                const isActive = pathname === item.path;

                return (
                  <Link
                    key={item.label}
                    href={item.path}
                    className={`group relative text-[14px] uppercase tracking-[0.32em] ${
                      isActive
                        ? "text-[#4f4842]"
                        : "text-[#8e8378] hover:text-[#4f4842]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* TEXT */}
            <div className="mx-auto mt-12 max-w-2xl text-center text-[#6e655e]">
              {guestName && (
                <div className="flex justify-center overflow-visible">
                  <h2
                    className={`
                      ${scriptFont.className}
                      inline-block
                      whitespace-nowrap
                      text-center
                      text-[#6f655d]
                      leading-[1.4]
                      tracking-[0.02em]
                      text-[clamp(32px,5vw,56px)]
                    `}
                  >
                    Hi {guestName}
                  </h2>
                </div>
              )}

              <div className="mx-auto mt-4 max-w-xl text-[#7a7067]">
                <p className="text-[15px] md:text-[17px] leading-[1.6]">
                  Pack your bags — we’re getting married in Phuket!
                </p>

                <p className="mt-2 text-[15px] md:text-[17px] leading-[1.6]">
                  We can’t wait to celebrate with you in paradise.
                </p>
              </div>

              <p className="mx-auto mt-8 max-w-md text-[12px] leading-7 text-[#9b9087]">
                This will be our Thai wedding celebration, with a second
                celebration to follow in the U.S.
              </p>
            </div>

            {/* RSVP */}
            <div className="mt-12">
              <Link
                href="/phuket/info/rsvp"
                className="inline-flex border border-[#cfc6be] px-10 py-3 text-[12px] uppercase tracking-[0.3em] text-[#4f4842] transition duration-300 hover:bg-[#4f4842] hover:text-[#f6f3ef]"
              >
                RSVP
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}