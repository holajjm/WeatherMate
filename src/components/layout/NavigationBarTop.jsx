import { Link, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { memberState } from '@recoil/atom.mjs';

function NavigationBarTop() {
  const location = useLocation();
  const [user, setUser] = useRecoilState(memberState);
  const handleLogout = () => {
    if(confirm("로그아웃 하시겠습니까?")){
      setTimeout(() => {
        window.location.reload();
        setUser(null)
      },300)
    }
    return
  };
  const handleRefresh = () => {
    sessionStorage.removeItem('userWeather');
    sessionStorage.removeItem('myPlace');
    if (location.pathname === '/') {
      window.location.reload();
    }
  };
  return (
    <>
      {/* 반응형 헤더 */}
      <div className="w-full flex gap-2 items-center justify-center h-16 bg-slate-100 border-b-2 sticky top-0 z-30 shadow-inner md:hidden">
        <Link
          to="/main"
          className="text-4xl text-amber-300 font-extrabold font-UhBeeKangJa"
        >
          <button className="w-14 h-full opacity-60 md:hidden">
            <img src="/weatherMateLogo.svg" alt="weatherMateLogo" />
          </button>
          WeatherMate
        </Link>
        {user && user.name ? (
            <p className="text-slate-400 cursor-pointer hover:text-red-500 hover:font-semibold" onClick={handleLogout}> 로그아웃</p>
          ) : (
            <Link to="/mainlogin" className="text-black">
              로그인
            </Link>
          )}
      </div>
      {/* ------------------------------- */}
      <div className="w-full h-16 bg-sky-200 sticky top-0 z-30 shadow-inner hidden md:flex md:items-center md:justify-between md:px-20 xl:px-60">
        <Link to="/">
          <img
            src="/weatherMateLogo.svg"
            alt="weathermate logo"
            className="w-20"
            onClick={handleRefresh}
          />
        </Link>
        <div className="flex text-center gap-4 py-2 w-2/3 2xl:w-1/2 3xl:w-1/3 h-full leading-[48px]">
          {user && user.name ? (
            <p className="text-slate-400 cursor-pointer hover:text-red-500 hover:font-semibold" onClick={handleLogout}> 로그아웃</p>
          ) : (
            <Link to="/mainlogin" className="grow text-black hover:font-bold hover:text-indigo-600">
              로그인
            </Link>
          )}

          <Link
            to="/main"
            className={`grow text-lg flex items-center justify-center font-bold transition-all duration-200 hover:text-indigo-600 ${
              location.pathname === '/' || location.pathname === '/main'
                ? 'text-indigo-600 border-2 rounded-xl border-indigo-400 bg-white'
                : 'text-slate-600'
            }`}
          >
            홈
          </Link>
          <Link
            to="/community"
            className={`grow text-lg flex items-center justify-center font-bold transition-all duration-200 hover:text-indigo-600 ${
              location.pathname === '/community'
                ? 'text-indigo-600 border-2 rounded-xl border-indigo-400 bg-white'
                : 'text-slate-600'
            }`}
          >
            커뮤니티
          </Link>
          <Link
            to="/location"
            className={`grow text-lg flex items-center justify-center font-bold transition-all duration-200 hover:text-indigo-600 ${
              location.pathname === '/location'
                ? 'text-indigo-600 border-2 rounded-xl border-indigo-400 bg-white'
                : 'text-slate-600'
            }`}
          >
            장소추천
          </Link>
          <Link
            to="/user/mypage"
            className={`grow text-lg flex items-center justify-center font-bold transition-all duration-200 hover:text-indigo-600 ${
              location.pathname === '/user/mypage'
                ? 'text-indigo-600 border-2 rounded-xl border-indigo-400 bg-white'
                : 'text-slate-600'
            }`}
          >
            마이페이지
          </Link>
        </div>
      </div>
    </>
  );
}

export default NavigationBarTop;
