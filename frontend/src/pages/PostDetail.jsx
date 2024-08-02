import { useDispatch, useSelector } from "react-redux";
import { fetchSinglePost } from "../features/postSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../UI/Loading";
import LeftSection from "../UI/LeftSection";
import SearchBar from "../UI/SearchBar";

const PostDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, post } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchSinglePost(id));
  }, [dispatch, id]);

  const date = new Date(post?.createdAt);
  const formattedDate = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <main className="flex gap-5 flex-col sm:flex-col md:flex-col lg:flex-row min-h-screen">
          <LeftSection post={post} formattedDate={formattedDate} />
          <section className="w-full sm:w-full md:w-full lg:w-1/3 xl:w-1/3 p-2">
            <SearchBar />
          </section>
        </main>
      )}
    </>
  );
};

export default PostDetail;
