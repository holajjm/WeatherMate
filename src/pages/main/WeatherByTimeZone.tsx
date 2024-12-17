import React from 'react';
import LocationLoading from '@components/layout/LocationLoading';
import useCurrentLocation from '../../hooks/useCurrentLocation';
import { useQuery } from '@tanstack/react-query';


function WeatherByTimeZone() {
  interface WeatherTime {
    clouds:{all:number},
    dt:number,
    dt_txt:string,
    main:{
      feels_like:number,
      grnd_level:number,
      humidity: number,
      pressure:number,
      sea_level:number
      temp:number
      temp_max:number
      temp_min:number
    },
    pop:number,
    rain?:{
      "3h":number
    },
    sys:{
      pod:string
    },
    visibility:number,
    weather:[
      {
        id:number,
        main:string,
        description:string,
        icon:string
      }
    ],
    wind:{
      deg:number,
      gust:number
      speed:number
    }
  }
  const {latitude,longitude} = useCurrentLocation();
  
  const {data} = useQuery({
    queryKey: ['timeWeather',latitude,longitude],
    queryFn: async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_REACT_APP_WEATHER_API_KEY}&units=metric&cnt=8`,
      );
      const data = await response.json();
      return data;
    },
    // suspense: true,
    refetchInterval: 10000,
    refetchIntervalInBackground: true,
    staleTime: 1000 * 60 * 60,
    enabled: !!latitude && !!longitude
  });
  // console.log(data);
  

  const unixTime = (time:number) => {
    const date = new Date(time * 1000);
    const hour = date.getHours() % 12 || 12;
    // const minutes = date.getMinutes().toString().padStart(2,"0");
    const ampm = date.getHours() >= 12 ? '오후' : '오전';
    return `${ampm}${hour}시`;
  };
  function getIconUrl(iconName:string) {
    return `https://openweathermap.org/img/wn/${iconName}.png`;
  }
  return (
    <div className="w-full p-2 bg-white flex flex-col gap-2 ">
      <h1 className="font-bold font-SSRONETHandwritten text-xl text-center">
        시간대별 날씨정보(3시간 기준)
      </h1>
      {data?.cod === "400" ? <LocationLoading /> : <div className="w-full py-2 flex gap-2 overflow-x-scroll scrollbar-hide">
        {data &&
          data?.list?.map((item:WeatherTime) => (
            <div
              key={item.dt}
              className="min-h-full w-full p-2 border-[1px] shadow-md shadow-slate-300 bg-white rounded-xl flex flex-col items-center justify-center text-nowrap"
            >
              <p className="text-xs text-center text-slate-600">
                {unixTime(item.dt)}
              </p>
              <img src={getIconUrl(item.weather[0].icon)} alt="Weather Icon" />
              <p className="text-center text-sm font-semibold">
                {item.main.temp.toFixed(1)}°C
              </p>
            </div>
          ))}
      </div>}
    </div>
  );
}

export default WeatherByTimeZone;
