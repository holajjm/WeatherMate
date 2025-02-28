import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useCustomAxios from "../../hooks/useCustomAxios.mts";
import { CommunityFormData } from "type";

import { MdOutlineCameraAlt } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
// import Button from '@components/layout/Button';
// import Submit from '@components/layout/Submit';

function CommunityNew() {
  const navigate = useNavigate();
  const axios = useCustomAxios();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    // getValues,
    // watch,
    clearErrors,
  } = useForm<CommunityFormData>();
  console.log(errors);

  const [weatherType, setWeatherType] = useState<string>("");
  const [selectedLabel, setSelectedLabel] = useState<string>("");
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const targetTag = e.target as HTMLElement;
    const value = targetTag.getAttribute("data-weather");
    // console.log(targetTag);
    console.log(value);
    // value === targetTag.getAttribute('data-weather')
    //   ? targetTag.setAttribute(
    //       'style',
    //       `border: 3px solid #38bdf8; border-radius: 8px`,
    //     )
    //   : targetTag.removeAttribute('style');

    setWeatherType(value as string);
    setSelectedLabel(value as string);
    setValue("title", weatherType);
    clearErrors("title");
  };
  const isSelected = (labelValue: string) => {
    return selectedLabel === labelValue ? "ring-2 ring-blue-500" : "";
  };

  const onSubmit = async (formData: CommunityFormData) => {
    const imageFormData = new FormData();
    imageFormData.append("attach", formData.image[0]);
    console.log(imageFormData);
    
    const files = await axios("/files", {
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: imageFormData,
    });
    formData.image = files.data.item[0]?.name;
    formData.type = "community";
    formData.title = weatherType;
    
    console.log("formData : ", formData);
    
    const res = await axios.post("/posts", formData);
    console.log(res.data.item);
    navigate(`/community/${res.data.item._id}`);
  };

  // useEffect(() => {
  //   setValue('title', weatherType);
  //   console.log('Current form values:', getValues());
  // }, [weatherType, setValue]);

  // const formValues = watch();
  // useEffect(() => {
  //   console.log('Current form values:', formValues);
  // }, [formValues]);

  return (
    <div className="max-w-[600px] min-w-[320px] m-auto h-screen p-2 bg-slate-50">
      <header className="flex relative">
        <button
          onClick={() => navigate("/community")}
          className="absolute top-2 left-0 p-2 flex gap-1 border-2 border-slate-100 rounded-lg font-UhBeeKangJa transition-all duration-200 text-nowrap text-gray-500 bg-slate-200 hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400"
        >
          <FaArrowLeft className="text-xl" />
          뒤로 가기
        </button>
        <h1 className="font-bold text-2xl p-4 h-16 font-UhBeeKangJa m-auto">
          새 글 작성
        </h1>
      </header>
      <main>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <section className="w-full drop-shadow-md">
                <div className="p-4 w-full h-full border-2 flex flex-col items-center justify-center rounded-xl bg-white">
                  <label
                    htmlFor="file"
                    className="w-1/2 sm:w-full p-2 bg-sky-400 rounded-xl flex flex-col justify-center items-center text-white font-UhBeeKangJa cursor-pointer"
                  >
                    <MdOutlineCameraAlt className="text-5xl" />
                    <p className="text-xl">사진 추가</p>
                  </label>
                  <input
                    className="w-1/2 sm:w-full flex p-2 cursor-pointer"
                    type="file"
                    accept="image/*"
                    id="file"
                    {...register("image", { required: "사진을 추가하세요." })}
                  />
                </div>
                <div>
                  {errors.image && (
                    <p className="absolute font-SSRONETHandwritten text-xl font-bold text-red-500">
                      사진을 추가하세요.
                    </p>
                  )}
                </div>
              </section>
              <section className="w-full h-full relative drop-shadow-md">
                <div
                  onClick={handleClick}
                  className="h-full w-full border rounded-lg flex sm:grid sm:grid-cols-3 gap-1"
                >
                  <label
                    htmlFor="title"
                    className={`rounded-lg w-full hover:ring-2 ${isSelected("uvi")}`}
                  >
                    <img
                      src="/uvi.svg"
                      alt="uvi"
                      data-weather="uvi"
                      className="rounded-lg w-full h-full m-auto"
                    />
                  </label>
                  <label
                    htmlFor="title"
                    className={`rounded-lg w-full hover:ring-2 ${isSelected("manyClouds")}`}
                  >
                    <img
                      src="/manyClouds.svg"
                      alt="manyClouds"
                      data-weather="manyClouds"
                      className="rounded-lg w-full h-full m-auto"
                    />
                  </label>
                  <label
                    htmlFor="title"
                    className={`rounded-lg w-full hover:ring-2 ${isSelected("rain")}`}
                  >
                    <img
                      src="/rain.svg"
                      alt="rain"
                      data-weather="rain"
                      className="rounded-lg w-full h-full m-auto"
                    />
                  </label>
                  <label
                    htmlFor="title"
                    className={`rounded-lg w-full hover:ring-2 ${isSelected("littleCloud")}`}
                  >
                    <img
                      src="/littleCloud.svg"
                      alt="littleCloud"
                      data-weather="littleCloud"
                      className="rounded-lg w-full h-full m-auto"
                    />
                  </label>
                  <label
                    htmlFor="title"
                    className={`rounded-lg w-full hover:ring-2 ${isSelected("mainSnow")}`}
                  >
                    <img
                      src="/mainSnow.svg"
                      alt="mainSnow"
                      data-weather="mainSnow"
                      className="rounded-lg w-full h-full m-auto"
                    />
                  </label>
                  <label
                    htmlFor="title"
                    className={`rounded-lg w-full hover:ring-2 ${isSelected("windspeed")}`}
                  >
                    <img
                      src="/windspeed.svg"
                      alt="windspeed"
                      data-weather="windspeed"
                      className="rounded-lg w-full h-full m-auto"
                    />
                  </label>
                  <input
                    className=""
                    type="hidden"
                    value={weatherType}
                    id="title"
                    {...register("title", { required: "날씨를 선택하세요." })}
                  />
                </div>
                <div>
                  {errors.title && (
                    <p className="absolute font-SSRONETHandwritten text-xl font-bold text-red-500">
                      날씨를 선택하세요.
                    </p>
                  )}
                </div>
              </section>
            </div>
            <section className="w-full h-full drop-shadow-md">
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
                {errors.content && (
                  <p className="absolute font-SSRONETHandwritten text-xl font-bold text-red-500">
                    내용을 입력하세요.
                  </p>
                )}
              </div>
            </section>
            <footer className="flex gap-2">
              <button
                // text={'취소'}
                type="button"
                onClick={() => {
                  if (confirm("그만쓸까요?")) {
                    navigate("/community");
                  }
                  return;
                }}
                className="w-full p-4 border-2 border-slate-100 rounded-lg font-UhBeeKangJa transition-all duration-200 text-nowrap text-gray-500 bg-slate-200 hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400"
              >
                취소
              </button>
              <button
                // text={'등록'}
                type="submit"
                className="w-full p-4 border-2 border-slate-100 rounded-lg font-UhBeeKangJa transition-all duration-200 text-nowrap text-white bg-sky-400 hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400"
              >
                등록
              </button>
            </footer>
          </div>
        </form>
      </main>
    </div>
  );
}

export default CommunityNew;
