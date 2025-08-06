interface ImportMeta {
  readonly env:ImportMetaEnv
}
interface ImportMetaEnv {
  // Weather
  readonly VITE_REACT_APP_WEATHER_MAIN_KEY: string,
  readonly VITE_REACT_APP_WEATHER_SERVE_KEY: string,
  // KAKAO
  readonly VITE_KAKAO_LOGIN_API_KEY: string,
  // Location
  readonly VITE_REACT_APP_LOCATION_API_KEY: string,
  // Server
  readonly VITE_API_SERVER: string,
  // Production
  readonly VITE_APP_PRODUCTION: string,
  
  readonly VITE_REACT_APP_KAKAO_NATIVE_API_KEY: string,
  readonly VITE_REACT_APP_KAKAO_REST_API_KEY: string,
  readonly VITE_REACT_APP_KAKAO_JAVASCRIPT_KEY: string,
  readonly VITE_REACT_APP_KAKAO_ADMIN_KEY: string,
}