import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { memberState } from '../../recoil/atom.mts';

function CommunityNewbutton() {
  const navigate = useNavigate();
  const user = useRecoilValue(memberState);

  const handleWrite = () => {
    if (!user) {
      const gotologin = confirm(
        '로그인 후 이용 가능합니다. \n 로그인 하시겠습니까?',
      );
      gotologin && navigate('/user/login');
    } else {
      navigate('/community/new');
    }
  };
  return (
    <button
      onClick={handleWrite}
      className="w-full p-2 border-2 border-slate-100 rounded-lg font-UhBeeKangJa transition-all duration-200 text-nowrap text-amber-500 bg-amber-200 hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400"
    >
      글 작성하기
    </button>
  );
}

export default CommunityNewbutton;
