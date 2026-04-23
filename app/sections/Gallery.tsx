import React from "react";
import SectionTitle from "../components/SectionTitle";
import AnimatedFadeIn from "../components/AnimatedFadeIn";

const images = [
  "/gallery1.jpg",
  "/gallery2.jpg",
  "/gallery3.jpg",
  "/gallery4.jpg",
  "/gallery5.jpg",
  "/gallery6.jpg",
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <SectionTitle>Gallery</SectionTitle>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {images.map((src, idx) => (
            <AnimatedFadeIn key={src} delay={idx * 80}>
              <div className="aspect-square overflow-hidden rounded-lg shadow-sm bg-neutral-100">
                <img
                  src={src}
                  alt="Wedding gallery placeholder"
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>
            </AnimatedFadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
