import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-3xl px-4 sm:px-6 lg:max-w-5xl ${className}`}>
      {children}
    </div>
  );
}
