import { Link, useLocation } from 'react-router-dom';

function NavigationBarTop() {
  const location = useLocation();

   // 새로고침 함수
  const handleRefresh = () => {
    sessionStorage.removeItem('userWeather'); // 세션 스토리지 데이터 제거
    sessionStorage.removeItem('myPlace');
    window.location.reload(); // 페이지 새로고침
  };
  return (
    <>
      <div className="w-full text-white h-16 items-center justify-between bg-[#EEF8FF] fixed top-0 z-50 shadow-inner hidden md:flex md:px-20 lg:px-56 xl:px-60">
        <Link to="/main">
          <img
            src="/weatherMateLogo.svg"
            alt="weathermate logo"
            className="w-16"
            onClick={handleRefresh}
          />
        </Link>
        <div className="flex gap-16 py-2 h-full leading-[48px] xl:gap-24">
          <Link
            to="/main"
            className={`text-gray_04 font-bold hover:text-primary hover:scale-110 transition-all duration-500 ${
              location.pathname === '/main' ? 'text-primary border-2 rounded-lg border-slate-300' : ''
            }`}
          >
            <p className="text-nowrap">홈</p>
          </Link>

          <Link
            to="/community"
            className={`text-gray_04 font-bold hover:text-primary hover:scale-110 transition-all duration-500 ${
              location.pathname === '/community' ? 'text-primary border-2 rounded-lg border-slate-300' : ''
            }`}
          >
            <p className="text-nowrap">커뮤니티</p>
          </Link>

          <Link
            to="/location"
            className={`text-gray_04 font-bold hover:text-primary hover:scale-110 transition-all duration-500 ${
              location.pathname === '/location' ? 'text-primary border-2 rounded-lg border-slate-300' : ''
            }`}
          >
            <p className="text-nowrap">장소추천</p>
          </Link>

          <Link
            to="/user/mypage"
            className={`text-gray_04 font-bold hover:text-primary hover:scale-110 transition-all duration-500 ${
              location.pathname === '/user/mypage' ? 'text-primary border-2 rounded-lg border-slate-300' : ''
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
