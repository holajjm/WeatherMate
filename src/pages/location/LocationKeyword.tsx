import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function LocationKeywords({
  id,
  label,
  onClick,
  img_src,
}: {
  id: string;
  label: string;
  onClick: React.Dispatch<React.SetStateAction<string>>;
  img_src: string;
}) {
  const [click, setClick] = useState<boolean>(false);
  const [searchParams,setSearchParams] = useSearchParams();
  // console.log(searchParams.get("id"));
  useEffect(() => {
    setSearchParams({id:"12"})
  },[])
  return (
    <div
      onClick={e => {
        onClick(id)
        setSearchParams({id:id})
        if(searchParams.get("id") === id){
          setClick(true)
        }else if(searchParams.get("id") !== id){
          setClick(false)
        }
        console.log(e.currentTarget.getAttribute('datatype'));
        console.log(searchParams.get("id"));
        console.log(id);
        
      }}
      datatype={label}
      className={`flex flex-col justify-center items-center font-UhBeeKangJa bg-slate-200 p-2 rounded-lg transition-all duration-100 hover:bg-blue-300 hover:cursor-pointer ${click ? "border-2 border-black" : "border-none"}`}
    >
      <img src={img_src} alt={label} className="w-10" />
      <p className="text-nowrap">{label}</p>
      {/* <p>{id}</p> */}
    </div>
  );
}

export default LocationKeywords;
