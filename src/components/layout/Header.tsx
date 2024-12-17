import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const handleRefresh = () => {
    sessionStorage.removeItem('userWeather');
    sessionStorage.removeItem('myPlace');
    if (location.pathname === '/') {
      window.location.reload();
    }
  };

  return (
    <div className="max-w-[600px] min-w-[320px] h-16 m-auto sticky top-0 z-30 flex items-center justify-center bg-blue-200 shadow-[0px_3px_4px_0px_rgba(0,0,0,0.7)] shadow-slate-300">
      <Link to="/" className="flex justify-center">
        <img
          src="/weatherMateLogo.svg"
          alt="weathermate logo"
          className="w-20"
          onClick={handleRefresh}
        />
        <p className="text-4xl text-orange-400 font-extrabold font-UhBeeKangJa">
          WeatherMate
        </p>
      </Link>
    </div>
  );
}

export default Header;
