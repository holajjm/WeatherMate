interface ImportMeta {
  readonly env:ImportMetaEnv
}
interface ImportMetaEnv {
  readonly VITE_REACT_APP_WEATHER_API_KEY: string,
  readonly VITE_REACT_APP_WEATHER_API_KEY2: string,
  readonly VITE_REACT_APP_LOCATION_API_KEY: string,
  readonly VITE_REACT_APP_KAKAO_NATIVE_API_KEY: string,
  readonly VITE_REACT_APP_KAKAO_REST_API_KEY: string,
  readonly VITE_REACT_APP_KAKAO_JAVASCRIPT_KEY: string,
  readonly VITE_REACT_APP_KAKAO_ADMIN_KEY: string,
  readonly VITE_API_SERVER: string,
  readonly VITE_APP_TITLE: string,
  readonly VITE_KAKAO_REST_API_KEY: string,
}