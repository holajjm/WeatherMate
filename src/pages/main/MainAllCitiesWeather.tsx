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
        className="w-full h-12 pb-2"
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
                  className="w-full rounded-xl shadow-md shadow-slate-300 bg-blue-300 border-white border-2 p-2 flex items-center justify-around gap-2 text-center text-[#2d2d2d] font-bold"
                >
                  <p className="grow">{cityName}</p>
                  <div className="flex gap-4 items-center justify-center">
                    <img
                      src={iconURL}
                      alt="Weather Icon"
                      className="w-10 h-10 rounded-xl"
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
