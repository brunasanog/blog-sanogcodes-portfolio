"use client";

export default function ClearLikesButton() {
  // Função que limpa todos os likes do localStorage e recarrega a página
  const clearLikes = () => {
    if (typeof window !== "undefined") {
      Object.keys(localStorage)
        .filter((key) => key.startsWith("post-like-"))
        .forEach((key) => localStorage.removeItem(key));

      alert("LocalStorage de likes limpo! A página será recarregada.");
      window.location.reload();
    }
  };

  return (
    <button
      onClick={clearLikes}
      className="fixed bottom-4 right-4 bg-red-500 text-white px-3 py-1 rounded-md text-xs z-50"
      title="Limpar likes salvos (dev)"
    >
      Limpar Likes (Dev)
    </button>
  );
}
