const formatOfficeHours = ({ openAt, closeAt }: Pick<Cluster, "closeAt" | "openAt">) => {
  const openTime = openAt || "";
  const closeTime = closeAt || "";
  if (openTime === "" && closeTime === "") return `00:00 ~ 24:00`;
  if (closeTime === "") return `${openTime.slice(0, 5)} ~ `;
  if (openTime === "") return `---- ~  ${closeTime.slice(0, 5)}`;
  return `${openTime.slice(0, 5)} ~ ${closeTime.slice(0, 5)}`;
};

export { formatOfficeHours };
