import React from "react";
import { useParams } from "react-router-dom";
import useCustomAxios from "@hooks/useCustomAxios.js";
import { useQuery } from "@tanstack/react-query";
import { ReplyData } from "type";

import ReplyNew from "./ReplyNew";
import ReplyItem from "./ReplyItem";

function ReplyMain() {
  const { _id } = useParams();
  const axios = useCustomAxios();
  const { data } = useQuery({
    queryKey: ["posts", _id, "replies"],
    queryFn: () => axios.get(`/posts/${_id}/replies`),
  });
  return (
    <div className="p-2 bg-slate-200 rounded-lg drop-shadow-lg flex flex-col gap-2">
      <ReplyNew />
      <div className="grid gap-2">
        {data?.data?.item &&
          data?.data?.item.map((e: ReplyData) => (
            <ReplyItem key={e._id} item={e} />
          ))}
      </div>
    </div>
  );
}

export default ReplyMain;
