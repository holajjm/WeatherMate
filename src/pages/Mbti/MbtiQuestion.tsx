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
      <div className="relative max-w-[600px] min-w-[320px] m-auto h-screen p-2 bg-cover bg-center font-Pretendard">
        <img
          className="absolute top-0 left-0 -z-10 h-screen object-cover"
          src="/MBTIImage/MBTIMain.webp"
          alt="mbti"
          {...{ fetchpriority: "high" }}
          decoding="async"
        />
        <section className="w-full p-2 flex flex-col gap-4 bg-slate-50 rounded-lg">
          <header className="flex flex-col gap-4">
            <h1 className="text-xl text-center font-bold font-Pretendard">
              다음 상황에서 당신의 선택은?
            </h1>
            <div className="w-full bg-gray-200 rounded-lg">
              <div
                className="bg-blue-300 text-base font-SSRONETHandwritten font-bold text-white text-center p-1 rounded-lg"
                style={{ width: `${progress * 100}%` }}
              >
                {`${questionNo + 1}/${MbtiQuestionData.length}`}
              </div>
            </div>
          </header>

          <main className="p-4 text-center font-SSRONETHandwritten text-amber-500 text-xl font-bold rounded-lg bg-amber-200">
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
