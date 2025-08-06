import { useQuery } from "@tanstack/react-query";

import { ENV } from "@constants/env";
import { useCoordsStore } from "@store/store";

import type { MainData } from "types/WeatherType";

export function useWeatherQuery() {
  const latitude = useCoordsStore((state) => state.latitude);
  const longitude = useCoordsStore((state) => state.longitude);
  return useQuery<MainData>({
    queryKey: ["WeatherData", latitude, longitude],
    queryFn: async () => {
      if (!latitude || !longitude) return null;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${ENV.WEATHER_MAIN}&units=metric&lang=kr`
      );
      const data = await response.json();
      if (data) {
        sessionStorage.setItem("sessionWeather", JSON.stringify(data));
      }
      return data;
    },
    staleTime: 1000 * 60 * 60,
    refetchInterval: 1000 * 60 * 60,
    refetchIntervalInBackground: true,
    enabled: !!latitude && !!longitude,
  });
}
