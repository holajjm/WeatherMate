import { useState, useEffect } from "react";

/**
 * 시간 갱신 상태를 관리하는 커스텀 훅
 * @param initialRefreshTime 초기 갱신 시간 (기본값: 현재 시간)
 * @returns { timeAgoText, refreshTime, handleRefresh }
 */
export const useTimeAgo = (initialRefreshTime?: number) => {
  const [lastRefreshTime, setLastRefreshTime] = useState<number>(
    initialRefreshTime || Date.now()
  );
  const [currentTime, setCurrentTime] = useState<number>(Date.now());

  // 시간 차이를 계산하여 표시할 텍스트를 반환하는 함수
  const getTimeAgoText = (): string => {
    const diffInSeconds = Math.floor((currentTime - lastRefreshTime) / 1000);

    if (diffInSeconds < 60) {
      return `방금 `;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes}분`;
    } else {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}시간`;
    }
  };

  // 새로 고침 함수
  const handleRefresh = () => {
    setLastRefreshTime(Date.now());
  };

  // 1분마다 현재 시간 업데이트
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 60000); // 60초 = 1분

    return () => clearInterval(interval);
  }, []);

  // 갱신 시간을 외부에서 설정할 수 있는 함수
  const setRefreshTime = (time: number) => {
    setLastRefreshTime(time);
  };

  return {
    timeAgoText: getTimeAgoText(),
    refreshTime: lastRefreshTime,
    handleRefresh,
    setRefreshTime
  };
};
