// import AllCitiesWeather from './ChoiceWeather';

import ToTheTopButton from '@components/layout/ToTheTopButton';
// import AllCitiesWeather from './AllCitiesWeather';
import MyLocationWeather from './MyLocationWeather';
import PreviewMbti from './PreviewMbti';
import RecommendationPreview from './RecommendationPreview';
import TodaysComent from './TodaysComent';
import WeatherByTimeZone from './WeatherByTimeZone';

// import WeatherByTimeZone from './WeatherByTimeZone';

function MainWeather() {
  return (
    <div className="font-sans overflow-hidden pt-16 px-48 lg:px-56 xl:px-60 flex flex-col flex-nowrap gap-4">
        <div className="flex gap-4">
          <TodaysComent />
          <MyLocationWeather />
        </div>
        <div className="flex flex-col gap-4">
          <WeatherByTimeZone />
          <div className='flex gap-4'>
            <RecommendationPreview />
            <PreviewMbti />
          </div>
        </div>
        <ToTheTopButton />
    </div>
  );
}

export default MainWeather;
