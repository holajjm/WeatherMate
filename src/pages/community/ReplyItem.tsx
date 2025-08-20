import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FieldValues, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { memberState } from "@recoil/atom";

import { ENV } from "@constants/env";
import Button from "@components/layout/Button";
import useCustomAxios from "@hooks/useCustomAxios.ts";

import type { NewReply, ReplyData } from "types/CommunityType";

function ReplyItem({ item }: { item: ReplyData }) {
  const [editReply, setEditReply] = useState<boolean>(false);
  const user = useRecoilValue(memberState);
  const axios = useCustomAxios();
  const { _id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewReply>();

  const { data, refetch } = useQuery({
    queryKey: ["posts", _id, "replies"],
    queryFn: () => axios.get(`/posts/${_id}/replies`),
  });

  const onUpdate = async (formData: FieldValues) => {
    if (confirm("댓글을 수정하시겠습니까?")) {
      await axios.patch(`/posts/${_id}/replies/${item._id}`, formData);
      refetch();
      reset();
    }
    setEditReply(false);
  };

  const handleDelete = async (reply_id: number) => {
    if (confirm("후기를 삭제하시겠습니까?")) {
      await axios.delete(`/posts/${_id}/replies/${reply_id}`);
    }
    refetch();
  };
  return (
    <div className="p-2 bg-slate-100 flex flex-col gap-2 rounded-lg">
      <div className="flex justify-center items-center gap-2">
        <div>
          <img
            src={
              item?.user.profile
                ? `${ENV.API_SERVER}/files/07-WeatherMate/${item.user.profile}`
                : "/NullUser.webp"
            }
            className="rounded-full border w-12 h-12"
            width={48}
            height={48}
            {...{ fetchpriority: "high" }}
            decoding="async"
          />
        </div>
        <div className="grow flex flex-col justify-between gap-1">
          <div className="flex">
            <div className="grow flex items-center gap-2">
              <div className="text-base">{item?.user.name}</div>
              <p className="text-sm text-stone-500">
                {item?.createdAt.substring(5, 16)}
              </p>

              {user._id === item?.user._id ? (
                editReply ? (
                  <div className="ml-auto flex">
                    <Button
                      text={"취소"}
                      textColor="white"
                      bgColor="gray"
                      width="full"
                      onClick={() => setEditReply(!editReply)}
                    ></Button>
                  </div>
                ) : (
                  <div className="ml-auto flex">
                    <Button
                      text={"수정"}
                      textColor="white"
                      bgColor="indigo"
                      width="full"
                      onClick={() => setEditReply(!editReply)}
                    ></Button>
                    <Button
                      text={"삭제"}
                      textColor="white"
                      bgColor="red"
                      width="full"
                      onClick={() => handleDelete(item?._id)}
                    ></Button>
                  </div>
                )
              ) : null}
            </div>
          </div>
          <div>
            {editReply ? (
              <form
                className="w-full flex gap-2"
                onSubmit={handleSubmit(onUpdate)}
              >
                <textarea
                  {...register("comment", {
                    required: "내용을 입력하세요",
                  })}
                  rows={1}
                  className="grow p-2 w-full text-sm border rounded-lg border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="내용을 입력하세요."
                />
                {errors.comment && (
                  <p className="text-sm text-red-500">
                    {errors.comment.message as string}
                  </p>
                )}
                <Button
                  text={"수정"}
                  textColor="white"
                  bgColor="indigo"
                  width="1/6"
                  onClick={() => {}}
                ></Button>
              </form>
            ) : (
              <div className="border-2 rounded-lg p-1 text-base text-slate-600 bg-white border-gray-200">
                {item?.comment}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReplyItem;
