import { useRecoilValue } from 'recoil';
import { userWeatherState } from '../../recoil/atom.mjs';
import dummyData from '../../assets/WeatherData';
import { useEffect, useState } from 'react';
import PreviewMbti from '@pages/main/PreviewMbti';
// import { gsap } from 'gsap';

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

  // useEffect(() => {
  //   const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
  //   tl.from('.fade-in', { opacity: 0, y: 200, duration: 1 });
  //   return () => {
  //     tl.kill();
  //   };
  // }, []);

  const imagePath = recommendationImage;
  const fileName = imagePath; 

  return (
    <div className="grow bg-white border-4 border-violet-200 font-sans p-4 rounded-2xl shadow-[0px_4px_10px_rgba(0,0,0,0.2),inset_0px_4px_10px_rgba(255,255,255,0.5)] shadow-violet-200 h-full text-xl md:text-2xl fade-in">
      <div className="h-full flex flex-col items-center gap-2">
        <div className="w-full text-center text-[#80c8ff] font-semibold text-wrap p-4">
          {sessionData && sessionData.useState && sessionData.useState.name ? (
            <h1 className='2xl:text-3xl'>
              {sessionData.useState.name} 메이트님, 환영합니다.
              <br /> WeatherMate입니다.
            </h1>
          ) : (
            <h1 className='2xl:text-3xl'>로그인해주세요.</h1>
          )}
        </div>
        <div className="flex xl:flex-col 2xl:flex-row items-center gap-4 grow">
          <div className="flex flex-col gap-4 h-full">
            <div className="flex flex-col gap-2 grow rounded-xl text-lg font-semibold border-[3px] border-blue-200 shadow-[inset_0px_0px_10px_rgba(255,255,255,0.5)] shadow-blue-300 p-2">
              <p className="text-center text-xl">- 오늘의 Comment -</p>
              <hr className='border-[1px] w-full border-slate-100 2xl:border-slate-300 2xl:border-[1.5px]'/>
              <p>{recomendClothes}</p>
            </div>
            <PreviewMbti />
          </div>
          <img src={fileName} alt="main-img" className="hidden sm:inline sm:w-[200px] 2xl:w-60" />
        </div>
      </div>
    </div>
  );
}

export default TodaysComent;
