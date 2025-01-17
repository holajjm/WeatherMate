import React from "react";

import ReplyList from "./ReplyList";
import ReplyNew from "./ReplyNew";

function ReplyMain() {
  return (
    <div className="p-2 bg-slate-200 rounded-lg drop-shadow-lg flex flex-col gap-2">
      <ReplyNew />
      <ReplyList />
    </div>
  );
}

export default ReplyMain;
