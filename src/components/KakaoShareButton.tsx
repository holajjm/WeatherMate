import React, { useEffect } from 'react';
import kakaoLogo from '/kakaoLogo.svg';
const { Kakao } = window as any;
interface Result {
  data: {
    desc: string;
    id: number;
    image: string;
    title: string;
    type: string;
  } | undefined;
}

function KakaoShareButton(data: Result) {
  const url = import.meta.env.VITE_APP_TITLE;
  const resultUrl = window.location.href;
  // console.log(data);

  const shareKakao = () => {
    Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: '🌤️날씨 성격 테스트🌤️',
        description: ` ${data.data?.title}`,
        imageUrl: `url + data.data.image`,
        link: {
          mobileWebUrl: resultUrl,
          webUrl: resultUrl,
        },
      },
      buttons: [
        {
          title: '나도 테스트하러가기',
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      ],
    });
  };
  return (
    <button
      onClick={shareKakao}
      className="flex justify-center items-center gap-2 w-full p-4 border-2 border-slate-100 rounded-lg font-UhBeeKangJa transition-all duration-200 text-gray-500 text-nowrap bg-[#FEE500] hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400"
    >
      <img src={kakaoLogo} alt="kakao logo" className="w-5 h-5" />
      <p>공유하기</p>
    </button>
  );
}

export default KakaoShareButton;
