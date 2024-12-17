import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {NewReply} from 'type';

function ReplyEdit({onUpdate}:{onUpdate:SubmitHandler<NewReply>}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewReply>();
  
  // console.log(item);

  return (
      <form className="w-full flex gap-2" onSubmit={handleSubmit(onUpdate)}>
        <textarea
          {...register('comment', {
            required: '내용을 입력하세요',
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
            className="w-1/4 p-2 border-2 border-slate-100 rounded-lg font-UhBeeKangJa transition-all duration-200 text-nowrap text-white bg-indigo-500 hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400"
          >
            수정
          </button>
      </form>
  );
}

export default ReplyEdit;
