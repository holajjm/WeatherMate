import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { memberState } from "@recoil/atom";
import { useRecoilState } from "recoil";

import useCustomAxios from "@hooks/useCustomAxios";
import usePageTitle from "@hooks/usePageTitle";
import useScrollTop from "@hooks/useScrollTop";
import Button from "@components/layout/Button";
import { CommunityMainData, ExpandCommunityData } from "type";

import UserBoard from "@pages/user/UserBoard";
import UserBookMark from "@pages/user/UserBookmark";
import ValidLogin from "@pages/user/UserValidLogin";
import { BsBookmarkStarFill } from "react-icons/bs";
import { PiUserListBold } from "react-icons/pi";

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
        <div className="max-w-[600px] min-w-[320px] m-auto h-screen p-2 bg-slate-50 overflow-y-scroll scrollbar-hide">
          <main className=" w-full h-screen drop-shadow-md">
            <section className="bg-white w-full overflow-y-scroll scrollbar-hide rounded-xl p-6 flex flex-col gap-4">
              <header className="flex flex-col gap-4">
                <div className="flex gap-2 md:gap-4 items-center">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={
                      user?.profile
                        ? `${import.meta.env.VITE_API_SERVER}/files/07-WeatherMate/${user?.profile}`
                        : "/mainlogin.svg"
                    }
                    alt="Profile"
                  />
                  <div className="flex-grow">
                    <p className="text-lg font-Pretendard font-bold text-sky-500">
                      {user.name}님
                    </p>
                    <p className="text-base text-nowrap font-semibold font-SSRONETHandwritten text-slate-600">
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

              <main className="flex flex-col gap-4 h-full">
                <div className="flex gap-2 items-center">
                  <BsBookmarkStarFill className="text-sky-400 w-4 h-4" />
                  <p className="text-base text-nowrap text-slate-600 font-bold">
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

              <main className="flex flex-col gap-4 h-full">
                <div className="flex gap-2 items-center">
                  <PiUserListBold className="text-sky-400 w-6 h-6" />
                  <p className="text-base text-nowrap text-slate-600 font-bold">
                    나의 게시글
                  </p>
                  <Link
                    to={"/community"}
                    className="ml-auto text-sm text-slate-400 hover:font-bold"
                  >
                    커뮤니티 &rarr;
                  </Link>
                </div>
                <div className="h-96 grid grid-cols-1 sm:grid-cols-2 gap-2 border-t-2 border-b-2 drop-shadow-md py-4 overflow-y-scroll scrollbar-hide bg-slate-100 p-4 rounded-xl">
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
