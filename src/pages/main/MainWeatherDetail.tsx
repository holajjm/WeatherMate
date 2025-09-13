import React from "react";

import { weatherDetails } from "@constants/WeatherDetailDatas";
import { useWeatherQuery } from "@features/weather/useWeatherQuery";
import ErrorPage from "@pages/ErrorPage";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function MainWeatherDetail() {
  const { isError, isFetching } = useWeatherQuery();
  if (isError) return <ErrorPage />;

  return (
    <>
      {!isFetching && (
        <Swiper
          key={"weather-detail"}
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
          className="h-36 w-1/6 text-caption"
        >
          {weatherDetails.map(item => (
            <SwiperSlide
              key={item.id}
              className="flex w-full grow flex-col items-center justify-around gap-2 text-nowrap rounded-button border-[1px] bg-white px-2 py-1 text-center shadow-lg shadow-slate-200"
            >
              <p className="text-body text-toss-gray">{item.title}</p>
              <img
                src={item.icon}
                className="w-10 rounded-button bg-toss-lightblue p-1"
                alt={item.alt}
                {...{ fetchpriority: "high" }}
                decoding="async"
                width={40}
                height={40}
              />
              <p className="font-bold text-toss-black">{item.value}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}

export default MainWeatherDetail;
