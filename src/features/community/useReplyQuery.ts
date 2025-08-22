import { useQuery } from "@tanstack/react-query";

import useCustomAxios from "@hooks/useCustomAxios";

export function useReplyQuery(_id: string | undefined) {
  const axios = useCustomAxios();
  return useQuery({
    queryKey: ["replys", _id],
    queryFn: () => axios.get(`/posts/${_id}/replies`),
    enabled: !!_id,
    select: (data) => data?.data?.item,
  });
}
