/* eslint-disable react/prop-types */
import { useState } from "react";
import { IconArrowDown } from "@tabler/icons-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const blogCategories = [
  "All",
  "Technology",
  "Travel",
  "Food & Recipes",
  "Lifestyle",
  "Business",
  "DIY & Crafts",
  "Gaming",
  "Entertainment",
  "Photography",
  "Pets & Animals",
  "Arts & Culture",
  "Sports",
];

const Filters = ({ setCategory }) => {
  const [showFilter, setShowFilter] = useState(false);

  useGSAP(() => {
    if (showFilter) {
      gsap.to("#arrow", { rotation: 180, duration: 0.4 });
    } else {
      gsap.to("#arrow", { rotation: 0, duration: 0.4 });
    }

    gsap.fromTo(
      "#filters",
      {
        y: -200,
        opacity: 0,
      },
      {
        y: 0,
        duration: 1,
        opacity: 1,
        stagger: {
          amount: 0.2,
        },
      }
    );
  }, [showFilter]);

  return (
    <>
      <h1
        className="text-white mx-5 sm:mx-5 md:mx-8 lg:mx-10 xl:mx-10 text-3xl font-semibold flex gap-2 items-center cursor-pointer mt-5"
        onClick={() => setShowFilter(!showFilter)}
      >
        Filters
        <IconArrowDown id="arrow" />
      </h1>
      {showFilter && (
        <div
          className="grid grid-cols-12 gap-4 items-center mt-5 mx-5 sm:mx-5 md:mx-8 lg:mx-10 xl:mx-10"
          id="filters"
        >
          {blogCategories.map((category) => (
            <button
              key={category}
              onClick={() => setCategory(category.toLowerCase())}
              className="text-white font-medium bg-blue-500 px-2 py-1 h-10 text-center rounded-2xl hover:scale-[1.1] transition-all flex items-center justify-center"
            >
              {category}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default Filters;
