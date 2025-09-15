import React from "react";
import { ChangeEvent, useState } from "react";

import Button from "@components/layout/Button";

import { IoSearch } from "react-icons/io5";

function Search({ onClick }: { onClick: (keyword: string) => void }) {
  const [keyword, setKeyword] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <form className="w-1/2 flex items-center gap-1 text-caption">
      <input
        className="h-8 w-full rounded-button border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        type="text"
        placeholder="검색어를 입력하세요"
        value={keyword}
        onChange={handleChange}
      />
      <Button
        text={<IoSearch className="text-xl" />}
        textColor="black"
        bgColor="gray"
        width="10"
        height="8"
        onClick={() => onClick(keyword)}
      ></Button>
    </form>
  );
}

export default Search;
