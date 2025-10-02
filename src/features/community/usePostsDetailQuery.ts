import { useQuery } from "@tanstack/react-query";

import useCustomAxios from "@hooks/useCustomAxios";

export default function usePostsDetailQuery({
  _id
}: {
  _id: string | undefined;
}) {
  const axios = useCustomAxios();
  return useQuery({
    queryKey: ["posts", _id],
    queryFn: () => axios.get(`/posts/${_id}`),
    refetchOnWindowFocus: false,
    select: data => data?.data?.item
  });
}
