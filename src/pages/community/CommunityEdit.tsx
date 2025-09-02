import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { AxiosResponse } from "axios";

import { ENV } from "@constants/env";
import Button from "@components/layout/Button";
import useCustomAxios from "@hooks/useCustomAxios.js";

import type {
  CommunityDetailData,
  CommunityFormData,
} from "types/CommunityType";

function CommunityEdit() {
  const naviagte = useNavigate();
  const { _id } = useParams();
  const axios = useCustomAxios();
  const { data } = useQuery<AxiosResponse<CommunityDetailData>>({
    queryKey: ["posts", _id],
    queryFn: () => axios.get(`/posts/${_id}`),
    refetchOnWindowFocus: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommunityFormData>({
    defaultValues: {
      title: data?.data?.item.title || "",
      content: data?.data?.item.content || "",
    },
  });

  const handleEdit = async (formData: CommunityFormData) => {
    try {
      let imageUrl = data?.data?.item.image;
      if (selectedFile) {
        const imageData = new FormData();
        imageData.append("attach", selectedFile);
        const files = await axios.post("/files", imageData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("📸 File Upload Response:", files.data);
        if (files.data?.item && files.data.item.length > 0) {
          imageUrl = files.data.item[0]?.name;
          console.log("✅ New image uploaded:", imageUrl);
        } else {
          console.error("❌ Image upload failed: No item in response");
        }
      } else {
        console.log("📷 No new image selected, using the existing image");
      }
      const updatedFormData = {
        title: formData.title,
        content: formData.content,
        extra: { image: imageUrl },
      };
      console.log(updatedFormData);
      if (confirm("수정하시겠습니까?")) {
        const res = await axios.patch(`/posts/${_id}`, updatedFormData);
        console.log(res?.data);
        naviagte(`/community/${_id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    if (confirm("수정을 취소할까요?")) {
      window.history.back();
    }
  };

  const [tooltip, setTooltip] = useState<{
    visible: boolean;
  }>({
    visible: false,
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // 이미지 미리보기 구현
  const [imagePreview, setImagePreview] = useState<string>("");
  const handlePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files?.[0]);
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  console.log(selectedFile);

  return (
    <form
      onSubmit={handleSubmit(handleEdit)}
      className="m-auto flex h-screen min-w-[320px] max-w-[600px] flex-col gap-4 overflow-y-scroll bg-slate-50 p-2 scrollbar-hide"
    >
      <h1 className="font-SSRONETHandwritten text-center text-2xl font-bold">
        수정하기
      </h1>
      {data?.data?.item && (
        <section className="flex flex-col flex-nowrap gap-2 rounded-xl bg-white p-2 drop-shadow-lg">
          <main className="flex flex-col gap-4">
            {data?.data?.item.image && (
              <section className="flex h-full flex-col">
                <div className="flex h-full flex-col gap-2">
                  <label
                    htmlFor="file"
                    className="box-border rounded-md border-2 border-slate-200 p-2"
                  >
                    <img
                      src={
                        imagePreview
                          ? imagePreview
                          : `${ENV.API_SERVER}/files/07-WeatherMate/${data?.data?.item.image}`
                      }
                      alt="Content Image"
                      className="h-full cursor-pointer rounded-md object-contain shadow-md"
                      onMouseEnter={() =>
                        setTooltip(prev => ({ ...prev, visible: true }))
                      }
                      onMouseLeave={() =>
                        setTooltip(prev => ({ ...prev, visible: false }))
                      }
                    />
                  </label>
                  <input
                    type="file"
                    id="file"
                    hidden
                    {...register("image", {
                      required: "이미지를 첨부하세요",
                    })}
                    onChange={handlePreview}
                    defaultValue={selectedFile ? selectedFile.name : ""}
                  />
                  {errors.image ? (
                    <p className="font-SSRONETHandwritten text-base font-bold text-red-500">
                      이미지를 첨부하세요.
                    </p>
                  ) : (
                    <p className="h-4"></p>
                  )}
                  {tooltip.visible && (
                    <div
                      className={`pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-black px-2 py-2 font-[14px] text-white`}
                    >
                      클릭 시 이미지 수정
                    </div>
                  )}
                </div>
              </section>
            )}
            <section className="h-full w-full drop-shadow-md">
              <fieldset className="flex flex-col gap-2">
                <div
                  role="radiogroup"
                  aria-labelledby="profile-image-options"
                  className="flex items-center justify-between gap-1"
                >
                  {["Sun", "Cloud", "Rain", "Foggy", "Snow", "Wind"].map(id => (
                    <figure key={id} className="w-full rounded-lg">
                      <input
                        className="hidden"
                        type="radio"
                        id={id}
                        value={id}
                        {...register("title", {
                          required: "날씨를 선택해주세요",
                        })}
                      />
                      <label htmlFor={id} className={`w-full rounded-lg`}>
                        <img
                          className="h-12 w-full cursor-pointer rounded-lg hover:ring-2"
                          src={`/WeatherIcon${id}.svg`}
                          alt="WeatherIcon"
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
            <section>
              <input
                type="text"
                placeholder="내용을 입력하세요."
                className="w-full rounded-lg bg-slate-200 p-2 text-black"
                {...register("content", { required: "내용을 입력해주세요" })}
              />
              {errors.content ? (
                <p className="font-SSRONETHandwritten text-base font-bold text-red-500">
                  내용을 입력하세요.
                </p>
              ) : (
                <p className="h-4"></p>
              )}
            </section>
          </main>

          <footer className="flex items-center">
            {data.data.item && (
              <div className="ml-auto flex w-1/2 gap-2">
                <Button
                  text="수정"
                  textColor="white"
                  bgColor="indigo"
                  width="full"
                  onClick={() => {}}
                ></Button>
                <Button
                  text="취소"
                  textColor="white"
                  bgColor="gray"
                  width="full"
                  onClick={handleCancel}
                ></Button>
              </div>
            )}
          </footer>
        </section>
      )}
    </form>
  );
}

export default CommunityEdit;
