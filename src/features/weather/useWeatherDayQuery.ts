import { useQuery } from "@tanstack/react-query";

import { ENV } from "@constants/env";
import { useCoordsStore } from "@store/store";

import type { TimeWeather } from "types/WeatherType";

export function useWeatherDayQuery() {
  const latitude = useCoordsStore(state => state.latitude);
  const longitude = useCoordsStore(state => state.longitude);
  return useQuery<TimeWeather>({
    queryKey: ["DayWeather", latitude, longitude],
    queryFn: async () => {
      if (!latitude || !longitude) return null;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&cnt=${7}&appid=${ENV.WEATHER_MAIN}`,
      );
      const data = await response.json();
      return data;
    },
    staleTime: 1000 * 60 * 60,
    refetchInterval: 1000 * 60 * 60,
    refetchIntervalInBackground: true,
    enabled: !!latitude && !!longitude,
  });
}
