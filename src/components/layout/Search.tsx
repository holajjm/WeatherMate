import React from "react";
import { ChangeEvent, useState } from "react";

import { IoSearch } from "react-icons/io5";

type ClickFn = (keyword: string) => void;

function Search(onClick: ClickFn) {
  const [keyword, setKeyword] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <form className="w-full flex items-center gap-2">
      <p className="text-nowrap font-bold text-xl font-SSRONETHandwritten">
        검색하기
      </p>
      <input
        className="w-full p-2 h-8 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        type="text"
        value={keyword}
        onChange={handleChange}
      />
      <button
        className="bg-slate-500 w-1/6 rounded-md p-1 flex justify-center items-center"
        onClick={e => {
          e.preventDefault();
          onClick(keyword);
        }}
      >
        <IoSearch className="text-2xl" />
      </button>
    </form>
  );
}

export default Search;
