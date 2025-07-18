import { useCoordsStore } from "@store/store";
import { useQuery } from "@tanstack/react-query";
import type { TimeWeather } from "types/WeatherType";

export function useWeatherTimeQuery() {
  const latitude = useCoordsStore(state => state.latitude);
  const longitude = useCoordsStore(state => state.longitude);
  return useQuery<TimeWeather>({
    queryKey: ["TimeWeather", latitude, longitude],
    queryFn: async () => {
      if (!latitude || !longitude) return null;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_REACT_APP_WEATHER_API_KEY}&units=metric&cnt=8`,
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
