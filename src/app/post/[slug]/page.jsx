import { client, urlFor } from "@/lib/sanity";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NavigationButtons from "@/components/NavigationButtons";
import RecentPosts from "@/components/RecentPosts";
import { getRecentPosts } from "@/lib/sanity.queries";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Link from "next/link";

async function getPost(slug) {
  const query = `
    *[_type == "post" && slug.current == "${slug}"][0] {
      title,
      "slug": slug.current,
      publishedAt,
      "imageUrl": mainImage.asset->url,
      body,
      tags
    }
  `;
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  if (!data) {
    notFound();
  }
  return data;
}

export async function generateStaticParams() {
  const query = `*[_type == "post"] {
    "slug": slug.current,
  }`;
  const data = await client.fetch(query);
  return data;
}

const components = {
  block: {
    h1: ({ children }) => (
      <h1
        className="text-4xl md:text-5xl font-extrabold mb-6 border-b pb-2 border-gray-300 text-black"
        style={{ marginTop: "6rem" }}
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        className="text-3xl md:text-4xl font-bold mb-5 text-neutral-900"
        style={{ marginTop: "4rem" }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className="text-2xl md:text-3xl font-semibold mb-4 text-neutral-1000"
        style={{ marginTop: "4rem" }}
      >
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p
        className="text-left text-neutral-800"
        style={{
          fontSize: "1.125rem",
          lineHeight: "1.625",
          marginBottom: "2rem",
          whiteSpace: "pre-wrap",
        }}
      >
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote
        className="border-l-4 border-gray-500 bg-gray-100 p-4 my-8 italic text-lg text-neutral-700"
        style={{ fontSize: "1.25rem", lineHeight: "1.75" }}
      >
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul
        className="list-disc ml-6 mb-6 leading-relaxed"
        style={{ fontSize: "1.125rem", lineHeight: "1.625" }}
      >
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol
        className="list-decimal ml-6 mb-6 leading-relaxed"
        style={{ fontSize: "1.125rem", lineHeight: "1.625" }}
      >
        {children}
      </ol>
    ),
  },
  listItem: {
    normal: ({ children }) => (
      <li
        style={{
          fontSize: "1.125rem",
          lineHeight: "1.625",
          marginBottom: "1.5rem",
        }}
      >
        {children}
      </li>
    ),
  },
  marks: {
    highlight: ({ children }) => (
      <span className="bg-pink-200 px-1 rounded">{children}</span>
    ),
    code: ({ children }) => (
      <code className="bg-gray-800 text-white px-1 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const target = (value?.href || "").startsWith("http")
        ? "_blank"
        : undefined;
      return (
        <a
          href={value.href}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          className="text-blue-900 underline hover:text-indigo-900"
        >
          {children}
        </a>
      );
    },
    hashtag: ({ children }) => (
      <span className="text-gray-500 text-base">{children}</span>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }

      const imageUrl = urlFor(value).url();
      const width = value.asset?.metadata?.dimensions?.width || 800;
      const height = value.asset?.metadata?.dimensions?.height || 600;

      return (
        <figure className="my-8 mx-auto max-w-3xl">
          <div className="relative w-full h-auto">
            <Image
              src={imageUrl}
              alt={value.alt || "Imagem no post"}
              width={width}
              height={height}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 800px"
              className="block w-full h-auto shadow-md"
              priority
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-gray-600 mt-3 italic px-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    codeBlock: ({ value }) => {
      const languageDisplay = value.language
        ? value.language.charAt(0).toUpperCase() + value.language.slice(1)
        : "Código";

      const headerText = [value.filename, languageDisplay]
        .filter(Boolean)
        .join(" • ");

      return (
        <div className="my-8 overflow-hidden shadow-xl rounded-lg">
          {headerText && (
            <p className="bg-neutral-800 text-white text-sm px-4 py-2 font-mono">
              {headerText}
            </p>
          )}
          <SyntaxHighlighter
            language={value.language || "text"}
            style={vscDarkPlus}
            showLineNumbers={value.withLineNumbers || false}
            customStyle={{
              padding: "1.5em",
              margin: 0,
              fontSize: "1rem",
              lineHeight: "1.5",
            }}
          >
            {value.code}
          </SyntaxHighlighter>
        </div>
      );
    },
    spaceBlock: ({ value }) => {
      const size = value.size || "medium";
      const spaceSizes = {
        small: "1.5rem",
        medium: "3rem",
        large: "5rem",
        xl: "8rem",
      };
      return <div style={{ marginTop: spaceSizes[size] }} />;
    },
  },
};

export default async function PostPage({ params }) {
  const post = await getPost(params.slug);
  const allRecentPosts = await getRecentPosts();
  const recentPosts = allRecentPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex min-h-screen flex-col items-center p-4 sm:p-10 bg-neutral-50 text-black relative">
        <div className="w-full max-w-5xl">
          <NavigationButtons />

          <div className="bg-white p-6 md:p-12 border border-black shadow-lg">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-sm sm:text-base text-gray-500 mb-4">
              Publicado em{" "}
              <span className="font-semibold">
                {new Date(post.publishedAt).toLocaleDateString("pt-BR")}
              </span>
            </p>

            {post.tags && post.tags.length > 0 && (
              <div className="mb-8 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tag/${tag}`}
                    className="bg-neutral-100 text-neutral-600 hover:bg-neutral-200 text-xs font-medium px-3 py-1 rounded-full transition-colors duration-200 whitespace-nowrap border border-neutral-300"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}

            {post.imageUrl && (
              <div className="w-full h-auto relative mb-12">
                <Image
                  src={post.imageUrl}
                  alt={`Imagem principal para ${post.title}`}
                  width={post.asset?.metadata?.dimensions?.width || 800}
                  height={post.asset?.metadata?.dimensions?.height || 600}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 800px"
                  className="block w-full h-auto shadow-md"
                  priority
                />
              </div>
            )}

            <article className="mt-7">
              <div className="w-full max-w-none text-black">
                <PortableText value={post.body} components={components} />
              </div>
            </article>
          </div>
        </div>

        {recentPosts.length > 0 && <RecentPosts posts={recentPosts} />}
      </main>
      <Footer />
    </div>
  );
}
