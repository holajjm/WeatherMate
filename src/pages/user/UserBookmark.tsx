import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Loading from "@components/layout/Loading";
import Button from "@components/layout/Button";

import type { UserBookmarkData } from "types/UserType";

function UserBookMark() {
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarkData, setBookmarkData] = useState<UserBookmarkData[]>([]);
  const navigate = useNavigate();
  // console.log(bookmarkData);

  const fetchData = async (contentId: string) => {
    try {
      const response = await axios.get(
        `https://apis.data.go.kr/B551011/KorService1/detailCommon1?MobileOS=ETC&MobileApp=test&_type=json&contentId=${contentId}&serviceKey=Tni56ZINiQ1IRiydSoRdwSLjhCAXtB2FKJPCTEQPxyyr0%2FJvNjWymNpCJQzOtAmEEr1jyhFa2zejQamJnkB9Uw%3D%3D&defaultYN=Y&firstImageYN=Y`
      );
      return response.data.response.body.items.item;
    } catch (error) {
      console.error("API 요청 실패:", error);
    }
  };

  useEffect(() => {
    const storedBookmarks =
      JSON.parse(localStorage.getItem("bookmarks") as string) || [];
    setBookmarks(storedBookmarks);
  }, []);

  useEffect(() => {
    const fetchDataForBookmarks = async () => {
      const bookmarkDataArray = await Promise.all(
        bookmarks.map(bookmark => fetchData(bookmark))
      );
      setBookmarkData(bookmarkDataArray.flat());
    };
    fetchDataForBookmarks();
  }, [bookmarks]);

  const moveToBookMarkPage = (contentId: string) => {
    navigate(`/location/${contentId}`);
  };

  const removeBookmark = (contentId: string) => {
    if (confirm("북마크에서 삭제하시겠습니까?")) {
      const updatedBookmarks = bookmarks.filter(
        bookmark => bookmark !== contentId
      );
      setBookmarks(updatedBookmarks);
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
      // 새로운 북마크 데이터 배열 생성
      const updatedBookmarkData = bookmarkData.filter(
        item => item.contentid !== contentId
      );
      console.log(updatedBookmarkData);
      setBookmarkData(updatedBookmarkData);
    }
    return;
  };
  // console.log(bookmarkData);

  return (
    <div className="min-h-60 overflow-scroll rounded-button scrollbar-hide">
      {bookmarkData?.length ? (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {bookmarkData.map((item, index) => (
            <div key={index} className="flex">
              <div className="box-border flex h-full flex-col gap-4 rounded-lg bg-white p-4 drop-shadow-lg">
                <div className="flex h-full">
                  <img
                    src={item.firstimage ? item.firstimage : "/01.svg"}
                    className="rounded-lg"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <p className="text-center text-base font-normal">
                    {item.title}
                  </p>
                  <div className="flex gap-1">
                    <Button
                      text="상세보기"
                      textColor="gray"
                      bgColor="gray"
                      width="full"
                      height="10"
                      onClick={() => moveToBookMarkPage(item.contentid)}
                    ></Button>
                    <Button
                      text="삭제하기"
                      textColor="white"
                      bgColor="lightRed"
                      width="full"
                      height="10"
                      onClick={() => removeBookmark(item.contentid)}
                    ></Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="flex h-60 items-center justify-center text-toss-gray">
          저장한 장소가 없습니다.
        </p>
      )}
    </div>
  );
}

export default UserBookMark;
