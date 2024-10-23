import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
// import gsap from 'gsap';

const apiKey = import.meta.env.VITE_REACT_APP_WEATHER_API_KEY;

function WeatherByTimeZone() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      const { latitude, longitude } = position.coords;
      sessionStorage.setItem('latitude', latitude);
      sessionStorage.setItem('longitude', longitude);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&cnt=14`,
      );
      setWeatherData(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  // useEffect(() => {
  //   const tl = gsap.timeline({defaults: {ease: 'power2.out'}});
  //   tl.from('.fade-in',{opacity: 0,y: 200, duration:2});
  //   return () => {
  //     tl.kill();
  //   }
  // })

  const memoizedWeatherData = useMemo(() => weatherData, [weatherData]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!memoizedWeatherData) {
    return null;
  }

  const unixToHumanTime = unixTimestamp => {
    const date = new Date(unixTimestamp * 1000);
    const hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hour = hours % 12 || 12;
    minutes = minutes === 0 ? '' : ':' + (minutes < 10 ? '0' : '') + minutes;
    return `${hour}${minutes}${ampm}`;
  };

  // 날씨에 따른 아이콘 이미지 변경
  function getIconUrl(iconName) {
    return `https://openweathermap.org/img/wn/${iconName}.png`;
  }

  return (
    <div className="w-full h-1/6 2xl:h-full p-2 box-border bg-white border-4 border-violet-200 rounded-2xl shadow-[0px_4px_10px_rgba(0,0,0,0.2),inset_0px_4px_10px_rgba(255,255,255,0.5)] shadow-violet-200 flex gap-2 overflow-x-scroll scrollbar-hide fade-in">
      {memoizedWeatherData.list.map(item => (
        <div key={item.dt} className="p-2 h-full w-full bg-white border-2 border-slate-200 rounded-xl flex-col text-nowrap">
          <p className="text-xs text-center text-slate-600">
            {unixToHumanTime(item.dt)}
          </p>
          <img
            src={getIconUrl(item.weather[0].icon)}
            alt="Weather Icon"
          />
          <p className="text-center text-sm font-semibold">
            {(item.main.temp - 273.15).toFixed(0)}°C
          </p>
        </div>
      ))}
    </div>
  );
}

export default React.memo(WeatherByTimeZone);
