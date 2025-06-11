/** @type {import('tailwindcss').Config} */

import type { Config } from 'tailwindcss'
import scrollbarHide from 'tailwind-scrollbar-hide'

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Noto Sans", "sans-serif"],
        UhBeeKangJa: ["UhBeeKang-Ja", "sans-serif"], //삐뚤삐뚤 글씨체 / 버튼,제목 요소들에 사용
        TTLaundryGothicB: ["TTLaundryGothicB", "sans-serif"], //캐주얼 문구체
        RubikBubbles: ["Rubik Bubbles", "sans-serif"], //둥글둥글 글씨체
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
        slideIn: "slideIn 0.7s ease-out forwards",
        slideOut: "slideOut 0.7s ease-in forwards",
      },
      keyframes: {
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-100%)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideOut: {
          "0%": { opacity: "1", transform: "translateX(0)" },
          "100%": { opacity: "0", transform: "translateX(-100%)" },
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
