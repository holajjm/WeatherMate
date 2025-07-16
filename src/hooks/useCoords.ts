import { useEffect } from "react";
import { useCoordsStore } from "@store/store";

// 현재위치를 경도와 위도를 반환해주는 customHooks
export function useCoords() {
  const setCoords = useCoordsStore(state => state.setCoords);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setCoords({ latitude, longitude });
      },
      error => {
        console.error("위치 정보를 가져오는데 실패했습니다:", error);
      },
    );
  }, []);
}
