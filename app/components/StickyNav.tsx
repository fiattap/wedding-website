"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "../data/siteConfig";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#story", label: "Our Story" },
  { href: "#details", label: "Details" },
  { href: "#schedule", label: "Schedule" },
  { href: "#travel", label: "Travel" },
  { href: "#gallery", label: "Gallery" },
  { href: "#rsvp", label: "RSVP" },
  { href: "#faq", label: "FAQ" },
  { href: "#registry", label: "Registry" },
];

export default function StickyNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-30 transition-all duration-300 backdrop-blur-lg bg-white/70 border-b border-neutral-200 ${scrolled ? "shadow-md" : "shadow-none"}`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <span className="font-serif text-lg font-light tracking-tight text-neutral-800">
          {siteConfig.couple.names}
        </span>
        <ul className="hidden gap-6 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-neutral-700 hover:text-neutral-900 transition-colors font-light text-base"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        {/* Mobile menu (optional: add hamburger) */}
      </div>
    </nav>
  );
}
