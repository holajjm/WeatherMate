import { useQuery } from "@tanstack/react-query";
import type { AllCityData } from "types/WeatherType";

export function useWeatherQuery(latitude: number, longitude: number) {
  return useQuery<AllCityData>({
    queryKey: ["WeatherData", latitude, longitude],
    queryFn: async () => {
      if (!latitude || !longitude) return null;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_REACT_APP_WEATHER_API_KEY2}&units=metric&lang=kr`,
      );
      const data = await response.json();
      if (data?.data) {
        sessionStorage.setItem("sessionWeather", JSON.stringify(data?.data));
      }
      return data;
    },
    staleTime: 1000 * 60 * 60,
    refetchInterval: 1000 * 60 * 60,
    refetchIntervalInBackground: true,
  });
}
