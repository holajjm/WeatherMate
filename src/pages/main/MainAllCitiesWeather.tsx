import React, { memo } from "react";

import { citiesData, citiesDesc } from "@constants/CityMappingData";
import MainAllWeatherSkeleton from "@components/skeleton/MainAllWeatherSkeleton";
import useCityQuery from "@features/weather/useCityQuery";
import useScrollTop from "@hooks/useScrollTop";

import type { AllCityData, Cities } from "types/WeatherType";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function MainAllCitiesWeather() {
  useScrollTop();
  const { data: cityWeather } = useCityQuery();
  // console.log(cityWeather);
  
  return (
    <>
      <Swiper
        direction="vertical"
        spaceBetween={100}
        centeredSlides={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        // pagination={{
        //   clickable: true,
        // }}
        // navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-12 w-full pb-2"
      >
        {cityWeather?.length ? (
          <>
            {cityWeather.map((item: AllCityData, i: number) => {
              return (
                <SwiperSlide
                  key={item?.id}
                  className="flex w-full items-center justify-around gap-2 rounded-xl bg-blue-300 p-2 text-center font-bold text-[#2d2d2d] shadow-md shadow-slate-300"
                >
                  <p className="grow">{citiesData[item.name as keyof Cities]}</p>
                  <div className="flex items-center justify-center gap-4">
                    <img
                      src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                      alt="Weather Icon"
                      className="h-10 w-10 rounded-xl"
                      width={40}
                      height={40}
                    />
                    <p className="font-normal">
                      {citiesDesc[item?.weather[0]?.description as keyof Cities]}
                    </p>
                    <p className="">{String(item.main.temp).slice(0, 2)}°C</p>
                    <p className="font-normal">{item?.main?.humidity}%</p>
                  </div>
                </SwiperSlide>
              );
            })}
          </>
        ) : (
          <MainAllWeatherSkeleton />
        )}
      </Swiper>
    </>
  );
}

export default memo(MainAllCitiesWeather);
