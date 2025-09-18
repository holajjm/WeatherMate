export const UnixTime = (time: number | undefined, type: string) => {
  if (time) {
    const hour = (new Date(time * 1000).getHours() % 12 || 12)
      .toString()
      .padStart(2, "0");
    const min = new Date(time * 1000).getMinutes().toString().padStart(2, "0");
    const ampm = new Date(time * 1000).getHours() >= 12 ? "PM" : "AM";
    return type !== "withMin" ? `${ampm} ${hour}` : `${ampm}${hour}:${min}`;
  }
};
