import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { useCoordsStore } from "@store/store";
import usePageTitle from "@hooks/usePageTitle";
import useScrollTop from "@hooks/useScrollTop";
import { ModalPortal } from "@hooks/modalPortal";
import { AnimatePresence, motion } from "framer-motion";

import MainNowWeather from "@pages/main/MainNowWeather";
import MainMyLocationWeather from "@pages/main/MainMyLocationWeather";
import MainWeatherTimeZone from "@pages/main/MainWeatherTimeZone";
import ToTheTopButton from "@components/layout/ToTheTopButton";
import MainModal from "@components/modal/MainModal";
import Button from "@components/layout/Button";
import { MdDoubleArrow } from "react-icons/md";
import { useCoords } from "@hooks/useCoords";

function MainHomePage() {
  usePageTitle("WeatherMate");
  useScrollTop();
  useCoords();
  const { latitude, longitude } = useCoordsStore(state => state);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
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
    queryKey: ["weatherdata", latitude, longitude],
    queryFn: async () => {
      if (latitude && longitude) {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_REACT_APP_WEATHER_API_KEY2}&units=metric&lang=kr`,
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
    <main className="relative max-w-[600px] min-w-[320px] h-screen m-auto flex flex-col gap-2 bg-slate-50 font-Pretendard">
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
            className="text-2xl w-full h-1/2 flex items-center justify-start"
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
                <Button
                  text={
                    <>
                      오늘의 추천 보기
                      <MdDoubleArrow />
                    </>
                  }
                  textColor="black"
                  bgColor="gray"
                  width="full"
                  onClick={handleOpen}
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
                  bgColor="gray"
                  width="full"
                  onClick={() => navigate("/allcity")}
                ></Button>
                <Button
                  text={"날씨 테마 MBTI 검사하기!"}
                  textColor="black"
                  bgColor="gray"
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
