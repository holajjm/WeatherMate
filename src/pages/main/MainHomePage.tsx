import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState, useSetRecoilState } from "recoil";
import { LocationState } from "../../recoil/atom.mts";

import MainTodaysComent from "@pages/main/MainTodaysComent";
import MainMyLocationWeather from "@pages/main/MainMyLocationWeather";
import MainWeatherByTimeZone from "@pages/main/MainWeatherByTimeZone";
import MainRecommendationCommunity from "@pages/main/MainRecommendationCommunity";
import MainRecommendationPreview from "@pages/main/MainRecommendationPreview";
import ToTheTopButton from "@components/layout/ToTheTopButton";
import usePageTitle from "@hooks/usePageTitle";

import { motion } from "framer-motion";

function MainHomePage() {
  usePageTitle("WeatherMate");
  const coords = useRecoilState(LocationState);
  const setCoords = useSetRecoilState(LocationState);
  useEffect(() => {
    window.scrollTo(0, 0);
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
    <div className="max-w-[600px] min-w-[320px] m-auto flex flex-col gap-8">
      <motion.div
        initial={{ translateY: -50, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{
          ease: "easeInOut",
          duration: 1,
        }}
      >
        <MainTodaysComent />
      </motion.div>
      <motion.div
        initial={{ translateY: -100, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{
          ease: "easeInOut",
          duration: 1.5,
        }}
      >
        <MainMyLocationWeather />
      </motion.div>
      <motion.div
        initial={{ translateY: -150, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{
          ease: "easeInOut",
          duration: 2,
        }}
      >
        <MainWeatherByTimeZone />
      </motion.div>
      <motion.div
        initial={{ translateY: -200, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{
          ease: "easeInOut",
          duration: 2.5,
        }}
      >
        <MainRecommendationCommunity />
      </motion.div>
      <motion.div
        initial={{ translateY: -250, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{
          ease: "easeInOut",
          duration: 3,
        }}
      >
        <MainRecommendationPreview />
      </motion.div>
      <ToTheTopButton />
    </div>
  );
}

export default MainHomePage;
