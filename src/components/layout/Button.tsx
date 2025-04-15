import React from "react";

interface ButtonProps {
  bgColor: keyof typeof buttonColor;
  textColor: keyof typeof fontColor;
  width: string;
  text: React.ReactNode;
  onClick: () => void;
}

const buttonColor = {
  sky: "bg-sky-400",
  blue: "bg-blue-600",
  indigo: "bg-indigo-500",
  kakao: "bg-[#FEE500]",
  gray: "bg-slate-300",
  amber: "bg-amber-200",
  red: "bg-red-500",
  lightRed: "bg-red-300",
  white: "bg-white",
  black: "bg-[#2D2D2D]",
};
const fontColor = {
  white: "text-white",
  gray: "text-gray-500",
  black: "text-[#2D2D2D]",
  amber: "text-amber-500",
};
function Button({ text, textColor, bgColor, width, onClick }: ButtonProps) {
  return (
    <button
      className={`${buttonColor[bgColor]} ${fontColor[textColor]} w-${width} h-10 text-sm p-2 box-border border-[1px] flex items-center justify-center rounded-lg font-Pretendard font-bold transition-all duration-200 text-nowrap border-slate-100 shadow-sm shadow-slate-300`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
