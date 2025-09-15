import React from "react";
import { useParams } from "react-router-dom";

import { useReplyQuery } from "@features/community/useReplyQuery";
import ReplyNew from "@pages/community/ReplyNew";
import ReplyItem from "@pages/community/ReplyItem";

import type { ReplyData } from "types/CommunityType";

function ReplyMain() {
  const { _id } = useParams();
  const { data: replyData } = useReplyQuery(_id);
  return (
    <div className="flex flex-col gap-4 bg-white p-2 drop-shadow-sm">
      <ReplyNew />
      <div className="flex flex-col gap-2">
        {replyData &&
          replyData.map((e: ReplyData) => <ReplyItem key={e._id} item={e} />)}
      </div>
    </div>
  );
}

export default ReplyMain;
