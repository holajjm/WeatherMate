import React from "react";

import { usePostsQuery } from "@features/community/usePostsQuery";
import UserBoardItem from "@pages/user/UserBoardItem";
import { useUserStore } from "@store/store";

import type { ExpandCommunityData } from "types/CommunityType";

function UserBoard() {
  const user = useUserStore(state => state.user);

  const { data: item } = usePostsQuery();
  const itemList = item
    ?.filter((item: ExpandCommunityData) => {
      if (item.user._id === user._id) {
        return item;
      }
    })
    .map((item: ExpandCommunityData) => <UserBoardItem item={item} />);
  // console.log(itemList);

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
          내 게시글
        </p>
      </header>
      {itemList?.length ? (
        itemList
      ) : (
        <p className="flex h-60 items-center justify-center text-toss-gray">
          작성한 게시글이 없습니다.
        </p>
      )}
    </div>
  );
}

export default UserBoard;
