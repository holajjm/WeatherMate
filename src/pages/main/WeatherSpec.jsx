import { useRecoilState } from "recoil";
import { userWeatherState } from "@recoil/atom.mjs";
import WeatherDetail from "@pages/main/WeatherDetail";

function WeatherSpec() {
  const [userWeather] = useRecoilState(userWeatherState);
  // console.log(userWeather);
  
  const unixToHumanTime = unixTimestamp => {
    const date = new Date(unixTimestamp * 1000);
    const hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM'; // 오전과 오후를 판별합니다.
    const hour = hours % 12 || 12; // 12시간 형식으로 변경합니다.
    minutes = minutes === 0 ? '' : ':' + (minutes < 10 ? '0' : '') + minutes;
    return `${hour}${minutes} ${ampm}`;
  };

  return (
    <div className="w-full h-full flex flex-col gap-2 xl:gap-4 items-center justify-center rounded-xl border-[3px] border-blue-200 shadow-[inset_0px_0px_10px_rgba(255,255,255,0.5)] shadow-blue-300 p-4">
      <p><strong className="text-xl 2xl:text-2xl text-blue-600">웨더메이트</strong>가 알려주는 날씨 정보</p>
      <hr className='border-[1px] w-full border-slate-400 2xl:border-slate-300 2xl:border-[1.5px]'/>
      <div className="grow w-full flex flex-col md:flex md:flex-row lg:flex-col gap-4">

        <div className="flex flex-col gap-4 grow justify-center items-center w-full md:w-1/2 lg:w-full">
          <p className="text-lg xl:text-xl font-bold ">{userWeather.weather[0].description}</p>
          <p className="xl:text-lg">기준 : {unixToHumanTime(userWeather.dt)}</p>
          <div className="flex gap-4 xl:text-lg">
            <div className="flex flex-col justify-center items-center">
              <img src="sunset.svg" className="w-5 h-5" />
              <p>일출:{unixToHumanTime(userWeather.sys.sunrise)}</p>
              <p>일몰:{unixToHumanTime(userWeather.sys.sunset)}</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <img src="dgree.svg" className="w-5 h-5" />
              <p>최고:{(userWeather.main.temp_max - 273.15).toFixed(1)}°C</p>
              <p>최저:{(userWeather.main.temp_min - 274.15).toFixed(1)}°C</p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 lg:w-full xl:h-full">
          <WeatherDetail />
        </div>

      </div>
    </div>
  );
}

export default WeatherSpec;
