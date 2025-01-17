import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import useCustomAxios from "@hooks/useCustomAxios.mts";
import { NewReply } from "type";

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
        className="flex flex-col gap-2 border rounded-lg"
      >
        <div className="flex gap-2">
          <textarea
            {...register("comment", {
              required: "내용을 입력하세요",
            })}
            autoFocus
            rows={1}
            placeholder="댓글을 입력하세요"
            className="p-2 w-full text-sm border rounded-lg lg:min-h-12 lg:max-h-12 border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          ></textarea>
          <button
            // text={'등록'}
            type="submit"
            className="w-1/6 bg-amber-400 font-bold font-UhBeeKangJa rounded-lg text-white"
          >
            등록
          </button>
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
