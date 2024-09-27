import { useRecoilValue } from 'recoil';
import { userWeatherState } from '../../recoil/atom.mjs';
import dummyData from '../../assets/WeatherData';
import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

function TodaysComent() {
  const userWeather = useRecoilValue(userWeatherState);
  const [recomendClothes, setRecomendClothes] = useState(null);
  const [recommendationImage, setRecommendationImage] = useState(null);
  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    const sessionString = sessionStorage.getItem('saveUser');
    if (sessionString) {
      const sessionObj = JSON.parse(sessionString);
      setSessionData(sessionObj);
    }
  }, []); 

  useEffect(() => {
    const getRecommendedClothes = () => {
      const userTemperature = userWeather?.main.temp - 273.15;
      // default 273.15
      // 4도 이하일 땐 298.15
      // 8도 이하일 땐 291.15
      // 12도 이하일 땐 289.15
      // 16도 이하일 땐 285.15
      // 19도 이하일 땐 281.15
      // 22도 이하일 땐 278.15
      // 27도 이하일 땐 273.15
      // 29도 이하일 땐 271
      let closestTemperature = dummyData[0].temperature; // 가장 가까운 온도로 초기화
      let selectedDummyData = dummyData[0]; // 가장 가까운 온도에 해당하는 데이터로 초기화

      for (let i = 1; i < dummyData.length; i++) {
        if (
          Math.abs(userTemperature - dummyData[i].temperature) <
          Math.abs(userTemperature - closestTemperature)
        ) {
          closestTemperature = dummyData[i].temperature;
          selectedDummyData = dummyData[i];
        }
      }
      setRecomendClothes(selectedDummyData?.recommendation);
      setRecommendationImage(selectedDummyData?.CLOTHES_IMG);
    };
    getRecommendedClothes();
  }, [userWeather]);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power1.out' } });
    tl.from('.fade-in-from-NS', { opacity: 0, y: 200, duration: 1 });
    return () => {
      tl.kill();
    };
  }, []);

  const imagePath = recommendationImage;
  const fileName = imagePath; 

  return (
    <div className="font-sans p-4 rounded-2xl shadow-[0px_4px_10px_rgba(0,0,0,0.2),inset_0px_4px_10px_rgba(255,255,255,0.5)] shadow-violet-300 h-full text-lg md:text-2xl fade-in-from-NS">
      <div className="flex flex-col items-center gap-2">
        <div className="text-[#80c8ff] font-semibold text-wrap">
          {sessionData && sessionData.useState && sessionData.useState.name ? (
            <h1>
              {sessionData.useState.name} 메이트님, 환영합니다.
              <br /> WeatherMate입니다.
            </h1>
          ) : (
            '로그인해주세요.'
          )}
        </div>
        <div className="flex">
          <div className="flex flex-col gap-2">
            <div className="border-2 grow rounded-md text-lg font-semibold shadow-[inset_0px_2px_10px_rgba(255,255,255,0.5)] shadow-slate-400 p-2">
              <p className="text-center">- 오늘의 Comment -</p>
              <h3>{recomendClothes}</h3>
            </div>
            <Link
              to="/allcity"
              className="flex justify-center items-center text-base font-semibold text-white bg-indigo-500 h-10 text-pretty rounded-lg p-1 hover:bg-indigo-700 hover:shadow-[0_5px_30px_4px] hover:shadow-slate-400 duration-200 transition-all"
            >
              전국날씨 보러가기
            </Link>
          </div>
          <img src={fileName} alt="main-img" className="w-[200px]" />
        </div>
      </div>
    </div>
  );
}

export default TodaysComent;
