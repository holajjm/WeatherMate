import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useCustomAxios from "@hooks/useCustomAxios";

export default function usePostsDelete() {
  const axios = useCustomAxios();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string | undefined) => {
      try {
        if (confirm("삭제하시겠습니까?")) {
          const response = await axios.delete(`/posts/${id}`);
          return response;
        }
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Posts"] });
      alert("삭제되었습니다.");
      navigate("/community");
    }
  });
}
