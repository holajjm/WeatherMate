import React from "react";

import { ENV } from "@constants/env";
import Button from "@components/layout/Button";

import type { MBTIResult } from "types/MbtiType";

const { Kakao } = window as any;

function KakaoShareButton({ resultData }: { resultData: MBTIResult }) {
  const resultUrl = window.location.href;
  // console.log(data);

  const shareKakao = () => {
    Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "🌤️날씨 성격 테스트🌤️",
        description: ` ${resultData?.title}`,
        imageUrl: `/MBTIImage/${resultData?.type}.webp`,
        link: {
          mobileWebUrl: resultUrl,
          webUrl: resultUrl,
        },
      },
      buttons: [
        {
          title: "나도 테스트하러가기",
          link: {
            mobileWebUrl: ENV.APP_PRODUCTION,
            webUrl: ENV.APP_PRODUCTION,
          },
        },
      ],
    });
  };
  return (
    <Button
      text={"카카오톡 공유하기"}
      textColor="gray"
      bgColor="kakao"
      width="full"
      onClick={shareKakao}
    ></Button>
  );
}

export default KakaoShareButton;
