import React, { useMemo } from "react";
import useUser from "../utils/hooks/useUser";
import { formatToGeneralTime } from "../utils/time";
import Box from "./Box";
import CheckOutForm from "./CheckOutForm";

interface IProps {
  handleCheckOut: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}
const CheckOutUi: React.FC<IProps> = ({ handleCheckOut }) => {
  const {
    user: { checkinAt },
  } = useUser();

  const checkInTime = useMemo(() => formatToGeneralTime(new Date(checkinAt ?? "")), [checkinAt]);

  return (
    <>
      <Box>
        <p>체크인 시간: {checkInTime}</p>
      </Box>
      <CheckOutForm handleCheckOut={handleCheckOut} />
    </>
  );
};

export default CheckOutUi;
