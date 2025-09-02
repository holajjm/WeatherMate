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
    reset,
  } = useForm<NewReply>();

  const { mutate: onSubmit } = useReplyCreate({ _id, reset });
  return (
    <div>
      <form
        onSubmit={handleSubmit(formData => onSubmit(formData))}
        className="flex flex-col gap-2 rounded-lg"
      >
        <div className="flex gap-2">
          <input
            {...register("comment", {
              required: "내용을 입력하세요",
            })}
            placeholder="댓글을 입력하세요"
            className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <Button
            text="등록"
            textColor="amber"
            bgColor="amber"
            width="1/6"
            onClick={() => {}}
          ></Button>
        </div>
        {errors.comment && (
          <p className="text-sm text-red-500">
            {errors.comment.message as string}
          </p>
        )}
      </form>
    </div>
  );
}

export default ReplyNew;
