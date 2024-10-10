import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { useEffect } from 'react';

function PreviewMbti() {
  const navigate = useNavigate();

  const moveToMbitTest = () => {
    navigate('/mbti');
  };
  useEffect(() => {
    const tl = gsap.timeline({defaults: {ease: 'power2.out'}});
    tl.from('.fade-in-from-SE',{opacity: 0, y: 200, duration: 3});
    return () => {
      tl.kill();
    }
  },[])

  return (
    <div className="grow bg-white border-4 border-violet-200 p-4 rounded-2xl shadow-[0px_4px_10px_rgba(0,0,0,0.2),inset_0px_4px_10px_rgba(255,255,255,0.5)] shadow-violet-200 fade-in-from-SE">
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
