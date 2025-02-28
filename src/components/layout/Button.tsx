import React from "react";

interface ButtonProps {
  text: string;
  textColor: string;
  width: string;
  bgColor: keyof typeof buttonStyle;
  onClick: () => void;
}

const buttonStyle = {
  skyFull: `sky-400`,
  skyHalf: `sky-400`,
  indigoFull: `indigo-500`,
  indigoHalf: `indigo-500`,
  kakao: `[#FEE500]`,
  gray: `slate-300`,
  amber: `amber-200`,
  red: `red-500`,
};
function Button({ text, textColor, bgColor, width, onClick }: ButtonProps) {
  return (
    <button
      className={`bg-${buttonStyle[bgColor]} ${width} ${textColor} h-10 border-2 border-slate-100 rounded-lg font-UhBeeKangJa transition-all duration-200 text-nowrap hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400`}
    >
      {text}
    </button>
  );
}

export default Button;
