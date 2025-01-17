import React from "react";

interface ButtonProps {
  text: string;
  type: "button" | "submit";
  color: keyof typeof buttonStyle;
  onClick: () => void;
}

const buttonStyle = {
  skyFull: `w-full p-4 border-2 border-slate-100 rounded-lg font-UhBeeKangJa transition-all duration-200 text-nowrap text-white bg-sky-400 hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400`,
  skyHalf: `w-1/2 p-4 border-2 border-slate-100 rounded-lg font-UhBeeKangJa transition-all duration-200 text-nowrap text-white bg-sky-400 hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400`,
  indigoFull: `w-full p-4 border-2 border-slate-100 rounded-lg font-UhBeeKangJa transition-all duration-200 text-nowrap text-white bg-indigo-500 hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400`,
  indigoHalf: `w-1/2 p-4 border-2 border-slate-100 rounded-lg font-UhBeeKangJa transition-all duration-200 text-nowrap text-white bg-indigo-500 hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400`,
  kakao: `w-full p-4 border-2 border-slate-100 rounded-lg font-UhBeeKangJa transition-all duration-200 text-nowrap text-gray-500 bg-[#FEE500] hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400`,
  gray: `w-full p-4 border-2 border-slate-100 rounded-lg font-UhBeeKangJa transition-all duration-200 text-nowrap text-gray-500 bg-slate-200 hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400`,
  amber: `w-full p-4 border-2 border-slate-100 rounded-lg font-UhBeeKangJa transition-all duration-200 text-nowrap text-amber-500 bg-amber-200 hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400`,
  red: `w-full p-4 border-2 border-slate-100 rounded-lg font-UhBeeKangJa transition-all duration-200 text-nowrap text-white bg-red-500 hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400`,
};
function Button({ text, type, color, onClick }: ButtonProps, { ...rest }) {
  return (
    <button className={`bg-${buttonStyle[color]}`} {...rest}>
      {text}
    </button>
  );
}

export default Button;
