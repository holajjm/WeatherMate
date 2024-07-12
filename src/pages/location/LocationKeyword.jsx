import { useState } from "react";

/*eslint-disable */
function LocationKeywords({ id, label, selected, onClick, img_src }) {
  const [clicked, setClicked] = useState(false);
  return (
    <div
      onClick={(e) => {
        onClick(id)
        setClicked(true)
      }}
      className={`font-sans flex flex-grow bg-slate-100 p-2 rounded-lg justify-center items-center transition-all duration-500 hover:bg-indigo-300 hover:border-1 hover:border-slate-400 hover:cursor-pointer ${clicked ? 'border-2 border-slate-500 bg-indigo-300' : null}`}
    >
      <div className="flex flex-col  justify-center items-center min-w-10 min-h-10  ">
        <img src={img_src} className="aspect-square w-10"/>
        <p className="mt-1 text-nowrap">{label}</p>
      </div>
    </div>
  );
}

export default LocationKeywords;
