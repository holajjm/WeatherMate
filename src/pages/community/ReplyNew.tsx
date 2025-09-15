import React from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import Button from "@components/layout/Button";
import useReplyCreate from "@features/community/useReplyCreate";

import type { NewReply } from "types/CommunityType";

function ReplyNew() {
  const { _id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<NewReply>();

  const { mutate: onSubmit } = useReplyCreate({ _id, reset });
  return (
    <div>
      <form
        onSubmit={handleSubmit(formData => onSubmit(formData))}
        className="relative flex gap-2 rounded-lg"
      >
        <input
          {...register("comment", {
            required: "내용을 입력하세요"
          })}
          placeholder="댓글을 입력하세요"
          className="w-full rounded-button border-2 border-toss-lightgray p-2 text-caption focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        {errors.comment && (
          <p className="absolute top-2.5 right-16 text-caption text-red-500">
            {errors.comment.message as string}
          </p>
        )}
        <Button
          text="등록"
          textColor="white"
          bgColor="blue"
          width="12"
          height="9"
          onClick={() => {}}
        ></Button>
      </form>
    </div>
  );
}

export default ReplyNew;
