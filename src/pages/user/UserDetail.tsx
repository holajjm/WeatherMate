import React from "react";

import Button from "@components/layout/Button";
import { useRecoilState } from "recoil";
import { memberState } from "@recoil/atom";
import { useNavigate } from "react-router-dom";
import { ENV } from "@constants/env";

function UserDetail() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(memberState);
  console.log(user);

  const Edit = () => {
    navigate("/user/edit");
  };
  const handleLogout = () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      setUser(null);
      navigate("/");
    }
  };
  return (
    <div className="m-auto flex h-screen min-w-[320px] max-w-[600px] flex-col gap-4 overflow-y-scroll bg-slate-50 scrollbar-hide">
      <div className="flex flex-col items-center justify-center gap-4 text-body bg-white p-4 box-border drop-shadow-sm">
        <div className="w-full flex flex-col items-center justify-center">
          <svg
            className="mr-auto h-5 w-5 cursor-pointer hover:scale-110"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            onClick={() => window.history.back()}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <img
            className="h-16 w-16 rounded-full"
            src={
              user?.profile
                ? `${ENV.API_SERVER}/files/07-WeatherMate/${user?.profile}`
                : "/NullUser.webp"
            }
            alt="Profile"
            {...{ fetchpriority: "high" }}
            decoding="async"
          />
        </div>
        <div className="flex w-full items-center justify-between">
          <p className="text-toss-black">닉네임</p>
          <p className="text-right text-toss-gray">{user?.name}</p>
        </div>
        <div className="flex w-full items-center justify-between">
          <p className="text-toss-black">이메일</p>
          <p className="text-right text-toss-gray">{user?.email}</p>
        </div>
      </div>
      <div className="flex w-full items-center gap-2 p-4 box-border bg-white drop-shadow-sm">
        <Button
          text={"회원 정보 수정"}
          textColor="white"
          bgColor="blue"
          width="full"
          height="10"
          onClick={Edit}
        ></Button>
        <Button
          text={"로그아웃"}
          textColor="white"
          bgColor="lightRed"
          width="full"
          height="10"
          onClick={handleLogout}
        ></Button>
      </div>
    </div>
  );
}

export default UserDetail;
