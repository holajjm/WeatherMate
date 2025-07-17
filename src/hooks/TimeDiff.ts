export const TimeDiff = (targetTime: string) => {
  const now = new Date().getTime();
  const target = new Date(targetTime).getTime();
  const diff = Math.floor(now - target);
  const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));
  return diffDay > 0 ? `${diffDay}일 전` : "0일전";
};
