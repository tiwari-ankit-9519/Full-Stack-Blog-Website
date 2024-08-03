import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getlatestPosts } from "../features/postSlice";
import { useNavigate } from "react-router-dom";

const GetLatestPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const latestPosts = useSelector((state) => state.posts.latestPosts);
  const loading = useSelector((state) => state.posts.loading);
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    if (latestPosts.length === 0) {
      dispatch(getlatestPosts());
    }
  }, [dispatch, latestPosts.length]);

  const handleClick = (id) => {
    navigate(`/posts/${id}`);
  };

  return (
    <section className="text-white">
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <div className="flex gap-5 flex-col">
        {latestPosts.map((blog) => {
          const date = new Date(blog.createdAt);
          const formattedDate = date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });
          return (
            <div
              key={blog.id}
              className="flex gap-2 bg-zinc-800 justify-between rounded cursor-pointer flex-col p-5"
              onClick={() => handleClick(blog.id)}
            >
              <img src={blog.blogImages[0]} alt="poster" className="h-30" />
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold mb-3">{blog.title}</h2>
                <p>
                  {blog.user.name} | {formattedDate}{" "}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default GetLatestPost;
