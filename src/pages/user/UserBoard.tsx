import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExpandCommunityData } from 'type';

function UserBoard({ item }: { item: ExpandCommunityData }) {
  const navigate = useNavigate();
  // console.log(item);

  return (
    <div className="h-full flex flex-col gap-4 bg-white p-4 box-border rounded-lg drop-shadow-lg">
      <header className="flex gap-2">
        <img
          src={item?.user.profile}
          className="rounded-full border-gray-400 border-2 w-12 h-12"
        />
        <div className="grow flex gap-2 items-center">
          <div className="grow">
            <h1 className="text-lg font-bold">{item.user?.name}</h1>
            <p className="text-sky-400 text-sm font-semibold">
              조회수 {item.views}
            </p>
          </div>
          {item.title && (
            <img
              className="w-12 h-12 rounded-full bg-sky-200 p-1"
              src={`/${item.title}.svg`}
              alt="weatherIcon"
            />
          )}
        </div>
      </header>
      <hr className="border-slate-800" />
      <main className="grow flex flex-col gap-2">
        {item.image ? (
          <img
            className="w-full h-2/3"
            src={`${import.meta.env.VITE_API_SERVER}/files/07-WeatherMate/${item.image}`}
            alt="image"
          />
        ) : (
          <div className="w-full h-2/3"></div>
        )}
        <div className="grow bg-gray-100 rounded-lg p-2 box-border">
          {item.content}
        </div>
      </main>
      <footer className="flex gap-1">
        <button
          onClick={() => navigate(`/community/${item._id}`)}
          className="w-full p-2 border-2 border-slate-100 rounded-lg font-UhBeeKangJa transition-all duration-200 text-nowrap text-gray-500 bg-slate-200 hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400"
        >
          상세보기
        </button>
        <button
          // onClick={() => }
          className="w-full p-2 border-2 border-slate-100 rounded-lg font-UhBeeKangJa transition-all duration-200 text-nowrap text-white bg-red-300 hover:bg-red-400 hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400"
        >
          삭제하기
        </button>
      </footer>
    </div>
  );
}

export default UserBoard;
