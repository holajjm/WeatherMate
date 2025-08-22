import useCustomAxios from "@hooks/useCustomAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import type { ReplyData } from "types/CommunityType";

export default function useReplyUpdate({
  item,
  _id,
  reset,
}: {
  item: ReplyData;
  _id: string | undefined;
  reset: () => void;
}) {
  const axios = useCustomAxios();
  const queryClient = useQueryClient();
  const replyId = item?._id;
  return useMutation({
    mutationFn: async (formData: FieldValues) => {
      if (confirm("댓글을 수정하시겠습니까?")) {
        try {
          const response = await axios.patch(
            `/posts/${_id}/replies/${replyId}`,
            formData
          );
          console.log(response?.data);
          return response?.data;
        } catch (error) {
          console.log(error);
        }
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["replys"] });
      reset();
    },
    onError: (error) => {
      console.error(error);
    },
  });
}
