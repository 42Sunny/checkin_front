import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import classes from "../styles/components/SlideButton.module.css";

interface IProps {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}

const SlideButton: React.FC<IProps> = ({ value, setValue }) => {
  const slider = useRef<HTMLInputElement>(null);
  const [isResetted, setIsResetted] = useState(false);

  const handleSliderChange = (
    e:
      | React.MouseEvent<HTMLInputElement>
      | React.TouchEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    setValue(e.currentTarget.valueAsNumber);
  };

  const handleSliderTouchEnd = (
    e: React.MouseEvent<HTMLInputElement> | React.TouchEvent<HTMLInputElement>,
  ) => {
    if (!slider.current) return;
    const currentValue = e.currentTarget.valueAsNumber;
    if (currentValue < 80) {
      setIsResetted(true);
    } else {
      setValue(100);
    }
  };

  useLayoutEffect(() => {
    if (!slider.current) return;
    if (value > 80) {
      slider.current.style.backgroundColor = "black";
    } else slider.current.style.background = "";
  }, [value]);

  useEffect(() => {
    if (isResetted) {
      setValue(0);
      setIsResetted(false);
    }
  }, [isResetted, setValue, value]);

  return (
    <div className={classes["slider-wrapper"]}>
      <input
        onMouseUp={handleSliderTouchEnd}
        onTouchEnd={handleSliderTouchEnd}
        ref={slider}
        type='range'
        value={value}
        min={0}
        max={99}
        onInput={handleSliderChange}
        className={classes.slider}
      />
      {value === 0 && (
        <p role='contentinfo' className={classes["slider-backgroundText"]}>
          밀어서 체크아웃
        </p>
      )}
    </div>
  );
};

export default SlideButton;
