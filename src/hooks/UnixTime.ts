export const UnixTime = (time: number, type: string) => {
  const hour = (new Date(time * 1000).getHours() % 12 || 12)
    .toString()
    .padStart(2, "0");
  const min = new Date(time * 1000).getMinutes().toString().padStart(2, "0");
  const ampm = new Date(time * 1000).getHours() >= 12 ? "오후" : "오전";
  return type !== "withMin" ? `${ampm} ${hour}시` : `${ampm}${hour}:${min}`;
};
