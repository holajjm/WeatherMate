import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import useCustomAxios from "@hooks/useCustomAxios";

import type { SignUpMainData } from "types/UserType";

function UserSignUp() {
  const axios = useCustomAxios();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignUpMainData>();

  const onSubmit = async (formData: SignUpMainData) => {
    try {
      formData.type = "user";
      if (formData.profileImage && formData.profileImage.length > 0) {
        const imageFormData = new FormData();
        imageFormData.append("attach", formData.profileImage[0]);

        const fileRes = await axios.post("/files", imageFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
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
          setError(error.path, { message: error.msg }),
        );
      } else if (err.response?.data.message) {
        alert(err.response?.data.message);
      }
    }
  };

  return (
    <div className="m-auto h-screen min-w-[320px] max-w-[600px] bg-slate-50 p-2">
      <div className="flex flex-col gap-8 rounded-lg bg-white p-6 drop-shadow-lg">
        <header className="text-center">
          <h1 className="font-UhBeeKangJa text-3xl font-black text-sky-400">
            Weather Mate
          </h1>
          <p className="font-SSRONETHandwritten text-xl text-slate-600">
            반가워요!
          </p>
        </header>
        <main>
          <form
            className="font-TTLaundryGothicB flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <section className="flex flex-col gap-2">
              <div className="flex">
                <label
                  htmlFor="name"
                  className="flex w-1/6 items-center justify-start text-lg text-slate-600"
                >
                  이름
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="이름을 입력하세요"
                  {...register("name", {
                    required: "이름을 입력하세요",
                    minLength: {
                      value: 2,
                      message: "이름을 두글자 이상 입력하세요",
                    },
                  })}
                  className="w-full rounded-lg bg-slate-100 p-4 focus:border-transparent focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                {errors.name ? (
                  <p className="text-base text-red-500">
                    {errors.name.message}
                  </p>
                ) : (
                  <p className="p-2"></p>
                )}
              </div>
            </section>

            <section className="flex flex-col gap-2">
              <div className="flex">
                <label
                  htmlFor="name"
                  className="flex w-1/6 items-center justify-start text-lg text-slate-600"
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
                      message: "전화번호 양식을 맞춰 입력 해 주세요",
                    },
                  })}
                  className="w-full rounded-lg bg-slate-100 p-4 focus:border-transparent focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                {errors.phone ? (
                  <p className="text-base text-red-500">
                    {errors.phone.message}
                  </p>
                ) : (
                  <p className="p-2"></p>
                )}
              </div>
            </section>

            <section className="flex flex-col gap-2">
              <div className="flex">
                <label
                  htmlFor="email"
                  className="flex w-1/6 items-center justify-start text-lg text-slate-600"
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
                      message: "이메일 형식이 아닙니다",
                    },
                  })}
                  className="w-full rounded-lg bg-slate-100 p-4 focus:border-transparent focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                {errors.email ? (
                  <p className="text-base text-red-500">
                    {errors.email.message}
                  </p>
                ) : (
                  <p className="p-2"></p>
                )}
              </div>
            </section>

            <section className="flex flex-col gap-2">
              <div className="flex">
                <label
                  htmlFor="password"
                  className="flex w-1/6 items-center justify-start text-lg text-slate-600"
                >
                  비밀번호
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="비밀번호를 입력하세요"
                  {...register("password", {
                    required: "비밀번호를 입력하세요",
                  })}
                  className="w-full rounded-lg bg-slate-100 p-4 focus:border-transparent focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                {errors.password ? (
                  <p className="text-base text-red-500">
                    {errors.password.message}
                  </p>
                ) : (
                  <p className="p-2"></p>
                )}
              </div>
            </section>

            <section className="flex flex-col gap-2">
              <div className="flex">
                <label
                  htmlFor="profileImage"
                  className="flex w-1/6 items-center justify-start text-lg text-slate-600"
                >
                  프로필
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="profileImage"
                  {...register("profileImage")}
                  className="w-full rounded-lg bg-slate-100 p-4 focus:border-transparent focus:ring-2 focus:ring-primary"
                />
              </div>
            </section>

            <section className="flex gap-4">
              <button
                // text={'회원가입'}
                className="font-UhBeeKangJa w-full text-nowrap rounded-lg border-2 border-slate-100 bg-sky-400 p-4 text-white transition-all duration-200 hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400"
              >
                회원가입
              </button>
              <button
                type="button"
                onClick={() => window.history.back()}
                className="font-UhBeeKangJa w-full text-nowrap rounded-lg border-2 border-slate-100 bg-slate-200 p-4 text-gray-500 transition-all duration-200 hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400"
              >
                취소
              </button>
            </section>
          </form>
        </main>
      </div>
    </div>
  );
}

export default UserSignUp;
