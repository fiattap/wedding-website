"use client";

import { useRouter, usePathname } from "next/navigation";
import HeaderIdentity from "../components/HeaderIdentity";

export default function InfoPage() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { label: "Wedding Schedule", path: "/info/schedule" },
    { label: "Venue", path: "/info/venue" },
    { label: "Travel", path: "/info/travel" },
    { label: "Things To Do", path: "/info/things" },
    { label: "FAQ", path: "/info/faq" },
    { label: "RSVP", path: "/info/rsvp" },
  ];

  return (
    <>
      <HeaderIdentity />
      <main className="bg-[#f6f3ef] text-[#4f4842]">

        {/* Navigation section */}
        <section className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-5xl">
            <div className="mb-14 text-center">
              <p className="text-[12px] uppercase tracking-[0.45em] text-[#8b8178]">
                FIAT & DEREK
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-x-8 gap-y-5 md:gap-x-12">
              {navItems.map((item) => {
                const isActive = pathname === item.path;

                return (
                  <button
                    key={item.label}
                    onClick={() => router.push(item.path)}
                    className={`relative pb-2 text-[13px] uppercase tracking-[0.28em] transition duration-300 ${
                      isActive
                        ? "text-[#4f4842]"
                        : "text-[#8e8378] hover:text-[#4f4842]"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute left-0 bottom-0 h-px transition-all duration-300 ${
                        isActive ? "w-full bg-[#4f4842]" : "w-0 bg-[#4f4842]"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="mt-24 text-center">
              <p className="mx-auto max-w-2xl text-[16px] leading-8 text-[#6e655e]">
                Pack your bags — we’re getting married in Phuket!
                We can’t wait to celebrate with you in paradise.
              </p>
            </div>

            <div className="mt-12 text-center">
              <button
                onClick={() => router.push("/info/rsvp")}
                className="border border-[#cfc6be] px-8 py-3 text-[12px] uppercase tracking-[0.28em] text-[#4f4842] transition duration-300 hover:bg-[#4f4842] hover:text-[#f6f3ef]"
              >
                RSVP
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}