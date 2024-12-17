import axios from 'axios';
import React,{ memo, useEffect, useState } from 'react';

const apiKey = import.meta.env.VITE_REACT_APP_WEATHER_API_KEY;
interface Cities {
  'Seoul': string,
  'Gyeonggi-do': string,
  'Gangwon-do': string,
  'North Chungcheong': string,
  'Chungcheongnam-do': string,
  'Jeollabuk-do': string,
  'Jeollanam-do': string,
  'Gyeongsangbuk-do': string,
  'Gyeongsangnam-do': string,
  'Jeju-do': string
}
const citiesMappingData:Cities = {
  'Seoul': '서울',
  'Gyeonggi-do': '경기도',
  'Gangwon-do': '강원도',
  'North Chungcheong': '충청북도',
  'Chungcheongnam-do': '충청남도',
  'Jeollabuk-do': '전라북도',
  'Jeollanam-do': '전라남도',
  'Gyeongsangbuk-do': '경상북도',
  'Gyeongsangnam-do': '경상남도',
  'Jeju-do': '제주도',
};

interface Data {
  clouds:{all:number},
  coord:{lat:number,lon:number},
  dt:number,
  id:number,
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
  name:string,
  sys:{
    country:string,
    sunrise:number,
    sunset:number,
    timezone:number
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
    speed:number
  }
}

function AllCitiesWeather() {
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    const getWeather = async () => {
      const params = {
        id: '1835847,1841610,1843125,1845106,1845105,1845789,1845788,1841597,1902028,1846265',
        appid: apiKey,
        lang: 'kr',
        units: 'metric',
      };
      const res = await axios.get(
        'https://api.openweathermap.org/data/2.5/group',
        {
          params,
        },
      );
      setData(res.data.list);
    };
    getWeather();
  }, []);
  console.log(data);
  
  return (
    <div className="max-w-[600px] min-w-[320px] m-auto bg-slate-50 h-full flex flex-col gap-4 font-sans overflow-y-scroll scrollbar-hide p-8">
      <div className="flex items-center">
        <div className="text-xl text-nowrap font-bold flex-grow flex justify-center items-center flex-row">
          <div className='text-center md:flex font-Ranchers'>
            <p><strong className="text-amber-400">WeatherMate</strong>의 전국날씨</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {data?.length > 0 && (
          <>
            {data.map(item => {
              const cityName = citiesMappingData[item.name as keyof Cities] || item.name;
              const iconURL = `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
              return (
                <div
                  key={item.id}
                  className="bg-amber-100 p-4 rounded-md shadow-xl shadow-[#b8b4ae] justify-center items-center border-amber-300 border-2"
                >
                  <div className="text-center">
                    <h2 className="text-md font-bold">{cityName}</h2>
                    <p className="text-3xl font-bold">{String(item.main.temp).slice(0,2)}°C</p>
                    <div className='flex gap-2 items-center justify-center'>
                      <img src={iconURL} alt="Weather Icon" className="" />
                      <p className="text-md font-bold">{item.weather[0].description}</p>
                    </div>
                    <div className='flex gap-2'>
                      <div className='rounded-md py-2 border border-b-slate-400 shadow-md shadow-slate-400 flex-grow text-nowrap'>
                        <p className="text-md">최고 :{String(item.main.temp_max).slice(0,4)}°C</p>
                      </div>
                      <div className='rounded-md py-2 border border-b-slate-400 shadow-md shadow-slate-400 flex-grow text-nowrap'>
                        <p className="text-md">최저 :{String(item.main.temp_min).slice(0,4)}°C</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

export default memo(AllCitiesWeather);
