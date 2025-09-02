import React from "react";
import { Link } from "react-router-dom";

import { IoLogoFacebook, IoLogoGoogle } from "react-icons/io";
import { BiLogoInstagram } from "react-icons/bi";

function Footer() {
  return (
    <footer
      className={`
        m-auto flex min-w-[320px] max-w-[600px] flex-col flex-wrap items-center
        justify-center gap-2 text-nowrap bg-slate-50 p-2 text-slate-600
      `}
    >
      <section className="flex gap-2">
        <p>이용약관</p>
        <Link to="https://github.com/FRONTENDSCHOOL9/WeatherMate">
          프로젝트
        </Link>
        <p className="font-bold text-slate-600">개인정보처리방침</p>
        <p>고객센터</p>
      </section>
      <section>
        <Link to="https://github.com/FRONTENDSCHOOL9/WeatherMate">
          WeatherMate
        </Link>
      </section>
      <section className="flex items-center justify-center gap-2 text-2xl">
        <IoLogoFacebook />
        <IoLogoGoogle />
        <BiLogoInstagram />
      </section>
    </footer>
  );
}

export default Footer;
