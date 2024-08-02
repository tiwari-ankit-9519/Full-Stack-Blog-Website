/* eslint-disable react/prop-types */

const LeftSection = ({ post, formattedDate }) => {
  const paragraphs = post?.content.split("\n\n") || [];
  const blogImages = post?.blogImages || [];

  return (
    <section className="text-white px-5 sm:px-5 md:px-5 lg:px-16 w-full sm:w-full md:w-full lg:w-2/3 font-roboto my-10">
      <h1 className="mt-10 mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-justify font-bold">
        {post?.title}
      </h1>
      <div className="flex flex-col gap-4">
        <p className="text-lg font-medium">
          {post?.category.map((c) => c.name).join(", ")}
        </p>
        <div className="text-gray-400 flex gap-2 items-center text-lg font-medium">
          <img
            src={post?.user?.profileImage}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          {post?.user.name} | {formattedDate}
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-5">
        {blogImages[0] && (
          <img src={blogImages[0]} alt="blogImage-0" className="mb-5" />
        )}
        {paragraphs.map((paragraph, index) => (
          <div key={index} className="flex flex-col gap-5">
            <p className="text-xl font-medium text-justify">{paragraph}</p>
            {blogImages[index + 1] && (
              <img src={blogImages[index + 1]} alt={`blogImage-${index + 1}`} />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default LeftSection;
