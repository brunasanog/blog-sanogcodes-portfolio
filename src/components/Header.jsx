"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import SocialLinks from "./SocialLinks";

// Variáveis
const SANITY_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET;

const LOGO_IMAGE_URL = `https://cdn.sanity.io/images/${SANITY_ID}/${SANITY_DATASET}/18690ff5195d4e02dc57cdfe4fd88bab28989530-500x385.png`;

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMenu}
        />
      )}
      <aside className="w-full bg-black text-white text-center py-3 text-sm"></aside>
      <header className="w-full px-4 sm:px-10 pt-4 pb-6 border-b border-neutral-200 bg-white text-black relative z-10">
        <div className="hidden lg:flex justify-between items-center w-full max-w-7xl mx-auto mb-4">
          <nav className="flex space-x-6 text-base font-medium">
            <Link
              href="/"
              className={`py-0.5 transition-colors text-black ${
                isActive("/")
                  ? "border-b-1 border-black"
                  : "hover:text-gray-500 focus:text-gray-500"
              }`}
            >
              Home
            </Link>

            <Link
              href="/blog"
              className={`py-0.5 transition-colors text-black ${
                isActive("/blog")
                  ? "border-b-1 border-black"
                  : "hover:text-gray-500 focus:text-gray-500"
              }`}
            >
              Blog
            </Link>

            <Link
              href="/sobre"
              className={`py-0.5 transition-colors text-black ${
                isActive("/sobre")
                  ? "border-b-1 border-black"
                  : "hover:text-gray-500 focus:text-gray-500"
              }`}
            >
              Sobre
            </Link>
          </nav>

          <div className="flex justify-center flex-grow">
            <div className="relative w-72 h-18 lg:w-80 lg:h-20">
              <Image
                src={LOGO_IMAGE_URL}
                alt="Logo Sanog Codes"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </div>

          <div className="flex items-center">
            <SocialLinks />
          </div>
        </div>

        <div className="lg:hidden flex justify-between items-center w-full max-w-7xl mx-auto mb-4">
          <button
            onClick={() => !isMenuOpen && setIsMenuOpen(true)}
            className="flex flex-col justify-center items-center space-y-1 p-2 focus:outline-none focus:ring-2 focus:ring-black rounded z-20"
            aria-label="Open menu"
          >
            <span
              className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-0.5" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-black transition-opacity duration-300 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-0.5" : ""
              }`}
            />
          </button>
          <div className="flex justify-center flex-grow mx-4">
            <div className="relative w-56 h-14 sm:w-72 sm:h-22">
              <Image
                src={LOGO_IMAGE_URL}
                alt="Logo Sanog Codes"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </div>
          <div className="w-10" />
        </div>

        <div className="flex justify-center mt-2">
          <p className="text-sm sm:text-base text-neutral-600 text-center">
            Código, Cultura e Curiosidades Tech
          </p>
        </div>
      </header>

      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-50 flex flex-col justify-center items-center p-8 overflow-y-auto">
          <button
            onClick={closeMenu}
            className="absolute top-4 right-4 flex flex-col justify-center items-center space-y-0 p-2 focus:outline-none focus:ring-2 focus:ring-black rounded z-60"
            aria-label="Close menu"
          >
            <span className="block w-6 h-0.5 bg-black rotate-45" />
            <span className="block w-6 h-0.5 bg-black -rotate-45" />
          </button>

          <nav className="flex flex-col space-y-8 text-center text-2xl font-medium mb-12">
            <Link
              href="/"
              onClick={closeMenu}
              className={`py-2 transition-colors text-black ${
                isActive("/")
                  ? "border-b-1 border-black w-32 mx-auto"
                  : "hover:text-gray-500 focus:text-gray-500"
              }`}
            >
              Home
            </Link>

            <Link
              href="/blog"
              onClick={closeMenu}
              className={`py-2 transition-colors text-black ${
                isActive("/blog")
                  ? "border-b-1 border-black w-32 mx-auto"
                  : "hover:text-gray-500 focus:text-gray-500"
              }`}
            >
              Blog
            </Link>

            <Link
              href="/sobre"
              onClick={closeMenu}
              className={`py-2 transition-colors text-black ${
                isActive("/sobre")
                  ? "border-b-1 border-black w-32 mx-auto"
                  : "hover:text-gray-500 focus:text-gray-500"
              }`}
            >
              Sobre
            </Link>
          </nav>

          <div className="flex flex-col items-center space-y-4 text-black">
            <SocialLinks />
          </div>
        </div>
      )}
    </>
  );
}
