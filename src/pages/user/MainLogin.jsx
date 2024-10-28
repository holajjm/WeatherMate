import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import Button from '@components/layout/Button';

function MainLogin() {
  const navigate = useNavigate();
  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY; //REST API KEY
  const REDIRECT_URI = 'http://localhost:5173/auth/kakao'; //REDIRECT URI
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  useEffect(() => {
    const floatTl = gsap.to('.comment-float', {
      y: 10,
      duration: 1,
      repeat: -1,
      yoyo: true,
    });
    return () => {
      floatTl.kill();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-full flex justify-center p-8 md:px-20 xl:px-56 2xl:px-60 min-w-[375px] drop-shadow-md">
        <nav className="bg-white flex flex-col justify-between w-full lg:w-1/2 p-4 md:p-8 rounded-xl gap-4">
          <div className="flex flex-col justify-center items-center gap-4">
            <h2 className="font-black text-3xl text-primary_deep font-Ainmom">
              Weather Mate
            </h2>
            <p className="text-gray-600">
              오늘의 날씨와 우리의 이야기를 나눠봐요
            </p>
          </div>
          <img className="h-1/3 comment-float" src="/logo.svg" />
          <div className="w-full grid grid-cols-2 gap-2 md:gap-4 comment-text">
            <Button
              text={'로그인'}
              className="p-2 2xl:p-4 border-2 border-slate-100 rounded-lg text-sm 2xl:text-base font-semibold transition-all duration-200 text-white bg-sky-400 hover:bg-sky-500 hover:shadow-[0_5px_30px_4px] hover:shadow-slate-400"
              onClick={() => navigate('/user/Login')}
            ></Button>
            <Button
              text={'회원가입'}
              className="p-2 2xl:p-4 border-2 border-slate-100 rounded-lg text-sm 2xl:text-base font-semibold transition-all duration-200 text-white bg-indigo-500 hover:bg-indigo-700 hover:shadow-[0_5px_30px_4px] hover:shadow-slate-400"
              onClick={() => navigate('/user/SignUp')}
            ></Button>
            <Button
              text={'카카오로 시작하기'}
              className="p-2 2xl:p-4 border-2 border-[#FEE500] rounded-lg text-sm 2xl:text-base font-semibold transition-all duration-200 text-gray-500 text-nowrap bg-[#FEE500] hover:bg-yellow-400 hover:shadow-[0_5px_30px_4px] hover:shadow-slate-400 hover:text-white"
              onClick={handleLogin}
            ></Button>
            <Button
              text={'메인으로 돌아가기'}
              className="p-2 2xl:p-4 border-2 border-slate-100 rounded-lg text-sm 2xl:text-base font-semibold transition-all duration-200 text-gray-500 text-nowrap bg-slate-50 hover:bg-slate-400 hover:shadow-[0_5px_30px_4px] hover:shadow-slate-400 hover:text-white"
              onClick={() => {
                navigate('/main', { replace: true });
              }}
            ></Button>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default MainLogin;
