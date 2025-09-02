import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { memberState } from "@recoil/atom";
import { useRecoilState } from "recoil";

import { ENV } from "@constants/env";
import Button from "@components/layout/Button";
import useCustomAxios from "@hooks/useCustomAxios";
import usePageTitle from "@hooks/usePageTitle";
import useScrollTop from "@hooks/useScrollTop";
import UserBoard from "@pages/user/UserBoard";
import UserBookMark from "@pages/user/UserBookmark";
import ValidLogin from "@pages/user/UserValidLogin";

import { BsBookmarkStarFill } from "react-icons/bs";
import { PiUserListBold } from "react-icons/pi";
import type {
  CommunityMainData,
  ExpandCommunityData,
} from "types/CommunityType";

function UserPage() {
  usePageTitle("MyPage");
  useScrollTop();
  const navigate = useNavigate();
  const axios = useCustomAxios();
  const [user, setUser] = useRecoilState(memberState);
  const handleLogout = () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      setUser(null);
      navigate("/");
    }
  };

  const Edit = () => {
    navigate("/user/edit");
  };

  const { data } = useQuery<AxiosResponse<CommunityMainData>>({
    queryKey: ["posts"],
    queryFn: () =>
      axios.get("/posts", {
        params: {
          type: "community",
        },
      }),
    // suspense: true,
    refetchOnMount: "always",
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
  return (
    <>
      {user && user.name ? (
        <div className="m-auto h-screen min-w-[320px] max-w-[600px] overflow-y-scroll bg-slate-50 p-2 scrollbar-hide">
          <main className="h-screen w-full drop-shadow-md">
            <section className="flex w-full flex-col gap-4 overflow-y-scroll rounded-xl bg-white p-6 scrollbar-hide">
              <header className="flex flex-col gap-4">
                <div className="flex items-center gap-2 md:gap-4">
                  <img
                    className="h-12 w-12 rounded-full"
                    src={
                      user?.profile
                        ? `${ENV.API_SERVER}/files/07-WeatherMate/${user?.profile}`
                        : "/mainlogin.webp"
                    }
                    alt="Profile"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="flex-grow">
                    <p className="font-Pretendard text-lg font-bold text-sky-500">
                      {user.name}님
                    </p>
                    <p className="font-SSRONETHandwritten text-nowrap text-base font-semibold text-slate-600">
                      오늘 날씨 어때요?
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-2">
                    <Button
                      text={"회원 정보 수정"}
                      textColor="white"
                      bgColor="indigo"
                      width="full"
                      onClick={Edit}
                    ></Button>
                    <Button
                      text={"로그아웃"}
                      textColor="white"
                      bgColor="lightRed"
                      width="full"
                      onClick={handleLogout}
                    ></Button>
                  </div>
                </div>
              </header>

              <main className="flex h-full flex-col gap-4">
                <div className="flex items-center gap-2">
                  <BsBookmarkStarFill className="h-4 w-4 text-sky-400" />
                  <p className="text-nowrap text-base font-bold text-slate-600">
                    저장한 장소
                  </p>
                  <Link
                    to={"/location"}
                    className="ml-auto text-sm text-slate-400 hover:font-bold"
                  >
                    장소추천 &rarr;
                  </Link>
                </div>
                <UserBookMark />
              </main>

              <main className="flex h-full flex-col gap-4">
                <div className="flex items-center gap-2">
                  <PiUserListBold className="h-6 w-6 text-sky-400" />
                  <p className="text-nowrap text-base font-bold text-slate-600">
                    나의 게시글
                  </p>
                  <Link
                    to={"/community"}
                    className="ml-auto text-sm text-slate-400 hover:font-bold"
                  >
                    커뮤니티 &rarr;
                  </Link>
                </div>
                <div className="grid h-96 grid-cols-1 gap-2 overflow-y-scroll rounded-xl border-b-2 border-t-2 bg-slate-100 p-4 py-4 drop-shadow-md scrollbar-hide sm:grid-cols-2">
                  {itemList}
                </div>
              </main>
            </section>
          </main>
        </div>
      ) : (
        <ValidLogin />
      )}
    </>
  );
}

export default UserPage;
