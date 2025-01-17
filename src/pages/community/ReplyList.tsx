import React from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useCustomAxios from "../../hooks/useCustomAxios.mts";
import { ReplyData } from "type";

import ReplyItem from "./ReplyItem";
import ReplyNew from "./ReplyNew";

function ReplyList() {
  const post = useOutletContext();
  const { _id } = useParams();
  const axios = useCustomAxios();
  const { data, refetch } = useQuery({
    queryKey: ["posts", _id, "replies"],
    queryFn: () => axios.get(`/posts/${_id}/replies`),
    // suspense: true,
  });

  return (
    <div className="grid gap-2">
      {data?.data?.item &&
        data?.data?.item.map((e: ReplyData) => (
          <ReplyItem key={e._id} {...e} />
        ))}
    </div>
  );
}

export default ReplyList;
