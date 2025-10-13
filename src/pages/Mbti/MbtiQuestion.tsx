import React, { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

import Button from "@components/layout/Button";
import MbtiQuestionData from "@constants/MbtiQuestionData";
import useScrollTop from "@hooks/useScrollTop";

function MbtiQuestion() {
  useScrollTop();
  const navigate = useNavigate();
  const [questionNo, setQuestionNo] = useState(0);
  const [totalScore, setTotalScore] = useState([
    { id: "EI", score: 0 },
    { id: "SN", score: 0 },
    { id: "TF", score: 0 },
    { id: "JP", score: 0 }
  ]);

  //프로그래스바
  const progress = (questionNo + 1) / MbtiQuestionData.length;

  const handleClickButton = (no: number, type: string) => {
    const newScore = totalScore.map(s =>
      s.id === type ? { id: s.id, score: s.score + no } : s
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
        ""
      );
      console.log("mbti", mbti);
      // 마지막 질문인 경우 결과 페이지로 이동
      navigate({
        pathname: "/mbti/result",
        search: `?${createSearchParams({
          mbti: mbti
        })}`
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
      <div className="relative m-auto box-border h-screen min-w-[320px] max-w-[600px] p-4">
        <img
          className="absolute left-0 top-0 -z-10 h-screen object-cover"
          src="/MBTIImage/MBTIMain.webp"
          alt="mbti"
          {...{ fetchpriority: "high" }}
          decoding="async"
        />
        <section className="box-border flex w-full flex-col gap-4 rounded-modal bg-white p-4">
          <h1 className="text-center text-subtitle font-bold">
            다음 상황에서 당신의 선택은?
          </h1>
          <aside className="w-full rounded-button bg-gray-200">
            <p
              role="progress-bar"
              className="rounded-button bg-toss-blue p-1 text-center text-caption font-bold text-white"
              style={{ width: `${progress * 100}%` }}
            >
              {`${questionNo + 1}/${MbtiQuestionData.length}`}
            </p>
          </aside>

          <main className="flex h-20 items-center justify-center rounded-button bg-amber-200 p-2 text-center text-body font-bold text-amber-500">
            {MbtiQuestionData[questionNo].title}
          </main>

          <section className="flex flex-col gap-4 font-bold">
            <div className="flex gap-2">
              <p
                role="answer"
                onClick={() =>
                  handleClickButton(1, MbtiQuestionData[questionNo].type)
                }
                className="flex h-12 w-1/2 cursor-pointer items-center justify-center text-pretty rounded-button border bg-toss-lightblue p-2 text-center text-caption transition-all duration-200 hover:scale-[1.03] hover:bg-toss-blue hover:text-white"
              >{`${MbtiQuestionData[questionNo].answer1}`}</p>
              <p
                role="answer"
                onClick={() =>
                  handleClickButton(0, MbtiQuestionData[questionNo].type)
                }
                className="flex h-12 w-1/2 cursor-pointer items-center justify-center text-pretty rounded-button border bg-toss-lightblue p-2 text-center text-caption transition-all duration-200 hover:scale-[1.03] hover:bg-toss-blue hover:text-white"
              >{`${MbtiQuestionData[questionNo].answer2}`}</p>
            </div>
            <hr className="m-auto w-3/4 border-toss-gray" />
            <div className="flex items-center justify-center gap-2">
              {questionNo > 0 && (
                <Button
                  text={"이전 문제 다시 풀기"}
                  textColor="white"
                  bgColor="gray"
                  width="1/2"
                  height="10"
                  onClick={handleback}
                  label="이전 문제"
                ></Button>
              )}
              <Button
                text={"그만하기"}
                textColor="white"
                bgColor="lightred"
                width="1/2"
                height="10"
                onClick={() => {
                  if (confirm("진행 과정이 저장되지 않습니다. 그만할까요?")) {
                    navigate("/mbti");
                  }
                }}
                label="그만하기"
              ></Button>
            </div>
          </section>
        </section>
      </div>
    </>
  );
}

export default MbtiQuestion;
