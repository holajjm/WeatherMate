import React from "react";

import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";

function ErrorPage() {
  return (
    <>
      <Header />
      <section className="max-w-[600px] min-w-[320px] m-auto h-screen p-2 bg-slate-100">
        <div className="h-1/2 bg-white rounded-xl drop-shadow-lg flex flex-col gap-8 items-center justify-center text-center">
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
