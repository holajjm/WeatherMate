import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import useCurrentLocation from "@hooks/useCurrentLocation";
import Button from "@components/layout/Button";
import { useDebounce } from "@hooks/useDebounce";
import { motion } from "framer-motion";

import LocationKeywords from "@pages/location/LocationKeyword";
import LocationItem from "@pages/location/LocationItem";
import LocationItemSkeleton from "@components/skeleton/LocationItemSkeleton";

const LocationAPIKEY = import.meta.env.VITE_REACT_APP_LOCATION_API_KEY;

interface InitialData {
  addr1: string;
  addr2: string;
  areacode: string;
  booktour: string;
  cat1: string;
  cat2: string;
  cat3: string;
  contentid: string;
  contenttypeid: string;
  cpyrhtDivCd: string;
  createdtime: string;
  dist: string;
  firstimage: string;
  firstimage2: string;
  mapx: string;
  mapy: string;
  mlevel: string;
  modifiedtime: string;
  sigungucode: string;
  tel: string;
  title: string;
}
interface Data {
  items: { item: InitialData[] };
  numOfRows: number;
  pageNo: number;
  totalCount: number;
}

interface QueryData {
  pageParams: Array<number | undefined>;
  pages: Data[];
}

function Location() {
  const navigate = useNavigate();
  const { latitude, longitude } = useCurrentLocation();
  const [contentID, setContentID] = useState<string>("12");
  const radius = "100000";

  //사용자 위치 정보에 따른 기본 데이터 호출 로직
  const getLocationData = async (page: number = 1) => {
    const response = await axios.get(
      `http://apis.data.go.kr/B551011/KorService1/locationBasedList1?serviceKey=${LocationAPIKEY}&pageNo=${page}&numOfRows=8&mapX=${longitude}&mapY=${latitude}&radius=${radius}&MobileApp=AppTest&MobileOS=ETC&contentTypeId=${contentID}&_type=json `,
    );
    // console.log(page);

    return response?.data?.response?.body;
  };
  //무한 스크롤에 따른 데이터 호출 구현
  const { data, isLoading, fetchNextPage } = useInfiniteQuery<
    QueryData,
    unknown,
    QueryData
  >({
    queryKey: [
      "InfiniteData",
      LocationAPIKEY,
      longitude,
      latitude,
      radius,
      contentID,
    ],
    queryFn: ({ pageParam = 1 }: { pageParam?: number }) =>
      getLocationData(pageParam),
    getNextPageParam: (lastPage: Data) => {
      // console.log(lastPage);
      return lastPage?.pageNo + 1;
    },
    initialPageParam: 1
  });
  const mergedItems: InitialData[] =
    data && data?.pages?.length === 1
      ? data?.pages[0]?.items?.item
      : data?.pages?.flatMap(page => page?.items?.item);
  // console.log(mergedItems);
  // console.log(data);

  const { ref, inView } = useInView();
  // console.log(inView);
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  //검색 로직 구현
  const [keyword, setKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };
  const debounceSearchKeyword = useDebounce(keyword, 0);
  useEffect(() => {
    setSearchKeyword(debounceSearchKeyword);
  }, [debounceSearchKeyword]);

  const fetchLocationSearchData = async () => {
    try {
      const response = await axios.get(
        `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?MobileOS=ETC&MobileApp=testweb&serviceKey=${LocationAPIKEY}&keyword=${searchKeyword}&_type=json&contentTypeId=${contentID}`,
      );
    } catch (error) {
      console.error(
        "데이터를 원활하게 가져오는데 오류가 발생하였습니다.",
        error,
      );
    }
  };

  const handleSubmit = () => {
    if (searchKeyword) {
      fetchLocationSearchData();
      setKeyword("");
    }
  };
  const handleClick = () => {
    if (searchKeyword) {
      fetchLocationSearchData();
      setKeyword("");
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  //페이지네이션 구현
  // const fetchNextPage = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://apis.data.go.kr/B551011/KorService1/locationBasedList1?serviceKey=${LocationAPIKEY}&pageNo=${currentPage + 1}&numOfRows=10&mapX=${longitude}&mapY=${latitude}&radius=${radius}&MobileApp=AppTest&MobileOS=ETC&contentTypeId=${contentID}&_type=json`,
  //     );
  //     setLocationData(prevData => [
  //       ...prevData,
  //       ...response.data.response.body.items.item,
  //     ]);
  //     setCurrentPage(prevPage => prevPage + 1);
  //   } catch (error) {
  //     console.error(
  //       "데이터를 원활하게 가져오는데 오류가 발생하였습니다.",
  //       error,
  //     );
  //   }
  // };

  // const handleScroll = () => {
  //   const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
  //   if (
  //     locationData.length > 0 &&
  //     scrollTop + clientHeight >= scrollHeight - 5
  //   ) {
  //     fetchNextPage();
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [locationData]);

  const options = [
    { id: "12", label: "전체", img_src: "all.webp" },
    { id: "14", label: "문화", img_src: "communityplace.webp" },
    { id: "15", label: "행사", img_src: "festival.webp" },
    { id: "25", label: "여행지", img_src: "travel.webp" },
    { id: "28", label: "레포츠", img_src: "reports.webp" },
    { id: "32", label: "숙박", img_src: "hotel.webp" },
    { id: "38", label: "쇼핑", img_src: "shopping.webp" },
    { id: "39", label: "음식점", img_src: "food.webp" },
  ];

  const locationItemList = mergedItems?.map((e: InitialData, i: number) => (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        ease: "easeInOut",
        duration: 1,
      }}
      key={i}
      className="flex flex-col justify-between p-2 rounded-lg shadow-lg border-2 border-slate-200 hover:border-blue-400 duration-200"
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
          onKeyDown={handleKeyDown}
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
        {options.map(option => (
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
          <main className="grid grid-cols-2 gap-1 relative">
            {locationItemList}
          </main>
          <p ref={ref} className="w-full text-center bg-slate-300">
            더 불러오기
          </p>
        </>
      )}
    </div>
  );
}

export default Location;
