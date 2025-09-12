import React, { memo } from "react";

import { citiesData } from "@constants/CityMappingData";
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
  const { data: cityWeather, isFetching } = useCityQuery();
  // console.log(cityWeather);

  return (
    <>
      {!isFetching && (
        <Swiper
          // direction="vertical"
          spaceBetween={100}
          centeredSlides={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false
            // pauseOnMouseEnter: true
          }}
          loop={true}
          // pagination={{
          //   clickable: true,
          // }}
          // navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="h-36 w-1/6 text-center text-caption font-bold text-toss-black"
        >
          {cityWeather?.length ? (
            <>
              {cityWeather.map((item: AllCityData, i: number) => {
                return (
                  <SwiperSlide
                    key={item?.id}
                    className="flex w-full flex-col items-center justify-around gap-1 rounded-xl border-[1px] bg-white p-2 shadow-lg shadow-slate-200"
                  >
                    <p className="text-body text-toss-gray">
                      {citiesData[item.name as keyof Cities]}
                    </p>
                    <div className="flex w-full flex-col items-center justify-center gap-1">
                      <img
                        src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                        alt="Weather Icon"
                        className="bg-toss-lightblue w-10 rounded-button"
                        width={40}
                        height={40}
                      />
                      <p className="font-normal">
                        {item?.weather[0]?.description as keyof Cities}
                      </p>
                      <div className="flex w-full items-center justify-around text-caption font-bold">
                        <p className="">
                          {String(item.main.temp).slice(0, 2)}°C
                        </p>
                        <p className="">{item?.main?.humidity}%</p>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </>
          ) : (
            <MainAllWeatherSkeleton />
          )}
        </Swiper>
      )}
    </>
  );
}

export default memo(MainAllCitiesWeather);
