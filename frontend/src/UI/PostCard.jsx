/* eslint-disable react/prop-types */
import { IconArrowRight } from "@tabler/icons-react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

const PostCard = ({ title, category, blogImages, author, createdAt, id }) => {
  const navigate = useNavigate();
  const date = new Date(createdAt);
  const formattedDate = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleMouseEnter = () => {
    gsap.to(`#post-${id}`, {
      scale: 1.2,
      duration: 0.2,
      ease: "power3.inOut",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(`#post-${id}`, {
      scale: 1,
      duration: 0.2,
      ease: "power3.inOut",
    });
  };

  const handleClick = (id) => {
    navigate(`/posts/${id}`);
  };

  return (
    <main className="flex flex-col items-center justify-center rounded-md font-roboto">
      <img
        src={blogImages[0]}
        alt="poster"
        className="w-full h-60 rounded-tl-md rounded-tr-md"
      />
      <div className="text-black bg-white flex flex-col gap-2 px-5 rounded-bl-md rounded-br-md w-full h-40 ">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-gray-600 font-medium">
          {category.map((c) => c.name)}
        </p>
        <div className="text-gray-400 flex justify-between items-center">
          {author} | {formattedDate}
          <div
            className="flex rounded-full bg-blue-500 items-center justify-center p-2 h-12 w-12 cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(id)}
            id={`post-${id}`}
          >
            <IconArrowRight className="w-12 h-12 text-white" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default PostCard;
