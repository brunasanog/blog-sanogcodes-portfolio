import Link from "next/link";

export default function TagsCard({ tags = [] }) {
  if (tags.length === 0) return null;

  return (
    <div className="py-4 mb-8">
      <h3 className="text-sm uppercase font-bold tracking-wider mb-3 text-neutral-600">
        Tags Populares
      </h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link
            key={tag.slug}
            href={`/tag/${tag.slug}`}
            className="text-xs px-3 py-1 bg-neutral-200 text-neutral-700 rounded-full hover:bg-black hover:text-white transition-colors"
          >
            {tag.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
