import { useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import MbtiQuestionData from '@assets/MbtiQuestionData';
import mbtiStart from '@assets/mbti/mbtiimg/mbtiStart.png';
import Button from '@components/layout/Button';

function MbtiQuestion() {
  const navigate = useNavigate();
  const [questionNo, setQuestionNo] = useState(0);
  const [totalScore, setTotalScore] = useState([
    { id: 'EI', score: 0 },
    { id: 'SN', score: 0 },
    { id: 'TF', score: 0 },
    { id: 'JP', score: 0 },
  ]);

  //프로그래스바
  const progress = (questionNo + 1) / MbtiQuestionData.length;

  const handleClickButton = (no, type) => {
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
        '',
      );
      console.log('mbti', mbti);
      // 마지막 질문인 경우 결과 페이지로 이동
      navigate({
        pathname: '/mbti/result',
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
      <div className="bg-gray-100 h-screen flex flex-col gap-4 font-TTLaundryGothicB p-4 md:px-20 xl:px-56 2xl:px-60 min-w-[375px]">
        <div
          style={{ backgroundImage: `url(${mbtiStart})` }}
          className="h-full rounded-xl bg-cover bg-center flex items-center justify-center"
        >
          <div className="w-full lg:w-1/2 h-full sm:h-1/2 flex flex-col gap-4 bg-slate-100 p-6 rounded-xl">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                {questionNo > 0 && (
                  <Button
                    text={"이전 문제 다시 풀기"}
                    onClick={handleback}
                    className="rounded-lg bg-white hover:bg-primary border-2 p-2 text-lg text-gray-700 font-bold"
                  >
                  </Button>
                )}
                <Button
                  text={'Mbti 메인으로 가기'}
                  onClick={() => navigate('/mbti')}
                  className="rounded-lg bg-white hover:bg-red-300 border-2 p-2 text-lg text-gray-700 font-bold"
                ></Button>
              </div>
              <h1 className="text-2xl text-center font-bold">다음 상황에서 당신의 선택은?</h1>
              <div className="w-full bg-gray-200 rounded-full ">
                <div
                  className="bg-primary text-sm text-white text-center py-0.5 rounded-full"
                  style={{ width: `${progress * 100}%` }}
                >
                  {`${questionNo + 1}/${MbtiQuestionData.length}`}
                </div>
              </div>

              <div className="flex flex-col gap-8">
                <div className="text-center border-4 text-xl text-gray-700 rounded-lg p-8 border-primary">
                  {MbtiQuestionData[questionNo].title}
                </div>
                <div className="flex flex-col gap-4">
                  <Button
                    text={`${MbtiQuestionData[questionNo].answer1}`}
                    onClick={() =>
                      handleClickButton(1, MbtiQuestionData[questionNo].type)
                    }
                    className="w-full rounded-lg bg-white hover:bg-primary border-2 p-2 text-lg text-gray-700 font-bold "
                  >
                  </Button>
                  <Button
                    text={`${MbtiQuestionData[questionNo].answer2}`}
                    onClick={() =>
                      handleClickButton(0, MbtiQuestionData[questionNo].type)
                    }
                    className="w-full rounded-lg bg-white hover:bg-primary border-2 p-2 text-lg text-gray-700 font-bold text-nowrap"
                  >
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MbtiQuestion;
