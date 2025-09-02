import React from "react";

import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";

function ErrorPage() {
  return (
    <>
      <Header />
      <section
        className={`
          m-auto h-screen min-w-[320px] max-w-[600px] bg-slate-100 p-2
        `}
      >
        <div
          className={`
            flex h-1/2 flex-col items-center justify-center gap-8 rounded-xl
            bg-white text-center drop-shadow-lg
          `}
        >
          <img
            src="/Clothes/MainClothes2.webp"
            alt="Error"
            className="w-40"
            width={160}
            decoding="async"
            {...{ fetchpriority: "high" }}
          />
          <h1 className="text-2xl font-semibold">Page not Found</h1>
          <p className="text-base text-slate-600">
            서버와의 통신이 원활하지 않아
            <br />
            데이터를 불러올 수 없습니다
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default ErrorPage;
