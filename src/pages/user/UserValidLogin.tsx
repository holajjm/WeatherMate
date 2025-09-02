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
    <div className="m-auto h-screen min-w-[320px] max-w-[600px] bg-gray-100">
      <div className="flex justify-center p-4 drop-shadow-md">
        <div className="flex w-full flex-col gap-4 rounded-xl bg-white p-4">
          <div className="flex flex-col items-center justify-center gap-4">
            <h2 className="font-UhBeeKangJa text-xl font-bold text-blue_middle">
              로그인 후 이용할 수 있어요!
            </h2>
            <p className="font-SSRONETHandwritten text-sub_text">
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
          <div className="grid w-full grid-cols-2 gap-2">
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
