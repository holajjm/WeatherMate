import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { memberState } from '@recoil/atom.mjs';

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
    <div>
      <button
        onClick={handleWrite}
        className="bg-violet-300 boreder rounded-xl px-4 py-3 text-sm text-violet-800 font-bold text-nowrap w-40 xl:text-lg transition-all duration-500 hover:text-xl hover:font-extrabold"
      >
        글 작성하기
      </button>
    </div>
  );
}

export default CommunityNewbutton;
