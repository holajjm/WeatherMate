import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { ENV } from "@constants/env";
import Button from "@components/layout/Button";
import usePageTitle from "@hooks/usePageTitle";
import useScrollTop from "@hooks/useScrollTop";
import ValidLogin from "@pages/user/UserValidLogin";
import { useUserStore } from "@store/store";

function UserPage() {
  usePageTitle("MyPage");
  useScrollTop();
  const navigate = useNavigate();
  const user = useUserStore(state => state.user);
  const resetUser = useUserStore(state => state.resetUser);
  const handleLogout = () => {
    if (confirm("로그아웃 할까요?")) {
      resetUser();
      localStorage.clear();
      navigate("/");
    }
  };
  return (
    <>
      {user && user.name ? (
        <div className="m-auto flex h-screen min-w-[320px] max-w-[600px] flex-col overflow-y-scroll bg-slate-50 scrollbar-hide">
          <header className="box-border flex w-full items-center justify-between overflow-scroll p-4 scrollbar-hide">
            <div className="flex items-center gap-4">
              <img
                className="h-10 w-10 rounded-full"
                src={
                  user?.profile
                    ? `${ENV.API_SERVER}/files/07-WeatherMate/${user?.profile}`
                    : "/NullUser.webp"
                }
                alt="Profile"
                {...{ fetchpriority: "high" }}
                decoding="async"
              />
              <div className="flex-grow">
                <p className="text-body font-bold text-black">{user.name}</p>
                <p className="text-nowrap text-caption text-toss-gray">
                  오늘 날씨 어때요?
                </p>
              </div>
            </div>
            <Button
              text={"로그아웃"}
              textColor="white"
              bgColor="lightred"
              width="20"
              height="10"
              onClick={handleLogout}
            ></Button>
          </header>
          <article className="flex flex-col gap-4">
            <section className="box-border flex w-full flex-col bg-white px-4">
              <Link
                to={"/user/detail"}
                className="flex h-10 w-full items-center justify-between"
              >
                내 계정
                <svg
                  className="ml-2 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 -1 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
              <Link
                to={"/user/likes"}
                className="flex h-10 w-full items-center justify-between"
              >
                좋아요
                <svg
                  className="ml-2 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 -1 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
              <Link
                to={"/user/board"}
                className="flex h-10 w-full items-center justify-between"
              >
                게시글
                <svg
                  className="ml-2 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 -1 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </section>

            <section className="text-center text-caption text-toss-gray">
              <button onClick={() => {}} className="hover:underline">
                회원 탈퇴하기
              </button>
            </section>
          </article>
        </div>
      ) : (
        <ValidLogin />
      )}
    </>
  );
}

export default UserPage;
