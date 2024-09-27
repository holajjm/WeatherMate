import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';

const apiKey = import.meta.env.VITE_REACT_APP_WEATHER_API_KEY;
const citiesMappingData = {
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

function AllCitiesWeather() {
  const [data, setData] = useState(null);

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

  useEffect(() => {
    const floatTl = gsap.to('.aniFloat', {
      y: 20,
      duration: 1,
      repeat: -1,
      yoyo: true,
    });
    return () => {
      floatTl.kill();
    };
  })

  return (
    <div className='flex flex-col gap-4 pt-4 pb-8 mt-16 px-20 sm:px-40 md:px-48 md:mt-0 lg:px-56 xl:px-60'>
      <div className="flex items-center">
        <div className=" text-xl text-nowrap md:text-2xl font-bold flex-grow flex justify-center items-center flex-row">
          <div className='text-center text-xl md:text-2xl md:flex '>
            <p>WeathreMate의 전국날씨</p>
            <p>({new Date().toLocaleString().slice(13,20)} 기준)</p>
          </div>
          <img src="clothes-m-2.svg" className="w-20 mb-2 hidden aniFloat md:inline" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
        {data?.length > 0 && (
          <>
            {data.map(item => {
              const cityName = citiesMappingData[item.name] || item.name;
              const iconURL = `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
              return (
                <div
                  key={item.id}
                  className="bg-[#fffdea] p-2 md:p-4 rounded-md shadow-lg shadow-[#b8b4ae] justify-center items-center border-[#ffe3b8] border-2"
                >
                  <div className="text-center">
                    <h2 className="text-md font-bold">{cityName}</h2>
                    <p className="text-3xl">{String(item.main.temp).slice(0,2)}°C</p>
                    <div className='flex gap-2 items-center justify-center'>
                      <img src={iconURL} alt="Weather Icon" className="" />
                      <p className="text-sm font-bold">{item.weather[0].description}</p>
                    </div>
                    <div className='flex gap-2'>
                      <div className='rounded-md py-2 border border-b-slate-400 shadow-md shadow-slate-400 flex-grow text-nowrap'>
                        <p className="text-[14px]">최고 :{String(item.main.temp_max).slice(0,4)}°C</p>
                      </div>
                      <div className='rounded-md py-2 border border-b-slate-400 shadow-md shadow-slate-400 flex-grow text-nowrap'>
                        <p className="text-[14px]">최저 :{String(item.main.temp_min).slice(0,4)}°C</p>
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

export default React.memo(AllCitiesWeather);
