import Image from "next/image";
import Link from "next/link";

//Variáveis
const SANITY_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET;
const INSTAGRAM_HANDLE_ENV = process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE;

// Ícone do Instagram
const InstagramIcon = () => (
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
    className="text-neutral-900"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 0 1 12.63 8 4 4 0 0 1 8 11.37A4 4 0 0 1 11.37 16 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);

const InstagramPosts = [
  {
    id: 1,
    imageUrl: `https://cdn.sanity.io/images/${SANITY_ID}/${SANITY_DATASET}/165b8ff9ce3485e9c263a624b9f6e6271fcc5719-300x400.png`,
    link: "https://www.instagram.com/p/C4fz-epr6Hw/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    id: 2,
    imageUrl: `https://cdn.sanity.io/images/${SANITY_ID}/${SANITY_DATASET}/4b44c872d0e68c8f9d05857d1ce748802763bd33-300x400.png`,
    link: "https://www.instagram.com/p/DOym1ZPEcr6/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    id: 3,
    imageUrl: `https://cdn.sanity.io/images/${SANITY_ID}/${SANITY_DATASET}/827c1713f517dbc1d087964edba81c66ab3b46bc-300x400.png`,
    link: "https://www.instagram.com/reel/DO8n3GyEQvl/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    id: 4,
    imageUrl: `https://cdn.sanity.io/images/${SANITY_ID}/${SANITY_DATASET}/459e118a45502f71b375eab5427b8e6aa6c762d6-300x400.png`,
    link: "https://www.instagram.com/p/DNV9sIwxMl3/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    id: 5,
    imageUrl: `https://cdn.sanity.io/images/${SANITY_ID}/${SANITY_DATASET}/719aab176f0fef6e52efe7ae1292965313771aac-300x400.png`,
    link: "https://www.instagram.com/p/C37zc95rEAb/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    id: 6,
    imageUrl: `https://cdn.sanity.io/images/${SANITY_ID}/${SANITY_DATASET}/8f2e0f83f76002d8e1b8afd1f12946ed79eba298-300x400.png`,
    link: "https://www.instagram.com/p/DABmqKPJSrt/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
];

export default function InstagramFeed() {
  const INSTAGRAM_USERNAME = `@${INSTAGRAM_HANDLE_ENV}`;
  const INSTAGRAM_PROFILE_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE_ENV}`;

  return (
    <div className="p-4 bg-white border border-neutral-900">
      {/* Título e link para o perfil */}
      <h3 className="text-base font-semibold mb-4 border-b pb-2 flex items-center gap-2">
        <InstagramIcon />
        Instagram /{" "}
        <Link
          href={INSTAGRAM_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-neutral-900"
        >
          {INSTAGRAM_USERNAME}
        </Link>
      </h3>

      <div className="grid grid-cols-2 gap-2">
        {InstagramPosts.map((post) => (
          <Link
            key={post.id}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block aspect-[3/4] relative overflow-hidden group"
          >
            <Image
              src={post.imageUrl}
              alt={`Post do Instagram ${post.id}`}
              fill
              sizes="(max-width: 1024px) 50vw, 150px"
              style={{ objectFit: "cover" }}
              className="transition-transform duration-300 group-hover:scale-105"
              unoptimized
            />

            {post.link.includes("video") && (
              <div className="absolute top-1 right-1 bg-black bg-opacity-50 p-1 rounded-full">
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.26a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                </svg>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
