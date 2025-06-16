/** @type {import('tailwindcss').Config} */

import scrollbarHide from "tailwind-scrollbar-hide";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Noto Sans", "sans-serif"],
        UhBeeKangJa: ["UhBeeKang-Ja", "sans-serif"], //삐뚤삐뚤 글씨체 / 버튼,제목 요소들에 사용
        SSRONETHandwritten: ["SSRONETHandwritten", "sans-serif"], //작은 애기 글씨체, 컨텐츠 요소들에 사용, text-xl 기본
        Pretendard: ["Pretendard-Regular", "sans-serif"],
        PretendardBold: ["Pretendard-Bold", "sans-serif"],
      },
      colors: {
        my_color: "#00FF7F",
        primary: "#81CDFF",
        primary_deep: "#21A6FF",
        sub_yel: "#FFF387",
        sub_yel_deep: "#FFE500",
        sub_sal: "#FFBD99",
        kakao: "#FEE500",
        kakao_lable: "#191919",
      },
      animation: {
        shimmer: "shimmer 2s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(150%)" },
        },
      },
      height: {
        "calc-100-minus-128": "calc(100% - 128px)",
      },
    },
  },
  plugins: [scrollbarHide],
  darkMode: "selector",
};
