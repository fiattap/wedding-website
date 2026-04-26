"use client";

import { useState, useEffect } from "react";
import { Great_Vibes, Cormorant_Garamond } from "next/font/google";

const scriptFont = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
});

const serifFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export default function Home() {
  const [inputName, setInputName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const normalize = (str: string) =>
    str.toLowerCase().replace(/\s+/g, "").trim();

  const handleLogin = async () => {
    if (loading) return;

    setError("");
    setLoading(true);

    const fullName = normalize(inputName);

    if (!fullName) {
      setError("Enter your name");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/rsvp/find", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data?.error || "Name not recognized");
        setLoading(false);
        return;
      }

      window.location.href = "/phuket";
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f6f3ef] text-[#4f4842] px-4 overflow-hidden">

      <div
        className={`w-full max-w-[320px] text-center transform transition-all duration-[1200ms] ${
          mounted
            ? "opacity-100 translate-y-2 scale-100"
            : "opacity-0 translate-y-8 scale-[0.98]"
        }`}
      >

        <div className="translate-y-6">

          {/* TITLE */}
          <h1
            className={`${scriptFont.className} text-[52px] text-[#7a7068] leading-none`}
          >
            Welcome
          </h1>

          {/* SUBTEXT */}
          <p
            className={`${serifFont.className} mt-5 text-[12px] tracking-[0.22em] text-[#a8a098]`}
          >
            enter your name (no spaces needed)
          </p>

          {/* DIVIDER */}
          <div className="mt-6 mx-auto h-[1px] w-[60px] bg-[#e5dfd9]" />

          {/* INPUT */}
          <div className="mt-8">
            <input
              type="text"
              value={inputName}
              onChange={(e) => {
                setInputName(e.target.value);
                if (error) setError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleLogin();
              }}
              placeholder="e.g. johnsmith"
              disabled={loading}
              className="w-[240px] mx-auto block border border-[#e7e1db] bg-transparent px-3 py-2 text-center text-[14px] tracking-[0.1em] text-[#7a7068] outline-none placeholder:text-[#bdb5ae] transition-all duration-500 focus:border-[#cfc7c0] focus:bg-white/40 focus:scale-[1.015] disabled:opacity-50"
            />
          </div>

          {/* BUTTON — refined / understated */}
          <div className="mt-8">
            <button
              onClick={handleLogin}
              disabled={loading}
              className="
                w-[150px]
                border border-[#e2dbd4]
                text-[#8a8077]
                py-3
                text-[11px]
                uppercase
                tracking-[0.4em]
                bg-transparent
                transition-all duration-500
                hover:border-[#cfc7c0]
                hover:text-[#6f655d]
                hover:bg-white/30
                active:scale-[0.98]
                disabled:opacity-50
              "
            >
              {loading ? "Checking..." : "Enter"}
            </button>
          </div>

          {/* ERROR */}
          {error && (
            <p className="mt-5 text-[12px] tracking-[0.15em] text-[#b08980]">
              {error}
            </p>
          )}

          {/* FOOTER */}
          <p
            className={`${serifFont.className} mt-12 text-[12px] tracking-[0.22em] text-[#b5aca4]`}
          >
            we can’t wait to celebrate with you
          </p>

        </div>
      </div>
    </main>
  );
}