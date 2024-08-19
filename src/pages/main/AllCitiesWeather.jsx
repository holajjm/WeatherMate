import axios from 'axios';
import React, { useEffect, useState } from 'react';

const apiKey = import.meta.env.VITE_REACT_APP_WEATHER_API_KEY;

function AllCitiesWeather() {
  const [data, setData] = useState(null);

  const weatherData = async () => {
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
    return res;
  };

  const getWeather = async () => {
    const res = await weatherData();
    setData(res.data.list);
  };

  useEffect(() => {
    getWeather();
  }, []);

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
    // 여기에 더 많은 도시를 추가할 수 있습니다.
  };

  function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}시${minutes}분`;
  }
  console.log('allciteis', data);

  return (
    <div className='flex flex-col mt-16 px-48 lg:px-56 xl:px-60'>
      <div className="flex items-center">
        <h1 className="text-2xl font-bold flex-grow">WeathreMate의 전국날씨(<p className='inline text-lg'>현재 시각 : {getCurrentTime()}</p>)</h1>
        <img src="clothes-m-2.svg" className="w-20" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
        {data?.length > 0 && (
          <>
            {data.map(item => {
              const cityName = citiesMappingData[item.name] || item.name;
              const iconURL = `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
              return (
                <div
                  key={item.id}
                  className="bg-white md:p-4 rounded-md shadow-md px-7 justify-center items-center border-primary border-2"
                >
                  <div className="text-center">
                    <h2 className="text-lg font-bold">{cityName}</h2>
                    <img src={iconURL} alt="Weather Icon" className="mx-auto" />
                    <p className="text-base">
                      날씨: {item.weather[0].description}
                    </p>
                    <p className="text-xs">현재 온도: {item.main.temp}°C</p>
                    <p className="text-xs">
                      체감 온도: {item.main.feels_like}°C
                    </p>
                    <p className="text-sm">시간별</p>
                    <p className="text-xs">최고 :{item.main.temp_max}°C</p>
                    <p className="text-xs">최저 :{item.main.temp_min}°C</p>
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
