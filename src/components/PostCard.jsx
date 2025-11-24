"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LikeButton from "./LikeButton";

const ThreeDotsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-neutral-400"
  >
    <circle cx="12" cy="12" r="1"></circle>
    <circle cx="19" cy="12" r="1"></circle>
    <circle cx="5" cy="12" r="1"></circle>
  </svg>
);

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-neutral-500"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

export default function PostCard({ post }) {
  const router = useRouter();
  const postId = post._id;

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleCardClick = () => {
    router.push(`/post/${post.slug.current}`);
  };

  if (!hasMounted) {
    return (
      <Link href={`/post/${post.slug.current}`} className="group">
        <article className="flex flex-col bg-white border border-neutral-900 h-full">
          <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-200 animate-pulse">
            {post.mainImage && (
              <Image
                src={post.mainImage}
                alt={`Imagem de capa para ${post.title}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
                className="opacity-0"
              />
            )}
          </div>
          <div className="flex flex-col p-5 flex-1">
            <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
              <div className="w-16 h-3 bg-neutral-200 rounded animate-pulse"></div>
              <span>•</span>
              <div className="w-12 h-3 bg-neutral-200 rounded animate-pulse"></div>
            </div>

            <div className="min-h-[7rem] mb-4">
              <div className="w-full h-5 bg-neutral-200 rounded mb-2 animate-pulse"></div>
              <div className="w-3/4 h-5 bg-neutral-200 rounded mb-4 animate-pulse"></div>
              <div className="w-full h-3 bg-neutral-200 rounded mb-1 animate-pulse"></div>
              <div className="w-11/12 h-3 bg-neutral-200 rounded animate-pulse"></div>
            </div>

            <div className="flex justify-between items-center mt-6 pt-4 border-t border-neutral-100">
              <div className="flex items-center gap-1 text-xs text-neutral-400">
                <UserIcon />
                <div className="w-16 h-3 bg-neutral-200 rounded animate-pulse"></div>
              </div>
              <button
                disabled
                className="flex items-center gap-1.5 opacity-50 cursor-not-allowed"
                aria-label="Carregando likes"
              >
                <span className="text-xs text-neutral-600 font-medium w-4 h-4 bg-neutral-200 rounded-full animate-pulse"></span>
                <span className="text-xs text-neutral-600 font-medium">
                  {post.totalLikes || 0}
                </span>
              </button>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <div className="group cursor-pointer" onClick={handleCardClick}>
      <article className="flex flex-col bg-white border border-neutral-900 h-full">
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          {post.mainImage && (
            <Image
              src={post.mainImage}
              alt={`Imagem de capa para ${post.title}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
              className="transition-transform duration-500 scale-100 group-hover:scale-105"
            />
          )}
        </div>

        <div className="flex flex-col p-5 flex-1">
          <div className="flex justify-between items-center text-xs text-neutral-500 mb-2">
            <span className="flex-shrink-0">
              {new Date(post.publishedAt).toLocaleDateString("pt-BR", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
            <span className="mx-1">•</span>
            <span className="flex-shrink-0">
              {post.readingTime} min de leitura
            </span>
            <button
              className="ml-auto p-1 -mr-1 focus:outline-none"
              aria-label="Mais opções"
              onClick={(e) => e.stopPropagation()}
            >
              <ThreeDotsIcon />
            </button>
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2 text-neutral-900 leading-tight line-clamp-3">
              {post.title}
            </h3>
            <p className="text-sm text-neutral-600 line-clamp-3">
              {post.subtitle ||
                post.excerpt ||
                "Crie um subtítulo que resuma de forma curta e atraente o seu post do blog para que seus visitantes queiram ler mais. Bem-vindo ao seu..."}
            </p>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tag/${tag}`}
                  className="bg-neutral-100 text-neutral-600 hover:bg-neutral-200 text-xs font-medium px-2 py-0.5 rounded-full transition-colors duration-200 whitespace-nowrap"
                  onClick={(e) => e.stopPropagation()}
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}

          <div className="flex justify-between items-center mt-6 pt-4 border-t border-neutral-100">
            <div className="flex items-center gap-1 text-xs text-neutral-400">
              <UserIcon />
              <span>{post.authorName || "Admin"}</span>
            </div>

            <LikeButton postId={post._id} initialLikes={post.totalLikes} />
          </div>
        </div>
      </article>
    </div>
  );
}
