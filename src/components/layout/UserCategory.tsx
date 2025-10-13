import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import useScrollTop from "@hooks/useScrollTop";
import { useUserStore } from "@store/store";

import { motion } from "framer-motion";
import { MdLocationOn } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

function UserCategory() {
  useScrollTop();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useUserStore(state => state.user);
  const resetUser = useUserStore(state => state.resetUser);
  // console.log(user);
  const handleLogout = () => {
    if (confirm("로그아웃 할까요?")) {
      resetUser();
      localStorage.clear();
      navigate("/");
    }
  };
  return (
    <div className="flex h-screen items-start justify-center bg-slate-100 p-4 text-lg drop-shadow-[-5px_5px_3px_rgba(0,0,0,0.3)]">
      <div className="grid w-full grid-cols-2 gap-2">
        <motion.div
          initial={{ translateX: 200, opacity: 0 }}
          animate={{ translateX: 0, opacity: 1 }}
          transition={{
            ease: "easeInOut",
            duration: 0.5
          }}
        >
          <Link
            to={"/user/mypage"}
            state={{ from: location.pathname }}
            className="flex aspect-square h-full w-full flex-col items-center justify-center gap-2 rounded-button bg-white p-2 text-caption font-medium drop-shadow-md transition-all duration-200 hover:scale-105 hover:bg-toss-blue hover:text-white hover:shadow-lg"
          >
            <FaUserCircle className="text-2xl" />
            <span>마이페이지</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ translateX: 200, opacity: 0 }}
          animate={{ translateX: 0, opacity: 1 }}
          transition={{
            ease: "easeInOut",
            duration: 0.75
          }}
        >
          {user.name ? (
            <button
              onClick={handleLogout}
              className="flex aspect-square h-full w-full flex-col items-center justify-center gap-2 rounded-button bg-white p-2 text-caption font-medium drop-shadow-md transition-all duration-200 hover:scale-105 hover:bg-toss-lightred hover:text-white hover:shadow-lg"
              aria-label="로그아웃"
            >
              <MdLocationOn className="text-2xl" />
              <span>로그아웃</span>
            </button>
          ) : (
            <Link
              to={"/mainlogin"}
              state={{ from: location.pathname }}
              className="flex aspect-square h-full w-full flex-col items-center justify-center gap-2 rounded-button bg-white p-2 text-caption font-medium drop-shadow-md transition-all duration-200 hover:scale-105 hover:bg-toss-blue hover:text-white hover:shadow-lg"
            >
              <MdLocationOn className="text-2xl" />
              <span>로그인</span>
            </Link>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default UserCategory;
