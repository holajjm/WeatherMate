import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import Button from '@components/layout/Button';
// import { useEffect } from 'react';

function ValidLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY; //REST API KEY
  const REDIRECT_URI = 'http://localhost:5173/auth/kakao'; //REDIRECT URI
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };
  
  return (
    <div className="max-w-[600px] min-w-[320px] m-auto h-screen bg-gray-100">
      <div className="p-4 flex justify-center drop-shadow-md">
        <div className="bg-white flex flex-col w-full p-4 rounded-xl gap-4">
          <div className="flex flex-col justify-center items-center gap-4">
            <h2 className="text-3xl font-black text-sky-400 font-UhBeeKangJa">
              로그인 후 이용할 수 있어요!
            </h2>
            <p className="text-slate-600 text-xl font-SSRONETHandwritten">
              원활한 서비스 사용을 위해 로그인을 해주세요!
            </p>
            <img className="w-1/3" src="/mainlogin.svg" />
          </div>
          <div className="w-full grid grid-cols-2 gap-2">
            <button
              // text={'로그인'}
              className="p-4 border-2 border-slate-100 rounded-lg font-UhBeeKangJa transition-all duration-200 text-white bg-sky-400 hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400"
              onClick={() =>
                navigate('/user/Login', { state: location.state })
              }
            >로그인</button>
            <button
              // text={'회원가입'}
              className="p-4 border-2 border-slate-100 rounded-lg font-UhBeeKangJa transition-all duration-200 text-white bg-indigo-500 hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400"
              onClick={() => navigate('/user/SignUp')}
            >회원가입</button>
            <button
              // text={'카카오로 시작하기'}
              className="p-4 border-2 border-slate-100 rounded-lg font-UhBeeKangJa transition-all duration-200 text-gray-500 text-nowrap bg-[#FEE500] hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400"
              onClick={handleLogin}
            >카카오로 시작하기</button>
            <button
              // text={'메인으로 돌아가기'}
              className="p-4 border-2 border-slate-100 rounded-lg font-UhBeeKangJa transition-all duration-200 text-gray-500 text-nowrap bg-slate-200 hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400"
              onClick={() => navigate('/')}
            >메인으로 돌아가기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ValidLogin;
