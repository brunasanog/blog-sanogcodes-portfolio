import { getFeaturedPost, getRecentPosts } from "@/lib/sanity.queries";
import RecentPosts from "@/components/RecentPosts";
import FeaturedPost from "@/components/FeaturedPost";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroBanner from "@/components/HeroBanner";

export default async function HomePage() {
  const featuredPost = await getFeaturedPost();
  const recentPostsData = await getRecentPosts();

  let finalFeaturedPost = featuredPost;
  let finalRecentPosts = recentPostsData;

  if (!finalFeaturedPost && recentPostsData.length > 0) {
    finalFeaturedPost = recentPostsData[0];
    finalRecentPosts = recentPostsData.slice(1);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col items-center bg-white text-black flex-grow">
        <HeroBanner />
        <FeaturedPost post={finalFeaturedPost} />
        <RecentPosts posts={finalRecentPosts} />
      </main>
      <Footer />
    </div>
  );
}
