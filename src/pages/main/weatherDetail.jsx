import { useRecoilValue } from 'recoil';
import { userWeatherState } from '../../recoil/atom.mjs';

function WeatherDetail() {
  const detailWeather = useRecoilValue(userWeatherState);

  function getWindStatus(speed) {
    if (speed > 1 && speed < 3) {
      return '보통';
    } else if (speed >= 4) {
      return '위험';
    } else {
      return '높음';
    }
  }

  return (
    <>
      {detailWeather && (
        <div className="grow flex md:grid md:grid-cols-2 lg:flex xl:grid xl:grid-cols-2 2xl:flex w-full h-full justify-center items-center gap-2 xl:gap-4 font-sans xl:p-4 xl:box-border">
          <div className="bg-white w-full h-full text-center text-nowrap flex flex-col gap-1 items-center justify-center shadow-md shadow-slate-400 rounded-lg border-[1.5px]">
            <img src="humidity.svg" className="w-10" />
            <p className="text-slate-600">습도</p>
            <hr className="border-[1px] border-slate-400 w-3/4"/>
            <p className="font-bold 2xl:text-xl text-slate-700">{detailWeather.main.humidity} %</p>
          </div>
          <div className="bg-white w-full h-full text-center text-nowrap flex flex-col gap-1 items-center justify-center shadow-md shadow-slate-400 rounded-lg border-[1.5px]">
            <img src="feelslike.svg" className="w-10" />
            <p className="text-slate-600">체감온도</p>
            <hr className="border-[1px] border-slate-400 w-3/4"/>
            <p className="font-bold 2xl:text-xl text-slate-700">{(detailWeather.main.feels_like - 269.15).toFixed(1)}°C</p>
          </div>
          <div className="bg-white w-full h-full text-center text-nowrap flex flex-col gap-1 items-center justify-center shadow-md shadow-slate-400 rounded-lg border-[1.5px]">
            <img src="windspeed.svg" className="w-10" />
            <p className="text-slate-600">풍속</p>
            <hr className="border-[1px] border-slate-400 w-3/4"/>
            <p className="font-bold 2xl:text-xl text-slate-700">{detailWeather.wind.speed} m/s</p>
          </div>
          <div className="bg-white w-full h-full text-center text-nowrap flex flex-col gap-1 items-center justify-center shadow-md shadow-slate-400 rounded-lg border-[1.5px]">
            <img src="uvi.svg" className="w-10" />
            <p className="text-slate-600">자외선</p>
            <hr className="border-[1px] border-slate-400 w-3/4"/>
            <p className="font-bold 2xl:text-xl text-slate-700">{getWindStatus(detailWeather.wind.speed)}</p>
          </div>
        </div>
        )}
    </>
  );
}

export default WeatherDetail;
