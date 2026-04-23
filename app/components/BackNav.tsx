"use client";
import { useRouter } from "next/navigation";

interface BackNavProps {
  variant?: "light" | "dark";
}

export default function BackNav({ variant = "light" }: BackNavProps) {
  const router = useRouter();
  const textColor =
    variant === "dark"
      ? "text-white/80 hover:text-white"
      : "text-[#8e8378] hover:text-[#b3a89c]";

  return (
    <nav
      className="fixed top-2 left-2 z-[99] px-1 py-0.5"
      style={{ pointerEvents: "auto" }}
    >
      <span
        className={`cursor-pointer text-[10px] md:text-xs uppercase tracking-[0.09em] font-light transition-colors ${textColor}`}
        onClick={() => router.push("/phuket/info")}
        tabIndex={0}
        role="button"
        aria-label="Back"
        style={{ letterSpacing: "0.09em" }}
      >
        ← Back
      </span>
    </nav>
  );
}
