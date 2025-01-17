import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import MainTodaysComent from "@pages/main/MainTodaysComent";
import MainMyLocationWeather from "@pages/main/MainMyLocationWeather";
import MainWeatherByTimeZone from "@pages/main/MainWeatherByTimeZone";
import MainRecommendationCommunity from "@pages/main/MainRecommendationCommunity";
import MainRecommendationPreview from "@pages/main/MainRecommendationPreview";
import ToTheTopButton from "@components/layout/ToTheTopButton";
import usePageTitle from "@hooks/usePageTitle";

function MainHomePage() {
  usePageTitle("WeatherMate");
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const location = { lat, lon };

  useEffect(() => {
    window.scrollTo(0, 0);
    navigator.geolocation.getCurrentPosition(
      position => {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      },
      error => {
        console.error("Error fetching location:", error.message);
      },
    );
  }, []);
  useEffect(() => {
    sessionStorage.setItem("lat", String(lat));
    sessionStorage.setItem("lon", String(lon));
  }, [lat, lon]);

  const { data } = useQuery({
    queryKey: ["weatherdata", lat, lon],
    queryFn: async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_REACT_APP_WEATHER_API_KEY2}&units=metric&lang=kr`,
      );
      const data = await response.json();
      return data;
    },
    // suspense: true,
    refetchInterval: 1000,
    refetchIntervalInBackground: true,
  });
  if (data) {
    sessionStorage.setItem("sessionWeather", JSON.stringify(data));
  }

  return (
    <div className="max-w-[600px] min-w-[320px] m-auto flex flex-col gap-8">
      <MainTodaysComent />
      <MainMyLocationWeather />
      <MainWeatherByTimeZone />
      <MainRecommendationCommunity />
      <MainRecommendationPreview />
      <ToTheTopButton />
    </div>
  );
}

export default MainHomePage;
