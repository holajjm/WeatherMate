import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { ENV } from "@constants/env";
import { citiesData } from "@constants/CityMappingData";

export default function useCityQuery() {
  // const params = {
  //   id: "1835847,1841610,1843125,1845106,1845105,1845789,1845788,1841597,1902028,1846265",
  //   appid: ENV.WEATHER_SERVE,
  //   lang: "kr",
  //   units: "metric",
  // };
  return useQuery({
    queryKey: ["AllCityData"],
    queryFn: async () => {
      const weatherData = await Promise.all(
        Object.keys(citiesData).map(async (city) => {
          const res = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ENV.WEATHER_MAIN}&units=metric&lang=kr`,
          );
          return res?.data;
        })
      );
      // console.log(weatherData);
      
      return weatherData;
    },
    refetchInterval: 1000 * 60 * 30,
  });
}
