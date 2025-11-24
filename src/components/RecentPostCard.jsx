import Link from "next/link";
import Image from "next/image";

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

export default function RecentPostCard({ post }) {
  if (!post || !post.slug) {
    return null;
  }

  return (
    <Link href={`/post/${post.slug.current}`} className="group">
      <article className="flex flex-col bg-white border border-neutral-900 h-full">
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          {post.mainImage && (
            <Image
              src={post.mainImage}
              alt={`Imagem de capa para ${post.title}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
              className="transition-transform duration-500 scale-100 group-hover:scale-105"
            />
          )}
        </div>

        <div className="flex flex-col p-4 flex-1">
          <div className="flex justify-between items-center text-xs text-neutral-500 mb-3">
            {/* Lado esquerdo: Apenas a data */}
            <span className="flex-shrink-0">
              {new Date(post.publishedAt).toLocaleDateString("pt-BR", {
                day: "numeric",
                month: "short",
              })}
            </span>

            <div className="flex items-center gap-1 min-w-0">
              <UserIcon />
              <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                {post.authorName || "Admin"}
              </span>
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-base font-bold mb-1 text-neutral-900 leading-tight group-hover:underline">
              {post.title}
            </h3>
            <p className="text-xs text-neutral-600 line-clamp-2">
              {post.subtitle ||
                post.excerpt ||
                post.contentPreview ||
                "Clique para ler mais..."}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
}
