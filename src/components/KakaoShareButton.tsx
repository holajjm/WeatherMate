import React from "react";
import Button from "./layout/Button";

const { Kakao } = window as any;
interface Result {
  data:
    | {
        desc: string;
        id: number;
        image: string;
        title: string;
        type: string;
      }
    | undefined;
}

function KakaoShareButton(data: Result) {
  const url = import.meta.env.VITE_APP_TITLE;
  const resultUrl = window.location.href;
  // console.log(data);

  const shareKakao = () => {
    Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "🌤️날씨 성격 테스트🌤️",
        description: ` ${data.data?.title}`,
        imageUrl: `url + data.data.image`,
        link: {
          mobileWebUrl: resultUrl,
          webUrl: resultUrl,
        },
      },
      buttons: [
        {
          title: "나도 테스트하러가기",
          link: {
            mobileWebUrl: url,
            webUrl: url,
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
