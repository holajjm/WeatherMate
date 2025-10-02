import { useMutation, useQueryClient } from "@tanstack/react-query";

import useCustomAxios from "@hooks/useCustomAxios";

import type { ReplyData } from "types/CommunityType";

export default function useReplyDelete({
  item,
  _id
}: {
  item: ReplyData;
  _id: string | undefined;
}) {
  const axios = useCustomAxios();
  const queryClient = useQueryClient();
  const replyId = item?._id;
  return useMutation({
    mutationFn: async () => {
      if (confirm("댓글을 삭제하시겠습니까?")) {
        try {
          const response = await axios.delete(
            `/posts/${_id}/replies/${replyId}`
          );
          console.log(response?.data);
          return response?.data;
        } catch (error) {
          console.log(error);
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["replys"] });
    },
    onError: error => {
      console.error(error);
    }
  });
}
