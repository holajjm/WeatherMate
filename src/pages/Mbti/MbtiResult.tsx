import React,{ useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MbtiResultData from '../../assets/mbti/MbtiResultData';
import KakaoShareButton from '@components/KakaoShareButton';
import { MBTIResult } from 'type';

function MbtiResult() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mbti = searchParams.get('mbti');
  const [resultData, setResultData] = useState<MBTIResult | undefined>(undefined);
  console.log(resultData);

  useEffect(() => {
    const result = MbtiResultData.find(s => s.type === mbti);
    setResultData(result);
  }, [mbti]);

  return (
    <>
      <div className="max-w-[600px] min-w-[320px] m-auto min-h-screen p-2 flex flex-col items-center gap-8 font-TTLaundryGothicB">
        <header>
          <h1 className="font-bold text-2xl p-4 h-16">테스트 결과</h1>
        </header>
        <div className="mt-8 relative border-4 rounded-lg p-4 text-pretty">
          <img
            src={resultData?.image}
            className="absolute -top-20 left-1/2 -translate-x-1/2 border-8 border-white w-36 h-36 rounded-full bg-white"
            />
          <div className="mt-16">
            <p className="text-xl text-center text-amber-500">{`"${resultData?.title}"`}</p>
            <p className="text-base">{resultData?.desc}</p>
          </div>
        </div>

        <div className="w-full flex gap-8">
          <button
            onClick={() => navigate('/mbti')}
            className="w-full p-4 border-2 border-slate-100 rounded-lg font-UhBeeKangJa transition-all duration-200 text-gray-500 text-nowrap bg-slate-200 hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400"
          >
            테스트 다시하기
          </button>
          <KakaoShareButton data={resultData} />
          <button
            onClick={() => navigate('/')}
            className="w-full p-4 border-2 border-slate-100 rounded-lg font-UhBeeKangJa transition-all duration-200 text-white bg-sky-400 hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400"
          >
            메인으로 돌아가기
          </button>
        </div>
      </div>
    </>
  );
}

export default MbtiResult;
