import React from "react";
import classes from "../../styles/components/Card/CardContents.module.css";
import DurationTime from "../DurationTime";
import CardItem from "./CardItem";

function CardContents() {
  return (
    <section className={classes.cardContentsSection}>
      <CardItem title='오늘 누적시간'>
        <DurationTime startTime={0} />
      </CardItem>
      <CardItem title='이번주 누적시간'>
        <DurationTime startTime={0} />
      </CardItem>
      <CardItem title='이번달 누적시간'>
        <DurationTime startTime={0} />
      </CardItem>
    </section>
  );
}

export default CardContents;
