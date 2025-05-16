import React, { Suspense, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";

import { ToastContainer } from "react-toastify";

import Loading from "@components/layout/Loading";
import router from "./routes";
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const { Kakao } = window as any;

function App() {
  useEffect(() => {
    if (!Kakao.isInitialized()) {
      Kakao.init("44ca17bb4cb74c64db42d774cc78f8af");
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
