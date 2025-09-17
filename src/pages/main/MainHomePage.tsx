import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MainModal from "@components/modal/MainModal";
import ToTheTopButton from "@components/layout/ToTheTopButton";
import Button from "@components/layout/Button";
import usePageTitle from "@hooks/usePageTitle";
import useScrollTop from "@hooks/useScrollTop";
import { ModalPortal } from "@hooks/modalPortal";
import { useCoords } from "@hooks/useCoords";
import MainNowWeather from "@pages/main/MainNowWeather";
import MainWeatherTimeZone from "@pages/main/MainWeatherTimeZone";
import MainWeatherListDays from "@pages/main/MainWeatherListDays";
import { useModalStore } from "@store/store";

import { AnimatePresence, motion } from "framer-motion";

function MainHomePage() {
  const navigate = useNavigate();
  const modal = useModalStore(state => state.modal);
  const modalOpen = useModalStore(state => state.modalOpen);
  usePageTitle("WeatherMate");
  useScrollTop();
  useCoords();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step === 0) {
      setStep(1);
    } else if (step === 1) {
      const timer = setTimeout(() => setStep(2), 1000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <main className="relative m-auto flex h-screen min-w-[320px] max-w-[600px] flex-col gap-2 bg-slate-50 text-toss-black">
      {modal && (
        <ModalPortal>
          <MainModal />
        </ModalPortal>
      )}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="layout1"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 1 }}
            className={`flex h-1/2 w-full flex-col items-center justify-start text-2xl`}
          >
            <div>
              <img
                src="./MainIcon.webp"
                alt="MainIcon"
                {...{ fetchpriority: "high" }}
                decoding="async"
                width={160}
                className="w-40"
              />
            </div>
            <h1 className={`box-border w-full p-2 text-center font-bold`}>
              환영해요! WeatherMate입니다!
            </h1>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="layout2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex w-full flex-col gap-2 p-4">
              <div className="box-border">
                <div className="flex gap-1">
                  <Button
                    text={
                      <>
                        오늘의 추천 보기
                        <svg
                          className="ml-2 h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 -1 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            // d="M15 191-7-7 7-7"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </>
                    }
                    textColor="black"
                    bgColor="lightgray"
                    width="1/2"
                    height="10"
                    onClick={() => modalOpen()}
                  ></Button>
                  <Button
                    text={"날씨 테마 MBTI 검사하기!"}
                    textColor="black"
                    bgColor="lightgray"
                    width="1/2"
                    height="10"
                    onClick={() => navigate("/mbti")}
                  ></Button>
                </div>
              </div>

              <motion.section
                initial={{ translateY: 50, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                transition={{
                  ease: "easeInOut",
                  duration: 0.5
                }}
              >
                <MainNowWeather />
              </motion.section>

              <motion.section
                initial={{ translateY: 100, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                transition={{
                  ease: "easeInOut",
                  duration: 0.75
                }}
              >
                <MainWeatherTimeZone />
              </motion.section>

              <motion.section
                initial={{ translateY: 100, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                transition={{
                  ease: "easeInOut",
                  duration: 0.75
                }}
              >
                <MainWeatherListDays />
              </motion.section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <ToTheTopButton />
    </main>
  );
}

export default MainHomePage;
