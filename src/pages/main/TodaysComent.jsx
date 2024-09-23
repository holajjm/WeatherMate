import { useRecoilValue } from 'recoil';
import { userWeatherState } from '../../recoil/atom.mjs';
import dummyData from '../../assets/WeatherData';
import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
// import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

/** 날씨에 따른 의상 추천 & 이미지 보여주기 */
function TodaysComent() {
  const userWeather = useRecoilValue(userWeatherState); // Recoil 상태만 가져오기
  const [recomendClothes, setRecomendClothes] = useState(null);
  const [recommendationImage, setRecommendationImage] = useState(null);
  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    // 세션에서 데이터 가져오기
    const sessionString = sessionStorage.getItem('saveUser');
    if (sessionString) {
      const sessionObj = JSON.parse(sessionString); // JSON 문자열 파싱
      setSessionData(sessionObj);
    }
  }, []); // 컴포넌트가 마운트될 때만 실행되도록 빈 배열을 두 번째 매개변수로 전달

  // const [mainImgUrl, setMainImgUrl] = useState(null);

  // console.log('session', sessionData);

  // 온도 비즈니스 로직
  useEffect(() => {
    const getRecommendedClothes = () => {
      const userTemperature = userWeather?.main.temp - 273.15;
      // test할 때 여기 온도 바꿔서 테스 디폴트는 273.15
      // 4도 이하일 땐 298.15
      // 8도 이하일 땐 291.15
      // 12도 이하일 땐 289.15
      // 16도 이하일 땐 285.15
      // 19도 이하일 땐 281.15
      // 22도 이하일 땐 278.15
      // 27도 이하일 땐 273.15
      // 29도 이하일 땐 271

      // console.log('현재온도', userTemperature);
      let closestTemperature = dummyData[0].temperature; // 가장 가까운 온도로 초기화
      let selectedDummyData = dummyData[0]; // 가장 가까운 온도에 해당하는 데이터로 초기화

      // 더미 데이터를 기반으로 가장 가까운 온도 선택
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

  // 메인화면 애니메이션
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power1.out' } });
    tl.from('.fade-in-from-NS', { opacity: 0, y: 200, duration: 1 });
    return () => {
      // Clean up animations
      tl.kill();
    };
  }, []);

  const imagePath = recommendationImage;
  const fileName = imagePath; // 경로에서 파일 이름 추출

  return (
    <div className="font-sans p-4 rounded-2xl shadow-[0px_4px_10px_rgba(0,0,0,0.2),inset_0px_4px_10px_rgba(255,255,255,0.5)] shadow-violet-300 h-full text-lg md:text-2xl fade-in-from-NS">
      <div className="flex flex-col items-center gap-2">
        {/* user name 받아와 저장 */}
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
              <p className="">전국날씨 보러가기</p>
              {/* <MdOutlineKeyboardArrowRight /> */}
            </Link>
          </div>
          <img src={fileName} alt="main-img" className="w-[200px]" />
        </div>
      </div>
    </div>
  );
}

export default TodaysComent;
