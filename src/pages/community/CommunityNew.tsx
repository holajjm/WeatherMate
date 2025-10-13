import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Button from "@components/layout/Button";
import useCustomAxios from "@hooks/useCustomAxios";

import { MdOutlineCameraAlt } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import type { CommunityFormData } from "types/CommunityType";

function CommunityNew() {
  const navigate = useNavigate();
  const axios = useCustomAxios();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CommunityFormData>();

  const onSubmit = async (formData: CommunityFormData) => {
    const imageFormData = new FormData();
    imageFormData.append("attach", formData.image[0]);
    const files = await axios("/files", {
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      data: imageFormData
    });
    formData.image = files.data.item[0]?.name;
    formData.type = "community";
    formData.title = formData.title;
    formData.content = formData.content;
    try {
      if (confirm("등록하시겠습니까?")) {
        const res = await axios.post("/posts", formData);
        console.log(res.data.item);
        navigate(`/community/${res.data.item._id}`);
      }
    } catch (errors) {
      console.log(errors);
    }
  };

  return (
    <div className="m-auto flex h-screen min-w-[320px] max-w-[600px] flex-col gap-2 bg-slate-50 p-2">
      <header className="relative flex items-center justify-center">
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
        <h1 className="m-auto pr-5 text-title font-bold">새 게시글</h1>
      </header>

      <main>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <section className="flex h-56 w-full flex-col gap-2 drop-shadow-md">
            <article className="flex h-full w-full items-center justify-center rounded-button bg-white p-4">
              <label
                htmlFor="file"
                className="flex h-full w-1/2 cursor-pointer flex-col items-center justify-center rounded-button bg-toss-blue p-2 text-white"
              >
                <MdOutlineCameraAlt className="text-3xl" />
                <p className="text-caption">사진 추가</p>
              </label>
              <input
                className="flex w-1/2 cursor-pointer p-2"
                type="file"
                accept="image/*"
                id="file"
                {...register("image", { required: "사진을 추가하세요." })}
              />
            </article>
            <div>
              {errors.image ? (
                <p className="text-body text-red-500">사진을 추가하세요.</p>
              ) : (
                <p className="h-4"></p>
              )}
            </div>
          </section>
          <section className="h-full w-full drop-shadow-md">
            <fieldset className="flex flex-col gap-2">
              <div
                role="radiogroup"
                aria-labelledby="profile-image-options"
                className="flex items-center justify-between gap-1"
              >
                {[
                  "Sun",
                  "Cloud",
                  "Rain",
                  "Foggy",
                  "Snow",
                  "Thunder",
                  "Wind"
                ].map(id => (
                  <figure
                    key={id}
                    className="w-full cursor-pointer rounded-button hover:ring-2"
                  >
                    <input
                      className="hidden"
                      type="radio"
                      id={"title"}
                      value={id}
                      {...register("title", {
                        required: "날씨를 선택해주세요"
                      })}
                    />
                    <label
                      htmlFor={"title"}
                      className={`flex w-full cursor-pointer items-center justify-center rounded-button`}
                    >
                      <img
                        className="h-12 w-12 cursor-pointer rounded-button"
                        src={`/WeatherIcon/WeatherIcon${id}.webp`}
                        alt="WeatherIcon"
                        width={48}
                        height={48}
                      />
                    </label>
                  </figure>
                ))}
              </div>
              <div>
                {errors.title ? (
                  <p className="text-body text-red-500">날씨를 선택하세요.</p>
                ) : (
                  <p className="h-4"></p>
                )}
              </div>
            </fieldset>
          </section>
          <section className="flex h-full w-full flex-col gap-2 drop-shadow-md">
            <textarea
              id="content"
              className="relative h-full w-full rounded-button bg-white p-2 text-sm focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
              autoFocus
              cols={50}
              rows={10}
              placeholder="웨더메이트에게 공유하고 싶은 이야기를 해주세요!"
              {...register("content", { required: "내용을 입력하세요." })}
            />
            <div>
              {errors.content && (
                <p className="absolute bottom-4 left-2 text-base text-red-500">
                  내용을 입력하세요.
                </p>
              )}
            </div>
          </section>
          <footer className="flex w-full gap-2">
            <Button
              bgColor="gray"
              textColor="white"
              width="full"
              height="10"
              text={"취소"}
              onClick={() => {
                if (confirm("그만쓸까요?")) {
                  navigate("/community");
                }
                return;
              }}
              label="취소하기"
            ></Button>
            <Button
              bgColor="blue"
              textColor="white"
              width="full"
              height="10"
              text={"등록"}
              onClick={() => {}}
              label="등록하기"
            ></Button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default CommunityNew;
