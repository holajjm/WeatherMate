import Button from '@components/layout/Button';
import gsap from 'gsap';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ValidLogin() {
  const navigate = useNavigate();
  const location = useLocation();

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
      <div className="p-8 md:px-20 min-w-[375px] w-full flex justify-center drop-shadow-md">
        <div className="bg-white flex flex-col w-full lg:w-1/2 p-4 md:p-8 rounded-xl gap-4">
          <div className="flex flex-col justify-center items-center gap-4">
            <h2 className="text-3xl font-black text-primary_deep font-Ainmom">
              로그인 후 이용할 수 있어요!
            </h2>
            <p className="text-gray-600">
              원활한 서비스 사용을 위해 로그인을 해주세요!
            </p>
            <img className="w-1/3 comment-float" src="/mainlogin.svg" />
          </div>
          <div className="w-full grid grid-cols-2 gap-2 md:gap-4">
            <Button
              text={'로그인'}
              className="p-2 2xl:p-4 border-2 border-slate-100 rounded-lg text-sm 2xl:text-base font-semibold transition-all duration-200 text-white bg-sky-400 hover:bg-sky-500 hover:shadow-[0_5px_30px_4px] hover:shadow-slate-400"
              onClick={() =>
                navigate('/user/Login', { state: location.pathname })
              }
            ></Button>
            <Button
              text={'회원가입'}
              className="p-2 2xl:p-4 border-2 border-slate-100 rounded-lg text-sm 2xl:text-base font-semibold transition-all duration-200 text-white bg-indigo-500 hover:bg-indigo-700 hover:shadow-[0_5px_30px_4px] hover:shadow-slate-400"
              onClick={() => navigate('/user/SignUp')}
            ></Button>
            <Button
              text={'카카오로 시작하기'}
              className="p-2 2xl:p-4 border-2 border-[#FEE500] rounded-lg text-sm 2xl:text-base font-semibold transition-all duration-200 text-gray-500 text-nowrap bg-[#FEE500] hover:bg-yellow-400 hover:shadow-[0_5px_30px_4px] hover:shadow-slate-400 hover:text-white"
            ></Button>
            <Button
              text={'메인으로 돌아가기'}
              onClick={() => navigate('/')}
              className="p-2 2xl:p-4 border-2 border-slate-100 rounded-lg text-sm 2xl:text-base font-semibold transition-all duration-200 text-gray-500 text-nowrap bg-slate-50 hover:bg-slate-400 hover:shadow-[0_5px_30px_4px] hover:shadow-slate-400 hover:text-white"
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ValidLogin;
