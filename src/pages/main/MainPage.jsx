import TodaysComent from './TodaysComent';
import MyLocationWeather from './MyLocationWeather';
import WeatherByTimeZone from './WeatherByTimeZone';
import RecommendationPreview from './RecommendationPreview';
import ToTheTopButton from '@components/layout/ToTheTopButton';
import RecommendationCommunity from '@pages/main/RecommendationCommunity';

function MainWeather() {
  return (
    <div className="bg-gray-100 xl:h-screen h-full flex flex-col gap-4 font-sans overflow-y-scroll px-20 pt-24 pb-8 md:py-8 lg:px-48 xl:px-56 2xl:px-60 min-w-[375px] ">
      <div className='flex flex-col h-full xl:flex-row gap-4'>
        <TodaysComent />
        <MyLocationWeather />
      </div>
      <div className=''>
        <WeatherByTimeZone />
      </div>
      <div className='flex flex-col xl:flex-row gap-4 h-full'>
        <RecommendationPreview />
        <RecommendationCommunity />
      </div>
      <ToTheTopButton />
    </div>
  );
}

export default MainWeather;
