import React,{ useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Coment from '../../assets/Coment';
import { WeatherImage } from 'type';

function TodaysComent() {
  const [recommendClothes, setRecommendClothes] = useState<string>("");
  const [recommendationImage, setRecommendationImage] = useState<string>("");
  const [storageUser, setStorageUser] = useState(null);
  const data = JSON.parse(sessionStorage.getItem('sessionWeather') as string);

  useEffect(() => {
    const sessionUser = sessionStorage.getItem('saveUser');
    if (sessionUser) {
      setStorageUser(JSON.parse(sessionUser));
    }
  }, []);

  useEffect(() => {
    const getRecommendedClothes = () => {
      const userTemperature = data?.main.temp - 273.15;

      let closestTemperature = Coment[0].temperature; // 가장 가까운 온도로 초기화
      let selectedDummyData = Coment[0]; // 가장 가까운 온도에 해당하는 데이터로 초기화

      for (let i = 1; i < Coment.length; i++) {
        if (
          Math.abs(userTemperature - Coment[i].temperature) <
          Math.abs(userTemperature - closestTemperature)
        ) {
          closestTemperature = Coment[i].temperature;
          selectedDummyData = Coment[i];
        }
      }
      setRecommendClothes(selectedDummyData?.recommendation);
      setRecommendationImage(selectedDummyData?.CLOTHES_IMG);
    };
    getRecommendedClothes();
  }, [data]);

  const imagePath = recommendationImage;

  const defaultImgPath = '/01.svg';
  const weatherImageMapping:WeatherImage = {
    Clear: '/uvi.svg',
    Clouds: '/manyClouds.svg',
    Rain: '/rain.svg',
    Drizzle: '/rain.svg',
    Thunderstorm: '/thunderStorm.svg',
    Snow: '/mainSnow.svg',
    Haze: '/Haze.svg',
    Mist: '/Mist.svg',
    Smoke: '/manyClouds.svg',
    Dust: '/manyClouds.svg',
    overcastClouds: '/sun.svg',
  };

  // userWeather가 존재하고, userWeather.weather 배열의 첫 번째 요소의 description이 있는 경우에만 이미지 경로를 설정
  const getImagePathForWeather = () => {
    if (!data || !data.weather || data.weather.length === 0)
      return defaultImgPath; // userWeather나 userWeather.weather가 없으면 기본 이미지 반환
    const englishDescription = data.weather[0].main; // 영어로된 날씨 설명 가져오기
    // 영어로 된 날씨 설명에 해당하는 이미지 경로 반환
    return weatherImageMapping[englishDescription as keyof WeatherImage] || defaultImgPath;
  };

  const imagePath1 = getImagePathForWeather(); // getImagePathForWeather 함수 호출하여 imagePath 설정

  const RealImage:WeatherImage = {
    Clear: './realImage/SunnyRealImage.svg', //text-slate-700
    Clouds: './realImage/CloudyRealImage.svg', //text-slate-200
    Rain: './realImage/RainyRealImage.svg', //text-slate-200
    Drizzle: './realImage/RainyRealImage.svg', //text-slate-200
    Thunderstorm: './realImage/RainyRealImage.svg', //text-slate-200
    Snow: './realImage/SnowRealImage.svg', //text-slate-200
    Haze: './realImage/HazeRealImage.svg', //text-slate-700
    Mist: './realImage/HazeRealImage.svg', //text-slate-700
    Smoke: './realImage/HazeRealImage.svg', //text-slate-700
    Dust: './realImage/HazeRealImage.svg', //text-slate-700
    overcastClouds: './realImage/SunnyRealImage.svg', //text-slate-700
  };
  const getRealImage = () => {
    if (data && data.weather && data.weather.length !== 0) {
      return RealImage[data.weather[0].main as keyof WeatherImage];
    }
    return null;
  };
  const realImage = getRealImage();
  // console.log(data);

  return (
    <div className="p-2 flex flex-col gap-2 items-center bg-slate-50 font-TTLaundryGothicB h-full fade-in">
      <div className="w-full flex justify-between text-left text-lg font-bold text-wrap">
        {storageUser && (storageUser as any).useState?.name ? (
          <div>
            <Link to={'/user/mypage'} className="text-blue-400">
              {(storageUser as any).useState?.name}
            </Link>
            님,
            <h1>
              환영해요! <br />
              WeatherMate입니다!
            </h1>
          </div>
        ) : (
          <div>
            <Link
              to={'/user/validlogin'}
              className="font-medium hover:text-blue-600"
            >
              로그인
            </Link>
            해주세요
            <h1>
              환영해요! <br />
              WeatherMate입니다!
            </h1>
          </div>
        )}
        <section
          style={{ backgroundImage: `url(${realImage})` }}
          className={`border-2 w-1/2 text-base text-nowrap ${['Clouds', 'Rain', 'Drizzle', 'Thunderstorm', 'Snow'].includes(data.weather[0].main) ? 'text-slate-200' : 'text-slate-700'} flex gap-4 rounded-xl p-4 box-border bg-white bg-cover bg-no-repeat bg-center`}
        >
          <div className="w-2/3 flex flex-col gap-2 justify-between">
            <div className="">
              <p className="text-lg">
                {String(new Date()).slice(4, 7)},
                {String(new Date()).slice(8, 11)}
              </p>
              <p className="">{String(new Date()).slice(0, 3)}</p>
            </div>
            <div className="">
              <p className="">{data.weather && data.weather[0].description}</p>
              <p className="">
                {data && String(data.main?.temp).slice(0, 3)}°C
              </p>
            </div>
          </div>
          <div className="w-1/3 text-center flex flex-col gap-2">
            <img src={imagePath1} alt="weatherIcon" className="w-14 m-auto" />
            <div>
              <p>강수량</p>
              <p className="text-base">
                {data.rain ? data?.rain?.['1h'] : '00'}mm
              </p>
            </div>
          </div>
        </section>
      </div>
      <div className="w-full text-center grow">
        <p className="font-SSRONETHandwritten text-amber-500 text-xl font-bold rounded-xl bg-amber-200 p-2">
          {recommendClothes}
        </p>
        <img src={imagePath} alt="main-img" className="w-56 m-auto" />
      </div>
    </div>
  );
}

export default TodaysComent;
