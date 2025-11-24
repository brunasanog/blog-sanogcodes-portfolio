"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

// Variáveis
const SANITY_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET;

export default function HeroBanner() {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const [offsetY, setOffsetY] = useState(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const handleScroll = () => {
    setOffsetY(window.scrollY);
  };

  useEffect(() => {
    const onTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(onTouch);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current || isTouchDevice) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    const rotateY = (mouseX / width) * 10;
    const rotateX = -(mouseY / height) * 10;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    setRotate({ x: 0, y: 0 });
  };

  const mouseParallaxEnabled = !isTouchDevice;

  return (
    <section className="relative w-full overflow-hidden min-h-[500px] flex items-center justify-center">
      <div
        className="absolute inset-0 z-0 h-[120%]"
        style={{ top: "-10%", transform: `translateY(${offsetY * 0.4}px)` }}
      >
        <Image
          src={`https://cdn.sanity.io/images/${SANITY_ID}/${SANITY_DATASET}/c178d14a191c5f999214283a00c5b763b459280b-1536x1024.png`}
          alt="Imagem de fundo abstrata"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-75 md:opacity-50"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 lg:px-30">
        <div className="flex flex-col lg:flex-row items-center gap-8 py-12 md:py-16 lg:py-24">
          <div className="w-full lg:w-1/3 text-center lg:text-left">
            <h1
              className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight"
              style={{
                transition: "transform 0.1s linear, opacity 0.1s linear",
                opacity: Math.max(0, 1 - offsetY / 400),
                transform: `translateY(-${offsetY * 0.2}px) translateX(-${
                  offsetY * 0.15
                }px)`,
              }}
            >
              Explore o Universo da Tecnologia
            </h1>
            <p
              className="text-lg md:text-3xl text-white mb-0"
              style={{
                transition: "transform 0.1s linear, opacity 0.1s linear",
                opacity: Math.max(0, 1 - offsetY / 400),
                transform: `translateY(-${offsetY * 0.2}px) translateX(${
                  offsetY * 0.15
                }px)`,
              }}
            >
              Dicas, tutoriais e insights para sua jornada como desenvolvedora!
            </p>
          </div>

          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full lg:w-2/3 mt-8 lg:mt-0 [perspective:1000px]"
          >
            <div
              style={
                mouseParallaxEnabled
                  ? {
                      transform: `translateY(-${offsetY * 0.2}px) rotateX(${
                        rotate.x
                      }deg) rotateY(${rotate.y}deg)`,
                      transition: "transform 0.1s linear",
                    }
                  : {
                      transform: `translateY(-${offsetY * 0.2}px)`,
                      transition: "transform 0.1s linear",
                    }
              }
              className="relative w-full aspect-video overflow-hidden border border-neutral-600"
            >
              <Image
                src={`https://cdn.sanity.io/images/${SANITY_ID}/${SANITY_DATASET}/281ba9f3edffac98b2c751bfdeb230e66ba5691b-1181x797.png`}
                alt="Banner com notebook e itens de escritório"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
