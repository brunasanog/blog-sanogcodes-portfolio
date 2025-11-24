"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavigationButtons() {
  const router = useRouter();
  const [scrollTopVisible, setScrollTopVisible] = useState(false);
  const [buttonBottom, setButtonBottom] = useState(24);

  useEffect(() => {
    function onScroll() {
      const scrollY = window.scrollY || window.pageYOffset;
      setScrollTopVisible(scrollY > 200);

      const footer = document.querySelector("footer");
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const footerVisibleHeight = windowHeight - footerRect.top;

        if (footerVisibleHeight > 0) {
          setButtonBottom(footerVisibleHeight + 24);
        } else {
          setButtonBottom(24);
        }
      }
    }

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <button
        onClick={() => router.back()}
        className="text-gray-500 hover:text-gray-700 text-sm mb-3 transition-colors"
        style={{ cursor: "pointer" }}
        aria-label="Voltar para a página anterior"
      >
        ← Voltar
      </button>

      {scrollTopVisible && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed right-6 text-gray-400 hover:text-gray-700 transition-colors text-2xl"
          aria-label="Voltar ao topo"
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            bottom: `${buttonBottom}px`,
          }}
        >
          ↑
        </button>
      )}
    </>
  );
}
