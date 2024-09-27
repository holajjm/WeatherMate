import { GoHomeFill } from 'react-icons/go';
import { SiGooglechat } from 'react-icons/si';
import { MdLocationOn } from 'react-icons/md';
import { FaAddressBook } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

function NavigationBarBottom() {
  const location = useLocation();
  return (
    <>
      <footer className="w-screen py-3 flex text-white h-18 rounded-t-3xl items-center justify-center gap-8 bg-[#d1ebff] sticky bottom-0 shadow-inner md:hidden">
        <Link
          to="/main"
          className={`flex flex-col items-center  px-2 hover:text-[#567CBD] ${
            location.pathname === '/main' || location.pathname === '/' ? 'text-[#567CBD] font-bold' : 'text-[#bac7ce]'
          }`}
        >
          <GoHomeFill className="text-2xl mb-1" />
          <p className="text-nowrap text-sm">홈</p>
        </Link>

        <Link
          to="/community"
          className={`flex flex-col items-center px-2  hover:text-[#567CBD] ${
            location.pathname === '/community' ? 'text-[#567CBD] font-bold' : 'text-[#bac7ce]'
          }`}
        >
          <SiGooglechat className="text-2xl mb-1" />
          <p className="text-nowrap text-sm">커뮤니티</p>
        </Link>

        <Link
          to="/location"
          className={`flex flex-col items-center px-2  hover:text-[#567CBD] ${
            location.pathname === '/location' ? 'text-[#567CBD] font-bold' : 'text-[#bac7ce]'
          }`}
        >
          <MdLocationOn className="text-2xl mb-1" />
          <p className="text-nowrap text-sm">장소추천</p>
        </Link>

        <Link
          to="/user/mypage"
          className={`flex flex-col items-center px-2  hover:text-[#567CBD] ${
            location.pathname === '/user/mypage' ? 'text-[#567CBD] font-bold' : 'text-[#bac7ce]'
          }`}
        >
          <FaAddressBook className="text-2xl mb-1" />
          <p className="text-nowrap text-sm">마이페이지</p>
        </Link>
      </footer>
    </>
  );
}

export default NavigationBarBottom;
