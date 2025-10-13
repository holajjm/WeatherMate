import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import KakaoShareButton from "@components/KakaoShareButton";
import Button from "@components/layout/Button";
import { MbtiResultData } from "@constants/MbtiResultData";

import type { MBTIResult } from "types/MbtiType";

function MbtiResult() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mbti = searchParams.get("mbti");
  const [resultData, setResultData] = useState<MBTIResult>({
    desc: "",
    id: 0,
    title: "",
    type: ""
  });
  console.log(resultData);

  useEffect(() => {
    const result = MbtiResultData.find(s => s.type === mbti);
    setResultData({ ...result });
  }, [mbti]);

  return (
    <div className="m-auto flex min-h-screen min-w-[320px] max-w-[600px] flex-col items-center gap-8 p-4">
      <header>
        <h1 className="text-subtitle font-bold">테스트 결과</h1>
      </header>
      <div className="relative mt-16 text-pretty rounded-modal border-4 p-4">
        <img
          src={`/MBTIImage/${resultData?.type}.webp`}
          alt="result"
          width={144}
          height={144}
          {...{ fetchpriority: "high" }}
          decoding="async"
          className="absolute -top-20 left-1/2 h-36 w-36 -translate-x-1/2 rounded-full bg-white"
        />
        <div className="flex flex-col gap-2">
          <p className="h-full w-1/3 text-left">당신의 MBTI는</p>
          <br />
          <div className="flex gap-2">
            <p className="text-title font-bold text-toss-blue">
              {resultData?.type}
            </p>
            <p className="text-center text-body font-bold text-amber-500">
              {resultData?.title}
            </p>
          </div>
          <p className="text-pretty text-caption">{resultData?.desc}</p>
        </div>
      </div>

      <div className="flex w-full gap-2">
        <Button
          text={"테스트 다시하기"}
          textColor="white"
          bgColor="gray"
          width="full"
          height="10"
          onClick={() => navigate("/mbti")}
          label="다시하기"
        ></Button>
        <KakaoShareButton resultData={resultData} />
        <Button
          text={"메인으로 돌아가기"}
          textColor="white"
          bgColor="blue"
          width="full"
          height="10"
          onClick={() => navigate("/")}
          label="메인으로"
        ></Button>
      </div>
    </div>
  );
}

export default MbtiResult;
