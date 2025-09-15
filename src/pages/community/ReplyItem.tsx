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
    formState: { errors }
  } = useForm<NewReply>();
  // 댓글 수정
  const { mutate: onUpdate } = useReplyUpdate({ item, _id, reset });
  // 댓글 삭제
  const { mutate: handleDelete } = useReplyDelete({ item, _id });
  const [menu, setMenu] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-2 rounded-button">
      <div className="flex items-start justify-center gap-2">
        <div>
          <img
            src={
              item?.user.profile
                ? `${ENV.API_SERVER}/files/07-WeatherMate/${item.user.profile}`
                : "/NullUser.webp"
            }
            className="h-8 w-8 rounded-full"
            width={48}
            height={48}
            {...{ fetchpriority: "high" }}
            decoding="async"
          />
        </div>
        <div className="flex grow flex-col justify-between gap-1">
          <div className="flex">
            <div className="flex grow items-center gap-2">
              <div className="text-caption font-bold text-toss-gray">
                {item?.user.name}
              </div>
              <p className="text-caption text-toss-gray">
                {item?.createdAt.substring(5, 16)}
              </p>
              <div className="relative ml-auto cursor-pointer">
                {user._id === item?.user._id ? (
                  <BsThreeDots
                    className="h-full"
                    onClick={() => setMenu(!menu)}
                  />
                ) : null}
                <div className="absolute right-0 top-5">
                  {menu && user._id === item?.user._id ? (
                    <div className="ml-auto flex flex-col rounded-button border bg-white drop-shadow-sm">
                      <button
                        onClick={() => {
                          setEditReply(!editReply);
                          setMenu(!menu);
                          setIsEdit(!isEdit);
                        }}
                        className="h-8 w-20 text-caption hover:text-toss-blue"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDelete()}
                        className="h-8 w-20 text-caption hover:text-toss-red"
                      >
                        삭제
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div>
            {isEdit ? (
              <form
                className="relative flex w-full gap-2"
                onSubmit={handleSubmit(formData => onUpdate(formData))}
              >
                <input
                  {...register("comment", {
                    required: "내용을 입력하세요"
                  })}
                  className="w-full rounded-button border-2 border-toss-lightgray p-2 text-caption focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="내용을 입력하세요."
                />
                {errors.comment && (
                  <p className="absolute right-28 top-2.5 text-caption text-toss-red">
                    {errors.comment.message as string}
                  </p>
                )}
                <div className="flex gap-1">
                  <Button
                    text={"수정"}
                    textColor="white"
                    bgColor="blue"
                    width="12"
                    height="9"
                    onClick={() => {}}
                  ></Button>
                  <Button
                    text={"취소"}
                    textColor="white"
                    bgColor="gray"
                    width="12"
                    height="9"
                    onClick={() => setIsEdit(!isEdit)}
                  ></Button>
                </div>
              </form>
            ) : (
              <div className="text-body text-toss-black">{item?.comment}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReplyItem;
