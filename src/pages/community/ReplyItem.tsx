import React,{ useState } from 'react';
import { useRecoilValue } from 'recoil';
import { memberState } from '../../recoil/atom.mts';
import ReplyEdit from '@pages/community/ReplyEdit';
import { NewReply, ReplyData } from 'type';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { SubmitHandler } from 'react-hook-form';

function ReplyItem(item:ReplyData) {
  const [editReply, setEditReply] = useState(false);
  const user = useRecoilValue(memberState);
  const axios = useCustomAxios();
  const {_id} = useParams();
  const { refetch } = useQuery({
    queryKey: ['posts', _id, 'replies'],
    queryFn: () => axios.get(`/posts/${_id}/replies`),
  });
  const handleDelete = async (reply_id:number) => {
    if(confirm("후기를 삭제하시겠습니까?")){
      await axios.delete(`/posts/${_id}/replies/${reply_id}`)
    }
    refetch()
  }
  const onUpdate: SubmitHandler<NewReply> = async () => {
    if(confirm("댓글을 수정하시겠습니까?")){
      await axios.patch(`/posts/${_id}/replies/${item._id}`);
    }
    refetch();
    setEditReply(false);
  };
  // console.log(item);
  
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
              <p className="text-stone-500">{item?.createdAt.substring(5, 16)}</p>
              {user._id === item?.user._id ? (
                <div className="ml-auto flex">
                  <button
                  onClick={() => setEditReply(!editReply)}
                    className="w-full px-2 border-2 border-slate-100 rounded-lg font-UhBeeKangJa transition-all duration-200 text-nowrap text-white bg-indigo-500 hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400"
                  >
                    {editReply ? "취소" : "수정"}
                  </button>
                  <button
                    onClick={() => handleDelete(item?._id)}
                    className="w-full px-2 border-2 border-slate-100 rounded-lg font-UhBeeKangJa transition-all duration-200 text-nowrap text-white bg-red-500 hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400"
                  >
                    삭제
                  </button>
                </div>
              ) : null}
            </div>
          </div>
          <div className="border-2 rounded-lg p-2 bg-white border-gray-200">
            {item?.comment}
          </div>
      </div>
      </div>
      <div className={editReply ? `block` : "hidden"}>
        <ReplyEdit onUpdate={onUpdate}/>
      </div>
    </div>
  );
}

export default ReplyItem;
