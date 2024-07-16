// import AllCitiesWeather from './ChoiceWeather';

import ToTheTopButton from '@components/layout/ToTheTopButton';
// import AllCitiesWeather from './AllCitiesWeather';
import MyLocationWeather from './MyLocationWeather';
import PreviewMbti from './PreviewMbti';
import RecommendationPreview from './RecommendationPreview';
import TodaysComent from './TodaysComent';
import WeatherByTimeZone from './WeatherByTimeZone';
import WeatherDetail from './weatherDetail';

// import WeatherByTimeZone from './WeatherByTimeZone';

function MainWeather() {
  return (
    <div className="font-sans overflow-hidden pt-16 px-48 lg:px-56 xl:px-60 ">
      <div className="">
        <div className="">
          <div className="">
            <div className="flex">
              <TodaysComent />
              <MyLocationWeather />
            </div>
            <div className="">
              <WeatherByTimeZone />
              <WeatherDetail />
              <RecommendationPreview />
              <PreviewMbti />
            </div>
          </div>
        </div>
        <ToTheTopButton />
      </div>
    </div>
  );
}

export default MainWeather;
