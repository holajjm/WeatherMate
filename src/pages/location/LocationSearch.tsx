import React, { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";

import Location from "./Location";
import { FaSearch } from "react-icons/fa";

// 장소추천 자식 컴포넌트 (검색 | 보여주기)
function LocationSearch() {
  const [keyword, setKeyword] = useState("");

  // useDebounce 훅을 사용하여 입력값에 대한 디바운스 처리
  const debouncedKeyword = useDebounce(keyword, 2000);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="mt-4 px-8 flex justify-end items-center w-1/2 ml-auto min-w-[220px]">
        <form onSubmit={handleSubmit} className="relative w-full">
          <input
            className="w-full h-10 font-bold px-2 border rounded-md dark:bg-gray-700 border-gray-300 focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-slate-500"
            placeholder="지역,장소 검색"
            type="text"
            value={keyword}
            onChange={handleChange}
          />
          <button type="submit" className="absolute right-2 top-3 ">
            <FaSearch className="text-slate-300 focus:outline-none hover:scale-125 transition-all duration-500" />
          </button>
        </form>
      </div>
      <Location />
    </div>
  );
}

export default LocationSearch;
