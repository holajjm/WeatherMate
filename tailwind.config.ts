/** @type {import('tailwindcss').Config} */

// import {scrollbarHide} from "tailwind-scrollbar-hide";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Noto Sans", "sans-serif"],
        Suit: ["SUIT-Regular", "sans-serif"],
        SuitBold: ["SUIT-Bold", "sans-serif"],
      },
      colors: {
        blue_light: "#93c5fd",
        blue_middle: "#2563eb",
        blue_dark: "#1e3a8a",
        slate_light: "#f1f5f9",
        slate_middle: "64748b",
        slate_dark: "#1e293b",
        
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
  plugins: [require("tailwind-scrollbar-hide")],
  darkMode: "selector",
};
