import React from "react";

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionTitle({ children, className = "" }: SectionTitleProps) {
  return (
    <h2 className={`text-2xl sm:text-3xl font-serif font-light tracking-tight text-neutral-800 mb-8 ${className}`}>
      {children}
    </h2>
  );
}
