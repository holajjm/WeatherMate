import React, { memo } from "react";

import { citiesData } from "@constants/CityMappingData";
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
          key={"all-cities"}
          observer={true}
          observeParents={true}
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
          className="h-36 w-1/4 rounded-button text-center text-caption font-bold text-toss-black"
        >
          {cityWeather?.length && (
            <>
              {cityWeather.map((item: AllCityData, i: number) => {
                return (
                  <SwiperSlide
                    key={item?.id}
                    className="flex w-full grow flex-col items-center justify-around gap-1 text-nowrap rounded-button border-[1px] bg-white px-2 py-1 text-center shadow-lg shadow-slate-200"
                  >
                    <h2 className="text-body text-toss-gray">
                      {citiesData[item.name as keyof Cities]}
                    </h2>
                    <hr className="w-11/12 border-toss-gray" />
                    <img
                      src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                      alt="Weather Icon"
                      className="w-10 rounded-button bg-toss-lightblue"
                      width={40}
                      height={40}
                    />
                    <p className="font-normal">
                      {item?.weather[0]?.description as keyof Cities}
                    </p>
                    <div className="flex w-full items-center justify-center gap-4 text-caption font-bold">
                      <p className="text-toss-lightred">
                        {String(item.main.temp).slice(0, 2)}°C
                      </p>
                      <p className="text-toss-blue">{item?.main?.humidity}%</p>
                    </div>
                  </SwiperSlide>
                );
              })}
            </>
          )}
        </Swiper>
      )}
    </>
  );
}

export default memo(MainAllCitiesWeather);
