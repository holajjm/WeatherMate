import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import usePageTitle from "@hooks/usePageTitle";
import useScrollTop from "@hooks/useScrollTop";
import Button from "@components/layout/Button";

function UserValidLogin() {
  usePageTitle("Login");
  useScrollTop();
  const navigate = useNavigate();
  const location = useLocation();
  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = `${import.meta.env.VITE_APP_TITLE}/auth`;
  // 개발 환경 redirect uri
  // const REDIRECT_URI = "http://localhost:5173/auth/kakao";
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <div className="max-w-[600px] min-w-[320px] m-auto h-screen bg-gray-100">
      <div className="p-4 flex justify-center drop-shadow-md">
        <div className="bg-white flex flex-col w-full p-4 rounded-xl gap-4">
          <div className="flex flex-col justify-center items-center gap-4">
            <h2 className="text-xl font-black text-sky-400 font-UhBeeKangJa">
              로그인 후 이용할 수 있어요!
            </h2>
            <p className="text-slate-600 text-lg font-SSRONETHandwritten">
              원활한 서비스 사용을 위해 로그인을 해주세요!
            </p>
            <img className="w-1/3" src="/mainlogin.svg" />
          </div>
          <div className="w-full grid grid-cols-2 gap-2">
            <Button
              text={"로그인"}
              textColor="white"
              bgColor="sky"
              width="full"
              onClick={() =>
                navigate("/user/Login", { state: location.pathname })
              }
            ></Button>
            <Button
              text={"회원가입"}
              textColor="white"
              bgColor="indigo"
              width="full"
              onClick={() => navigate("/user/SignUp")}
            ></Button>
            <Button
              text={"카카오로 시작하기"}
              textColor="gray"
              bgColor="kakao"
              width="full"
              onClick={handleLogin}
            ></Button>
            <Button
              text={"메인으로 돌아가기"}
              textColor="gray"
              bgColor="gray"
              width="full"
              onClick={() => navigate("/")}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserValidLogin;
