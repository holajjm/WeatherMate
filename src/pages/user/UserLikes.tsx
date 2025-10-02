import React, { useState } from "react";

import { useLikesQuery } from "@features/community/useLikesQuery";
import { useLikesDelete } from "@features/community/useLikesDelete";

function UserLikes() {
  // 좋아요 전체 목록 조회
  const { data: LikePosts } = useLikesQuery();
  console.log(LikePosts);

  const [id, setId] = useState<number>(0);
  const [content, setContent] = useState<string>("");
  const getId = (e: any) => {
    setId(e.currentTarget.getAttribute("data-id"));
    setContent(e.currentTarget.getAttribute("data-content"));
  };

  // 좋아요 취소
  const { mutate: deleteLike } = useLikesDelete();

  return (
    <div className="m-auto flex h-screen min-w-[320px] max-w-[600px] flex-col gap-4 overflow-y-scroll bg-slate-50 scrollbar-hide">
      <header className="relative flex h-16 w-full items-center justify-center">
        <svg
          className="absolute left-0 top-5 h-5 w-5 cursor-pointer hover:scale-110"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          onClick={() => window.history.back()}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <p className="text-cetner flex w-full items-center justify-center text-nowrap text-body font-bold text-toss-gray">
          좋아요
        </p>
      </header>
      {LikePosts?.length ? (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {LikePosts.map((e: any) => (
            <div
              className="cursor-pointer border-2"
              key={e._id}
              onClick={() => deleteLike(e._id)}
            >
              {e._id}
            </div>
          ))}
        </div>
      ) : (
        <p className="flex h-60 items-center justify-center text-toss-gray">
          좋아요 목록이 없습니다.
        </p>
      )}
    </div>
  );
}

export default UserLikes;
