import React, { memo } from "react";

import { citysData } from "@constants/CityMappingData";
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
        {cityWeather?.length > 0 ? (
          <>
            {cityWeather.map((item: AllCityData, i: number) => {
              const cityName =
                citysData[item.name as keyof Cities] || item.name;
              const iconURL = `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
              return (
                <SwiperSlide
                  key={item?.id}
                  className="flex w-full items-center justify-around gap-2 rounded-xl border-2 border-white bg-blue-300 p-2 text-center font-bold text-[#2d2d2d] shadow-md shadow-slate-300"
                >
                  <p className="grow">{cityName}</p>
                  <div className="flex items-center justify-center gap-4">
                    <img
                      src={iconURL}
                      alt="Weather Icon"
                      className="h-10 w-10 rounded-xl"
                      width={40}
                      height={40}
                    />
                    <p className="font-normal">
                      {item?.weather[0]?.description}
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
