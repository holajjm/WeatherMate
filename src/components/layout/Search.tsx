import React from "react";
import { ChangeEvent, useState } from "react";

import { IoSearch } from "react-icons/io5";
import Button from "./Button";

function Search({ onClick }: { onClick: (keyword: string) => void }) {
  const [keyword, setKeyword] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <form className="w-full flex items-center gap-2">
      <p className="text-nowrap font-bold">검색하기</p>
      <input
        className="w-full p-2 h-8 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        type="text"
        value={keyword}
        onChange={handleChange}
      />
      <Button
        text={<IoSearch className="text-xl" />}
        textColor="black"
        bgColor="gray"
        width="1/6"
        onClick={() => onClick(keyword)}
      ></Button>
    </form>
  );
}

export default Search;
