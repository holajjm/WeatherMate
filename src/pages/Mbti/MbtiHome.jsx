import { useNavigate } from 'react-router-dom';
import mbtiStart from '@assets/mbti/mbtiimg/mbtiStart.png';

function MbtiHome() {
  const navigate = useNavigate();

  return (
    <div className="py-12">
      <div style={{ backgroundImage: `url(${mbtiStart})` }} className="rounded-2xl bg-cover bg-center h-screen py-60 xl:px-60 flex gap-10 flex-col text-center items-center font-TTLaundryGothicB">
        <p className="text-4xl font-bold ">날씨 성격 테스트</p>
        <div className="text-2xl font-bold ">
          <p>날씨별 상황에 따라</p>
          <p>내 행동을 골라보자!</p>
          <br />
          <p>나는 어떤 날씨와 어울릴까? </p>
        </div>
        <button
          onClick={() => navigate('question')}
          className="bg-white p-6 text-xl rounded-lg transition-all duration-200 hover:shadow-lg hover:bg-violet-200 hover:border-2 hover:border-violet-300 hover:shadow-slate-500 hover:scale-105"
        >
          테스트 시작하기
        </button>
      </div>
    </div>
  );
}

export default MbtiHome;
