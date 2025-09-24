import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

import { ENV } from "@constants/env";
import Button from "@components/layout/Button";
import useCustomAxios from "@hooks/useCustomAxios.js";
import { useUserStore } from "@store/store";

import { toast } from "react-toastify";
import type { LoginMainData } from "types/UserType";

function UserLogin() {
  const location = useLocation();
  const setUser = useUserStore(state => state?.setUser);
  const axios = useCustomAxios();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<LoginMainData>({
    // values: {
    //   email: 'WeatherMate@naver.com',
    //   password: '123456789',
    // },
  });

  const onSubmit = async (formData: LoginMainData) => {
    try {
      const res = await axios.post("/users/login", formData);
      console.log(formData);

      setUser({
        _id: res.data.item._id,
        name: res.data.item.name,
        // phone: res.data.item.phone,
        email: res.data.item.email,
        profile: res.data.item.profileImage || null,
        token: res.data.item.token
      });
      localStorage.setItem("accessToken", res.data.item?.token.accessToken);
      localStorage.setItem("refreshToken", res.data.item?.token.refreshToken);

      toast(res.data.item.name + "님 반갑습니다");
      navigate(location.state?.from ? `${location.state?.from}` : "/");
      console.log(res.data.item);
    } catch (err: any) {
      console.log(err);
      if (err.response?.data.errors) {
        err.response?.data.errors.forEach((error: any) =>
          setError(error.path, { message: error.msg })
        );
      } else if (err.response?.data.message) {
        alert(err.response?.data.message);
      }
    }
  };

  const handleLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${ENV.KAKAO_LOGIN_API_KEY}&redirect_uri=${ENV.APP_PRODUCTION}/auth&response_type=code`;
  };
  return (
    <div className="m-auto h-screen min-w-[320px] max-w-[600px] bg-slate-50">
      <div className="w-full p-4 drop-shadow-lg">
        <nav className="flex h-full w-full flex-col gap-4 rounded-button bg-white p-4">
          <header className="relative flex items-center justify-center gap-2">
            <svg
              className="h-5 w-5 cursor-pointer hover:scale-110"
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
            <div className="flex grow flex-col items-center justify-center pr-7">
              <h2 className="text-title font-black text-sky-400">
                Weather Mate
              </h2>
              <p className="text-caption text-slate-600">
                회원 서비스 이용을 위해 로그인 해주세요
              </p>
            </div>
          </header>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex grow flex-col gap-2"
          >
            <section className="relative">
              <label htmlFor="email" className="sr-only">
                이메일
              </label>
              <input
                className="w-full rounded-button border-gray-300 bg-slate-100 p-4 focus:border-transparent focus:ring-2 focus:ring-primary"
                type="email"
                id="email"
                placeholder="이메일을 입력하세요"
                {...register("email", {
                  required: "이메일을 입력하세요",
                  pattern: {
                    value:
                      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
                    message: "이메일 형식이 아닙니다"
                  }
                })}
              />
              {errors.email && (
                <p className="absolute right-2 top-1/2 -translate-y-1/2 text-sm font-bold text-red-500">
                  {errors.email.message}
                </p>
              )}
            </section>

            <section className="relative">
              <label htmlFor="password" className="sr-only">
                비밀번호
              </label>
              <input
                className="w-full rounded-button border-gray-300 bg-slate-100 p-4 focus:border-transparent focus:ring-2 focus:ring-primary"
                type="password"
                id="password"
                placeholder="비밀번호를 입력하세요"
                {...register("password", {
                  required: "비밀번호를 입력하세요"
                })}
              />
              {errors.password && (
                <p className="absolute right-2 top-1/2 -translate-y-1/2 text-sm font-bold text-red-500">
                  {errors.password.message}
                </p>
              )}
            </section>

            <div className="flex flex-col items-center gap-4">
              <div className="flex w-full flex-col gap-2">
                <Button
                  text={"로그인"}
                  textColor="white"
                  bgColor="blue"
                  width="full"
                  height="12"
                  onClick={() => {}}
                ></Button>
                <hr className="m-auto w-5/6 border-toss-gray" />
                <div className="m-auto">
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
          </form>
          <p className="text-center font-SuitBold text-subtitle text-toss-gray">
            WeatherMate
          </p>
        </nav>
      </div>
    </div>
  );
}

export default UserLogin;
