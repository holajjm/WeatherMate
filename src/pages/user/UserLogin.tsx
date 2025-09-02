import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { memberState } from "@recoil/atom.js";

import { ENV } from "@constants/env";
import Button from "@components/layout/Button";
import useCustomAxios from "@hooks/useCustomAxios.js";

import { toast } from "react-toastify";
import type { LoginMainData } from "types/UserType";

function UserLogin() {
  const location = useLocation();
  const setUser = useSetRecoilState(memberState);
  const axios = useCustomAxios();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
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
        phone: res.data.item.phone,
        email: res.data.item.email,
        profile: res.data.item.profileImage,
        token: res.data.item.token,
      });

      toast(res.data.item.name + "님 반갑습니다");
      navigate(location.state ? `${location.state}` : "/");
      console.log(res.data.item);
    } catch (err: any) {
      console.log(err);
      if (err.response?.data.errors) {
        err.response?.data.errors.forEach((error: any) =>
          setError(error.path, { message: error.msg }),
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
        <nav className="flex h-full w-full flex-col gap-4 rounded-xl bg-white p-4">
          <header className="relative flex flex-col items-center justify-center gap-2">
            <h2 className="font-UhBeeKangJa text-3xl font-black text-sky-400">
              Weather Mate
            </h2>
            <p className="font-SSRONETHandwritten text-xl text-slate-600">
              회원 서비스 이용을 위해 로그인 해주세요
            </p>
            <button
              onClick={() => window.history.back()}
              className="absolute left-0 top-0 flex h-1/2 items-center rounded-lg border-2 bg-slate-50 p-2"
            >
              &larr;
            </button>
          </header>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex grow flex-col gap-2"
          >
            <div className="relative">
              <label htmlFor="email" className="sr-only">
                이메일
              </label>
              <input
                className="w-full rounded-xl bg-slate-100 p-4 focus:border-2 focus:border-sky-400"
                type="email"
                id="email"
                placeholder="이메일을 입력하세요"
                {...register("email", {
                  required: "이메일을 입력하세요",
                  pattern: {
                    value:
                      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
                    message: "이메일 형식이 아닙니다",
                  },
                })}
              />
              {errors.email && (
                <p className="font-Pretendard absolute right-2 top-1/2 -translate-y-1/2 text-sm font-bold text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                비밀번호
              </label>
              <input
                className="w-full rounded-xl border-gray-300 bg-slate-100 p-4 focus:border-transparent focus:ring-2 focus:ring-primary"
                type="password"
                id="password"
                placeholder="비밀번호를 입력하세요"
                {...register("password", {
                  required: "비밀번호를 입력하세요",
                })}
              />
              {errors.password && (
                <p className="font-Pretendard absolute right-2 top-1/2 -translate-y-1/2 text-sm font-bold text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="flex w-full gap-2">
                <Button
                  text={"로그인"}
                  textColor="white"
                  bgColor="sky"
                  width="full"
                  onClick={() => {}}
                ></Button>
                <Button
                  text={"카카오로 시작하기"}
                  textColor="gray"
                  bgColor="kakao"
                  width="full"
                  onClick={handleLogin}
                ></Button>
              </div>
            </div>
          </form>
          <img
            className="m-auto"
            src="/MainLogo.webp"
            width={80}
            height={80}
            loading="lazy"
            decoding="async"
          />
        </nav>
      </div>
    </div>
  );
}

export default UserLogin;
