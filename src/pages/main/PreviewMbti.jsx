import { useNavigate } from 'react-router-dom';

function PreviewMbti() {
  const navigate = useNavigate();

  return (
    <div className="grow text-lg bg-white border-4 border-blue-200 p-4 rounded-2xl shadow-[0px_4px_10px_rgba(0,0,0,0.2),inset_0px_4px_10px_rgba(255,255,255,0.5)] shadow-blue-200">
      <p className="font-bold">🌤️날씨 성격 테스트</p>
      <p>나의 성격은 어느 날씨와 어울릴까요? <br/> 날씨 성향 테스트를 통해 알아보세요!</p>
      <button
        className="rounded-lg px-4 py-2 bg-primary text-white font-bold"
        onClick={() => navigate('/mbti')}
      >
        테스트 시작하기
      </button>
    </div>
  );
}

export default PreviewMbti;
