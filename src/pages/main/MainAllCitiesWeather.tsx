import React, { memo } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import usePageTitle from "@hooks/usePageTitle";
import useScrollTop from "@hooks/useScrollTop";
import { motion } from "framer-motion";

import MainAllWeatherSkeleton from "@components/skeleton/MainAllWeatherSkeleton";
import { AllCityData } from "type";

const apiKey = import.meta.env.VITE_REACT_APP_WEATHER_API_KEY;
interface Cities {
  Seoul: string;
  "Gyeonggi-do": string;
  "Gangwon-do": string;
  "North Chungcheong": string;
  "Chungcheongnam-do": string;
  "Jeollabuk-do": string;
  "Jeollanam-do": string;
  "Gyeongsangbuk-do": string;
  "Gyeongsangnam-do": string;
  "Jeju-do": string;
}
const citiesMappingData: Cities = {
  Seoul: "서울",
  "Gyeonggi-do": "경기도",
  "Gangwon-do": "강원도",
  "North Chungcheong": "충청북도",
  "Chungcheongnam-do": "충청남도",
  "Jeollabuk-do": "전라북도",
  "Jeollanam-do": "전라남도",
  "Gyeongsangbuk-do": "경상북도",
  "Gyeongsangnam-do": "경상남도",
  "Jeju-do": "제주도",
};

function MainAllCitiesWeather() {
  usePageTitle("All City");
  useScrollTop();
  const params = {
    id: "1835847,1841610,1843125,1845106,1845105,1845789,1845788,1841597,1902028,1846265",
    appid: apiKey,
    lang: "kr",
    units: "metric",
  };
  const getWeather = async () => {
    const res = await axios.get(
      "https://api.openweathermap.org/data/2.5/group",
      {
        params,
      },
    );
    return res?.data?.list;
  };
  const { data } = useQuery({
    queryKey: ["AllCityData"],
    queryFn: getWeather,
    refetchInterval: 1000 * 60 * 30,
  });

  return (
    <div className="max-w-[600px] min-w-[320px] m-auto bg-slate-50 h-full flex flex-col gap-2 overflow-y-scroll scrollbar-hide font-Pretendard">
      <div className="w-full p-4 box-border flex items-center justify-center">
        <h1 className="text-xl text-nowrap font-bold">
          <span className="text-amber-400">WeatherMate</span>의 전국날씨
        </h1>
      </div>
      <div className="px-2 pb-2 grid grid-cols-1 grid-rows-10 sm:grid-rows-5 sm:grid-cols-2 gap-2">
        {data?.length > 0 ? (
          <>
            {data.map((item: AllCityData, i: number) => {
              const cityName =
                citiesMappingData[item.name as keyof Cities] || item.name;
              const iconURL = `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
              return (
                <motion.div
                  initial={{ translateY: 50, opacity: 0 }}
                  animate={{ translateY: 0, opacity: 1 }}
                  transition={{
                    ease: "easeInOut",
                    duration: 0.2 * i,
                  }}
                  key={item.id}
                  className="text-slate-600 p-2 shadow-md shadow-slate-400 justify-center items-center border-slate-200 border-2"
                >
                  <div className="text-center">
                    <h2 className="text-md font-bold">{cityName}</h2>
                    <p className="text-3xl font-bold">
                      {String(item.main.temp).slice(0, 2)}°C
                    </p>
                    <div className="flex gap-2 items-center justify-center">
                      <img
                        src={iconURL}
                        alt="Weather Icon"
                        className=""
                        width={50}
                        height={50}
                      />
                      <p className="text-md font-bold">
                        {item.weather[0].description}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <div className="py-2 border-2 border-slate-300 shadow-md flex-grow text-nowrap">
                        <p className="text-md">
                          최고 :{String(item.main.temp_max).slice(0, 4)}°C
                        </p>
                      </div>
                      <div className="py-2 border-2 border-slate-300 shadow-md flex-grow text-nowrap">
                        <p className="text-md">
                          최저 :{String(item.main.temp_min).slice(0, 4)}°C
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </>
        ) : (
          <MainAllWeatherSkeleton />
        )}
      </div>
    </div>
  );
}

export default memo(MainAllCitiesWeather);
