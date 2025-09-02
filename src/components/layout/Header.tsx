import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";

import HeaderCategory from "@components/layout/HeaderCategory";
import { CgMenuLeftAlt } from "react-icons/cg";
import { IoIosArrowDropleft } from "react-icons/io";
import NavigationBar from "./NavigationBar";

function Header() {
  const location = useLocation();
  const handleRefresh = () => {
    sessionStorage.removeItem("userWeather");
    sessionStorage.removeItem("myPlace");
    if (location.pathname === "/") {
      window.location.reload();
    }
  };
  const [open, setOpen] = useState<boolean>(false);
  const handleCategoryOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (location.pathname !== location?.state?.from) {
      setOpen(false);
    }
  }, [location.pathname]);

  return (
    <header
      className={`
        sticky top-0 z-50 m-auto flex h-24 min-w-[180px] max-w-[600px] flex-col
        items-center justify-center bg-blue-200
      `}
    >
      {!open ? (
        <CgMenuLeftAlt
          className="absolute left-4 top-5 text-2xl"
          onClick={handleCategoryOpen}
        />
      ) : (
        <IoIosArrowDropleft
          className="absolute left-4 top-5 text-2xl"
          onClick={handleCategoryOpen}
        />
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{
              ease: "easeInOut",
              duration: 0.8,
            }}
            className={`
              absolute left-0 top-24 h-full w-1/4 bg-black
              sm:w-1/2
            `}
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
      <NavigationBar />
    </header>
  );
}

export default Header;
