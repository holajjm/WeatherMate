import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";

import useCustomAxios from "@hooks/useCustomAxios";

import type { ReplyData } from "types/CommunityType";

export default function useReplyUpdate({
  item,
  _id,
  reset
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
          throw error; // 에러를 다시 던져서 onError가 호출되도록 함
        }
      }
    },
    onMutate: async (formData: FieldValues) => {
      // 진행 중인 쿼리들을 취소하여 낙관적 업데이트가 덮어쓰이지 않도록 함
      await queryClient.cancelQueries({ queryKey: ["replys"] });

      // 이전 데이터를 백업
      const previousReplies = queryClient.getQueryData(["replys"]);

      // 낙관적 업데이트 적용
      queryClient.setQueryData(["replys"], (old: any) => {
        if (!old) return old;

        return old.map((reply: ReplyData) => {
          if (reply._id === replyId) {
            return {
              ...reply,
              comment: formData.comment,
              // 업데이트 시간을 현재 시간으로 설정 (실제 서버 응답에서 받을 예정)
              updatedAt: new Date().toISOString()
            };
          }
          return reply;
        });
      });

      // 이전 데이터를 반환하여 롤백에 사용
      return { previousReplies };
    },
    onSuccess: data => {
      // 서버에서 받은 실제 데이터로 다시 업데이트
      queryClient.setQueryData(["replys"], (old: any) => {
        if (!old) return old;

        return old.map((reply: ReplyData) => {
          if (reply._id === replyId) {
            return data; // 서버에서 받은 실제 업데이트된 댓글 데이터
          }
          return reply;
        });
      });
      reset();
    },
    onError: (error, variables, context) => {
      // 에러 발생 시 이전 데이터로 롤백
      if (context?.previousReplies) {
        queryClient.setQueryData(["replys"], context.previousReplies);
      }
      console.error(error);
    },
    onSettled: () => {
      // 성공/실패 관계없이 쿼리를 다시 가져와서 서버와 동기화
      queryClient.invalidateQueries({ queryKey: ["replys"] });
    }
  });
}
