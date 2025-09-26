import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
// import { memberState } from "@recoil/atom";
// import { useRecoilState } from "recoil";

import { ENV } from "@constants/env";
// import Button from "@components/layout/Button";
import useCustomAxios from "@hooks/useCustomAxios";
import usePageTitle from "@hooks/usePageTitle";
import useScrollTop from "@hooks/useScrollTop";
import UserBoard from "@pages/user/UserBoard";
import UserBookMark from "@pages/user/UserBookmark";
import ValidLogin from "@pages/user/UserValidLogin";
import { useUserStore } from "@store/store";

import { BsBookmarkStarFill } from "react-icons/bs";
import { PiUserListBold } from "react-icons/pi";
import type {
  CommunityMainData,
  ExpandCommunityData
} from "types/CommunityType";

function UserPage() {
  usePageTitle("MyPage");
  useScrollTop();
  // const navigate = useNavigate();
  const axios = useCustomAxios();
  // const [user, setUser] = useRecoilState(memberState);
  const user = useUserStore(state => state.user);
  const setUser = useUserStore(state => state.setUser);

  const { data } = useQuery<AxiosResponse<CommunityMainData>>({
    queryKey: ["posts"],
    queryFn: () =>
      axios.get("/posts", {
        params: {
          type: "community"
        }
      }),
    // suspense: true,
    refetchOnMount: "always"
  });
  // console.log(data);

  const itemList = data?.data?.item
    ?.filter((item: ExpandCommunityData) => {
      if (user && item.user._id === user._id) {
        return item;
      }
    })
    .map((item: ExpandCommunityData) => (
      <UserBoard key={item._id} item={item} />
    ));
  // console.log(itemList);

  return (
    <>
      {user && user.name ? (
        <div className="m-auto flex h-screen min-w-[320px] max-w-[600px] flex-col gap-4 overflow-y-scroll bg-slate-50 p-4 scrollbar-hide">
          <section className="flex h-16 w-full overflow-scroll scrollbar-hide">
            <header className="flex w-full items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  className="h-10 w-10 rounded-full"
                  src={
                    user?.profile
                      ? `${ENV.API_SERVER}/files/07-WeatherMate/${user?.profile}`
                      : "/NullUser.webp"
                  }
                  alt="Profile"
                  {...{ fetchpriority: "high" }}
                  decoding="async"
                />
                <div className="flex-grow">
                  <p className="text-body font-bold text-black">{user.name}</p>
                  <p className="text-nowrap text-caption text-toss-gray">
                    오늘 날씨 어때요?
                  </p>
                </div>
              </div>
              <Link to={"/user/detail"}>
                <svg
                  className="ml-2 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 -1 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </header>
          </section>

          <section className="box-border flex flex-col gap-2 rounded-modal bg-white p-2 drop-shadow-md">
            <div className="flex items-center gap-2">
              <BsBookmarkStarFill className="h-4 w-4 text-toss-blue" />
              <p className="text-nowrap text-body font-bold text-toss-gray">
                저장한 장소
              </p>
              <Link
                to={"/location"}
                className="ml-auto text-caption text-toss-gray transition-all duration-200 hover:font-bold"
              >
                장소추천 &rarr;
              </Link>
            </div>
            <UserBookMark />
          </section>

          <section className="box-border flex flex-col gap-2 rounded-modal bg-white p-2 drop-shadow-md">
            <div className="flex items-center gap-2">
              <PiUserListBold className="h-6 w-6 text-toss-blue" />
              <p className="text-nowrap text-body font-bold text-toss-gray">
                나의 게시글
              </p>
              <Link
                to={"/community"}
                className="ml-auto text-caption text-toss-gray transition-all duration-200 hover:font-bold"
              >
                커뮤니티 &rarr;
              </Link>
            </div>
            {itemList?.length ? (
              <div className="grid min-h-60 grid-cols-1 gap-2 overflow-y-scroll rounded-button p-2 scrollbar-hide sm:grid-cols-2">
                {itemList}
              </div>
            ) : (
              <p className="flex h-60 items-center justify-center text-toss-gray">
                작성한 게시글이 없습니다.
              </p>
            )}
          </section>
        </div>
      ) : (
        <ValidLogin />
      )}
    </>
  );
}

export default UserPage;
