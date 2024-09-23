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
  const handleChildData = data => {
    setChildData(data);
  };
  return (
    <div className="">
      {childData || (user && user[0].name) ? null : (
        <MainLogin onDataChange={handleChildData} />
      )}
      <div className="flex flex-col gap-4 font-sans overflow-hidden px-20 pt-24 pb-8 md:py-8 md:px-48 lg:px-56  xl:px-60 lg:grid lg:grid-cols-2 min-w-[375px]">
        <TodaysComent />
        <MyLocationWeather />
        <div className="xl:col-span-2">
          <WeatherByTimeZone />
        </div>
        <RecommendationPreview />
        <PreviewMbti />
        <ToTheTopButton />
      </div>
    </div>
  );
}

export default MainWeather;
