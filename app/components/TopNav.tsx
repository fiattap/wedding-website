"use client";
import { useRouter } from "next/navigation";

interface TopNavProps {
  variant?: "light" | "dark";
}

export default function TopNav({ variant = "light" }: TopNavProps) {
  const router = useRouter();
  const textColor =
    variant === "dark"
      ? "text-white/70 hover:text-white"
      : "text-[#8e8378] hover:text-[#b3a89c]";

  return (
    <nav
      className="fixed top-0 left-0 z-50 flex items-center gap-5 px-5 py-4 w-full max-w-xs"
      style={{ pointerEvents: "auto" }}
    >
      <span
        className={`cursor-pointer text-xs uppercase tracking-[0.18em] font-light transition-colors ${textColor}`}
        onClick={() => router.back()}
        tabIndex={0}
        role="button"
        aria-label="Back"
      >
        ← Back
      </span>
      <span
        className={`cursor-pointer text-xs uppercase tracking-[0.18em] font-light transition-colors ${textColor}`}
        onClick={() => router.push("/info")}
        tabIndex={0}
        role="button"
        aria-label="Menu"
      >
        Menu
      </span>
    </nav>
  );
}
