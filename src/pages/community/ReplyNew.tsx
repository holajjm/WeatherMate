import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import useCustomAxios from "@hooks/useCustomAxios";
import { NewReply } from "type";
import Button from "@components/layout/Button";

// import Submit from '@components/layout/Submit';

function ReplyNew() {
  const axios = useCustomAxios();
  const { _id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewReply>();

  const { refetch } = useQuery({
    queryKey: ["posts", _id, "replies"],
    queryFn: () => axios.get(`/posts/${_id}/replies`),
  });

  const onSubmit: SubmitHandler<NewReply> = async (formData: NewReply) => {
    await axios.post(`/posts/${_id}/replies`, formData);
    console.log(formData);
    refetch();
    reset();
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 rounded-lg"
      >
        <div className="flex gap-2">
          <textarea
            {...register("comment", {
              required: "내용을 입력하세요",
            })}
            // autoFocus
            rows={1}
            placeholder="댓글을 입력하세요"
            className="p-2 w-full text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          ></textarea>
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
