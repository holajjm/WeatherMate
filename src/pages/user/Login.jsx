import { useNavigate, useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { memberState } from '@recoil/atom.mjs';
import { useForm } from 'react-hook-form';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import Submit from '@components/layout/Submit.jsx';
import Button from '@components/layout/Button';

function Login() {
  const location = useLocation();
  const setUser = useSetRecoilState(memberState);
  const axios = useCustomAxios();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    values: {
      email: 'WeatherMate@naver.com',
      password: '123456789',
    },
  });

  const onSubmit = async formData => {
    try {
      const res = await axios.post('/users/login', formData);

      setUser({
        _id: res.data.item._id,
        email: res.data.item.email,
        name: res.data.item.name,
        profile: res.data.item.profileImage,
        token: res.data.item.token,
      });

      alert(res.data.item.name + '님 반갑습니다');
      navigate(location.state ? `${location.state}` : '/main');
      console.log(res.data.item);
    } catch (err) {
      if (err.response?.data.errors) {
        err.response?.data.errors.forEach(error =>
          setError(error.path, { message: error.msg }),
        );
      } else if (err.response?.data.message) {
        alert(err.response?.data.message);
      }
    }
  };

  return (
    <div className="h-screen bg-gray-100">
      <div className="w-full flex justify-center p-8 md:px-20 xl:px-56 2xl:px-60 min-w-[375px] drop-shadow-md">
        <nav className="bg-white flex flex-col w-full h-full lg:w-1/2 p-4 md:p-8 rounded-xl gap-4">
          <div className="flex flex-col justify-center items-center gap-4">
            <h2 className="font-black text-3xl text-sky-400 font-Ainmom">
              Weather Mate
            </h2>
            <p className="text-gray-600">
              회원 서비스 이용을 위해 로그인 해주세요
            </p>
          </div>

            <form onSubmit={handleSubmit(onSubmit)} className="grow flex flex-col gap-2">
              <div>
                <label htmlFor="email" className="sr-only">
                  이메일
                </label>
                <input
                  className="p-4 rounded-xl bg-slate-100 w-full focus:border-2 focus:border-sky-400"
                  type="email"
                  id="email"
                  placeholder="이메일을 입력하세요"
                  {...register('email', {
                    required: '이메일을 입력하세요',
                    pattern: {
                      value:
                        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
                      message: '이메일 형식이 아닙니다',
                    },
                  })}
                />
                {errors.email && (
                  <p className="ml-2 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  비밀번호
                </label>
                <input
                  className="p-4 rounded-xl bg-slate-100 border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent w-full"
                  type="password"
                  id="password"
                  placeholder="비밀번호를 입력하세요"
                  {...register('password', {
                    required: '비밀번호를 입력하세요',
                  })}
                />
                {errors.password && (
                  <p className="ml-2 text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex w-full">
                  <Submit
                    text={'로그인'}
                    className="grow p-4 border-2 border-slate-100 rounded-lg text-base font-semibold transition-all duration-200 text-white bg-sky-400 hover:bg-sky-500 hover:shadow-[0_5px_30px_4px] hover:shadow-slate-400"
                  ></Submit>
                  <Button
                    text={'회원가입'}
                    onClick={() => navigate('/user/signup')}
                    className="grow p-4 border-2 border-slate-100 rounded-lg text-base font-semibold transition-all duration-200 text-white bg-indigo-500 hover:bg-indigo-700 hover:shadow-[0_5px_30px_4px] hover:shadow-slate-400"
                  ></Button>
                </div>
                <img className="w-1/4 h-1/4" src="/logo.svg" />
              </div>
            </form>
        </nav>
      </div>
    </div>
  );
}

export default Login;
