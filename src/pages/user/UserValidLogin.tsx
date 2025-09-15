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
        <div className="flex w-full flex-col rounded-modal bg-white p-4">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex grow flex-col items-center justify-center">
              <h2 className="text-title font-bold text-toss-blue">
                로그인 후 이용할 수 있어요!
              </h2>
              <p className="text-caption text-toss-gray">
                원활한 서비스 사용을 위해 로그인을 해주세요!
              </p>
            </div>
            <img
              className="h-2/3 w-1/4"
              src="/MainIcon.webp"
              alt="SampleImg"
              width={120}
              height={150}
              {...{ fetchpriority: "high" }}
              decoding="async"
            />
          </div>
          <div className="flex w-full flex-col items-center gap-2">
            <div className="flex w-full gap-2">
              <Button
                text={"로그인"}
                textColor="white"
                bgColor="blue"
                width="full"
                height="12"
                onClick={() =>
                  navigate("/user/Login", { state: location.state })
                }
              ></Button>
              <Button
                text={"회원가입"}
                textColor="black"
                bgColor="gray"
                width="full"
                height="12"
                onClick={() => navigate("/user/SignUp")}
              ></Button>
            </div>
            <hr className="m-auto w-5/6 border-toss-gray" />
            <img
              src="/KakaoButton.webp"
              alt="kakaologo"
              className="cursor-pointer rounded-button transition-all duration-200 hover:scale-[1.03]"
              width={300}
              height={40}
              {...{ fetchpriority: "high" }}
              decoding="async"
              onClick={handleLogin}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserValidLogin;
