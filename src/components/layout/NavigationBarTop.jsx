import { Link, useLocation } from 'react-router-dom';

function NavigationBarTop() {
  const location = useLocation();
  // console.log(location)
  
   // 새로고침 함수
  const handleRefresh = () => {
    sessionStorage.removeItem('userWeather'); // 세션 스토리지 데이터 제거
    sessionStorage.removeItem('myPlace');
    if(location.pathname === "/main"){
      window.location.reload(); // 페이지 새로고침
    }
  };
  return (
    <>
      <div className='w-full flex gap-2 items-center justify-center h-16 bg-slate-100 border-b-2 fixed top-0 z-50 shadow-inner '>
        <button className='w-14  h-full opacity-60 md:hidden'><img src="/weatherMateLogo.svg" alt="weatherMateLogo" /></button>
        <Link to="/main" className='text-4xl text-amber-300 font-extrabold font-UhBeeKang-Ja'>WeatherMate</Link>
      </div>
      <div className="w-full text-white h-16 items-center justify-between bg-[#ddeef9] fixed top-0 z-50 shadow-inner hidden md:flex md:px-20 lg:px-56 xl:px-60">
        <Link to="/main">
          <img
            src="/weatherMateLogo.svg"
            alt="weathermate logo"
            className="w-16"
            onClick={handleRefresh}
          />
        </Link>
        <div className="flex text-center gap-4 py-2 w-1/2 h-full leading-[48px]">
          <Link
            to="/main"
            className={`grow text-gray_04 font-bold hover:text-primary hover:scale-110 transition-all duration-500 ${
              location.pathname === '/main' ? 'text-primary border-2 rounded-lg border-slate-300 bg-white font-extrabold' : ''
            }`}
          >
            <p className="text-nowrap">홈</p>
          </Link>

          <Link
            to="/community"
            className={`grow text-gray_04 font-bold hover:text-primary hover:scale-110 transition-all duration-500 ${
              location.pathname === '/community' ? 'text-primary border-2 rounded-lg border-slate-300 bg-white font-extrabold' : ''
            }`}
          >
            <p className="text-nowrap">커뮤니티</p>
          </Link>

          <Link
            to="/location"
            className={`grow text-gray_04 font-bold hover:text-primary hover:scale-110 transition-all duration-500 ${
              location.pathname === '/location' ? 'text-primary border-2 rounded-lg border-slate-300 bg-white font-extrabold' : ''
            }`}
          >
            <p className="text-nowrap">장소추천</p>
          </Link>

          <Link
            to="/user/mypage"
            className={`grow text-gray_04 font-bold hover:text-primary hover:scale-110 transition-all duration-500 ${
              location.pathname === '/user/mypage' ? 'text-primary border-2 rounded-lg border-slate-300 bg-white font-extrabold' : ''
            }`}
          >
            <p className="text-nowrap">마이페이지</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export default NavigationBarTop;
