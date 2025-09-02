import React, { useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

import MbtiQuestionData from "@constants/MbtiQuestionData";
import Button from "@components/layout/Button";

function MbtiQuestion() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [questionNo, setQuestionNo] = useState(0);
  const [totalScore, setTotalScore] = useState([
    { id: "EI", score: 0 },
    { id: "SN", score: 0 },
    { id: "TF", score: 0 },
    { id: "JP", score: 0 },
  ]);

  //프로그래스바
  const progress = (questionNo + 1) / MbtiQuestionData.length;

  const handleClickButton = (no: number, type: string) => {
    const newScore = totalScore.map(s =>
      s.id === type ? { id: s.id, score: s.score + no } : s,
    );
    setTotalScore(newScore);
    // 다음 문제로 문제수 증가
    setQuestionNo(questionNo + 1);

    if (questionNo + 1 === MbtiQuestionData.length) {
      //mbti도출(reduce)
      const mbti = newScore.reduce(
        (acc, curr) =>
          acc +
          (curr.score >= 2 ? curr.id.substring(0, 1) : curr.id.substring(1, 2)),
        "",
      );
      console.log("mbti", mbti);
      // 마지막 질문인 경우 결과 페이지로 이동
      navigate({
        pathname: "/mbti/result",
        search: `?${createSearchParams({
          mbti: mbti,
        })}`,
      });
    }
  };
  const handleback = () => {
    //  이전 문제로 이동
    if (questionNo > 0) {
      setQuestionNo(questionNo - 1);
    }
  };

  return (
    <>
      <div className="font-Pretendard relative m-auto h-screen min-w-[320px] max-w-[600px] bg-cover bg-center p-2">
        <img
          className="absolute left-0 top-0 -z-10 h-screen object-cover"
          src="/MBTIImage/MBTIMain.webp"
          alt="mbti"
          {...{ fetchpriority: "high" }}
          decoding="async"
        />
        <section className="flex w-full flex-col gap-4 rounded-lg bg-slate-50 p-2">
          <header className="flex flex-col gap-4">
            <h1 className="font-Pretendard text-center text-xl font-bold">
              다음 상황에서 당신의 선택은?
            </h1>
            <div className="w-full rounded-lg bg-gray-200">
              <div
                className="font-SSRONETHandwritten rounded-lg bg-blue-300 p-1 text-center text-base font-bold text-white"
                style={{ width: `${progress * 100}%` }}
              >
                {`${questionNo + 1}/${MbtiQuestionData.length}`}
              </div>
            </div>
          </header>

          <main className="font-SSRONETHandwritten rounded-lg bg-amber-200 p-4 text-center text-xl font-bold text-amber-500">
            {MbtiQuestionData[questionNo].title}
          </main>

          <section className="flex flex-col gap-4 font-bold">
            <div className="flex flex-col gap-2">
              <Button
                text={`${MbtiQuestionData[questionNo].answer1}`}
                textColor="black"
                bgColor="gray"
                width="full"
                onClick={() =>
                  handleClickButton(1, MbtiQuestionData[questionNo].type)
                }
              ></Button>
              <Button
                text={`${MbtiQuestionData[questionNo].answer2}`}
                textColor="black"
                bgColor="gray"
                width="full"
                onClick={() =>
                  handleClickButton(0, MbtiQuestionData[questionNo].type)
                }
              ></Button>
              <div className="flex items-center justify-center gap-2">
                {questionNo > 0 && (
                  <Button
                    text={"이전 문제 다시 풀기"}
                    textColor="gray"
                    bgColor="white"
                    width="1/2"
                    onClick={handleback}
                  ></Button>
                )}
                <Button
                  text={"Mbti 메인으로 가기"}
                  textColor="gray"
                  bgColor="white"
                  width="1/2"
                  onClick={() => navigate("/mbti")}
                ></Button>
              </div>
            </div>
          </section>
        </section>
      </div>
    </>
  );
}

export default MbtiQuestion;
