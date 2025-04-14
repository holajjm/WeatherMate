import React from "react";

function CommunityModal({handleClose}:{handleClose:() => void}) {
  return <div onClick={handleClose} className="w-full h-screen text-white bg-black absolute top-0 left-0 z-50 opacity-80">CommunityModal</div>;
}

export default CommunityModal;
