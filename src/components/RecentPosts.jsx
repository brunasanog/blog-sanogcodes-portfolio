"use client";

import { useState, useEffect, useRef } from "react";
import RecentPostCard from "./RecentPostCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";

export default function RecentPosts({ posts }) {
  const recentPosts = posts.slice(0, 4);
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

  return (
    <section ref={sectionRef} className="w-full py-12 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-30">
        <div className="mb-10">
          <h2
            className="text-3xl font-bold pb-4 transition-all duration-700 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
            }}
          >
            Posts Recentes
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
          {recentPosts.length > 0 ? (
            <>
              <div className="sm:hidden">
                <Swiper
                  modules={[Autoplay]}
                  spaceBetween={15}
                  slidesPerView={1}
                  loop={true}
                  speed={600}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  className="pb-8"
                >
                  {recentPosts.map((post) => (
                    <SwiperSlide key={post._id} className="h-full">
                      <RecentPostCard post={post} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {recentPosts.map((post) => (
                  <div
                    key={post._id}
                    className="group cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-neutral-900/20"
                  >
                    <RecentPostCard post={post} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-neutral-600 col-span-full text-center">
              Nenhum post publicado ainda.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
