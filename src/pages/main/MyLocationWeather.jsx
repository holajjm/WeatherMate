import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userWeatherState } from '../../recoil/atom.mjs';
import Loading from '../../components/layout/Loading';
import WeatherDetail from '@pages/main/weatherDetail';
// import gsap from 'gsap';

const MyLocationWeather = () => {
  const [myPlace, setMyPlace] = useState('');
  const [userWeather, setUserWeather] = useRecoilState(userWeatherState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionData = sessionStorage.getItem('userWeather');
    if (sessionData) {
      setUserWeather(JSON.parse(sessionData));
      setMyPlace(sessionStorage.getItem('myPlace')); 
      setLoading(false);
    } else {
      getUserWeather();
    }
  }, []);

  const getUserWeather = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        try {
          const apiKey = import.meta.env.VITE_REACT_APP_WEATHER_API_KEY;
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=kr`,
          );
          setUserWeather(response.data);
          setMyPlace(response.data.name);
          setLoading(false);
          sessionStorage.setItem('userWeather', JSON.stringify(response.data));
          sessionStorage.setItem('myPlace', response.data.name);
        } catch (error) {
          console.error(
            '데이터를 원활하게 가져오는데 오류가 발생하였습니다.',
            error,
          );
          setLoading(false);
        }
      });
    }
  };
  // console.log('mylocationWeather:', userWeather);
  const defaultImgPath = '/01.svg'; // 디폴트 이미지 경로
  const weatherImageMapping = {
    Clear: '/uvi.svg',
    Clouds: '/manyClouds.svg',
    Rain: '/rain.svg',
    Drizzle: '/rain.svg',
    Thunderstorm: '/thunderStorm.svg',
    Snow: '/mainSnow.svg',
    Mist: '/Mist.svg',
    overcastClouds: '/sun.svg',
  };

  // userWeather가 존재하고, userWeather.weather 배열의 첫 번째 요소의 description이 있는 경우에만 이미지 경로를 설정
  const getImagePathForWeather = () => {
    if (
      !userWeather ||
      !userWeather.weather ||
      userWeather.weather.length === 0
    )
    return defaultImgPath; // userWeather나 userWeather.weather가 없으면 기본 이미지 반환
    const englishDescription = userWeather.weather[0].main; // 영어로된 날씨 설명 가져오기
    // 영어로 된 날씨 설명에 해당하는 이미지 경로 반환
    return weatherImageMapping[englishDescription] || defaultImgPath;
  };
  const imagePath = getImagePathForWeather(); // getImagePathForWeather 함수 호출하여 imagePath 설정

  const unixToHumanTime = unixTimestamp => {
    const date = new Date(unixTimestamp * 1000);
    const hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM'; // 오전과 오후를 판별합니다.
    const hour = hours % 12 || 12; // 12시간 형식으로 변경합니다.
    minutes = minutes === 0 ? '' : ':' + (minutes < 10 ? '0' : '') + minutes;
    return `${hour}${minutes} ${ampm}`;
  };

  // useEffect(() => {
  //   const tl = gsap.timeline({defaults: {ease: 'power2.out'}});
  //   tl.from('.fade-in',{opacity: 0, y: 200, duration: 1.5});
  //   return () => {
  //     tl.kill();
  //   }
  // },[])

  return (
    <div  className="grow bg-white border-4 border-violet-200 rounded-2xl p-4 shadow-[0px_4px_10px_rgba(0,0,0,0.2),inset_0px_4px_10px_rgba(255,255,255,0.5)] shadow-violet-200  fade-in">
      {loading ? (
        <Loading />
      ) : (
        <div style={{backgroundImage: `url(${imagePath})`}} className='flex flex-col items-center justify-between relative h-full bg-contain bg-center bg-no-repeat'>
          {userWeather && (
            <>
              <div className="text-5xl font-bold text-center">
                <h2 className="text-xl font-bold">{myPlace}</h2>
                {(userWeather.main.temp - 273.15).toFixed(1)}°C
              </div>
              <p className="text-lg font-bold ">
                {userWeather.weather[0].description}
              </p>
              <p className="">기준 : {unixToHumanTime(userWeather.dt)}</p>

              <div className="flex gap-5">
                <div className="flex flex-col justify-center items-center">
                  <img src="sunset.svg" className="w-5 h-5" />
                  <p>일출:{unixToHumanTime(userWeather.sys.sunrise)}</p>
                  <p>일몰:{unixToHumanTime(userWeather.sys.sunset)}</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <img src="dgree.svg" className="w-5 h-5" />
                  <p>최고:{(userWeather.main.temp_max - 273.15).toFixed(1)}°C</p>
                  <p>최저:{(userWeather.main.temp_min - 274.15).toFixed(1)}°C</p>
                </div>
              </div>
              <WeatherDetail />
            </>
          )}

        </div>
      )}
    </div>
  );
};
export default React.memo(MyLocationWeather);