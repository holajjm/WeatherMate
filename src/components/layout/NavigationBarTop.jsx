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
      <div className="w-full text-white h-16 items-center justify-between bg-[#d1ebff] fixed top-0 z-50 shadow-inner hidden md:flex md:px-20 lg:px-56 xl:px-60">
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
            className={`grow hover:text-[#2F4156] hover:-translate-y-1 transition-all duration-200 ${
              location.pathname === '/main' ? 'text-[#2F4156] border-2 rounded-2xl font-extrabold border-[#567CBD] bg-white' : 'text-[#567CBD] font-semibold'
            }`}
          >
            <p className="text-nowrap">홈</p>
          </Link>

          <Link
            to="/community"
            className={`grow hover:text-[#2F4156] hover:-translate-y-1 transition-all duration-200 ${
              location.pathname === '/community' ? 'text-[#2F4156] border-2 rounded-2xl font-extrabold border-[#567CBD] bg-white' : 'text-[#567CBD] font-semibold'
            }`}
          >
            <p className="text-nowrap">커뮤니티</p>
          </Link>

          <Link
            to="/location"
            className={`grow hover:text-[#2F4156] hover:-translate-y-1 transition-all duration-200 ${
              location.pathname === '/location' ? 'text-[#2F4156] border-2 rounded-2xl font-extrabold border-[#567CBD] bg-white' : 'text-[#567CBD] font-semibold'
            }`}
          >
            <p className="text-nowrap">장소추천</p>
          </Link>

          <Link
            to="/user/mypage"
            className={`grow hover:text-[#2F4156] hover:-translate-y-1 transition-all duration-200 ${
              location.pathname === '/user/mypage' ? 'text-[#2F4156] border-2 rounded-2xl font-extrabold border-[#567CBD] bg-white' : 'text-[#567CBD] font-semibold'
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
