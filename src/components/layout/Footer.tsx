import React from "react";
import { Link } from "react-router-dom";

import { IoLogoFacebook, IoLogoGoogle } from "react-icons/io";
import { BiLogoInstagram } from "react-icons/bi";

function Footer() {
  return (
    <>
      <div className="max-w-[600px] min-w-[320px] m-auto p-2 flex flex-col gap-2 justify-center items-center text-slate-400 flex-wrap text-nowrap bg-slate-50">
        <div className="flex gap-2">
          <p>이용약관</p>
          <Link to="https://github.com/FRONTENDSCHOOL9/WeatherMate">
            프로젝트
          </Link>
          <p className="font-bold text-slate-500">개인정보처리방침</p>
          <p>고객센터</p>
        </div>
        <div>
          <Link
            to="https://github.com/FRONTENDSCHOOL9/WeatherMate"
            className="font-bold font-TTLaundryGothicB"
          >
            WeatherMate
          </Link>
        </div>
        <div className="text-2xl flex gap-2 justify-center items-center">
          <IoLogoFacebook />
          <IoLogoGoogle />
          <BiLogoInstagram />
        </div>
      </div>
    </>
  );
}

export default Footer;
