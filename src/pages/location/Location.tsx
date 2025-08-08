import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import { ENV } from "@constants/env";
import Button from "@components/layout/Button";
import LocationItemSkeleton from "@components/skeleton/LocationItemSkeleton";
import { useDebounce } from "@hooks/useDebounce";
import { useThrottle } from "@hooks/useThrottle";
import LocationKeywords from "@pages/location/LocationKeyword";
import LocationItem from "@pages/location/LocationItem";
import { useCoordsStore } from "@store/store";

import { motion } from "framer-motion";
import { useCoords } from "@hooks/useCoords";

type InitialData = {
  [key: string]: string;
};
interface PageData {
  items: { item: InitialData[] };
  numOfRows: number;
  pageNo: number;
  totalCount: number;
}
const options = [
  { id: "12", label: "전체", img_src: "All" },
  { id: "14", label: "문화", img_src: "Culture" },
  { id: "15", label: "행사", img_src: "Festival" },
  { id: "25", label: "여행지", img_src: "Travel" },
  { id: "28", label: "스포츠", img_src: "Sports" },
  { id: "32", label: "숙박", img_src: "Hotel" },
  { id: "38", label: "쇼핑", img_src: "Shopping" },
  { id: "39", label: "음식점", img_src: "Food" },
];
function Location() {
  const navigate = useNavigate();
  const { latitude, longitude } = useCoordsStore((state) => state);
  const [contentID, setContentID] = useState<string>("12");
  const radius = "100000";
  useCoords();
  //초기 데이터 호출 로직
  const getLocationData = async (page: number) => {
    const response = await axios.get(
      `http://apis.data.go.kr/B551011/KorService1/locationBasedList1?serviceKey=${ENV.LOCATION_API_KEY}&pageNo=${page}&numOfRows=8&mapX=${longitude}&mapY=${latitude}&radius=${radius}&MobileApp=AppTest&MobileOS=ETC&contentTypeId=${contentID}&_type=json `
    );
    return response?.data?.response?.body;
  };

  //무한 스크롤 로직
  const {
    data: InitialData,
    isLoading,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: [
      "InfiniteData",
      ENV.LOCATION_API_KEY,
      longitude,
      latitude,
      radius,
      contentID,
    ],
    queryFn: ({ pageParam = 0 }: { pageParam?: number }) =>
      getLocationData(pageParam),
    getNextPageParam: (lastPage: PageData) => {
      // console.log(lastPage);
      return lastPage?.pageNo + 1;
    },
    initialPageParam: 0,
  });
  // console.log(InitialData);

  const mergedItems: InitialData[] | undefined =
    InitialData && InitialData?.pages?.length === 1
      ? InitialData?.pages[0]?.items?.item
      : InitialData?.pages?.flatMap((page) => page?.items?.item);
  // console.log(mergedItems);

  const throttledFetchNextPage = useThrottle(() => {
    fetchNextPage();
  }, 500);

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      throttledFetchNextPage();
    }
  }, [inView, throttledFetchNextPage]);

  //검색 로직
  const [keyword, setKeyword] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const debounceSearch = useDebounce(keyword, 300);
  const [result, setResult] = useState([]);
  // console.log(result);

  useEffect(() => {
    getFilteredData(debounceSearch);
  }, [debounceSearch]);

  const getFilteredData = async (searchKeyword: string) => {
    try {
      const response = await axios.get(
        `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?MobileOS=ETC&MobileApp=testweb&serviceKey=${ENV.LOCATION_API_KEY}&keyword=${searchKeyword}&_type=json&contentTypeId=${contentID}`
      );
      setResult(response?.data?.response?.body?.items?.item);
      return response;
    } catch (error) {
      console.error(error);
    }
  };
  const handleClick = () => {
    if (searchKeyword) {
      getFilteredData(searchKeyword);
      setSearchKeyword("");
    }
  };

  const searchItemList = result?.map((e: InitialData) => (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        ease: "easeInOut",
        duration: 1,
      }}
      key={e?.modifiedtime}
      className="flex flex-col justify-between p-2 rounded-lg shadow-lg border-2 border-slate-200 hover:border-blue-400 duration-200"
    >
      <LocationItem item={e} />
    </motion.section>
  ));

  const locationItemList = mergedItems?.map((e: InitialData, i: number) => (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        ease: "easeInOut",
        duration: 1,
      }}
      key={i}
      className="w-full flex flex-col justify-between p-2 rounded-lg shadow-lg border-2 border-slate-200 hover:border-blue-400 duration-200"
    >
      <LocationItem item={e} />
    </motion.section>
  ));
  return (
    <div className="flex flex-col gap-4 mx-auto p-2 min-h-screen bg-slate-50">
      <header className="flex gap-2 text-nowrap">
        <input
          className="w-full h-10 font-bold p-2 box-border text-sm border rounded-md dark:bg-gray-700 border-gray-300 focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-slate-500"
          placeholder="지역,장소 검색"
          type="text"
          value={keyword}
          onChange={handleChange}
        />
        <Button
          text="검색하기"
          textColor="white"
          bgColor="sky"
          width="1/4"
          onClick={handleClick}
        ></Button>
        <Button
          text="초기화"
          textColor="gray"
          bgColor="gray"
          width="1/4"
          onClick={() => {
            navigate("/location"), window.location.reload();
          }}
        ></Button>
      </header>

      <aside className="flex gap-1 justify-center items-center">
        {options.map((option) => (
          <div className="w-full" key={option.id}>
            <LocationKeywords
              id={option.id}
              label={option.label}
              img_src={option.img_src}
              onClick={setContentID}
            />
          </div>
        ))}
      </aside>

      {isLoading ? (
        <LocationItemSkeleton />
      ) : (
        <>
          <main className="flex flex-col items-center justify-center sm:grid sm:grid-cols-2 gap-1 relative">
            {searchItemList?.length ? searchItemList : locationItemList}
          </main>
          <p ref={ref} className="w-full text-center">
            더 불러오기
          </p>
        </>
      )}
    </div>
  );
}

export default Location;
