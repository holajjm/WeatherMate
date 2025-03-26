import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { memberState } from "@recoil/atom";
import { NewReply, ReplyData } from "type";

import useCustomAxios from "@hooks/useCustomAxios.js";

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
    <div className="p-2 bg-slate-50 flex flex-col gap-2 rounded-lg">
      <div className="flex justify-center items-center gap-2">
        <div>
          {item?.user.profile ? (
            <img
              src={`${import.meta.env.VITE_API_SERVER}/files/07-WeatherMate/${item.user.profile}`}
              className="rounded-full border w-12 h-12"
            />
          ) : (
            <p className="border-2 border-black rounded-full w-12 h-12"></p>
          )}
        </div>
        <div className="grow flex flex-col justify-between gap-1">
          <div className="flex">
            <div className="grow flex items-center gap-2">
              <div className="">{item?.user.name}</div>
              <p className="text-stone-500">
                {item?.createdAt.substring(5, 16)}
              </p>

              {user._id === item?.user._id ? (
                editReply ? (
                  <div className="ml-auto flex">
                    <button
                      onClick={() => setEditReply(!editReply)}
                      className="w-full px-2 border-2 border-slate-100 rounded-lg font-UhBeeKangJa transition-all duration-200 text-nowrap text-white bg-slate-500 hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400"
                    >
                      취소
                    </button>
                  </div>
                ) : (
                  <div className="ml-auto flex">
                    <button
                      onClick={() => setEditReply(!editReply)}
                      className="w-full px-2 border-2 border-slate-100 rounded-lg font-UhBeeKangJa transition-all duration-200 text-nowrap text-white bg-indigo-500 hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => handleDelete(item?._id)}
                      className="w-full px-2 border-2 border-slate-100 rounded-lg font-UhBeeKangJa transition-all duration-200 text-nowrap text-white bg-red-500 hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400"
                    >
                      삭제
                    </button>
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
                <button
                  // text={'수정'}
                  type="submit"
                  className="w-1/6 p-1 border-2 border-slate-100 rounded-lg font-UhBeeKangJa transition-all duration-200 text-nowrap text-white bg-indigo-500 hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400"
                >
                  수정
                </button>
              </form>
            ) : (
              <div className="border-2 rounded-lg p-1 bg-white border-gray-200">
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
