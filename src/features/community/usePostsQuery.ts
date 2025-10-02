import { useQuery } from "@tanstack/react-query";

import useCustomAxios from "@hooks/useCustomAxios";

export function usePostsQuery() {
  const axios = useCustomAxios();
  return useQuery({
    queryKey: ["Posts"],
    queryFn: () =>
      axios.get("/posts", {
        params: {
          type: "community"
        }
      }),
    select: data => data?.data?.item,
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: true,
    refetchInterval: 1000 * 60 * 30,
    refetchOnMount: "always"
  });
}
