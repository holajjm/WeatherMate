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
    <form className="flex w-full items-center gap-2">
      <p className="text-nowrap font-bold">검색하기</p>
      <input
        className="h-8 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
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
