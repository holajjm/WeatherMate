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
      fontSize: {
        title: ['24px', { lineHeight: '30px', fontWeight: '700' }],   // 큰 제목
        subtitle: ['18px', { lineHeight: '24px', fontWeight: '500' }], // 섹션 제목
        body: ['16px', { lineHeight: '22px', fontWeight: '400' }],   // 본문
        caption: ['13px', { lineHeight: '18px', fontWeight: '400' }], // 보조 설명
      },
      colors: {
        blue_light: "#93c5fd",
        blue_middle: "#2563eb",
        blue_dark: "#1e3a8a",
        slate_light: "#f1f5f9",
        slate_middle: "64748b",
        slate_dark: "#1e293b",
        // toss
        toss: {
          blue: '#0064FF',
          lightblue: '#dbeafe',
          red: '#FF3B30',
          lightred: '#FF8686',
          black: '#202632',
          gray: '#8B95A1',
          lightgray: '#e2e8f0',
          light: '#F9FAFB',
          success: '#2ED573',
          error: '#FF3B30',
        },
        // text
        sub_text: "#475569",
        
        primary: "#81CDFF",
        primary_deep: "#21A6FF",
        sub_yel: "#FFF387",
        sub_yel_deep: "#FFE500",
        sub_sal: "#FFBD99",
        kakao: "#FEE500",
        kakao_lable: "#191919",
      },
      borderRadius: {
        card: '8px',
        button: '12px',
        modal: '16px',
        full: '9999px',
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
