import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import Button from "@components/layout/Button";
import Search from "@components/layout/Search";
import ToTheTopButton from "@components/layout/ToTheTopButton";
import useCustomAxios from "@hooks/useCustomAxios";
import usePageTitle from "@hooks/usePageTitle";
import useScrollTop from "@hooks/useScrollTop";
import CommunityItem from "@pages/community/CommunityItem";
import CommunityPopularItem from "@pages/community/CommunityPopularItem";
import UserValidLogin from "@pages/user/UserValidLogin";
import { useUserStore } from "@store/store";

import type { CommunityMainData } from "types/CommunityType";

function CommunityMain() {
  usePageTitle("Community");
  useScrollTop();
  const [select, setSelect] = useState<string>("");
  const axios = useCustomAxios();
  const [searchParams, setSearchParams] = useSearchParams();
  const user = useUserStore(state => state.user);
  const page = searchParams.get("page");
  const navigate = useNavigate();
  const { isLoading, data, error, refetch } = useQuery<
    AxiosResponse<CommunityMainData>
  >({
    queryKey: ["posts", page],
    queryFn: () =>
      axios.get("/posts", {
        params: {
          page,
          keyword: searchParams.get("keyword"),
          type: "community"
        }
      }),
    refetchOnMount: "always"
  });

  useEffect(() => {
    refetch();
  }, [searchParams.toString()]);

  const handleSearch = (keyword: string) => {
    searchParams.set("keyword", keyword);
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };
  const selectValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value);
  };
  const sortItemList = (select: string) => {
    if (select === "" || select === "latest") {
      return data?.data?.item?.map(item => (
        <CommunityItem key={item._id} item={item} />
      ));
    }
    if (select === "oldest") {
      return data?.data?.item
        ?.map(item => <CommunityItem key={item._id} item={item} />)
        .reverse();
    }
    if (select === "most-viewed") {
      return data?.data?.item
        .sort((a, b) => b.views - a.views)
        .map(item => <CommunityItem key={item._id} item={item} />);
    }
    if (select === "least-viewed") {
      return data?.data?.item
        .sort((a, b) => a.views - b.views)
        .map(item => <CommunityItem key={item._id} item={item} />);
    }
    if (select === "replies") {
      return data?.data?.item
        .sort((a, b) => b.repliesCount - a.repliesCount)
        .map(item => <CommunityItem key={item._id} item={item} />);
    }
  };
  const handleWrite = () => {
    if (!user) {
      const gotologin = confirm(
        "로그인 후 이용 가능합니다. \n 로그인 하시겠습니까?"
      );
      gotologin && navigate("/user/login");
    } else {
      navigate("/community/new");
    }
  };
  return (
    <>
      {user?.name ? (
        <div className="m-auto flex h-screen min-w-[320px] max-w-[600px] flex-col gap-4 overflow-y-scroll bg-slate-50 px-4 scrollbar-hide">
          <aside>
            <CommunityPopularItem />
          </aside>
          <section className="flex gap-2">
            <Search onClick={handleSearch}></Search>
            <div className="flex gap-2">
              <select
                className="h-8 rounded-md border-2 border-slate-300 text-caption font-bold text-toss-gray"
                value={select}
                onChange={selectValue}
              >
                <option value="latest">최신순</option>
                <option value="oldest">오래된순</option>
                <option value="most-viewed">조회수 높은 순</option>
                <option value="least-viewed">조회수 낮은 순</option>
                <option value="replies">댓글순</option>
              </select>
              <Button
                text="글 작성하기"
                textColor="white"
                bgColor="blue"
                width="full"
                height="10"
                onClick={handleWrite}
              ></Button>
            </div>
          </section>
          <main className="flex flex-col items-center justify-center gap-4 sm:grid sm:grid-cols-2">
            {isLoading && <p>로딩중...</p>}
            {error && <p>{error.message}</p>}
            {sortItemList(select)}
          </main>
          <ToTheTopButton />
        </div>
      ) : (
        <UserValidLogin />
      )}
    </>
  );
}

export default CommunityMain;
