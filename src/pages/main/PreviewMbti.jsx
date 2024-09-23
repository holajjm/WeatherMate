import { useNavigate } from 'react-router-dom';

function PreviewMbti() {
  const navigate = useNavigate();

  const moveToMbitTest = () => {
    navigate('/mbti');
  };

  return (
    <div className="p-4 rounded-2xl shadow-[0px_4px_10px_rgba(0,0,0,0.2),inset_0px_4px_10px_rgba(255,255,255,0.5)] shadow-violet-300 h-full">
      <h1 className="font-bold text-xl">🌤️날씨 성격 테스트</h1>
      <p>나의 성격은 어느 날씨와 어울릴까요? <br/> 날씨 성향 테스트를 통해 알아보세요!</p>
      <button
        className="rounded-lg px-4 py-2 bg-primary text-white font-bold"
        onClick={moveToMbitTest}
      >
        테스트 시작하기
      </button>
    </div>
  );
}

export default PreviewMbti;
