import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";

import { ENV } from "@constants/env";

import router from "./routes";
import { Bounce, ToastContainer } from "react-toastify";
import { HelmetProvider } from "react-helmet-async";

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
        <HelmetProvider>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            limit={1}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
          <RouterProvider router={router} />
        </HelmetProvider>
      </RecoilRoot>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </>
  );
}

export default App;
