import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { memberState } from "@recoil/atom.js";

import useCustomAxios from "@hooks/useCustomAxios.js";
import Button from "@components/layout/Button";
import { toast } from "react-toastify";
import { LoginMainData } from "type";

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
  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = `${import.meta.env.VITE_APP_TITLE}/auth`;
  // 개발 환경 redirect uri
  // const REDIRECT_URI = "http://localhost:5173/auth/kakao";
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };
  return (
    <div className="max-w-[600px] min-w-[320px] m-auto h-screen bg-slate-50">
      <div className="w-full p-4 drop-shadow-lg">
        <nav className="bg-white flex flex-col w-full h-full p-4 rounded-xl gap-4">
          <header className="flex flex-col justify-center items-center gap-2 relative">
            <h2 className="font-black text-3xl text-sky-400 font-UhBeeKangJa">
              Weather Mate
            </h2>
            <p className="text-slate-600 font-SSRONETHandwritten text-xl">
              회원 서비스 이용을 위해 로그인 해주세요
            </p>
            <button
              onClick={() => window.history.back()}
              className="absolute left-0 top-0 border-2 bg-slate-50 h-1/2 flex items-center p-2 rounded-lg"
            >
              &larr;
            </button>
          </header>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grow flex flex-col gap-2"
          >
            <div className="relative">
              <label htmlFor="email" className="sr-only">
                이메일
              </label>
              <input
                className="p-4 rounded-xl bg-slate-100 w-full focus:border-2 focus:border-sky-400"
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
                <p className="absolute top-1/2 right-2 -translate-y-1/2 text-sm font-bold font-Pretendard text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                비밀번호
              </label>
              <input
                className="p-4 rounded-xl bg-slate-100 border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent w-full"
                type="password"
                id="password"
                placeholder="비밀번호를 입력하세요"
                {...register("password", {
                  required: "비밀번호를 입력하세요",
                })}
              />
              {errors.password && (
                <p className="absolute top-1/2 right-2 -translate-y-1/2 text-sm font-bold font-Pretendard text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-2 w-full">
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
            src="/logo.webp"
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
