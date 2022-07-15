import React from "react";
import useUser from "../utils/hooks/useUser";
import { formatToGeneralTime } from "../utils/time";
import CheckOutForm from "./CheckOutForm";
import Box from "./common/Box";

interface IProps {
  handleCheckOut: () => Promise<void>;
}
const CheckOutUi: React.FC<IProps> = ({ handleCheckOut }) => {
  const {
    user: { checkinAt },
  } = useUser();

  const checkInTime = formatToGeneralTime(new Date(checkinAt ?? ""));

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
