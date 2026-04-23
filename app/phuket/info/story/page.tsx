"use client";

import Image from "next/image";
import Link from "next/link";
import HeaderIdentity from "../../../components/HeaderIdentity";
import { Great_Vibes, Cormorant_Garamond } from "next/font/google";

const scriptFont = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
});

const serifFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const STORY = [
  {
    image: "/photos/photo-1.jpg",
    text: "It all began with a simple connection...",
  },
  {
    image: "/photos/photo-2.jpg",
    text: "From quiet moments to unforgettable adventures,",
  },
  {
    image: "/photos/photo-3.jpg",
    text: "we found joy in exploring the world together.",
  },
  {
    image: "/photos/photo-4.jpg",
    text: "Every place became part of our story,",
  },
  {
    image: "/photos/photo-5.jpg",
    text: "every memory bringing us closer.",
  },
  {
    image: "/photos/photo-6.jpg",
    text: "Through it all, one thing stayed constant—",
  },
  {
    image: "/photos/photo-7.jpg",
    text: "we always found our way back to each other.",
  },
  {
    image: "/photos/photo-8.jpg",
    text: "And now, we begin our next chapter...",
  },
  {
    image: "/photos/photo-9.jpg",
    text: "surrounded by the people we love most.",
  },
  {
    image: "/photos/photo-10.jpg",
    text: "We can’t wait to celebrate this moment with you.",
  },
];

export default function StoryPage() {
  return (
    <>
      <HeaderIdentity />

      <main className="bg-[#f6f3ef] text-[#4f4842]">

        {/* INTRO */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">

          <p className="mb-6 text-[12px] uppercase tracking-[0.45em] text-[#8b8178]">
            Fiat & Derek
          </p>

          <h1
            className={`${scriptFont.className} text-[44px] md:text-[72px] text-[#6f655d]`}
          >
            Our Story
          </h1>

          <p
            className={`${serifFont.className} mt-6 max-w-xl text-[15px] leading-[1.7] text-[#6e655e]`}
          >
            A collection of places we’ve loved, moments we’ve shared,
            and memories that brought us here.
          </p>

        </section>

        {/* STORY SECTIONS */}
        {STORY.map((item, index) => (
          <section
            key={index}
            className="relative min-h-screen flex items-center justify-center px-6"
          >
            {/* IMAGE */}
            <div className="absolute inset-0">
              <Image
                src={item.image}
                alt=""
                fill
                className="object-cover scale-[1.05] transition-transform duration-[6000ms] ease-out"
              />

              {/* soft overlay */}
              <div className="absolute inset-0 bg-[#f6f3ef]/40" />
            </div>

            {/* TEXT */}
            <div className="relative z-10 text-center max-w-xl">

              <p
                className={`${serifFont.className} text-[18px] md:text-[22px] leading-[1.6] text-[#4f4842]`}
              >
                {item.text}
              </p>

            </div>
          </section>
        ))}

        {/* OUTRO */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">

          <h2
            className={`${scriptFont.className} text-[42px] md:text-[64px] text-[#6f655d]`}
          >
            See You in Phuket
          </h2>

          <Link
            href="/phuket/info"
            className="mt-10 text-[11px] uppercase tracking-[0.35em] text-[#8b8178] transition hover:text-[#4f4842]"
          >
            Back to Menu
          </Link>

        </section>

      </main>
    </>
  );
}