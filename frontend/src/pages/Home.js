import BlogCard from "../components/BlogCard";
import RecentBlogPost from "../components/RecentBlogPost";

const Home = () => {
  return (
    <main className="min-h-[calc(100vh-5rem)] dark:text-white lg:mx-44 flex gap-5 flex-col p-5">
      <div className="border-t border-b py-5 border-gray-400">
        <h1 className="text-4xl lg:text-7xl font-bold text-center">The Blog</h1>
      </div>
      <RecentBlogPost />
      <BlogCard />
    </main>
  );
};

export default Home;
