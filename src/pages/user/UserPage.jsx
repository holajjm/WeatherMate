import { Link, useNavigate } from 'react-router-dom';
import { memberState } from '@recoil/atom.mjs';
import { useQuery } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import Button from '@components/layout/Button';
import LocationBookMark from '@pages/location/LocationBookmark';
import UserBoard from '@pages/user/UserBoard';
import ValidLogin from '@pages/user/ValidLogin';
import { BsBookmarkStarFill } from 'react-icons/bs';
import { PiUserListBold } from 'react-icons/pi';

function UserPage() {
  const navigate = useNavigate();
  const axios = useCustomAxios();
  const [user, setUser] = useRecoilState(memberState);

  const handleLogout = () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      setUser(null);
      navigate('/');
    }
  };

  const Edit = () => {
    navigate('/user/edit');
  };

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

  const itemList = data?.item?.filter(item => {
    if (user && item.user._id === user._id) {
      return item;
    }
  })
    .map(item => <UserBoard key={item._id} item={item} />);

  return (
    <>
      {user && user.name ? (
        <div className="min-h-screen bg-gray-100">
          <main className="p-8 md:px-20 min-w-[375px] w-full h-screen flex justify-center drop-shadow-md">
            <section className="bg-white w-full lg:w-1/2 overflow-y-scroll scrollbar-hide rounded-xl p-6 md:p-8 flex flex-col gap-4">
              <header className="flex flex-col gap-4">
                <div className="flex gap-2 md:gap-4 items-center">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={user.profile ? user.profile : '/nulluser.svg'}
                    alt="Profile"
                  />
                  <div className="flex-grow">
                    <p className="text-xl font-bold text-sky-500">
                      {user.name}님
                    </p>
                    <p className="text-sm md:text-base text-nowrap font-semibold text-slate-600">
                      오늘 날씨 어때요?
                    </p>
                  </div>
                  <Button
                    onClick={handleLogout}
                    text={'로그아웃'}
                    className="w-1/3 p-4 border-2 border-slate-100 rounded-lg text-sm 2xl:text-base font-semibold transition-all duration-200 text-gray-500 text-nowrap bg-slate-200 hover:bg-red-400 hover:shadow-[0_5px_30px_4px] hover:shadow-slate-400 hover:text-white"
                  ></Button>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-2 lg:gap-4">
                    <Button
                      onClick={Edit}
                      text={'회원 정보 수정'}
                      className="grow p-4 border-2 border-slate-100 rounded-lg text-sm 2xl:text-base font-semibold transition-all duration-200 text-white bg-indigo-500 hover:bg-indigo-700 hover:shadow-[0_5px_30px_4px] hover:shadow-slate-400"
                    ></Button>
                    <Button
                      onClick={() => navigate('/mbti')}
                      text={'MBTI 테스트 하러가기'}
                      className="grow p-4 border-2 border-slate-100 rounded-lg text-sm 2xl:text-base font-semibold transition-all duration-200 text-white bg-sky-400 hover:bg-sky-500 hover:shadow-[0_5px_30px_4px] hover:shadow-slate-400"
                    ></Button>
                  </div>
                  <hr className="border-[1.5px] border-slate-300" />
                </div>
              </header>
              <main className="flex flex-col gap-4 h-full">
                <div className="flex gap-2 items-center">
                  <BsBookmarkStarFill className="text-sky-400 w-6 h-6" />
                  <p className="text-base md:text-lg text-nowrap text-slate-600 font-bold">
                    저장한 장소
                  </p>
                  <Link
                    to={'/location'}
                    className="text-base text-slate-400 hover:text-orange-400 hover:font-bold"
                  >
                    장소추천 &rarr;
                  </Link>
                </div>
                <LocationBookMark />
              </main>
              <main className="flex flex-col gap-4 h-full">
                <div className="flex gap-2 items-center">
                  <PiUserListBold className="text-sky-400 w-8 h-8" />
                  <p className="text-base md:text-lg text-nowrap text-slate-600 font-bold">나의 활동</p>
                  <Link
                    to={'/community'}
                    className="text-base text-slate-400 hover:text-orange-400 hover:font-bold"
                  >
                    커뮤니티 &rarr;
                  </Link>
                </div>
                <div className="h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2 gap-4 border-t-2 border-b-2 drop-shadow-md py-4 overflow-y-scroll scrollbar-hide bg-slate-100 p-4 rounded-lg">
                  {itemList}
                </div>
              </main>
            </section>
          </main>
        </div>
      ) : (
        <ValidLogin />
      )}
    </>
  );
}

export default UserPage;
