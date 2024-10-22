import TodaysComent from './TodaysComent';
import MyLocationWeather from './MyLocationWeather';
import RecommendationPreview from './RecommendationPreview';
import ToTheTopButton from '@components/layout/ToTheTopButton';
import RecommendationCommunity from '@pages/main/RecommendationCommunity';

function MainWeather() {
  return (
    <div className="bg-gray-100 xl:h-screen h-full flex flex-col gap-4 font-sans overflow-y-scroll scrollbar-hide p-8 md:px-20 xl:px-56 2xl:px-60 min-w-[375px] ">
      <div className='flex flex-col w-full h-full xl:flex-row gap-4'>
        <TodaysComent />
        <MyLocationWeather />
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
