import image1 from "../assets/recent1.png";
import image2 from "../assets/recent2.png";
import image3 from "../assets/recent3.png";
import image4 from "../assets/recent4.png";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

const RecentBlogPost = () => {
  return (
    <main className="dark:text-white border-b border-zinc-400">
      <h1 className="text-2xl font-semibold">Recent Blog Posts</h1>
      <div className="flex flex-col lg:flex-row gap-5 mb-10">
        <div className="mt-5 w-full lg:w-1/2 flex flex-col gap-3">
          <img src={image1} alt="imag1" className="w-full object-cover" />
          <div className="flex gap-2 items-center text-[#6941C6]">
            <p className="font-medium">Olivia Rhye</p>
            <span className="font-bold -translate-y-[0.2rem]">.</span>
            <span className="font-medium">16 Aug 2024</span>
          </div>
          <div className="flex justify-between">
            <h1 className="text-[#1A1A1A] dark:text-white font-bold text-2xl lg:text-4xl">
              UX review presentation
            </h1>
            <ArrowUpRightIcon className="w-7 h-7 cursor-pointer" />
          </div>
          <p className="text-justify">
            How do you create compelling presentations that wow your colleagues
            and impress your managers?
          </p>
          <p className="flex gap-2">
            <span className="text-[#6941C6] text-sm  rounded-full bg-purple-100 px-3">
              Design
            </span>
            <span className="text-blue-700 text-sm rounded-full bg-blue-100 px-3">
              Research
            </span>
            <span className="text-red-400 text-sm rounded-full bg-red-100 px-3">
              Presentation
            </span>
          </p>
        </div>
        <div className="flex flex-col mt-5 justify-between w-full lg:w-1/2 gap-5">
          <div className="flex flex-col md:flex-row gap-5 h-1/2">
            <div className="w-full lg:w-1/2">
              <img
                src={image2}
                alt="image2"
                className="object-cover h-full w-full"
              />
            </div>
            <div className="flex flex-col gap-5 w-full lg:w-1/2">
              <div className="flex text-[#6941C6]">
                <p className="font-medium">Phoenix Baker</p>
                <span className="font-bold -translate-y-[0.2rem]">.</span>
                <span className="font-medium">16 Aug 2024</span>
              </div>
              <h1 className="text-[#1A1A1A] dark:text-white font-bold text-xl">
                Migrating to Linear 101
              </h1>
              <p className="text-justify">
                Linear helps streamline software projects, sprints, tasks, and
                bug tracking. Here’s how to get...
              </p>
              <p className="flex gap-2">
                <span className="text-[#6941C6] text-sm  rounded-full bg-purple-100 px-3">
                  Design
                </span>
                <span className="text-blue-700 text-sm rounded-full bg-blue-100 px-3">
                  Research
                </span>
                <span className="text-red-400 text-sm rounded-full bg-red-100 px-3">
                  Presentation
                </span>
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-5 h-1/2">
            <div className="w-full lg:w-1/2">
              <img
                src={image3}
                alt="image2"
                className="object-cover h-full w-full"
              />
            </div>
            <div className="flex flex-col gap-5 w-full lg:w-1/2">
              <div className="flex text-[#6941C6]">
                <p className="font-medium">Lana Steiner</p>
                <span className="font-bold -translate-y-[0.2rem]">.</span>
                <span className="font-medium">16 Aug 2024</span>
              </div>
              <h1 className="text-[#1A1A1A] dark:text-white font-bold text-xl">
                Building your API Stack
              </h1>
              <p className="text-justify">
                The rise of RESTful APIs has been met by a rise in tools for
                creating, testing, and manag...
              </p>
              <p className="flex gap-2">
                <span className="text-[#6941C6] text-sm  rounded-full bg-purple-100 px-3">
                  Design
                </span>
                <span className="text-blue-700 text-sm rounded-full bg-blue-100 px-3">
                  Research
                </span>
                <span className="text-red-400 text-sm rounded-full bg-red-100 px-3">
                  Presentation
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-10 flex flex-col md:flex-row gap-5 mt-5">
        <img src={image4} alt="image4" className="md:w-1/2" />
        <div className="w-full md:w-1/2 flex flex-col gap-5">
          <div className="flex text-[#6941C6]">
            <p className="font-medium">Olivia Rhye</p>
            <span className="font-bold -translate-y-[0.2rem]">.</span>
            <span className="font-medium">16 Aug 2024</span>
          </div>
          <h1 className="text-[#1A1A1A] dark:text-white font-bold text-xl">
            Grid System for Better Design User Interface
          </h1>
          <p className="text-justify">
            A grid system is a design tool used to arrange content on a webpage.
            It is a series of vertical and horizontal lines that create a matrix
            of intersecting points, which can be used to align and organize page
            elements. Grid systems are used to create a consistent look and feel
            across a website, and can help to make the layout more visually
            appealing and easier to navigate.
          </p>
          <p className="flex gap-2">
            <span className="text-[#6941C6] text-sm  rounded-full bg-purple-100 px-3">
              Design
            </span>
            <span className="text-blue-700 text-sm rounded-full bg-blue-100 px-3">
              Research
            </span>
            <span className="text-red-400 text-sm rounded-full bg-red-100 px-3">
              Presentation
            </span>
          </p>
        </div>
      </div>
    </main>
  );
};

export default RecentBlogPost;
