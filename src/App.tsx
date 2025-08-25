import React, { Suspense, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";

import { ENV } from "@constants/env";
// import Loading from "@components/layout/Loading";

import router from "./routes";
import { ToastContainer } from "react-toastify";

// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const { Kakao } = window as any;

function App() {
  useEffect(() => {
    if (!Kakao.isInitialized()) {
      Kakao.init(ENV.KAKAO_JS_KEY);
    }
  }, []);

  return (
    <>
      <RecoilRoot>
        {/* <Suspense fallback={<Loading />}> */}
          <ToastContainer
            position="top-right"
            limit={2}
            closeButton={true}
            autoClose={5000}
          />
          <RouterProvider router={router} />
        {/* </Suspense> */}
      </RecoilRoot>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </>
  );
}

export default App;
