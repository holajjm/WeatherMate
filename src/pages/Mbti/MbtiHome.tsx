import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import mbtiStart from '@assets/mbti/mbtiimg/mbtiStart.png';
// import Button from '@components/layout/Button';
import { useRecoilState } from 'recoil';
import { memberState } from '../../recoil/atom.mts';
import usePageTitle from '@hooks/usePageTitle';

function MbtiHome() {
  usePageTitle('MBTI');
  const navigate = useNavigate();
  const location = useLocation();
  const [user] = useRecoilState(memberState);
  
  return (
    <div
      style={{ backgroundImage: `url(${mbtiStart})` }}
      className="max-w-[600px] min-w-[320px] m-auto min-h-screen p-2 bg-cover bg-center"
    >
      <div className="h-full rounded-xl flex flex-col gap-4 items-center justify-center font-SSRONETHandwritten text-nowrap">
        <div className="p-20 flex flex-col gap-10 text-center items-center justift-center">
          <p className="text-4xl font-bold font-UhBeeKangJa">날씨 성격 테스트</p>
          <img className="w-1/2" src="/mainlogin.svg" />
          <div className="text-2xl font-bold text-slate-600">
            <p>날씨별 상황에 따라</p>
            <p>내 행동을 골라보자!</p>
            <br />
            <p>나는 어떤 날씨와 어울릴까?</p>
          </div>
        </div>
        <div className="w-full flex gap-4">
          <button
            // text={'테스트 시작하기'}
            onClick={() => {
              if (!user?.name) {
                confirm('로그인이 필요합니다. 로그인 하시겠습니까?')
                  ? navigate('/mainlogin', { state: location.pathname })
                  : null;
              } else {
                navigate('question');
              }
            }}
            className="w-full p-4 border-2 border-slate-100 rounded-lg font-UhBeeKangJa font-bold text-lg  transition-all duration-200 text-white bg-sky-400 hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400"
          >
            테스트 시작하기
          </button>
          <button
            // text={'메인으로 돌아가기'}
            onClick={() => navigate('/')}
            className="w-full p-4 border-2 border-slate-100 rounded-lg font-UhBeeKangJa font-bold text-lg  transition-all duration-200 text-gray-500 text-nowrap bg-slate-200 hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400"
          >
            메인으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default MbtiHome;
