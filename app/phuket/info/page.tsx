"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderIdentity from "../../components/HeaderIdentity";
import { Great_Vibes, Cormorant_Garamond } from "next/font/google";

const scriptFont = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
});

const serifFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export default function InfoPage() {
  const pathname = usePathname();
  const [showDetails, setShowDetails] = useState(false);
  const [guestName, setGuestName] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setShowDetails(true), 700);
    return () => clearTimeout(t);
  }, []);

  // ✅ IMPROVED NAME FETCH (handles both storage methods)
  useEffect(() => {
    // 1. Try simple stored name first
    const simpleName = localStorage.getItem("guestName");

    if (simpleName) {
      const formatted =
        simpleName.charAt(0).toUpperCase() +
        simpleName.slice(1).toLowerCase();

      setGuestName(formatted);
      return;
    }

    // 2. Fallback to guest-data object
    const guest = localStorage.getItem("guest-data");
    if (!guest) return;

    try {
      const parsed = JSON.parse(guest);

      let rawName =
        parsed?.matchedName ||
        parsed?.primaryName ||
        parsed?.name ||
        parsed?.fullName ||
        "";

      if (!rawName) return;

      const firstName = rawName.split(" ")[0];

      const formatted =
        firstName.charAt(0).toUpperCase() +
        firstName.slice(1).toLowerCase();

      setGuestName(formatted);
    } catch (err) {
      console.error("Failed to parse guest-data", err);
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
      <div className="absolute top-0 left-0 w-full z-20">
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
        <section className="px-6 py-16 md:py-20 min-h-[60vh] flex items-center">
          <div className="mx-auto max-w-4xl text-center w-full">

            {/* NAV LINKS */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-5 max-w-3xl mx-auto">
              {navItems.map((item) => {
                const isActive = pathname === item.path;

                return (
                  <Link
                    key={item.label}
                    href={item.path}
                    className={`group relative text-[14px] uppercase tracking-[0.32em] transition duration-300 ${
                      isActive
                        ? "text-[#4f4842]"
                        : "text-[#8e8378] hover:text-[#4f4842]"
                    }`}
                    prefetch={false}
                  >
                    {item.label}

                    <span
                      className={`absolute left-1/2 bottom-[-6px] h-px -translate-x-1/2 transition-all duration-300 ${
                        isActive
                          ? "w-10 bg-[#4f4842]"
                          : "w-0 bg-[#4f4842] group-hover:w-10"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* TEXT BLOCK */}
            <div className="mx-auto mt-12 max-w-xl text-center text-[#6e655e]">

              {/* ✨ PREMIUM GREETING */}
              {guestName && (
                <p
                  className={`${scriptFont.className} mb-4 text-[28px] text-[#6f655d]`}
                >
                  Hi {guestName}
                </p>
              )}

              <p className="text-[15px] leading-[1.6]">
                Pack your bags — we’re getting married in Phuket!
              </p>

              <p className="mt-2 text-[15px] leading-[1.6]">
                We can’t wait to celebrate with you in paradise.
              </p>

              <p className="mt-4 text-[13px] text-[#8a817a]">
                This will be our Thai wedding celebration, with a second
                celebration to follow in the U.S.
              </p>
            </div>

            {/* RSVP */}
            <div className="mt-10">
              <Link
                href="/phuket/info/rsvp"
                className="border border-[#cfc6be] px-8 py-3 text-[12px] uppercase tracking-[0.28em] text-[#4f4842] transition duration-300 hover:bg-[#4f4842] hover:text-[#f6f3ef]"
                prefetch={false}
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