import { getPostsByTag, getAllTags } from "@/lib/sanity.queries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";
import Link from "next/link";
import TagsCard from "@/components/TagsCard";
import { ChevronLeft } from "lucide-react";

export async function generateStaticParams() {
  const tags = await getAllTags();

  return tags.map((tag) => ({
    tag: tag.slug,
  }));
}

export default async function TagPage({ params }) {
  const tagSlug = params.tag.trim();

  const [posts, allTags] = await Promise.all([
    getPostsByTag(tagSlug),
    getAllTags(),
  ]);

  const sortedTags = allTags.sort((a, b) => a.name.localeCompare(b.name));

  const formattedTitle = tagSlug.replace(/-/g, " ");
  const pageTitle = `Tag: ${formattedTitle}`;
  const totalPosts = posts?.length || 0;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex flex-col items-center bg-neutral-50 text-black flex-grow">
        <section className="w-full py-12">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            {/* Seta de Voltar */}
            <div className="mb-4">
              <Link
                href="/blog"
                className="flex items-center text-sm text-neutral-600 hover:text-black transition-colors"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Voltar para Postagens
              </Link>
            </div>

            {/* Título da Seção */}
            <h2 className="text-3xl font-bold mb-6 border-b-2 border-neutral-800 pb-4 capitalize">
              {pageTitle} ({totalPosts})
            </h2>

            {/* Bloco de Tags: Passa TODAS as tags (sortedTags) para o TagsCard */}
            <div className="mb-10">
              <TagsCard tags={sortedTags} />
            </div>

            {/* Renderização Condicional dos Posts */}
            {totalPosts > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            ) : (
              <p className="text-center text-lg text-neutral-600">
                Nenhum post encontrado com a tag "{formattedTitle}".
              </p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
