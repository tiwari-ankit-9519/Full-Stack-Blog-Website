import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../features/postSlice";
import showAlert from "../UI/Modal";
import Loading from "../UI/Loading";
import { IconCloudUpload } from "@tabler/icons-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const CreateBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.posts);

  useGSAP(() => {
    gsap.to("#icon", {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.5,
      ease: "none",
    });

    gsap.fromTo(
      "#form-data",
      {
        opacity: 0,
        x: 2000,
        overflow: "hidden",
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power1.inOut",
        overflow: "hidden",
      }
    );
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    blogImages: [],
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevData) => ({ ...prevData, blogImages: files }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);
    data.append("category", formData.category);

    formData.blogImages.forEach((file) => {
      data.append(`blogImages`, file);
    });

    dispatch(createPost(data))
      .unwrap()
      .then((data) => {
        console.log("Post ID:", data.id);
        showAlert("Blog created successfully!", "success");
        setTimeout(() => {
          navigate(`/posts/${data.id}`);
        }, 2000);
      })
      .catch((error) => {
        showAlert(error.message, "error");
      });
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section
          className="flex justify-center items-center min-h-screen overflow-hidden"
          id="form-data"
        >
          <div className="flex flex-col text-white font-roboto gap-10 mx-5 justify-center items-center overflow-hidden">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
              Looks like you are ready to Write
            </h1>
            <form
              onSubmit={handleFormSubmit}
              className="flex flex-col gap-5 bg-gray-600/50 px-10 py-10 rounded-md w-full sm:w-full md:w-full lg:w-2/3 xl:w-2/3"
            >
              <div className="flex flex-col gap-2">
                <label className="font-medium text-xl">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  className="px-4 py-2 focus:outline-none border border-zinc-500 rounded bg-zinc-800/50"
                  placeholder="Enter the title"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-xl">Content</label>
                <textarea
                  name="content"
                  value={formData.content}
                  id=""
                  className="px-4 py-2 focus:outline-none border border-zinc-500 rounded bg-zinc-800/50"
                  placeholder="Enter the content"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-xl">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  id=""
                  className="px-4 py-2 focus:outline-none border border-zinc-500 rounded bg-zinc-800/50"
                  placeholder="Enter the catrgory"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-xl">Blog Images</label>
                <input
                  type="file"
                  name="blogImages"
                  id="blogImages"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="blogImages"
                  className="flex gap-2 items-center justify-center px-4 py-2 font-medium rounded-md bg-blue-600 hover:bg-blue-700 transition-all h-14 cursor-pointer"
                >
                  <IconCloudUpload id="icon" />
                  Upload Images
                </label>
              </div>
              <button className="bg-green-600 px-4 py-2 font-medium rounded-md hover:bg-green-700 transition-all h-14">
                Create Blog
              </button>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default CreateBlog;
