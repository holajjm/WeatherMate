import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import HeaderCategory from "@components/layout/HeaderCategory";

import { AnimatePresence, motion } from "framer-motion";
import { CgMenuLeftAlt } from "react-icons/cg";
import { PiUserCircleBold } from "react-icons/pi";
import UserCategory from "./UserCategory";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const handleRefresh = () => {
    sessionStorage.removeItem("userWeather");
    sessionStorage.removeItem("myPlace");
    if (location.pathname === "/") {
      window.location.reload();
    }
  };
  const [categoryOpen, setCategoryOpen] = useState<boolean>(false);
  const [userCategoryOpen, setUserCategoryOpen] = useState<boolean>(false);
  const handleCategoryOpen = () => {
    setCategoryOpen(true);
  };
  const handleCategoryClose = () => {
    setCategoryOpen(false);
  };
  const handleUserCategoryOpen = () => {
    setUserCategoryOpen(true);
  };
  const handleUserCategoryClose = () => {
    setUserCategoryOpen(false);
  };

  useEffect(() => {
    if (location.pathname !== location?.state?.from) {
      setCategoryOpen(false);
      setUserCategoryOpen(false);
    }
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 m-auto flex h-16 min-w-[180px] max-w-[600px] flex-col items-center justify-center bg-blue-200`}
    >
      <CgMenuLeftAlt
        className="absolute left-4 top-5 cursor-pointer text-2xl"
        onMouseEnter={handleCategoryOpen}
      />

      <AnimatePresence>
        {categoryOpen && (
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{
              ease: "easeInOut",
              duration: 0.8
            }}
            className={`absolute left-0 top-16 h-full w-1/2 bg-toss-black`}
            onMouseEnter={handleCategoryOpen}
            onMouseLeave={handleCategoryClose}
          >
            <HeaderCategory />
          </motion.div>
        )}
      </AnimatePresence>

      <Link to="/" className="flex h-full items-center justify-center">
        <img
          src="/MainLogo.webp"
          alt="Main logo"
          width={200}
          height={109}
          className="h-5 w-10"
          onClick={handleRefresh}
          {...{ fetchpriority: "high" }}
          decoding="async"
        />
        <p className="font-SuitBold text-2xl text-blue_dark">WeatherMate</p>
      </Link>

      <PiUserCircleBold
        className="absolute right-4 top-5 cursor-pointer text-title"
        onMouseEnter={handleUserCategoryOpen}
      />
      <AnimatePresence>
        {userCategoryOpen && (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{
              ease: "easeInOut",
              duration: 0.8
            }}
            className={`absolute right-0 top-16 h-full w-1/3 bg-toss-black`}
            onMouseEnter={handleUserCategoryOpen}
            onMouseLeave={handleUserCategoryClose}
          >
            <UserCategory />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
