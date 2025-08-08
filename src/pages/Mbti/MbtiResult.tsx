import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { MbtiResultData } from "@constants/MbtiResultData";
import KakaoShareButton from "@components/KakaoShareButton";
import Button from "@components/layout/Button";

import type { MBTIResult } from "types/MbtiType";

function MbtiResult() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mbti = searchParams.get("mbti");
  const [resultData, setResultData] = useState<MBTIResult>({desc:"",id:0,title:"",type:""});
  console.log(resultData);

  useEffect(() => {
    const result = MbtiResultData.find((s) => s.type === mbti);
    setResultData({...result});
  }, [mbti]);

  return (
    <div className="max-w-[600px] min-w-[320px] m-auto min-h-screen p-2 flex flex-col items-center gap-8 font-Pretendard">
      <header>
        <h1 className="font-bold text-xl h-16">테스트 결과</h1>
      </header>
      <div className="mt-4 relative border-4 rounded-lg p-4 text-pretty">
        <img
          src={`/MBTIImage/${resultData?.type}.webp`}
          alt="result"
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-36 h-36 rounded-full bg-white"
        />
        <div className="mt-5 flex flex-col gap-2">
          <p className="w-1/3 h-full text-left">MBTI: <span className="text-2xl font-bold text-blue-500">{resultData?.type}</span></p>
          <p className="text-lg font-bold text-center text-amber-500">{resultData?.title}</p>
          <p className="text-sm text-pretty">{resultData?.desc}</p>
        </div>
      </div>

      <div className="w-full flex gap-2">
        <Button
          text={"테스트 다시하기"}
          textColor="gray"
          bgColor="gray"
          width="full"
          onClick={() => navigate("/mbti")}
        ></Button>
        <KakaoShareButton resultData={resultData} />
        <Button
          text={"메인으로 돌아가기"}
          textColor="white"
          bgColor="sky"
          width="full"
          onClick={() => navigate("/")}
        ></Button>
      </div>
    </div>
  );
}

export default MbtiResult;
