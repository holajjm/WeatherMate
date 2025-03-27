import React from "react";

interface ButtonProps {
  bgColor: keyof typeof buttonColor;
  textColor: keyof typeof fontColor;
  width: string;
  text: React.ReactNode;
  onClick: () => void;
}

const buttonColor = {
  sky: "sky-400",
  blue: "blue-600",
  indigo: "indigo-500",
  kakao: "#FEE500",
  gray: "slate-300",
  amber: "amber-200",
  red: "red-500",
  white: "white",
  black: "[#2D2D2D]",
};
const fontColor = {
  white: "white",
  gray: "gray-500",
  black: "[#2D2D2D]",
  amber: "amber-500",
};
function Button({ text, textColor, bgColor, width, onClick }: ButtonProps) {
  return (
    <button
      className={`bg-${buttonColor[bgColor]} text-${fontColor[textColor]} w-${width} h-10 text-sm p-2 box-border border-[1px] flex items-center justify-center rounded-lg font-Pretendard font-bold transition-all duration-200 text-nowrap border-slate-100 shadow-sm shadow-slate-300`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
