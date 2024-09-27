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
      <div className="flex flex-col justify-center items-center border-2 w-full p-2 rounded-xl shadow-slate-200 shadow-[0px_4px_10px_rgba(0,0,0,0.2),inset_0px_4px_10px_rgba(255,255,255,0.5)]">
        <p><strong className="text-xl text-blue-600">웨더메이트</strong>가 알려주는 상세 날씨</p>
        {detailWeather && (
          <div className="flex justify-center items-center gap-2 font-sans">
            <div className="bg-white w-[77px] h-[88px] flex flex-col items-center justify-center shadow-lg shadow-slate-400 rounded-lg">
              <img src="humidity.svg" className="w-[31px] " />
              <p className="text-[#00179C] font-medium">습도</p>
              <p>{detailWeather.main.humidity} %</p>
            </div>
            <div className="bg-white w-[77px] h-[88px] flex flex-col items-center justify-center shadow-lg shadow-slate-400 rounded-lg">
              <img src="feelslike.svg" className="w-[31px] " />
              <p className="text-[#00179C] font-medium">체감온도</p>
              <p>{(detailWeather.main.feels_like - 269.15).toFixed(1)}°C</p>
            </div>
            <div className="bg-white w-[77px] h-[88px] flex flex-col items-center justify-center shadow-lg shadow-slate-400 rounded-lg">
              <img src="windspeed.svg" className="w-[31px] " />
              <p className="text-[#00179C] font-medium">풍속</p>
              <p>{detailWeather.wind.speed} m/s</p>
            </div>
            <div className="bg-white w-[77px] h-[88px] flex flex-col items-center justify-center shadow-lg shadow-slate-400 rounded-lg">
              <img src="uvi.svg" className="w-[31px] " />
              <p className="text-[#00179C] font-medium">자외선</p>
              <p>{getWindStatus(detailWeather.wind.speed)}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default WeatherDetail;
