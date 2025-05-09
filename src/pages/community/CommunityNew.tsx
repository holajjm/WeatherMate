import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import useCustomAxios from "@hooks/useCustomAxios";
import Button from "@components/layout/Button";
import { CommunityFormData } from "type";

import { MdOutlineCameraAlt } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";

function CommunityNew() {
  const navigate = useNavigate();
  const axios = useCustomAxios();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommunityFormData>();

  const onSubmit = async (formData: CommunityFormData) => {
    const imageFormData = new FormData();
    imageFormData.append("attach", formData.image[0]);
    const files = await axios("/files", {
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: imageFormData,
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
    <div className="max-w-[600px] min-w-[320px] m-auto h-screen p-2 bg-slate-50">
      <header className="flex items-center justify-center relative">
        <Button
          text={<FaArrowLeft />}
          textColor="gray"
          bgColor="gray"
          width="8"
          onClick={() => navigate("/community")}
        ></Button>
        <h1 className="font-bold text-xl pr-8 py-4 font-Pretendard m-auto">
          새 게시글
        </h1>
      </header>
      <main>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <section className="w-full h-56 flex flex-col gap-2 drop-shadow-md">
            {/* <h2 className="text-center text-lg font-UhBeeKangJa">사진 추가</h2> */}
            <article className="p-4 w-full h-full border-2 flex items-center justify-center rounded-xl bg-white">
              <label
                htmlFor="file"
                className="w-1/2 h-full p-2 bg-sky-400 rounded-xl flex flex-col justify-center items-center text-white font-UhBeeKangJa cursor-pointer"
              >
                <MdOutlineCameraAlt className="text-3xl" />
                <p className="text-sm">사진 추가</p>
              </label>
              <input
                className="w-1/2 flex p-2 cursor-pointer"
                type="file"
                accept="image/*"
                id="file"
                {...register("image", { required: "사진을 추가하세요." })}
              />
            </article>
            <div>
              {errors.image ? (
                <p className="font-SSRONETHandwritten text-base font-bold text-red-500">
                  사진을 추가하세요.
                </p>
              ) : (
                <p className="h-4"></p>
              )}
            </div>
          </section>
          <section className="w-full h-full drop-shadow-md">
            <fieldset className="flex flex-col gap-2">
              {/* <legend className="text-center text-lg font-UhBeeKangJa mb-2">날씨 선택</legend> */}
              <div
                role="radiogroup"
                aria-labelledby="profile-image-options"
                className="flex items-center justify-between gap-1"
              >
                {["Sun", "Cloud", "Rain", "Foggy", "Snow", "Wind"].map(id => (
                  <figure key={id} className="rounded-lg w-full cursor-pointer hover:ring-2">
                    <input
                      className="hidden"
                      type="radio"
                      id={"title"}
                      value={id}
                      {...register("title", {
                        required: "날씨를 선택해주세요",
                      })}
                    />
                    <label htmlFor={"title"} className={`rounded-lg w-full flex items-center justify-center cursor-pointer`}>
                      <img
                        className="w-12 h-12 rounded-lg cursor-pointer"
                        src={`/WeatherIcon${id}.webp`}
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
                  <p className="font-SSRONETHandwritten text-base font-bold text-red-500">
                    날씨를 선택하세요.
                  </p>
                ) : (
                  <p className="h-4"></p>
                )}
              </div>
            </fieldset>
          </section>
          <section className="w-full h-full flex flex-col gap-2 drop-shadow-md">
            {/* <h2 className="text-center text-lg font-UhBeeKangJa">글 작성</h2> */}
            <textarea
              id="content"
              className="w-full h-full p-2 text-sm border-2 rounded-lg bg-white focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-200"
              autoFocus
              cols={50}
              rows={10}
              placeholder="웨더메이트에게 공유하고 싶은 이야기를 해주세요!"
              {...register("content", { required: "내용을 입력하세요." })}
            />
            <div>
              {errors.content ? (
                <p className="font-SSRONETHandwritten text-base font-bold text-red-500">
                  내용을 입력하세요.
                </p>
              ) : (
                <p className="h-4"></p>
              )}
            </div>
          </section>
          <footer className="flex w-full gap-2">
            <Button
              bgColor="gray"
              textColor="gray"
              width="full"
              text={"취소"}
              onClick={() => {
                if (confirm("그만쓸까요?")) {
                  navigate("/community");
                }
                return;
              }}
            ></Button>
            <Button
              bgColor="sky"
              textColor="white"
              width="full"
              text={"등록"}
              onClick={() => {}}
            ></Button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default CommunityNew;
