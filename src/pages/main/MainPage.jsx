// import AllCitiesWeather from './ChoiceWeather';

import ToTheTopButton from '@components/layout/ToTheTopButton';
// import AllCitiesWeather from './AllCitiesWeather';
import MyLocationWeather from './MyLocationWeather';
import PreviewMbti from './PreviewMbti';
import RecommendationPreview from './RecommendationPreview';
import TodaysComent from './TodaysComent';
import WeatherByTimeZone from './WeatherByTimeZone';
import MainLogin from '@pages/user/MainLogin';
import { useRecoilState } from 'recoil';
import { memberState } from '@recoil/atom.mjs';
import { useState } from 'react';

// import WeatherByTimeZone from './WeatherByTimeZone';

function MainWeather() {
  const user = useRecoilState(memberState);
  console.log(user);
  
  const [childData, setChildData] = useState('');
  const handleChildData = (data) => {
    setChildData(data);
  }
  return (
    <div className="">
      {childData || user && user[0].name ? 
        null
        : <MainLogin onDataChange={handleChildData}/>
      }
      <div className="font-sans overflow-hidden pt-16 px-48 lg:px-56 xl:px-60 flex flex-col flex-nowrap gap-4">
        <div className="flex gap-4">
          <TodaysComent />
          <MyLocationWeather />
        </div>
        <div className="flex flex-col gap-4">
          <WeatherByTimeZone />
          <div className="flex gap-4">
            <RecommendationPreview />
            <PreviewMbti />
          </div>
        </div>
        <ToTheTopButton />
      </div>
    </div>
  );
}

export default MainWeather;
