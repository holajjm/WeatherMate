import React from "react";

function DetailPageHeader(title: string) {
  return (
    <>
      <div className=" px-5 p-5 flex items-center justify-center md:hidden xl:mx-60">
        <h1 className="font-bold text-xl">{title}</h1>
        <div className="w-5"></div>
      </div>
    </>
  );
}

export default DetailPageHeader;
