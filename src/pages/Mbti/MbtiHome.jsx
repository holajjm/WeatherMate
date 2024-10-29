import { useNavigate } from 'react-router-dom';
import mbtiStart from '@assets/mbti/mbtiimg/mbtiStart.png';
import Button from '@components/layout/Button';
import { useRecoilState } from 'recoil';
import { memberState } from '@recoil/atom.mjs';

function MbtiHome() {
  const navigate = useNavigate();
  const [user] = useRecoilState(memberState);
  console.log(user);
  

  return (
    <div className="bg-gray-100 h-screen flex flex-col gap-4 font-TTLaundryGothicB p-8 md:px-20 xl:px-56 2xl:px-60 min-w-[375px]">
      <div
        style={{ backgroundImage: `url(${mbtiStart})` }}
        className="p-20 h-full rounded-xl bg-cover bg-center flex items-center justify-center"
      >
        <div className="flex flex-col gap-10 text-center items-center justift-center">
          <p className="text-4xl font-bold">날씨 성격 테스트</p>
          <div className="text-2xl font-bold">
            <p>날씨별 상황에 따라</p>
            <p>내 행동을 골라보자!</p>
            <br />
            <p>나는 어떤 날씨와 어울릴까? </p>
          </div>
          <div className="flex flex-col w-full gap-4">
            <Button
              text={'테스트 시작하기'}
              onClick={() => {
                if(!user){
                  confirm("로그인이 필요합니다. 로그인 하시겠습니까?") ? navigate('/mainlogin') : null;
                }else{
                  navigate('question');
                }
              }}
              className="p-6 text-lg rounded-lg font-semibold text-white transition-all duration-200 bg-sky-400 hover:bg-sky-500 hover:shadow-[0_5px_30px_4px] hover:shadow-slate-400"
            ></Button>
            <Button
              text={'메인으로 돌아가기'}
              onClick={() => navigate('/')}
              className="p-6 text-lg rounded-lg font-semibold text-gray-500 transition-all duration-200 bg-slate-50 hover:bg-slate-400 hover:shadow-[0_5px_30px_4px] hover:shadow-slate-400 hover:text-white"
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MbtiHome;
