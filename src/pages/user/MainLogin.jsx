/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { memberState } from '@recoil/atom.mjs';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { gsap } from 'gsap';
import PropTypes from 'prop-types';

MainLogin.propTypes = {
  handleChildData: PropTypes.func
}

function MainLogin({onDataChange}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const Rest_api_key = import.meta.env.VITE_KAKAO_REST_API_KEY; //REST API KEY
  const redirect_uri = 'http://localhost:5173/auth/kakao'; //Redirect URI
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  const Edit = () => {
    console.log({ user });
  };

  const [user, setUser] = useRecoilState(memberState);
  console.log(user);
  const [data, setData] = useState(false)
  const handleData = (data) => {
    setData(!data)
    onDataChange(!data)
  }
  
  useEffect(() => {
    const floatTl = gsap.to('.comment-float', {
      y: 10,
      duration: 1,
      repeat: -1,
      yoyo: true,
    });
    const tl = gsap.timeline({ defaults: { ease: 'power1.out' } });
    return () => {
      // Clean up animations
      tl.kill();
      floatTl.kill();
    };
  }, []);

  return (
    <div className='absolute w-screen h-screen border-black border-2 bg-slate-200 opacity-80 z-40'>
      <nav className="border-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-red-700 w-1/2 h-1/2 bg-white rounded-2xl shadow-lg p-4 opacity-100 z-50">
        <div className="text-center h-full flex gap-4 justify-center items-center">

          <div className='w-1/2 flex flex-col'>
            <h2 className="font-TTLaundryGothicB text-xl text-primary">
              Weather Mate
            </h2>
            <p className="text-base text-gray-800">
              오늘의 날씨와 우리의 이야기를 나눠봐요
            </p>
            <img className="w-[50%] m-auto comment-float" src="/mainlogin.svg" />
          </div>

          <div className="w-1/2 flex flex-col gap-4 comment-text grow">
            <img className="w-[50%] m-auto comment-float" src="/logo.svg" />
            <button
              className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary_deep"
              onClick={() => navigate('/user/Login')}
            >
              로그인
            </button>
            <button
              className="bg-white border-primary border-2 text-primary py-2 px-4 rounded-lg hover:bg-gray-200"
              onClick={() => navigate('/user/SignUp')}
            >
              회원가입
            </button>
            <button
              className="text-gray-700 text-sm hover:underline"
              onClick={() => {
                // navigate('/main')
                handleData()
              }}
            >
              웨더메이트 둘러보기
            </button>
            <button
              className="bg-[#FEE500] text-[#55461a] py-2 px-4 rounded-lg hover:bg-[#fed400]"
              onClick={handleLogin}
            >
              카카오로 시작하기
            </button>
          </div>

        </div>
      </nav>
    </div>
  );
}

export default MainLogin;
// 이게 수정
