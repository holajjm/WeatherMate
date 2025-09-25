import React, { useState } from "react";

import { ENV } from "@constants/env";
import Button from "@components/layout/Button";
import Loading from "@components/layout/Loading";
import CommunityModal from "@components/modal/CommunityModal";
import { usePostsQuery } from "@features/community/usePostsQuery";
import { ModalPortal } from "@hooks/modalPortal";
import ErrorPage from "@pages/ErrorPage";

import type { CommunityData } from "types/CommunityType";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function CommunityPopularItem() {
  const [selectedItem, setSelectedItem] = useState<CommunityData | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpen = (item: CommunityData) => {
    setSelectedItem(item);
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
    setSelectedItem(null);
  };

  const { data: PostsData, isFetching, isError, refetch } = usePostsQuery();
  // console.log(PostsData);

  return (
    <>
      {!isFetching && !isError ? (
        PostsData ? (
          <>
            {isOpen && (
              <ModalPortal>
                <CommunityModal handleClose={handleClose} item={selectedItem} />
              </ModalPortal>
            )}

            <Swiper
              aria-label="인기 게시물 슬라이드"
              observer
              observeParents
              direction="vertical"
              spaceBetween={100}
              centeredSlides
              autoplay={{
                delay: 2000,
                disableOnInteraction: false
              }}
              loop
              modules={[Autoplay, Pagination, Navigation]}
              className="flex h-20 w-full gap-2"
            >
              {PostsData?.sort(
                (a: CommunityData, b: CommunityData) => b.views - a.views
              ).map((item: CommunityData) => (
                <SwiperSlide
                  key={item._id}
                  onClick={() => handleOpen(item)}
                  className="flex w-full cursor-pointer items-center justify-center gap-4 text-nowrap text-center"
                >
                  <div
                    aria-label="인기 게시물 목록"
                    className="flex h-full w-1/2 flex-col justify-between gap-2 rounded-full text-caption"
                  >
                    <div className="flex gap-2">
                      <img
                        className="h-8 w-8 rounded-full"
                        src={
                          item?.user.profile
                            ? `${ENV.API_SERVER}/files/07-WeatherMate/${item.user.profile}`
                            : "/NullUser.webp"
                        }
                        alt={`${item.user?.name} 프로필`}
                        {...{ fetchpriority: "high" }}
                        decoding="async"
                      />
                      <p>{item.user?.name}</p>
                    </div>
                    <div className="flex items-end justify-end gap-2 text-caption text-toss-gray">
                      <p>댓글 {item.repliesCount}</p>
                      <p>조회수 {item.views}</p>
                    </div>
                  </div>
                  <div className="flex h-full w-1/2 gap-2 rounded-button">
                    <img
                      className="h-full w-full rounded-button"
                      src={
                        item.image
                          ? `${ENV.API_SERVER}/files/07-WeatherMate/${item.image}`
                          : `./ReadyForImage.webp`
                      }
                      alt="게시물 이미지"
                      {...{ fetchpriority: "high" }}
                      decoding="async"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        ) : (
          <div className="flex h-20 w-full items-center justify-center">
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
        <div className="flex h-20 w-full items-center justify-center">
          <Loading />
        </div>
      )}
      {isError && <ErrorPage />}
    </>
  );
}

export default CommunityPopularItem;
