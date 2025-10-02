import axios, { AxiosInstance } from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import { ENV } from "@constants/env";
import { useUserStore } from "@store/store";

const REFRESH_URL = "/auth/refresh";

function useCustomAxios() {
  const navigate = useNavigate();
  const location = useLocation();

  // Zustand에서 사용자 상태 가져오기
  const user = useUserStore(state => state.user);
  const setUser = useUserStore(state => state.setUser);
  // Axios 인스턴스 생성
  const instance = axios.create({
    baseURL: ENV.API_SERVER,
    timeout: 1000 * 20,
    headers: {
      "content-type": "application/json", // 요청 데이터 유형
      accept: "application/json", // 응답 데이터 유형
      "client-id": "07-WeatherMate" // 프로젝트 식별자
    }
  });

  // 리프레시 토큰으로 새로운 액세스 토큰 요청
  async function getAccessToken(instance: AxiosInstance) {
    try {
      const {
        data: { accessToken }
      } = await instance.get(REFRESH_URL);
      return accessToken;
    } catch (err) {
      console.error(err);
    }
  }

  // 요청 인터셉터
  instance.interceptors.request.use(config => {
    if (user && user.token && user.token.accessToken) {
      let token = user.token.accessToken;
      if (config.url === REFRESH_URL) {
        token = user.token.refreshToken;
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // 응답 인터셉터
  instance.interceptors.response.use(
    res => res,
    async err => {
      const { config, response } = err;
      if (response?.status === 401) {
        // 인증되지 않음
        if (config.url === REFRESH_URL) {
          // 리프레시 토큰 인증 실패
          if (
            confirm(
              "로그인 후 이용 가능합니다.\n로그인 페이지로 이동하시겠습니까?"
            )
          ) {
            navigate("/users/login", { state: { from: location.pathname } });
          }
        } else {
          // 리프레시 토큰으로 액세스 토큰 요청
          const accessToken = await getAccessToken(instance);
          if (accessToken) {
            setUser({
              ...user,
              token: {
                ...user.token,
                accessToken
              }
            });
            config.headers.Authorization = `Bearer ${accessToken}`;
            // 업데이트된 액세스 토큰으로 요청 다시 보내기
            return axios(config);
          }
        }
      } else {
        return Promise.reject(err);
      }
    }
  );

  return instance;
}

export default useCustomAxios;
