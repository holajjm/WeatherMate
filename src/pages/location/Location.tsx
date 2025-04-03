import React, { useState, useEffect } from "react";
import axios from "axios";

import useCurrentLocation from "@hooks/useCurrentLocation";
import { useDebounce } from "@hooks/useDebounce";
import Loading from "@components/layout/Loading";
import Button from "@components/layout/Button";
import { LocationMainData } from "type";

import LocationKeywords from "@pages/location/LocationKeyword";
import LocationItem from "@pages/location/LocationItem";
import { motion } from "framer-motion";

const LocationAPIKEY = import.meta.env.VITE_REACT_APP_LOCATION_API_KEY;

function Location() {
  const { latitude, longitude } = useCurrentLocation();
  const [locationData, setLocationData] = useState<LocationMainData[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [contentID, setContentID] = useState<string>("12");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const radius = "200000";
  // console.log(contentID);
  // console.log(locationData);

  //사용자 위치 정보에 따른 기본 데이터 호출 로직
  useEffect(() => {
    if (latitude && longitude) {
      const fetchLocationMainData = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `http://apis.data.go.kr/B551011/KorService1/locationBasedList1?serviceKey=${LocationAPIKEY}&pageNo=1&numOfRows=8&mapX=${longitude}&mapY=${latitude}&radius=${radius}&MobileApp=AppTest&MobileOS=ETC&contentTypeId=${contentID}&_type=json `,
          );
          setLocationData(response.data.response.body.items.item);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          console.error(
            "데이터를 원활하게 가져오는데 오류가 발생하였습니다.",
            error,
          );
        }
      };
      fetchLocationMainData();
    }
  }, [latitude, longitude, contentID]);

  //검색 로직 구현
  const [keyword, setKeyword] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };
  const debounceSearchKeyword = useDebounce(keyword, 0);
  useEffect(() => {
    setSearchKeyword(debounceSearchKeyword);
  }, [debounceSearchKeyword]);

  const fetchLocationSearchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?MobileOS=ETC&MobileApp=testweb&serviceKey=${LocationAPIKEY}&keyword=${searchKeyword}&_type=json&contentTypeId=${contentID}`,
      );
      setLocationData(response.data.response.body.items.item);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
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
  const fetchNextPage = async () => {
    try {
      const response = await axios.get(
        `http://apis.data.go.kr/B551011/KorService1/locationBasedList1?serviceKey=${LocationAPIKEY}&pageNo=${currentPage + 1}&numOfRows=10&mapX=${longitude}&mapY=${latitude}&radius=${radius}&MobileApp=AppTest&MobileOS=ETC&contentTypeId=${contentID}&_type=json`,
      );
      setLocationData(prevData => [
        ...prevData,
        ...response.data.response.body.items.item,
      ]);
      setCurrentPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error(
        "데이터를 원활하게 가져오는데 오류가 발생하였습니다.",
        error,
      );
    }
  };

  //무한 스크롤에 따른 데이터 호출 구현
  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (
      locationData.length > 0 &&
      scrollTop + clientHeight >= scrollHeight - 5
    ) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [locationData]);

  const options = [
    { id: "12", label: "전체", img_src: "all.svg" },
    { id: "14", label: "문화", img_src: "communityplace.svg" },
    { id: "15", label: "행사", img_src: "festival.svg" },
    { id: "25", label: "여행지", img_src: "travel.svg" },
    { id: "28", label: "레포츠", img_src: "reports.svg" },
    { id: "32", label: "숙박", img_src: "hotel.svg" },
    { id: "38", label: "쇼핑", img_src: "shopping.svg" },
    { id: "39", label: "음식점", img_src: "food.svg" },
  ];

  // console.log(locationData);

  const locationItemList =
    locationData &&
    locationData.map((e, i) => (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          ease: "easeInOut",
          duration: 1,
        }}
        key={i}
        className="flex flex-col gap-1 p-2 rounded-lg shadow-lg border-2 border-slate-200 hover:border-blue-400 duration-200"
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
          onClick={() => window.location.reload()}
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
        <Loading />
      ) : (
        <main className="grid grid-cols-2 gap-1 relative">
          {locationItemList}
        </main>
      )}
    </div>
  );
}

export default Location;
