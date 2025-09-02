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
  const [resultData, setResultData] = useState<MBTIResult>({
    desc: "",
    id: 0,
    title: "",
    type: "",
  });
  console.log(resultData);

  useEffect(() => {
    const result = MbtiResultData.find(s => s.type === mbti);
    setResultData({ ...result });
  }, [mbti]);

  return (
    <div className="font-Pretendard m-auto flex min-h-screen min-w-[320px] max-w-[600px] flex-col items-center gap-8 p-2">
      <header>
        <h1 className="h-16 text-xl font-bold">테스트 결과</h1>
      </header>
      <div className="relative mt-4 text-pretty rounded-lg border-4 p-4">
        <img
          src={`/MBTIImage/${resultData?.type}.webp`}
          alt="result"
          className="absolute -top-20 left-1/2 h-36 w-36 -translate-x-1/2 rounded-full bg-white"
        />
        <div className="mt-5 flex flex-col gap-2">
          <p className="h-full w-1/3 text-left">
            MBTI:{" "}
            <span className="text-2xl font-bold text-blue-500">
              {resultData?.type}
            </span>
          </p>
          <p className="text-center text-lg font-bold text-amber-500">
            {resultData?.title}
          </p>
          <p className="text-pretty text-sm">{resultData?.desc}</p>
        </div>
      </div>

      <div className="flex w-full gap-2">
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
