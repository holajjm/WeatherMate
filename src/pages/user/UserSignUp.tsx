import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import Button from "@components/layout/Button";
import useCustomAxios from "@hooks/useCustomAxios";

import type { SignUpMainData } from "types/UserType";

function UserSignUp() {
  const axios = useCustomAxios();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<SignUpMainData>();

  const onSubmit = async (formData: SignUpMainData) => {
    try {
      formData.type = "user";
      if (formData.profileImage && formData.profileImage.length > 0) {
        const imageFormData = new FormData();
        imageFormData.append("attach", formData.profileImage[0]);

        const fileRes = await axios.post("/files", imageFormData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        formData.profileImage = fileRes.data.item[0].name;
      } else {
        delete formData.profileImage;
      }
      const res = await axios.post("/users", formData);
      alert(`${res.data.item.name}님 회원가입이 완료되었습니다.`);
      navigate("/user/login");
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

  return (
    <div className="m-auto h-screen min-w-[320px] max-w-[600px] bg-slate-50 p-4">
      <div className="flex flex-col gap-4 rounded-button bg-white p-4 drop-shadow-lg">
        <header className="relative flex items-center justify-center gap-2 pr-5">
          <svg
            className="absolute left-0 top-2 h-5 w-5 cursor-pointer hover:scale-110"
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
          <div className="flex grow flex-col items-center justify-center">
            <h2 className="text-title font-black text-toss-blue">
              Weather Mate
            </h2>
            <p className="text-caption text-toss-gray">
              회원 서비스 이용을 위해 회원가입 해주세요
            </p>
          </div>
        </header>
        <main>
          <form
            className="flex flex-col gap-2 text-caption"
            onSubmit={handleSubmit(onSubmit)}
          >
            <section className="relative">
              <div className="flex">
                <label
                  htmlFor="name"
                  className="flex w-1/6 items-center justify-start text-caption text-toss-gray"
                >
                  닉네임
                </label>
                <input
                  type="text"
                  id="nickname"
                  placeholder="닉네임을 입력하세요"
                  {...register("name", {
                    required: "닉네임을 입력하세요",
                    minLength: {
                      value: 2,
                      message: "닉네임을 두글자 이상 입력하세요"
                    }
                  })}
                  className="w-full rounded-button bg-slate-100 p-4 focus:border-transparent focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                {errors.name && (
                  <p className="absolute right-2 top-1/2 -translate-y-1/2 text-caption font-bold text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </section>

            {/* <section className="relative">
              <div className="flex">
                <label
                  htmlFor="name"
                  className="flex w-1/6 items-center justify-start text-caption text-toss-gray"
                >
                  번호
                </label>
                <input
                  type="text"
                  id="phone"
                  placeholder="휴대폰 번호를 입력하세요"
                  {...register("phone", {
                    required: "휴대폰 번호를 입력하세요",
                    minLength: {
                      value: +/^\d{3}-\d{3,4}-\d{4}$/,
                      message: "전화번호 양식을 맞춰 입력 해 주세요"
                    }
                  })}
                  className="w-full rounded-button bg-slate-100 p-4 focus:border-transparent focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                {errors.phone ? (
                  <p className="absolute right-2 top-1/2 -translate-y-1/2 text-caption font-bold text-red-500">
                    {errors.phone.message}
                  </p>
                ) : (
                  <p className="p-2"></p>
                )}
              </div>
            </section> */}

            <section className="relative">
              <div className="flex">
                <label
                  htmlFor="email"
                  className="flex w-1/6 items-center justify-start text-caption text-toss-gray"
                >
                  이메일
                </label>
                <input
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
                  className="w-full rounded-button bg-slate-100 p-4 focus:border-transparent focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                {errors.email && (
                  <p className="absolute right-2 top-1/2 -translate-y-1/2 text-caption font-bold text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </section>

            <section className="relative">
              <div className="flex">
                <label
                  htmlFor="password"
                  className="flex w-1/6 items-center justify-start text-caption text-toss-gray"
                >
                  비밀번호
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="비밀번호를 입력하세요"
                  {...register("password", {
                    required: "비밀번호를 입력하세요"
                  })}
                  className="w-full rounded-button bg-slate-100 p-4 focus:border-transparent focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                {errors.password && (
                  <p className="absolute right-2 top-1/2 -translate-y-1/2 text-caption font-bold text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </section>

            <section className="relative">
              <div className="flex">
                <label
                  htmlFor="profileImage"
                  className="flex w-1/6 items-center justify-start text-caption text-toss-gray"
                >
                  프로필
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="profileImage"
                  {...register("profileImage")}
                  className="w-full rounded-button bg-slate-100 p-4 focus:border-transparent focus:ring-2 focus:ring-primary"
                />
              </div>
            </section>

            <section className="flex flex-col gap-2">
              <Button
                text={"회원 가입"}
                textColor="white"
                bgColor="blue"
                width="full"
                height="12"
                onClick={() => {}}
                label="회원가입"
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
                  // onClick={handleLogin}
                />
              </div>
            </section>
          </form>
        </main>
      </div>
    </div>
  );
}

export default UserSignUp;
