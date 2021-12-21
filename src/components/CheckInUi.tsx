import { Box as MuiBox, Modal } from "@mui/material";
import React, { useState } from "react";
import classes from "../styles/components/CheckInUi.module.css";
import useCluster from "../utils/hooks/useCluster";
import Box from "./Box";
import CheckInForm from "./CheckInForm";
import List from "./List";

const checkLists = [
  "발열 체크시 37.5도 이하인 것을 확인했습니다.",
  "임시 출입카드 분실 시 분실 비용이 발생하는 것을 확인했습니다.",
  "마스크를 반드시 상시 착용하고 방역수칙을 준수할 것을 약속하며, 모든 설문을 이상없이 작성했음을 확인합니다.",
];

const CheckList: React.FC = () => (
  <div className={classes["check-list-wrapper"]}>
    <ul className={classes["check-list"]}>
      {checkLists.map((checkList) => (
        <List key={checkList} text={checkList} />
      ))}
    </ul>
  </div>
);

interface IProps {
  handleCheckIn: (cardNum: string) => (e: React.FormEvent<HTMLFormElement>) => Promise<boolean>;
}

const CheckInUi: React.FC<IProps> = ({ handleCheckIn }) => {
  const [isOpened, setIsOpened] = useState(false);

  const {
    cluster: { officeHours },
  } = useCluster();

  const handleModalClose = () => {
    setIsOpened(false);
  };

  const handleModalOpen = () => {
    setIsOpened(true);
  };

  return (
    <>
      <Box>
        <p> 클러스터 운영시간: {officeHours}</p>
        <p> 인포데스크 점심시간 13:00 ~ 14:00</p>
      </Box>
      <Modal open={isOpened} onClose={handleModalClose}>
        <MuiBox>
          <CheckList />
        </MuiBox>
      </Modal>
      <CheckInForm handleModalOpen={handleModalOpen} handleCheckIn={handleCheckIn} />
    </>
  );
};

export default CheckInUi;
