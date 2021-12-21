import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import classes from "../styles/pages/EndPage.module.css";

// TODO: 뒤로가기할때 이 페이지가 나옴 이거 없애고 모달로 만드ㄹ
const End = () => {
  const history = useHistory();

  useEffect(() => {
    const timeOutId = setTimeout(() => history.push("/checkin"), 1000);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [history]);

  return (
    <div className={classes["text-wrapper"]}>
      <h1 className={classes["ending-text"]}>Complete!</h1>
    </div>
  );
};

export default End;
