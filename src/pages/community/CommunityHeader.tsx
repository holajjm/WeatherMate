import React from "react";

function CommunityHeader(title: string) {
  return (
    <div
      className="p-4 text-center grow"
      onClick={() => window.location.reload()}
    >
      <h1 className="inline-block font-bold text-xl lg:text-xl xl:text-2xl">
        {title}
      </h1>
    </div>
  );
}

export default CommunityHeader;
