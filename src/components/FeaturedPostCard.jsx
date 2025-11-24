import Link from "next/link";
import Image from "next/image";

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

export default function FeaturedPostCard({ post }) {
  return (
    <Link href={`/post/${post.slug.current}`} className="group">
      <article className="flex flex-col md:flex-row items-stretch bg-white border border-neutral-900 h-full">
        <div className="relative w-full md:w-5/12 h-64 flex-shrink-0 overflow-hidden">
          {post.mainImage && (
            <Image
              src={post.mainImage}
              alt={`Imagem de capa para ${post.title}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
              priority
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
              {post.readingTime || 1} min de leitura{" "}
            </span>
            <button
              className="ml-auto p-1 -mr-1 focus:outline-none"
              aria-label="Mais opções"
            >
              <ThreeDotsIcon />
            </button>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2 text-neutral-900 leading-tight">
              {post.title}
            </h3>
            <p className="text-sm text-neutral-600 line-clamp-3">
              {post.subtitle ||
                post.contentPreview ||
                post.excerpt ||
                "Crie um subtítulo que resuma de forma curta e atraente o seu post do blog para que seus visitantes queiram ler mais. Bem-vindo ao seu..."}
            </p>
          </div>

          <div className="flex justify-between items-center mt-6 pt-4 border-t border-neutral-100">
            <div className="flex items-center gap-1 text-xs text-neutral-400">
              <UserIcon />
              <span>{post.authorName || "Admin"}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
