import React from "react";

interface ButtonProps {
  bgColor: keyof typeof buttonColor;
  textColor: keyof typeof fontColor;
  width: string;
  height: string;
  text: React.ReactNode;
  onClick: () => void;
}

const buttonColor = {
  sky: "bg-sky-400",
  blue: "bg-toss-blue",
  indigo: "bg-indigo-500",
  kakao: "bg-[#FEE500]",
  gray: "bg-slate-300",
  gray_light: "bg-slate-200",
  amber: "bg-amber-200",
  red: "bg-red-500",
  lightRed: "bg-red-300",
  white: "bg-white",
  black: "bg-[#2D2D2D]",
};
const fontColor = {
  white: "text-white",
  gray: "text-toss-gray",
  black: "text-toss-black",
  amber: "text-amber-500",
};
function Button({ text, textColor, bgColor, width,height, onClick }: ButtonProps) {
  return (
    <button
      className={`${buttonColor[bgColor]} ${fontColor[textColor]} w-${width} h-${height} box-border flex items-center justify-center text-nowrap rounded-button p-2 text-caption font-bold transition-all duration-200 hover:scale-[1.03]`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
