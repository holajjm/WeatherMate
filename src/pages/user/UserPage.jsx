/* eslint-disable */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { memberState } from '@recoil/atom.mjs';
import { useRecoilState } from 'recoil';
import Button from '@components/layout/Button';
import LocationBookMark from '@pages/location/LocationBookmark';
import { useQuery } from '@tanstack/react-query';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import UserBoard from '@pages/user/UserBoard';
import { BsBookmarkStarFill } from "react-icons/bs";
import { PiUserListBold } from "react-icons/pi";
import DetailPageHeader from '@components/layout/DetailPageHeader';

function UserPage() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(memberState);

  const handleLogout = () => {
    if(confirm("로그아웃 하시겠습니까?")){
      setUser(null);
      navigate('/');
    }
  };

  const handleLogin = () => {
    // handle login logic here
  };

  const Edit = () => {
    navigate('/user/edit');
  };

  //여기부터
  // const [click, setClick] = useState(false);
  const axios = useCustomAxios();

  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: () =>
      axios.get('/posts', {
        params: {
          type: 'community',
        },
      }),
    select: response => response.data,
    suspense: true,
    refetchOnMount: 'always',
  });
  // console.log(user);
  // console.log(data);
  const itemList = data?.item
    ?.filter(item => {
      if (user) {
        if (item.user._id === user._id) {
          return item;
        }
      }
    })
    .map(item => <UserBoard key={item._id} item={item} />);
  //여기까지 바뀜

  return (
    <div className="min-h-screen bg-gray-100 w-full p-6 md:flex md:flex-col md:items-center">
      <DetailPageHeader title={"마이페이지"}/>
      <div className="bg-white rounded-3xl drop-shadow-md p-6 md:w-[600px]">
        {user && user.name ? (
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 lg:gap-6">
              <img
                className="w-10 h-10 rounded-full"
                src={user.profile ? user.profile : '/nulluser.svg'}
                alt="Profile"
              />
              <div className="flex-grow">
                <p className="text-lg font-semibold text-primary_deep">
                  {user.name}님
                </p>
                <p className="text-sm font-medium text-nowrap text-slate-600">
                  오늘 날씨 어때요?
                </p>
              </div>
              <Link
                to="/mbti"
                className="flex justify-center items-center px-2 py-0 border-2 rounded-md text-pretty text-slate-600 font-semibold text-sm hover:text-white hover:bg-primary hover:border-slate-100"
              >
                MBTI 테스트 하러가기
              </Link>
            </div>

            <div className="flex gap-2 border-b-2 pb-4 border-slate-300 lg:gap-4">
              <Button
                onClick={Edit}
                className="bg-slate-300 w-1/2 p-1 rounded-md font-medium text-sm text-slate-600 hover:bg-primary hover:text-white lg:p-2 lg:text-md lg:font-semibold"
              >
                회원 정보 수정
              </Button>
              <Button
                onClick={handleLogout}
                className="bg-slate-300 w-1/2 p-1 rounded-md font-medium text-sm text-slate-600 hover:bg-primary hover:text-white lg:p-2 lg:text-md lg:font-semibold"
              >
                로그아웃
              </Button>
            </div>

            <div>
              <div className='flex gap-2 items-center'>
                <BsBookmarkStarFill className='text-primary_deep w-6 h-6'/>
                <p className="text-slate-500 font-bold inline">저장한 장소</p>
              </div>
              <LocationBookMark />
            </div>
            <div>
              <div className='flex gap-2 items-center'>
                <PiUserListBold className='text-primary_deep w-6 h-6'/>
                <p className="text-slate-500 font-bold inline">나의 활동</p>
              </div>
              <div className="mt-2 h-[300px] border-t-2 py-4 overflow-y-scroll bg-slate-100 p-4 rounded-lg">
                {itemList}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-3xl font-black text-primary_deep font-Ainmom">
              로그인 후 이용할 수 있어요!
            </h2>
            <p className="text-gray-600">
              원활한 서비스 사용을 위해 로그인을 해주세요!
            </p>
            <img
              className="w-[50%] m-auto"
              src="/mainlogin.svg"
            />

            <div className="w-full grid grid-cols-2 gap-4">
              <button
                className="grow bg-primary text-white border-2 rounded-lg py-2 hover:bg-primary_deep"
                onClick={() => navigate('/user/Login')}
              >
                로그인
              </button>
              <button
                className="grow bg-white border-primary border-2 text-primary rounded-lg py-2 hover:bg-gray-200"
                onClick={() => navigate('/user/SignUp')}
              >
                회원가입
              </button>
              <button
                className="grow bg-[#FEE500] border-2 text-[#55461a] py-2 rounded-lg hover:bg-[#fed400]"
                onClick={handleLogin}
              >
                카카오로 시작하기
              </button>
              <Link to="/" className="grow border-2 py-2 rounded-lg text-gray-500 hover:underline text-sm">
                메인으로 돌아가기
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserPage;
