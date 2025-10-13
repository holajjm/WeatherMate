import React from "react";

interface ButtonProps {
  bgColor: keyof typeof buttonColor;
  textColor: keyof typeof fontColor;
  width: string;
  height: string;
  text: React.ReactNode;
  label: string;
  onClick: () => void;
}

const buttonColor = {
  white: "bg-white",
  black: "bg-toss-black",
  blue: "bg-toss-blue",
  lightblue: "bg-toss-lightblue",
  gray: "bg-toss-gray",
  lightgray: "bg-toss-lightgray",
  red: "bg-toss-red",
  lightred: "bg-toss-lightred",

  sky: "bg-sky-400",
  indigo: "bg-indigo-500",
  kakao: "bg-[#FEE500]",
  amber: "bg-amber-200"
};
const fontColor = {
  white: "text-white",
  gray: "text-toss-gray",
  black: "text-toss-black",
  amber: "text-amber-500"
};
function Button({
  text,
  textColor,
  bgColor,
  width,
  height,
  label,
  onClick
}: ButtonProps) {
  return (
    <button
      className={`${buttonColor[bgColor]} ${fontColor[textColor]} w-${width} h-${height} box-border flex items-center justify-center text-nowrap rounded-button p-2 text-caption font-bold transition-all duration-200 hover:scale-[1.03]`}
      onClick={onClick}
      aria-label={`${label}`}
    >
      {text}
    </button>
  );
}

export default Button;
