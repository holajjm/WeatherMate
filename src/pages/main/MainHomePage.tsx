import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState, useSetRecoilState } from "recoil";
import { LocationState } from "@recoil/atom";

import usePageTitle from "@hooks/usePageTitle";
import useScrollTop from "@hooks/useScrollTop";
import { motion } from "framer-motion";

import MainTodaysComent from "@pages/main/MainTodaysComent";
import MainMyLocationWeather from "@pages/main/MainMyLocationWeather";
import MainWeatherTimeZone from "@pages/main/MainWeatherTimeZone";
import ToTheTopButton from "@components/layout/ToTheTopButton";

function MainHomePage() {
  usePageTitle("WeatherMate");
  useScrollTop();
  const coords = useRecoilState(LocationState);
  const setCoords = useSetRecoilState(LocationState);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      error => {
        console.error("Error fetching location:", error.message);
      },
    );
  }, []);

  const { data } = useQuery({
    queryKey: ["weatherdata", coords[0].lat, coords[0].lon],
    queryFn: async () => {
      if (coords[0].lat && coords[0].lon) {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${coords[0].lat}&lon=${coords[0].lon}&appid=${import.meta.env.VITE_REACT_APP_WEATHER_API_KEY2}&units=metric&lang=kr`,
        );
        const data = await response.json();
        return data;
      }
      return null;
    },
    staleTime: 1000 * 60 * 60,
    refetchInterval: 1000 * 60 * 60,
    refetchIntervalInBackground: true,
  });
  if (data) {
    sessionStorage.setItem("sessionWeather", JSON.stringify(data));
  }

  return (
    <main className="max-w-[600px] min-w-[320px] m-auto flex flex-col gap-4">
      <motion.section
        initial={{ translateY: -50, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{
          ease: "easeInOut",
          duration: 0.5,
        }}
      >
        <MainTodaysComent />
      </motion.section>
      <div className="flex flex-col gap-2">
        <h1 className="font-black text-lg text-[#2D2D2D] px-2 box-border">
          <span className="text-xl text-blue-600">웨더메이트</span>가 알려주는
          상세 날씨 정보
        </h1>
        <motion.section
          initial={{ translateY: -100, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{
            ease: "easeInOut",
            duration: 0.75,
          }}
        >
          <MainWeatherTimeZone />
        </motion.section>
        <motion.section
          initial={{ translateY: -150, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{
            ease: "easeInOut",
            duration: 1,
          }}
        >
          <MainMyLocationWeather />
        </motion.section>
      </div>
      <ToTheTopButton />
    </main>
  );
}

export default MainHomePage;
