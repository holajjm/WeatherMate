import useCustomAxios from "@hooks/useCustomAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { NewReply } from "types/CommunityType";

export default function useReplyCreate({
  _id,
  reset,
}: {
  _id: string | undefined;
  reset: () => void;
}) {
  const axios = useCustomAxios();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: NewReply) => {
      try {
        const response = await axios.post(`/posts/${_id}/replies`, formData);
        console.log(response?.data);
        return response?.data;
      } catch (error) {
        console.log(error);
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
