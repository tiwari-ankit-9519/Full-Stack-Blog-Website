import image1 from "../assets/recent1.png";
import image2 from "../assets/recent2.png";
import image3 from "../assets/recent3.png";
import image4 from "../assets/recent4.png";

const RecentBlogPost = () => {
  return (
    <main className="dark:text-white border-b border-zinc-400">
      <h1 className="text-2xl font-semibold">RecentBlogPost</h1>
      <div className="flex flex-col lg:flex-row gap-5 mb-10">
        <div className="mt-5 w-full lg:w-1/2 flex flex-col gap-3">
          <img src={image1} alt="imag1" className="w-full" />
          <div className="flex gap-2 items-center text-[#6941C6]">
            <p className="font-medium">Olivia Rhye</p>
            <span className="font-bold -translate-y-[0.2rem]">.</span>
            <span className="font-medium">16 Aug 2024</span>
          </div>
          <div>
            <h1 className="text-[#1A1A1A] dark:text-white font-bold text-2xl lg:text-4xl">
              UX review presentation
            </h1>
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
        <div className="flex flex-col gap-5 mt-5 w-full lg:w-1/2 h-[472.45px]">
          <div className="flex h-1/2">
            <img src={image2} alt="imag1" className="h-full w-1/2" />
            <div className="flex flex-col px-7 justify-between">
              <div className="flex gap-2 items-center text-[#6941C6]">
                <p className="font-medium">Olivia Rhye</p>
                <span className="font-bold -translate-y-[0.2rem]">.</span>
                <span className="font-medium">16 Aug 2024</span>
              </div>
              <h1 className="text-[#1A1A1A] dark:text-white font-bold text-lg lg:text-xl">
                UX review presentation
              </h1>
              <p className="text-justify">
                How do you create compelling presentations that wow your
                colleagues and impress your managers?
              </p>
              <p className="flex gap-2">
                <span className="text-[#6941C6] rounded-full bg-purple-100 px-3">
                  Design
                </span>
                <span className="text-blue-700 rounded-full bg-blue-100 px-3">
                  Research
                </span>
                <span className="text-red-400 rounded-full bg-red-100 px-3">
                  Presentation
                </span>
              </p>
            </div>
          </div>
          <div className="flex h-1/2">
            <img src={image3} alt="imag1" className="h-full w-1/2" />
            <div className="flex flex-col px-7 justify-between">
              <div className="flex gap-2 items-center text-[#6941C6]">
                <p className="font-medium">Olivia Rhye</p>
                <span className="font-bold -translate-y-[0.2rem]">.</span>
                <span className="font-medium">16 Aug 2024</span>
              </div>
              <h1 className="text-[#1A1A1A] dark:text-white font-bold text-lg lg:text-xl">
                UX review presentation
              </h1>
              <p className="text-justify">
                How do you create compelling presentations that wow your
                colleagues and impress your managers?
              </p>
              <p className="flex gap-2">
                <span className="text-[#6941C6] rounded-full bg-purple-100 px-3">
                  Design
                </span>
                <span className="text-blue-700 rounded-full bg-blue-100 px-3">
                  Research
                </span>
                <span className="text-red-400 rounded-full bg-red-100 px-3">
                  Presentation
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-10 flex">
        <img src={image4} alt="" className="w-1/2" />
        <div className="flex">
          <div className="flex flex-col px-7 justify-between">
            <div className="flex gap-2 items-center text-[#6941C6]">
              <p className="font-medium">Olivia Rhye</p>
              <span className="font-bold -translate-y-[0.2rem]">.</span>
              <span className="font-medium">16 Aug 2024</span>
            </div>
            <h1 className="text-[#1A1A1A] dark:text-white font-bold text-lg lg:text-3xl">
              UX review presentation
            </h1>
            <p className="text-justify">
              A grid system is a design tool used to arrange content on a
              webpage. It is a series of vertical and horizontal lines that
              create a matrix of intersecting points, which can be used to align
              and organize page elements. Grid systems are used to create a
              consistent look and feel across a website, and can help to make
              the layout more visually appealing and easier to navigate.
            </p>
            <p className="flex gap-2">
              <span className="text-[#6941C6] rounded-full bg-purple-100 px-3">
                Design
              </span>
              <span className="text-blue-700 rounded-full bg-blue-100 px-3">
                Research
              </span>
              <span className="text-red-400 rounded-full bg-red-100 px-3">
                Presentation
              </span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RecentBlogPost;
