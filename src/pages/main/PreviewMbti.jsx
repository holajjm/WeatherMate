import Button from '@components/layout/Button';
import { useNavigate } from 'react-router-dom';

function PreviewMbti() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-2 grow text-lg bg-white border-[3px] border-blue-200 p-4 rounded-2xl shadow-[0px_4px_10px_rgba(0,0,0,0.2),inset_0px_4px_10px_rgba(255,255,255,0.5)] shadow-blue-200">
      <div className="flex flex-col gap-2 border-2 rounded-xl grow p-2 box-border ">
        <p className="font-bold text-center">🌤️날씨 성격 테스트</p>
        <p className="hidden sm:inline 2xl:hidden 3xl:inline">나의 성격은 어느 날씨와 어울릴까요?<br />날씨 성향 테스트를 통해 알아보세요!</p>
        <Button
          text={"테스트 하러가기"}
          className="w-full h-full flex justify-center items-center text-base font-semibold text-white text-pretty rounded-lg p-1 duration-200 transition-all bg-sky-400 hover:bg-sky-500 hover:shadow-[0_5px_30px_4px] hover:shadow-slate-400"
          onClick={() => navigate('/mbti')}
        >
          테스트 하러가기
        </Button>
      </div>
      <div className="flex flex-col gap-2 border-2 rounded-xl grow p-2 box-border ">
        <p className="font-bold text-center">🌤️전국의 날씨</p>
        <p className="hidden sm:inline 2xl:hidden 3xl:inline">나의 성격은 어느 날씨와 어울릴까요?<br />날씨 성향 테스트를 통해 알아보세요!</p>
        <Button
        text={"전국날씨 보러가기"}
          className="w-full h-full flex justify-center items-center text-base font-semibold text-white text-pretty rounded-lg p-1 duration-200 transition-all bg-indigo-500 hover:bg-indigo-700 hover:shadow-[0_5px_30px_4px] hover:shadow-slate-400"
          onClick={() => navigate("/allcity")}
        >
        </Button>
      </div>
    </div>
  );
}

export default PreviewMbti;
