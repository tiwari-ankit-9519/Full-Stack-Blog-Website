import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../features/postSlice";
import { useEffect, useState } from "react";
import Loading from "../UI/Loading";
import PostCard from "../UI/PostCard";
import showAlert from "../UI/Modal";
import Filters from "../UI/Filters";

const Home = () => {
  const dispatch = useDispatch();
  const { posts, loading, message } = useSelector((state) => state.posts);
  const [category, setCategory] = useState("all");
  useEffect(() => {
    dispatch(fetchPosts(category))
      .unwrap()
      .then(() => {
        if (message) {
          showAlert(message);
        }
      })
      .catch((error) => {
        showAlert(error);
      });
  }, [dispatch, message, category]);
  console.log(category);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1 className="text-white font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center mt-10">
            Welcome to Blogism. Blogging made special
          </h1>
          <Filters setCategory={setCategory} />
          <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-5 m-5 sm:m-5 md:m-8 lg:m-10 xl:m-10">
            {posts.length > 0 &&
              posts?.map((post) => (
                <PostCard
                  key={post?.id}
                  title={post?.title}
                  content={post?.content}
                  category={post?.category}
                  blogImages={post?.blogImages}
                  author={post?.user.name}
                  createdAt={post?.createdAt}
                  id={post?.id}
                />
              ))}
          </section>
        </>
      )}
    </>
  );
};

export default Home;
