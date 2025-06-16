import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { LocationState } from "@recoil/atom";

import usePageTitle from "@hooks/usePageTitle";
import useScrollTop from "@hooks/useScrollTop";
import { ModalPortal } from "@hooks/modalPortal";
import { AnimatePresence, motion } from "framer-motion";

import MainTodaysComent from "@pages/main/MainTodaysComent";
import MainMyLocationWeather from "@pages/main/MainMyLocationWeather";
import MainWeatherTimeZone from "@pages/main/MainWeatherTimeZone";
import ToTheTopButton from "@components/layout/ToTheTopButton";
import MainModal from "@components/modal/MainModal";
import { MdDoubleArrow } from "react-icons/md";

function MainHomePage() {
  usePageTitle("WeatherMate");
  useScrollTop();
  const coords = useRecoilState(LocationState);
  const setCoords = useSetRecoilState(LocationState);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      error => {
        console.error("Error fetching location:", error.message);
      },
    );
  }, []);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step === 0) {
      setStep(1);
    } else if (step === 1) {
      const timer = setTimeout(() => setStep(2), 1000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const { data } = useQuery({
    queryKey: ["weatherdata", coords[0].lat, coords[0].lon],
    queryFn: async () => {
      if (coords[0].lat && coords[0].lon) {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${coords[0].lat}&lon=${coords[0].lon}&appid=${import.meta.env.VITE_REACT_APP_WEATHER_API_KEY2}&units=metric&lang=kr`,
        );
        const data = await response.json();
        return data;
      }
      return null;
    },
    staleTime: 1000 * 60 * 60,
    refetchInterval: 1000 * 60 * 60,
    refetchIntervalInBackground: true,
  });
  if (data) {
    sessionStorage.setItem("sessionWeather", JSON.stringify(data));
  }

  return (
    <main className="max-w-[600px] min-w-[320px] h-screen m-auto flex flex-col gap-2 bg-slate-50 font-Pretendard">
      {isOpen && (
        <ModalPortal>
          <MainModal handleClose={handleClose} />
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
            className="text-2xl w-full h-screen flex items-center justify-center"
          >
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
                <button
                  className="flex gap-1 items-center justify-center border-2 border-slate-300 w-full h-10 rounded-lg bg-white text-sm hover:bg-slate-100 hover:-translate-y-1 duration-200 ease-in-out"
                  onClick={handleOpen}
                >
                  오늘의 추천 보기
                  <MdDoubleArrow />
                </button>
                <div className="flex gap-1 items-center justify-center">
                  <button
                    onClick={() => navigate("/allcity")}
                    className="flex gap-1 items-center justify-center border-2 border-slate-300 w-full h-10 rounded-lg bg-white text-sm hover:bg-slate-100 hover:-translate-y-1 duration-200 ease-in-out"
                  >
                    전국 날씨
                  </button>
                  <button
                    onClick={() => navigate("/mbti")}
                    className="flex gap-1 items-center justify-center border-2 border-slate-300 w-full h-10 rounded-lg bg-white text-sm hover:bg-slate-100 hover:-translate-y-1 duration-200 ease-in-out"
                  >
                    MBTI 검사
                  </button>
                </div>
              </div>
              <motion.section
                initial={{ translateY: 50, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                transition={{
                  ease: "easeInOut",
                  duration: 0.5,
                }}
              >
                <MainTodaysComent />
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <ToTheTopButton />
    </main>
  );
}

export default MainHomePage;
