import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ENV } from "@constants/env";
import Button from "@components/layout/Button";

function UserValidLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${ENV.KAKAO_LOGIN_API_KEY}&redirect_uri=${ENV.APP_PRODUCTION}/auth&response_type=code`;
  };

  return (
    <div className="max-w-[600px] min-w-[320px] m-auto h-screen bg-gray-100">
      <div className="p-4 flex justify-center drop-shadow-md">
        <div className="bg-white flex flex-col w-full p-4 rounded-xl gap-4">
          <div className="flex flex-col justify-center items-center gap-4">
            <h2 className="text-xl font-bold text-blue_middle font-UhBeeKangJa">
              로그인 후 이용할 수 있어요!
            </h2>
            <p className="text-sub_text font-SSRONETHandwritten">
              원활한 서비스 사용을 위해 로그인을 해주세요!
            </p>
            <img
              className="w-1/3"
              src="/MainIcon.webp"
              alt="SampleImg"
              width={120}
              height={150}
              {...{ fetchpriority: "high" }}
              decoding="async"
            />
          </div>
          <div className="w-full grid grid-cols-2 gap-2">
            <Button
              text={"로그인"}
              textColor="white"
              bgColor="sky"
              width="full"
              onClick={() => navigate("/user/Login", { state: location.state })}
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
