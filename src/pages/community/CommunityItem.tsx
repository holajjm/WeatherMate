import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ENV } from "@constants/env";
import { useLikesQuery } from "@features/community/useLikesQuery";
import { useLikesDelete } from "@features/community/useLikesDelete";
import { useLikesCreate } from "@features/community/useLikesCreate";
import { TimeDiff } from "@hooks/TimeDiff";
import { useLikesStore } from "@store/store";

import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import type { ExpandCommunityData, LikesData } from "types/CommunityType";

function CommunityItem({ item }: { item: ExpandCommunityData }) {
  const navigate = useNavigate();
  const { likes, setLikes } = useLikesStore();

  // 좋아요 전체 목록 조회
  const { data: getLikePosts } = useLikesQuery();
  // console.log(getLikePosts);

  useEffect(() => {
    getLikePosts?.forEach((e: LikesData) => {
      setLikes({ realId: e?.post?._id, likeId: e?._id });
    });
  }, [getLikePosts]);

  // 좋아요 누르기
  const { mutate: postLike } = useLikesCreate({
    id: item._id,
    content: item.content
  });

  // 좋아요 취소
  const { mutate: deleteLike } = useLikesDelete();
  const handleDeleteLike = () => {
    const likeObj = likes.find(e => e.realId === item._id);
    if (likeObj) deleteLike(likeObj.likeId);
  };

  return (
    <div className="box-border flex h-[25rem] w-full cursor-pointer flex-col gap-1 bg-white drop-shadow-md transition-all duration-200 hover:scale-[0.98] hover:border hover:border-toss-blue">
      <div className="grow flex flex-col gap-2" onClick={() => navigate(`/community/${item._id}`)}>
        <header className="h-12 p-2">
          <section className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2">
              <img
                src={
                  item?.user.profile
                    ? `${ENV.API_SERVER}/files/07-WeatherMate/${item.user.profile}`
                    : "/NullUser.webp"
                }
                alt="profile"
                className="h-10 w-10 rounded-full object-contain"
                width={48}
                height={48}
                {...{ fetchpriority: "high" }}
                decoding="async"
              />
            </div>

            <div className="flex grow items-center">
              <div className="grow">
                <h1 className="text-sm font-bold text-black">
                  {item.user?.name}
                </h1>
                <p className="text-caption text-toss-gray">
                  조회수 {item.views}
                </p>
              </div>
              {item.title && (
                <img
                  className="h-8 w-8 rounded-button"
                  src={
                    [
                      "Sun",
                      "Cloud",
                      "Rain",
                      "Foggy",
                      "Snow",
                      "Thunder",
                      "Wind"
                    ].includes(item?.title)
                      ? `./WeatherIcon/WeatherIcon${item?.title}.webp`
                      : "./MBTIImage/MBTIMain.webp"
                  }
                  alt="weatherIcon"
                  width={48}
                  height={48}
                  {...{ fetchpriority: "high" }}
                  decoding="async"
                />
              )}
            </div>
          </section>
        </header>

        <section className="flex h-60 grow flex-col gap-1">
          <div className="h-full">
            <img
              className="h-full w-full border-y-[1px] border-toss-lightgray object-scale-down"
              src={
                item.extra
                  ? `${ENV.API_SERVER}/files/07-WeatherMate/${item.extra.image}`
                  : item?.image
                    ? `${ENV.API_SERVER}/files/07-WeatherMate/${item?.image}`
                    : `/ReadyForImage.webp`
              }
              alt="DetailImage"
              width={300}
              height={240}
              {...{ fetchpriority: "high" }}
              decoding="async"
            />
          </div>
        </section>

        <section>
          <p className="h-12 grow overflow-scroll px-2 text-caption text-black scrollbar-hide">
            {item.content}
          </p>
        </section>
      </div>

      <footer className="flex items-center justify-between gap-4 p-2 text-amber-400">
        <p className="text-caption font-medium text-toss-gray">
          {TimeDiff(item.createdAt)}
        </p>
        <section className="flex items-center justify-center gap-2">
          <button className="text-subtitle">
            {likes.some(e => e.realId === item._id) ? (
              <GoHeartFill onClick={handleDeleteLike} />
            ) : (
              <GoHeart onClick={() => postLike(item._id)} />
            )}
          </button>
          <div className="flex gap-1">
            <p className="flex items-center">
              <IoChatbubbleEllipsesOutline className="text-subtitle" />
            </p>
            <p className="text-body">{item.repliesCount}</p>
          </div>
        </section>
      </footer>
    </div>
  );
}

export default CommunityItem;
