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
    <header className="max-w-[600px] min-w-[180px] h-24 m-auto sticky top-0 z-50 flex flex-col items-center justify-center bg-blue-200">
      {!open ? (
        <CgMenuLeftAlt
          className="text-2xl absolute top-5 left-4"
          onClick={handleCategoryOpen}
        />
      ) : (
        <IoIosArrowDropleft
          className="text-2xl absolute top-5 left-4"
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
            className={`w-1/4 sm:w-1/2 h-full absolute top-24 left-0 bg-black`}
          >
            <HeaderCategory />
          </motion.div>
        )}
      </AnimatePresence>

      <Link to="/" className="h-full flex items-center justify-center">
        <img
          src="/MainLogo.webp"
          alt="Main logo"
          width={200}
          height={109}
          className="w-10 h-6"
          onClick={handleRefresh}
        />
        <p className="text-2xl text-blue-900 font-PretendardBold">
          WeatherMate
        </p>
      </Link>
      <NavigationBar />
    </header>
  );
}

export default Header;
