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
    setMounted(true); // for subtle fade-in
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
    <main className="flex min-h-screen items-center justify-center bg-[#f6f3ef] text-[#4f4842] px-4">
      
      <div
        className={`w-full max-w-[320px] text-center transition-opacity duration-1000 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >

        {/* TITLE */}
        <h1 className={`${scriptFont.className} text-[52px] text-[#6f655d]`}>
          Welcome
        </h1>

        {/* SUBTEXT */}
        <p
          className={`${serifFont.className} mt-6 text-[12px] tracking-[0.28em] text-[#a0968d]`}
        >
          enter your name (no spaces needed)
        </p>

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
            className="w-full border border-[#dcd6d0] bg-transparent px-1.5 py-1.5 text-center text-[14px] tracking-[0.06em] text-[#6f655d] outline-none placeholder:text-[#b8aea6] focus:border-[#bfb6ae] focus:ring-0 disabled:opacity-50 transition"
          />
        </div>

        {/* BUTTON */}
        <div className="mt-8">
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-[150px] border border-[#8b8178] py-3 text-[11px] uppercase tracking-[0.35em] text-[#8b8178] transition-all duration-300 hover:bg-[#8b8178] hover:text-white disabled:opacity-50"
          >
            {loading ? "Checking..." : "Enter"}
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <p className="mt-5 text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    </main>
  );
}