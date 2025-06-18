import React, { Suspense, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";

import { ToastContainer } from "react-toastify";

import Loading from "@components/layout/Loading";
import router from "./routes";
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const { Kakao } = window as any;

function App() {
  const KAKAO_APP_KEY = import.meta.env.VITE_REACT_APP_KAKAO_JAVASCRIPT_KEY
  useEffect(() => {
    if (!Kakao.isInitialized()) {
      Kakao.init(KAKAO_APP_KEY);
    }
  }, []);

  return (
    <>
      <RecoilRoot>
        <Suspense fallback={<Loading />}>
          <ToastContainer
            position="top-right"
            limit={2}
            closeButton={true}
            autoClose={5000}
          />
          <RouterProvider router={router} />
        </Suspense>
      </RecoilRoot>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </>
  );
}

export default App;
