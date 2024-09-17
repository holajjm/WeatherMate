import { useRecoilValue } from 'recoil';
import { userWeatherState } from '../../recoil/atom.mjs';
import dummyData from '../../assets/WeatherData';
import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

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
    tl.from('.comment-text', { opacity: 0, x: -100, duration: 1 });
    tl.from('.comment-text2', { opacity: 0, x: 100, duration: 1 });
    return () => {
      // Clean up animations
      tl.kill();
    };
  }, []);

  const imagePath = recommendationImage;
  const fileName = imagePath; // 경로에서 파일 이름 추출

  return (
    <div className="font-sans border-2 rounded-2xl shadow-md shadow-violet-200/100 border-violet-200 flex-grow ">
      <div className="">
        <div className="flex flex-col">
          {/* user name 받아와 저장해야합니다 */}
          <div className="text-primary text-2xl">
            {sessionData &&
            sessionData.useState &&
            sessionData.useState.name
              ? `환영합니다! ${sessionData.useState.name} 메이트님!`
              : '로그인해주세요.'}
          </div>
          {/*p태그 gsap 애니메이션 comment-text  */}
          <p className="truncate w-full text-2xl font-semibold whitespace-pre-line">
            {recomendClothes}
          </p>
          <Link to="/allcity" className="flex">
            <p className='bg-indigo-100'>전국날씨</p>
            <MdOutlineKeyboardArrowRight />
          </Link>
        </div>
      </div>
      <img
        src={fileName}
        alt="main-img"
        className="w-[200px] "
      />
      {/* 이미지 gsap 애니메이션 comment-text2 */}
    </div>
  );
}

export default TodaysComent;
