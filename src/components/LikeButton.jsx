"use client";

import { useState, useEffect } from "react";

const HeartIcon = ({ isLiked }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    className={`
      ${isLiked ? "text-red-500 fill-red-500" : "text-neutral-500 fill-none"}
      transition-all duration-300 ease-out
      transform group-hover:scale-110 
    `}
    stroke={isLiked ? "#ef4444" : "currentColor"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

export default function LikeButton({ postId, initialLikes }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes || 0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedIsLiked = localStorage.getItem(`post-is-liked-${postId}`);
      if (savedIsLiked === "true") {
        setIsLiked(true);
      }
    }

    setLikeCount(initialLikes || 0);
  }, [postId, initialLikes]);

  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLoading) return;

    const action = isLiked ? "unlike" : "like";
    const newIsLiked = !isLiked;

    const previousIsLiked = isLiked;
    const previousLikeCount = likeCount;

    setIsLiked(newIsLiked);
    setLikeCount((prev) => Math.max(0, prev + (newIsLiked ? 1 : -1)));
    localStorage.setItem(
      `post-is-liked-${postId}`,
      newIsLiked ? "true" : "false"
    );
    setIsLoading(true);

    try {
      const response = await fetch("/api/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, action }),
      });

      if (!response.ok) throw new Error(`Falha na API: ${response.status}`);

      const data = await response.json();

      setLikeCount(data.totalLikes);
    } catch (error) {
      console.error("Erro no Like:", error);

      alert("Não foi possível registrar sua curtida. Verifique sua conexão.");
      setIsLiked(previousIsLiked);
      setLikeCount(previousLikeCount);
      localStorage.setItem(
        `post-is-liked-${postId}`,
        previousIsLiked ? "true" : "false"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={isLoading}
      className={`
        flex items-center gap-1.5 focus:outline-none 
        group 
        transition-transform duration-300
        ${
          isLoading
            ? "opacity-100 cursor-pointer"
            : "hover:scale-105 cursor-pointer"
        } 
      `}
      aria-label={isLiked ? "Descurtir post" : "Curtir post"}
    >
      <HeartIcon isLiked={isLiked} />
      <span className="text-xs text-neutral-600 font-medium transition-colors duration-300">
        {likeCount}
      </span>
    </button>
  );
}
