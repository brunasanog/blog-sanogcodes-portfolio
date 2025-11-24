"use client";

import { useState, useEffect, useRef } from "react";
import FeaturedPostCard from "./FeaturedPostCard";

export default function FeaturedPost({ post }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  if (!post) return null;

  return (
    <section ref={sectionRef} className="w-full py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-30">
        <div className="mb-10">
          <h2
            className="text-3xl font-bold pb-4 transition-all duration-700 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
            }}
          >
            Destaque
          </h2>

          <div
            className="h-0.5 bg-neutral-800"
            style={{
              width: isVisible ? "100%" : "0%",
              transition: "width 1s ease-out 0.3s",
            }}
          ></div>
        </div>

        <div
          style={{
            transition:
              "opacity 0.7s ease-out 0.6s, transform 0.7s ease-out 0.6s",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div className="group cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-102 hover:-translate-y-2 hover:shadow-xl hover:shadow-neutral-500/20">
            <FeaturedPostCard post={post} />
          </div>
        </div>
      </div>
    </section>
  );
}
