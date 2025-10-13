import React, { useEffect, useState } from "react";

import ToTheTopButton from "@components/layout/ToTheTopButton";
import usePageTitle from "@hooks/usePageTitle";
import useScrollTop from "@hooks/useScrollTop";
import { useCoords } from "@hooks/useCoords";
import MainNowWeather from "@pages/main/MainNowWeather";
import MainWeatherTimeZone from "@pages/main/MainWeatherTimeZone";
import MainWeatherListDays from "@pages/main/MainWeatherListDays";

import { AnimatePresence, motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

function MainHomePage() {
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
      <Helmet>
        <title>WeatherMate - Main</title>
        <meta name="description" content="당신의 위치에 따른 날씨와 다양한 정보를 추천해주는 친구" />
        <meta name="keywords" content="날씨, 장소, weather, 친구, mate, friend, location, place" />
        
        <meta property="og:title" content="WeatherMate - 메인페이지" />
        <meta property="og:description" content="WeatherMate 메인페이지입니다." />
        <meta property="og:image" content="/thumbnail.webp" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://weather-mate-holajjms-projects.vercel.app/" />
        <meta property="og:site_name" content="WeatherMate"/>
        <meta property="og:locale" content="ko_KR" />
        
        <meta name="twitter:title" content="WeatherMate - 메인페이지" />
        <meta name="twitter:description" content="WeatherMate 메인페이지입니다." />
        <meta name="twitter:card" content="/thumbnail.webp" />
        <meta name="twitter:image" content="/thumbnail.webp" />
      </Helmet>
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
            <div className="flex w-full flex-col gap-4">
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
