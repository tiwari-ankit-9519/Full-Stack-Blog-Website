import { useState, useEffect } from "react";
import { IconSearch } from "@tabler/icons-react";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState(input);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(input);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [input]);

  useEffect(() => {
    if (debouncedInput) {
      console.log("Send request to backend with query:", debouncedInput);
    }
  }, [debouncedInput]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="flex justify-center">
      <div className="relative flex justify-center items-center w-full">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Search for blogs"
          className="px-4 py-3 pl-10 focus:outline-none border-zinc-500 rounded w-full my-10 font-roboto"
        />
        <IconSearch className="absolute left-3 text-black" />
      </div>
    </div>
  );
};

export default SearchBar;
