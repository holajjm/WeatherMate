import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { memberState } from "@recoil/atom";

import { ENV } from "@constants/env";
import Button from "@components/layout/Button";
import useReplyDelete from "@features/community/useReplyDelete";
import useReplyUpdate from "@features/community/useReplyUpdate";

import { BsThreeDots } from "react-icons/bs";
import type { NewReply, ReplyData } from "types/CommunityType";

function ReplyItem({ item }: { item: ReplyData }) {
  const [editReply, setEditReply] = useState<boolean>(false);
  const user = useRecoilValue(memberState);
  const { _id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewReply>();
  // 댓글 수정
  const { mutate: onUpdate } = useReplyUpdate({ item, _id, reset });
  // 댓글 삭제
  const { mutate: handleDelete } = useReplyDelete({ item, _id });
  const [menu, setMenu] = useState<boolean>(false);
  return (
    <div className="flex flex-col gap-2 rounded-lg bg-slate-100 p-2">
      <div className="flex items-center justify-center gap-2">
        <div>
          <img
            src={
              item?.user.profile
                ? `${ENV.API_SERVER}/files/07-WeatherMate/${item.user.profile}`
                : "/NullUser.webp"
            }
            className="h-12 w-12 rounded-full border"
            width={48}
            height={48}
            {...{ fetchpriority: "high" }}
            decoding="async"
          />
        </div>
        <div className="flex grow flex-col justify-between gap-1">
          <div className="flex">
            <div className="flex grow items-center gap-2">
              <div className="text-base">{item?.user.name}</div>
              <p className="text-sm text-stone-500">
                {item?.createdAt.substring(5, 16)}
              </p>
              <div
                className="relative ml-auto cursor-pointer"
                onClick={() => setMenu(!menu)}
              >
                <BsThreeDots className="h-full" />
                {menu && (
                  <div className="absolute right-0 top-5">
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
                            onClick={() => handleDelete()}
                          ></Button>
                        </div>
                      )
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            {editReply ? (
              <form
                className="flex w-full gap-2"
                onSubmit={handleSubmit(formData => onUpdate(formData))}
              >
                <input
                  {...register("comment", {
                    required: "내용을 입력하세요",
                  })}
                  className="w-full grow rounded-lg border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
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
              <div className="rounded-lg border-2 border-gray-200 bg-white p-1 text-base text-slate-600">
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
