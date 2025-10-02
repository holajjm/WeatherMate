import { useMutation, useQueryClient } from "@tanstack/react-query";

import useCustomAxios from "@hooks/useCustomAxios";

export function useLikesCreate({
  id,
  content
}: {
  id: number;
  content: string;
}) {
  const axios = useCustomAxios();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      try {
        const response = await axios.post(`/bookmarks/post/${id}`, {
          memo: content
        });
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["LikePosts"] });
    }
  });
}
