import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { ENV } from "@constants/env";

export default function useCityQuery() {
  const params = {
    id: "1835847,1841610,1843125,1845106,1845105,1845789,1845788,1841597,1902028,1846265",
    appid: ENV.WEATHER_SERVE,
    lang: "kr",
    units: "metric",
  };
  return useQuery({
    queryKey: ["AllCityData"],
    queryFn: async () => {
      const res = await axios.get(
        "https://api.openweathermap.org/data/2.5/group",
        {
          params,
        },
      );
      // console.log(res);
      return res?.data?.list;
    },
    refetchInterval: 1000 * 60 * 30,
  });
}
