import moment from "moment";

const formatOfficeHours = ({ openAt, closeAt }: Pick<Cluster, "closeAt" | "openAt">) => {
  const openTime = openAt ?? "";
  const closeTime = closeAt ?? "";
  if (openTime === "" && closeTime === "") return `00:00 ~ 24:00`;
  if (closeTime === "") return `${openTime.slice(0, 5)} ~ `;
  if (openTime === "") return `---- ~  ${closeTime.slice(0, 5)}`;
  return `${openTime.slice(0, 5)} ~ ${closeTime.slice(0, 5)}`;
};

const formatLunchTime = (time: string) => {
  const isWeekend = () => {
    const today = new Date(moment(new Date(time)).local().format());

    if (today.getDay() === 6 || today.getDay() === 0) return true;
    return false;
  };

  return isWeekend() ? "11:00 ~ 12:00" : "13:00 ~ 14:00";
};

const formatToGeneralTime = (time: Date) => {
  return moment(time).format("YYYY-MM-DD HH:mm");
};

export { formatOfficeHours, formatLunchTime, formatToGeneralTime };
