import TodaysComent from './TodaysComent';
import MyLocationWeather from './MyLocationWeather';
import WeatherByTimeZone from './WeatherByTimeZone';
import RecommendationPreview from './RecommendationPreview';
import PreviewMbti from './PreviewMbti';
import ToTheTopButton from '@components/layout/ToTheTopButton';

function MainWeather() {
  return (
    <div className="bg-gray-100 flex flex-col gap-4 font-sans overflow-hidden px-20 pt-24 pb-8 md:py-8 md:px-48 lg:px-56  xl:px-60 lg:grid lg:grid-cols-2 min-w-[375px] ">
      <TodaysComent />
      <MyLocationWeather />
      <div className="xl:col-span-2">
        <WeatherByTimeZone />
      </div>
      <RecommendationPreview />
      <PreviewMbti />
      <ToTheTopButton />
    </div>
  );
}

export default MainWeather;
