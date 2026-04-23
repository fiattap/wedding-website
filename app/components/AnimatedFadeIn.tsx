import React from "react";

interface AnimatedFadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function AnimatedFadeIn({ children, className = "", delay = 0 }: AnimatedFadeInProps) {
  return (
    <div
      className={`opacity-0 animate-fade-in ${className}`}
      style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
    >
      {children}
    </div>
  );
}
