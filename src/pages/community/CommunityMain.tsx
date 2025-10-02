import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Button from "@components/layout/Button";
import ToTheTopButton from "@components/layout/ToTheTopButton";
import Loading from "@components/layout/Loading";
import usePageTitle from "@hooks/usePageTitle";
import useScrollTop from "@hooks/useScrollTop";
import { usePostsQuery } from "@features/community/usePostsQuery";
import CommunityItem from "@pages/community/CommunityItem";
import CommunityPopularItem from "@pages/community/CommunityPopularItem";
import UserValidLogin from "@pages/user/UserValidLogin";
import ErrorPage from "@pages/ErrorPage";
import { useUserStore } from "@store/store";

import type { CommunityData } from "types/CommunityType";

function CommunityMain() {
  usePageTitle("Community");
  useScrollTop();
  const [select, setSelect] = useState<string>("");
  // const axios = useCustomAxios();
  const [searchParams, setSearchParams] = useSearchParams();
  const user = useUserStore(state => state.user);
  const page = searchParams.get("page");
  const navigate = useNavigate();
  const { isFetching, data: PostsData, isError, refetch } = usePostsQuery();
  // const { isLoading, data, error, refetch } = useQuery({
  //   queryKey: ["posts", page],
  //   queryFn: () =>
  //     axios.get("/posts", {
  //       params: {
  //         page,
  //         keyword: searchParams.get("keyword"),
  //         type: "community"
  //       }
  //     }),
  //   select: data => data?.data?.item,
  //   refetchOnMount: "always"
  // });

  // useEffect(() => {
  //   refetch();
  // }, [searchParams.toString()]);

  // const handleSearch = (keyword: string) => {
  //   searchParams.set("keyword", keyword);
  //   searchParams.set("page", "1");
  //   setSearchParams(searchParams);
  // };
  const selectValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value);
  };
  const sortStrategies: Record<
    string,
    (a: CommunityData, b: CommunityData) => number
  > = {
    latest: () => 0, // 최신순은 정렬 없음
    oldest: () => 0, // reverse로 처리할 예정
    "most-viewed": (a, b) => b.views - a.views,
    "least-viewed": (a, b) => a.views - b.views,
    replies: (a, b) => b.repliesCount - a.repliesCount
  };

  const sortItemList = (select: string) => {
    if (!PostsData) return null;
    // 원본 배열 복사
    let sorted = [...PostsData];
    if (select === "oldest") {
      sorted.reverse();
    } else if (select in sortStrategies && select !== "latest") {
      sorted.sort(sortStrategies[select]);
    }
    return sorted.map(item => <CommunityItem key={item._id} item={item} />);
  };
  // const sortItemList = (select: string) => {
  //   if (select === "" || select === "latest") {
  //     return PostsData?.map((item: CommunityData) => (
  //       <CommunityItem key={item._id} item={item} />
  //     ));
  //   }
  //   if (select === "oldest") {
  //     return PostsData?.map((item: CommunityData) => (
  //       <CommunityItem key={item._id} item={item} />
  //     )).reverse();
  //   }
  //   if (select === "most-viewed") {
  //     return PostsData.sort(
  //       (a: CommunityData, b: CommunityData) => b.views - a.views
  //     ).map((item: CommunityData) => (
  //       <CommunityItem key={item._id} item={item} />
  //     ));
  //   }
  //   if (select === "least-viewed") {
  //     return PostsData.sort(
  //       (a: CommunityData, b: CommunityData) => a.views - b.views
  //     ).map((item: CommunityData) => (
  //       <CommunityItem key={item._id} item={item} />
  //     ));
  //   }
  //   if (select === "replies") {
  //     return PostsData.sort(
  //       (a: CommunityData, b: CommunityData) => b.repliesCount - a.repliesCount
  //     ).map((item: CommunityData) => (
  //       <CommunityItem key={item._id} item={item} />
  //     ));
  //   }
  // };
  return (
    <>
      {user?.name ? (
        <main className="m-auto flex h-screen min-w-[320px] max-w-[600px] flex-col gap-4 overflow-y-scroll bg-slate-50 scrollbar-hide">
          {/* 인기 게시물 영역 */}
          <aside className="flex items-center justify-center gap-4 bg-white px-4 py-2 drop-shadow-sm">
            <CommunityPopularItem />
            <section
              aria-label="게시글 작성 및 정렬"
              className="flex w-1/2 gap-2"
            >
              {/* <Search onClick={handleSearch}></Search> */}
              <div className="flex w-full flex-col gap-2">
                <Button
                  text="글 작성하기"
                  textColor="white"
                  bgColor="blue"
                  width="full"
                  height="10"
                  onClick={() => navigate("/community/new")}
                />
                <label htmlFor="community-sort" className="sr-only">
                  게시글 정렬 기준 선택
                </label>
                <select
                  id="community-sort"
                  className="h-10 cursor-pointer rounded-button border-2 border-slate-300 text-center text-caption font-bold text-toss-gray"
                  value={select}
                  onChange={selectValue}
                >
                  <option value="latest">최신순</option>
                  <option value="oldest">오래된순</option>
                  <option value="most-viewed">조회수 높은 순</option>
                  <option value="least-viewed">조회수 낮은 순</option>
                  <option value="replies">댓글순</option>
                </select>
              </div>
            </section>
          </aside>

          {/* 게시글 리스트 영역 */}

          {!isFetching && !isError ? (
            PostsData ? (
              <section
                aria-label="커뮤니티 게시글 목록"
                className="flex flex-col items-center justify-center gap-4 bg-white sm:grid sm:grid-cols-2"
              >
                {sortItemList(select)}
              </section>
            ) : (
              <div className="flex h-full items-center justify-center">
                <Button
                  text={"다시 불러오기"}
                  textColor="white"
                  bgColor="gray"
                  width="24"
                  height="10"
                  onClick={refetch}
                ></Button>
              </div>
            )
          ) : (
            <div className="flex h-full items-center justify-center bg-white">
              <Loading />
            </div>
          )}
          {isError && <ErrorPage />}
          <ToTheTopButton />
        </main>
      ) : (
        <UserValidLogin />
      )}
    </>
  );
}

export default CommunityMain;
