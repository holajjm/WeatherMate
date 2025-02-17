function EnvCheck() {
  const REQUIRED_ENV_VARS = [
    "VITE_REACT_APP_WEATHER_API_KEY",
    "VITE_REACT_APP_WEATHER_API_KEY2",
    "VITE_REACT_APP_LOCATION_API_KEY",
    "VITE_REACT_APP_KAKAO_NATIVE_API_KEY",
    "VITE_REACT_APP_KAKAO_REST_API_KEY",
    "VITE_REACT_APP_KAKAO_JAVASCRIPT_KEY",
    "VITE_REACT_APP_KAKAO_ADMIN_KEY",
    "VITE_API_SERVER",
    "VITE_APP_TITLE",
    "VITE_KAKAO_REST_API_KEY",
  ] as const;

  const isValidURL = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  REQUIRED_ENV_VARS.forEach(key => {
    const value = import.meta.env[key];
    if (!value) {
      alert(
        "예상치 못한 환경 변수 오류가 발생했습니다. 다시 접속해주시기 바랍니다.",
      );
      throw new Error(`❌ Missing environment variable: ${key}`);
    }
    if (key === "VITE_API_SERVER" && !isValidURL(value)) {
      alert(
        "예상치 못한 환경 변수 오류가 발생했습니다. 다시 접속해주시기 바랍니다.",
      );
      throw new Error(`❌ Invalid URL format in environment variable: ${key}`);
    }
  });
  console.log("All required environment variables are set.");
}

export default EnvCheck;
