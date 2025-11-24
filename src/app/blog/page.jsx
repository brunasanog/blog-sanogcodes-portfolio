import {
  getPosts,
  getTotalPostsCount,
  POSTS_PER_PAGE,
  getAllTags,
} from "@/lib/sanity.queries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";
import Link from "next/link";
import InstagramFeed from "@/components/InstagramFeed";
import AboutMeCard from "@/components/AboutMeCard";
import TagsCard from "@/components/TagsCard";

export default async function BlogPage({ searchParams }) {
  const currentPage = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const offset = (currentPage - 1) * POSTS_PER_PAGE;

  const [allPosts, totalPosts, allTagsComplete] = await Promise.all([
    getPosts(offset),
    getTotalPostsCount(),
    getAllTags(),
  ]);

  const popularTags = allTagsComplete.slice(0, 10);

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col items-center bg-neutral-50 text-black flex-grow">
        <section className="w-full py-12">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-6 border-b-2 border-neutral-800 pb-4">
              {" "}
              Postagens
            </h2>

            <div className="lg:hidden -mt-4 mb-8">
              {" "}
              <TagsCard tags={popularTags} />
            </div>

            <div className="lg:flex lg:space-x-8">
              <div className="lg:w-3/4">
                {allPosts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {allPosts.map((post) => (
                      <PostCard key={post.slug.current} post={post} />
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-lg text-neutral-600">
                    Nenhum post encontrado.
                  </p>
                )}

                <div className="flex justify-center items-center gap-1 mt-12 pt-6 border-t border-neutral-200">
                  <Link
                    href={hasPrevPage ? `/blog?page=${currentPage - 1}` : "#"}
                    className={`px-2 py-1 text-xs rounded-md transition-colors ${
                      hasPrevPage
                        ? "text-black hover:bg-neutral-200"
                        : "text-neutral-400 cursor-not-allowed"
                    }`}
                  >
                    &lt;
                  </Link>
                  {Array.from({ length: totalPages }, (_, i) => {
                    const pageNum = i + 1;
                    const isCurrent = pageNum === currentPage;
                    return (
                      <Link
                        key={pageNum}
                        href={`/blog?page=${pageNum}`}
                        className={`px-2 py-1 text-xs font-medium transition-colors ${
                          isCurrent
                            ? "text-black border-b-2 border-black"
                            : "text-neutral-500 hover:text-black hover:border-b-2 hover:border-neutral-500"
                        }`}
                      >
                        {pageNum}
                      </Link>
                    );
                  })}
                  <Link
                    href={hasNextPage ? `/blog?page=${currentPage + 1}` : "#"}
                    className={`px-2 py-1 text-xs rounded-md transition-colors ${
                      hasNextPage
                        ? "text-black hover:bg-neutral-200"
                        : "text-neutral-400 cursor-not-allowed"
                    }`}
                  >
                    &gt;
                  </Link>
                </div>
              </div>

              <aside className="lg:w-1/4 mt-12 lg:mt-0 lg:sticky lg:top-8 self-start">
                <div className="mb-8">
                  <AboutMeCard />
                </div>

                <div className="mb-8">
                  <InstagramFeed />
                </div>

                <div className="hidden lg:block">
                  <TagsCard tags={popularTags} />
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
