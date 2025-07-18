import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MainModal from "@components/modal/MainModal";
import ToTheTopButton from "@components/layout/ToTheTopButton";
import Button from "@components/layout/Button";
import { useWeatherQuery } from "@features/weather/useWeatherQuery";
import usePageTitle from "@hooks/usePageTitle";
import useScrollTop from "@hooks/useScrollTop";
import { ModalPortal } from "@hooks/modalPortal";
import { useCoords } from "@hooks/useCoords";
import MainNowWeather from "@pages/main/MainNowWeather";
import MainMyLocationWeather from "@pages/main/MainMyLocationWeather";
import MainWeatherTimeZone from "@pages/main/MainWeatherTimeZone";
import { useCoordsStore, useModalStore } from "@store/store";

import { AnimatePresence, motion } from "framer-motion";
import { MdDoubleArrow } from "react-icons/md";

function MainHomePage() {
  const navigate = useNavigate();
  const latitude = useCoordsStore(state => state.latitude);
  const longitude = useCoordsStore(state => state.longitude);
  const modal = useModalStore(state => state.modal);
  const modalOpen = useModalStore(state => state.modalOpen);
  usePageTitle("WeatherMate");
  useScrollTop();
  useCoords();
  useWeatherQuery(latitude, longitude);
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
    <main className="relative max-w-[600px] min-w-[320px] h-screen m-auto flex flex-col gap-2 bg-slate-50 font-Pretendard">
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
            className="text-2xl w-full h-1/2 flex flex-col items-center justify-start"
          >
            <div>
              <img
                src="./MainIcon.webp"
                alt="MainIcon"
                decoding="async"
                {...{ fetchpriority: "high" }}
                width={160}
                className="w-40"
              />
            </div>
            <h1 className="w-full text-center p-2 box-border font-bold text-[#2D2D2D]">
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
            <div className="w-full">
              <div className="w-full flex flex-col gap-1 p-2 box-border">
                <Button
                  text={
                    <>
                      오늘의 추천 보기
                      <MdDoubleArrow />
                    </>
                  }
                  textColor="black"
                  bgColor="gray_light"
                  width="full"
                  onClick={() => modalOpen()}
                ></Button>
              </div>
              <motion.section
                initial={{ translateY: 50, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                transition={{
                  ease: "easeInOut",
                  duration: 0.5,
                }}
              >
                <MainNowWeather />
              </motion.section>
              <motion.section
                initial={{ translateY: 100, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                transition={{
                  ease: "easeInOut",
                  duration: 0.75,
                }}
              >
                <MainWeatherTimeZone />
              </motion.section>
              <motion.section
                initial={{ translateY: 150, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                transition={{
                  ease: "easeInOut",
                  duration: 1,
                }}
              >
                <MainMyLocationWeather />
              </motion.section>
              <motion.section
                initial={{ translateY: 200, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                transition={{
                  ease: "easeInOut",
                  duration: 1.25,
                }}
                className="p-2 flex gap-1 items-center justify-center"
              >
                <Button
                  text={"전국 날씨 확인하기!"}
                  textColor="black"
                  bgColor="gray_light"
                  width="full"
                  onClick={() => navigate("/allcity")}
                ></Button>
                <Button
                  text={"날씨 테마 MBTI 검사하기!"}
                  textColor="black"
                  bgColor="gray_light"
                  width="full"
                  onClick={() => navigate("/mbti")}
                ></Button>
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
