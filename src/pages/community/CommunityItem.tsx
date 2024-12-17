import React from 'react';
import {useNavigate} from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { ExpandCommunityData } from 'type';
// import { FaRegHeart } from "react-icons/fa";

function CommunityItem({item}:{item:ExpandCommunityData}) {
  const navigate = useNavigate();
  const getItemTime = (createTime:string) => {
    const create = new Date(createTime).getTime();
    const nowTime = new Date().getTime();
    const diff= nowTime - create;
    const diffMonth = diff/ (1000 * 60 * 60 * 24 * 12);
    const diffDay = diff/ (1000 * 60 * 60 * 24);
    const diffHour = diff/ (1000 * 60 * 60);
    const diffMin = diff/ (1000 * 60 );
    return diffMin < 60 ? `${diffMin.toFixed(0)}분 전` : diffHour < 24 ? `${diffHour.toFixed(0)}시간 전` : diffDay < 32 ? `${diffDay.toFixed(0)}일 전` : `${diffMonth.toFixed(0)}개월 전`;
  }
  
  return (
    <div className="flex flex-col gap-3 bg-white shadow-lg shadow-slate-400 p-2 box-border rounded-lg cursor-pointer" onClick={() => navigate(`/community/${item._id}`)}>
      <header className="flex flex-col gap-3 font-TTLaundryGothicB">
        <section className="flex gap-3 items-center">
          <div className="rounded-full w-12 h-12 border-2">
            <img src={item?.user.profile ? `${import.meta.env.VITE_API_SERVER}/files/07-WeatherMate/${item.user.profile}` : "/clothes-m-1.svg"} className="rounded-full w-12 h-12" />
          </div>
          <div className="grow flex items-center">
            <div className="grow">
              <h1 className="text-lg font-bold">{item.user?.name}</h1>
              <p className="text-base text-slate-500 font-sans font-medium">{getItemTime(item.createdAt)}</p>
            </div>
            {item.title && <img className="w-10 h-10" src={`/${item.title}.svg`} alt="weatherIcon" />}
          </div>
        </section>
      </header>

      <main className="grow flex flex-col gap-2">
        <div className="h-3/4">
          {item.image && <img className="w-full h-full rounded-md" src={`${import.meta.env.VITE_API_SERVER}/files/07-WeatherMate/${item.image}`} alt="image" />}
        </div>
        <div className="text-slate-600 bg-slate-100 rounded-md p-2 box-border grow font-UhBeeKangJa">{item.content}</div>
      </main>

      <footer className="flex gap-4 items-center justify-between text-amber-400">
        <p className="text-slate-500">조회수 {item.views}</p>
        <section className="flex gap-2">
          <button className="flex items-center"><FaHeart className=" text-2xl"/></button>
          <p className="">like</p>
          <p className="flex items-center"><IoChatbubbleEllipsesOutline className=" text-2xl"/></p>
          <p className="">{item.repliesCount}</p>
        </section>
      </footer>

    </div>
  )
}

export default CommunityItem