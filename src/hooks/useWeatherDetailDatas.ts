import { useWeatherQuery } from "@features/weather/useWeatherQuery";
import { UnixTime } from "@hooks/UnixTime";
import type { WeatherDetailItem } from "types/WeatherType";

export function useWeatherDetailDatas() {
  const { data, isError, isFetching } = useWeatherQuery();
  const weatherDetails: WeatherDetailItem[] = [
    {
      id: 1,
      title: "일출",
      icon: "./WeatherInfo/WeatherInfo_Sunrise.webp",
      value: UnixTime(data?.sys.sunrise, "withMin"),
      alt: "일출"
    },
    {
      id: 2,
      title: "일몰",
      icon: "./WeatherInfo/WeatherInfo_Sunset.webp",
      value: UnixTime(data?.sys.sunset, "withMin"),
      alt: "일몰"
    },
    {
      id: 3,
      title: "최고 온도",
      icon: "./WeatherInfo/WeatherInfo_HighTemp.webp",
      value: `${data?.main.temp_max.toFixed(1)}°C`,
      alt: "최고 온도"
    },
    {
      id: 4,
      title: "최저 온도",
      icon: "./WeatherInfo/WeatherInfo_LowTemp.webp",
      value: `${data?.main.temp_min.toFixed(1)}°C`,
      alt: "최저 온도"
    },
    {
      id: 5,
      title: "습도",
      icon: "./WeatherInfo/WeatherInfo_Humidity.webp",
      value: `${data?.main.humidity}%`,
      alt: "습도"
    },
    {
      id: 6,
      title: "체감온도",
      icon: "./WeatherInfo/WeatherInfo_Feels.webp",
      value: `${data?.main.feels_like.toFixed(1)}°C`,
      alt: "체감온도"
    },
    {
      id: 7,
      title: "풍속",
      icon: "./WeatherIcon/WeatherIconWind.webp",
      value: `${data && data?.wind.speed}m/s(${data && data?.wind.speed > 3 ? "위험" : "보통"})`,
      alt: "풍속"
    },
    {
      id: 8,
      title: "강수량",
      icon: "./WeatherIcon/WeatherIconRain.webp",
      value: `${data?.rain ? data?.rain?.["1h"] : "00"}mm`,
      alt: "강수량"
    }
  ];
  return { weatherDetails, isError, isFetching };
}
