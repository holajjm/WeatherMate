import React from "react";

import Button from "@components/layout/Button";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const router = useNavigate();
  return (
    <>
      <section
        className={`m-auto flex h-screen min-w-[320px] max-w-[600px] flex-col items-center justify-center gap-2 bg-slate-100 p-2`}
      >
        <div
          className={`flex h-1/2 w-full flex-col items-center justify-center gap-8 rounded-xl bg-white text-center drop-shadow-lg`}
        >
          <img
            src="/Clothes/MainClothes2.webp"
            alt="Error"
            className="w-40"
            width={160}
            decoding="async"
            loading="lazy"
          />
          <h1 className="text-2xl font-semibold">Page not Found</h1>
          <p className="text-base text-slate-600">
            서버와의 통신이 원활하지 않아
            <br />
            데이터를 불러올 수 없습니다
          </p>
        </div>
        <Button
          text={"메인으로 이동하기"}
          textColor="white"
          bgColor="gray"
          width="32"
          height="10"
          onClick={() => router("/")}
        ></Button>
      </section>
    </>
  );
}

export default ErrorPage;
