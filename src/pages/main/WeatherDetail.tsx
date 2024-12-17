import React from "react";

function WeatherDetail() {
  const data = JSON.parse(sessionStorage.getItem("sessionWeather") as string);
  
  function getWindStatus(speed:number) {
    if (speed > 1 && speed < 3) {
      return '보통';
    } else if (speed >= 4) {
      return '위험';
    } else {
      return '높음';
    }
  }
  const unixTime = (time:number) => {
    const date = new Date(time * 1000);
    const hour = (date.getHours() % 12 || 12).toString().padStart(2,"0");
    const minutes = date.getMinutes().toString().padStart(2,"0");
    const ampm = date.getHours() >= 12 ? '오후' : '오전';
    return `${ampm}${hour}:${minutes}`;
  };
  return (
    <>
      {data && (
        <div className="grow flex flex-col w-full h-full justify-center items-center gap-2 font-TTLaundryGothicB text-sm">
          <section className="w-full flex gap-2 justify-between">
            <div className="bg-white w-full h-full text-center text-nowrap flex flex-col gap-1 items-center justify-center p-1 border-[1px] shadow-lg shadow-slate-200 rounded-lg">
              <img src="sunrise.svg" className="w-10" />
              <p className="text-slate-600">일출</p>
              <hr className="border-[1px] border-slate-400 w-3/4"/>
              <p className="text-slate-700">{unixTime(data.sys.sunrise)}</p>
            </div>
            <div className="bg-white w-full h-full text-center text-nowrap flex flex-col gap-1 items-center justify-center p-1 border-[1px] shadow-lg shadow-slate-200 rounded-lg">
              <img src="sunset.svg" className="w-10" />
              <p className="text-slate-600">일몰</p>
              <hr className="border-[1px] border-slate-400 w-3/4"/>
              <p className="text-slate-700">{unixTime(data.sys.sunset)}</p>
            </div>
            <div className="bg-white w-full h-full text-center text-nowrap flex flex-col gap-1 items-center justify-center p-1 border-[1px] shadow-lg shadow-slate-200 rounded-lg">
              <img src="hightemperature.svg" className="w-10" />
              <p className="text-slate-600">최고 온도</p>
              <hr className="border-[1px] border-slate-400 w-3/4"/>
              <p className="text-slate-700">{data.main.temp_max.toFixed(1)}°C</p>
            </div>
            <div className="bg-white w-full h-full text-center text-nowrap flex flex-col gap-1 items-center justify-center p-1 border-[1px] shadow-lg shadow-slate-200 rounded-lg">
              <img src="lowtemperature.svg" className="w-10" />
              <p className="text-slate-600">최저 온도</p>
              <hr className="border-[1px] border-slate-400 w-3/4"/>
              <p className="text-slate-700">{data.main.temp_min.toFixed(1)}°C</p>
            </div>
          </section>
          <section className="w-full flex gap-2 justify-between">
            <div className="bg-white w-full h-full text-center text-nowrap flex flex-col gap-1 items-center justify-center p-1 border-[1px] shadow-lg shadow-slate-200 rounded-lg">
              <img src="humidity.svg" className="w-10" />
              <p className="text-slate-600">습도</p>
              <hr className="border-[1px] border-slate-400 w-3/4"/>
              <p className="text-slate-700">{data.main.humidity}%</p>
            </div>
            <div className="bg-white w-full h-full text-center text-nowrap flex flex-col gap-1 items-center justify-center p-1 border-[1px] shadow-lg shadow-slate-200 rounded-lg">
              <img src="feelslike.svg" className="w-10" />
              <p className="text-slate-600">체감온도</p>
              <hr className="border-[1px] border-slate-400 w-3/4"/>
              <p className="text-slate-700">{(data.main.feels_like).toFixed(1)}°C</p>
            </div>
            <div className="bg-white w-full h-full text-center text-nowrap flex flex-col gap-1 items-center justify-center p-1 border-[1px] shadow-lg shadow-slate-200 rounded-lg">
              <img src="windspeed.svg" className="w-10" />
              <p className="text-slate-600">풍속</p>
              <hr className="border-[1px] border-slate-400 w-3/4"/>
              <p className="text-slate-700">{data.wind.speed}m/s</p>
            </div>
            <div className="bg-white w-full h-full text-center text-nowrap flex flex-col gap-1 items-center justify-center p-1 border-[1px] shadow-lg shadow-slate-200 rounded-lg">
              <img src="uvi.svg" className="w-10" />
              <p className="text-slate-600">자외선</p>
              <hr className="border-[1px] border-slate-400 w-3/4"/>
              <p className="text-slate-700">{getWindStatus(data.wind.speed)}</p>
            </div>
          </section>
        </div>
        )}
    </>
  );
}

export default WeatherDetail;
