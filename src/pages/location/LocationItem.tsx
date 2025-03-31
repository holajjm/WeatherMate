import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { memberState } from "@recoil/atom";
import { LocationMainData } from "type";

import { FiMapPin } from "react-icons/fi";
import { BsBookmarks, BsBookmarksFill } from "react-icons/bs";

function LocationItem({ item }: { item: LocationMainData }) {
  // console.log(item);
  const user = useRecoilValue(memberState);
  const navigate = useNavigate();
  const formatDistance = (distance: number) =>
    `${(distance / 1000).toFixed(1)} km`;
  const getCategoryText = (contentTypeId: string) => {
    switch (contentTypeId) {
      case "14":
        return "문화";
      case "15":
        return "행사";
      case "25":
        return "여행지";
      case "28":
        return "레포츠";
      case "32":
        return "숙박";
      case "38":
        return "쇼핑";
      case "39":
        return "음식점";
      default:
        return "전체";
    }
  };
  //북마크 기능 구현
  const [click, setClick] = useState<boolean>(false);
  const [bookmark, setBookmark] = useState<string | null>();
  useEffect(() => {
    const bookmarks = localStorage.getItem("bookmarks") || null;
    // console.log(bookmarks);
    setBookmark(bookmarks);
  }, [click]);
  // console.log(bookmark);
  // console.log(user);

  const handleBookMark = (contentId: string) => {
    if (!user?.name) {
      if (confirm("로그인이 필요합니다. 로그인 하시겠습니까?")) {
        navigate("/user/login", { state: location.pathname });
      }
    } else {
      try {
        let bookmarks =
          JSON.parse(localStorage.getItem("bookmarks") as string) || [];
        bookmarks.push(contentId);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        alert("북마크 저장됨");
        setClick(!click);
        console.log("북마크 추가 성공:", contentId);
      } catch (error) {
        console.error("북마크 추가 실패:", error);
      }
    }
  };
  const removeBookMark = (contentid: string) => {
    try {
      let bookmarks = JSON.parse(localStorage.getItem("bookmarks") as string);
      let newBookmarks = bookmarks.filter((e: string) => e !== contentid);
      localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
      alert("북마크 삭제됨");
      setClick(!click);
      console.log("북마크 제거 성공:", contentid);
    } catch (error) {
      console.error("북마크 추가 실패:", error);
    }
  };
  return (
    <>
      <Link
        to={`/location/${item.contentid}`}
        className="grow flex flex-col gap-1"
      >
        <header className="flex">
          <img
            src={item.firstimage ? item.firstimage : "/readyforimage.jpeg"}
            alt="이미지1"
            className="grow h-40 rounded-lg"
          />
        </header>

        <main className="flex gap-2">
          <div className="grow">
            <div className="flex">
              <p className="text-xs text-slate-400 font-Pretendard">
                {getCategoryText(item.contenttypeid)}
              </p>
              <div className="ml-auto bg-amber-300 flex items-center rounded-lg font-Pretendard">
                <FiMapPin className="text-sm" />
                <p className="text-xs">
                  {isNaN(parseFloat(item.dist))
                    ? "10km 이상"
                    : formatDistance(parseFloat(item.dist))}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-1 font-bold font-Pretendard">
              <h2 className="text-lg">{item.title}</h2>
              <p className="text-sm text-slate-500">{item.addr1}</p>
            </div>
          </div>
        </main>
      </Link>
      <footer>
        {(localStorage.getItem("bookmarks") as string)?.includes(
          item.contentid,
        ) ? (
          <div
            onClick={() => {
              removeBookMark(item.contentid);
            }}
            className="flex justify-center items-center gap-1 text-xs cursor-pointer"
          >
            <BsBookmarks className="text-blue-300 aspect-square" />
            <p>북마크 제거하기</p>
          </div>
        ) : (
          <div
            onClick={() => {
              handleBookMark(item.contentid);
            }}
            className="flex justify-center items-center gap-1 text-xs cursor-pointer"
          >
            <BsBookmarksFill className="text-blue-300 aspect-square" />
            <p>북마크 추가하기</p>
          </div>
        )}
      </footer>
    </>
  );
}

export default LocationItem;
