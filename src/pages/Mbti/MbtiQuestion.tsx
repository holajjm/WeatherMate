import React, { useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

import MbtiQuestionData from "../../assets/MbtiQuestionData";
import mbtiStart from "@assets/mbti/mbtiimg/mbtiStart.png";
// import Button from '@components/layout/Button';

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
      <div
        style={{ backgroundImage: `url(${mbtiStart})` }}
        className="max-w-[600px] min-w-[320px] m-auto h-screen p-2 bg-cover bg-center"
      >
        <section className="w-full p-4 flex flex-col gap-8 bg-slate-50 rounded-xl">
          <header className="flex flex-col gap-4">
            <h1 className="text-2xl text-center font-bold font-TTLaundryGothicB">
              다음 상황에서 당신의 선택은?
            </h1>
            <div className="w-full bg-gray-200 rounded-full ">
              <div
                className="bg-blue-300 text-lg font-SSRONETHandwritten text-white text-center p-1 rounded-full"
                style={{ width: `${progress * 100}%` }}
              >
                {`${questionNo + 1}/${MbtiQuestionData.length}`}
              </div>
            </div>
          </header>

          <main className="p-8 text-center font-SSRONETHandwritten text-amber-500 text-2xl font-bold rounded-xl bg-amber-200">
            {MbtiQuestionData[questionNo].title}
          </main>

          <section className="flex flex-col gap-8 font-bold">
            <div className="flex flex-col gap-4">
              <button
                // text={`${MbtiQuestionData[questionNo].answer1}`}
                onClick={() =>
                  handleClickButton(1, MbtiQuestionData[questionNo].type)
                }
                className="w-full p-4 border-2 border-slate-100 rounded-lg font-UhBeeKangJa transition-all duration-200 text-nowrap text-gray-500 bg-slate-200 hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400 hover:bg-amber-200"
              >
                {`${MbtiQuestionData[questionNo].answer1}`}
              </button>
              <button
                // text={`${MbtiQuestionData[questionNo].answer2}`}
                onClick={() =>
                  handleClickButton(0, MbtiQuestionData[questionNo].type)
                }
                className="w-full p-4 border-2 border-slate-100 rounded-lg font-UhBeeKangJa transition-all duration-200 text-nowrap text-gray-500 bg-slate-200 hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400 hover:bg-amber-200"
              >
                {`${MbtiQuestionData[questionNo].answer2}`}
              </button>
              <div className="flex gap-2">
                {questionNo > 0 && (
                  <button
                    // text={"이전 문제 다시 풀기"}
                    onClick={handleback}
                    className="w-full p-4 border-2 border-slate-100 rounded-lg font-UhBeeKangJa transition-all duration-200 text-gray-500 text-nowrap bg-slate-200 hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400 hover:bg-red-300"
                  >
                    &larr; 이전 문제
                  </button>
                )}
                <button
                  // text={'Mbti 메인으로 가기'}
                  onClick={() => navigate("/mbti")}
                  className="w-full p-4 border-2 border-slate-100 rounded-lg font-UhBeeKangJa transition-all duration-200 text-white bg-indigo-500 hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400"
                >
                  메인으로
                </button>
              </div>
            </div>
          </section>
        </section>
      </div>
    </>
  );
}

export default MbtiQuestion;
