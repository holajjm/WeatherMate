import { useQuery, useQueryClient } from "@tanstack/react-query";

import useCustomAxios from "@hooks/useCustomAxios";

export function useLikesQuery() {
  const axios = useCustomAxios();
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["LikePosts"],
    queryFn: async () => {
      const response = await axios.get(`/bookmarks/post`);
      // console.log(response);
      return response;
    },
    select: data => data?.data?.item
  });
}
