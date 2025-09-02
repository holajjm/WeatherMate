import React, { useState } from "react";

import { useDebounce } from "@hooks/useDebounce";
import Location from "@pages/location/Location";

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
      <div className="ml-auto mt-4 flex w-1/2 min-w-[220px] items-center justify-end px-8">
        <form onSubmit={handleSubmit} className="relative w-full">
          <input
            className="h-10 w-full rounded-md border border-gray-300 px-2 font-bold focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:bg-gray-700"
            placeholder="지역,장소 검색"
            type="text"
            value={keyword}
            onChange={handleChange}
          />
          <button type="submit" className="absolute right-2 top-3">
            <FaSearch className="text-slate-300 transition-all duration-500 hover:scale-125 focus:outline-none" />
          </button>
        </form>
      </div>
      <Location />
    </div>
  );
}

export default LocationSearch;
